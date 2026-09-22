#!/usr/bin/env python3
"""
Compiles the DC-style markup (sc-if / sc-for / {{expr}}) extracted from
Main.dc.html into a plain vanilla-JS render(vals) function that builds an
HTML string, using a handler-registry + event-delegation pattern for
onClick/onChange/onFocus (since real function references can't be
serialized into an HTML string).
"""
import re
import sys

TOKEN_RE = re.compile(
    r'(?P<if_open><sc-if\s+value="\{\{(?P<if_expr>[^}]*)\}\}"[^>]*>)'
    r'|(?P<if_close></sc-if>)'
    r'|(?P<for_open><sc-for\s+list="\{\{(?P<for_expr>[^}]*)\}\}"\s+as="(?P<for_var>[^"]*)"[^>]*>)'
    r'|(?P<for_close></sc-for>)'
)

def tokenize(src):
    pos = 0
    tokens = []
    for m in TOKEN_RE.finditer(src):
        if m.start() > pos:
            tokens.append(('text', src[pos:m.start()]))
        if m.group('if_open'):
            tokens.append(('if_open', m.group('if_expr').strip()))
        elif m.group('if_close'):
            tokens.append(('if_close', None))
        elif m.group('for_open'):
            tokens.append(('for_open', (m.group('for_expr').strip(), m.group('for_var').strip())))
        elif m.group('for_close'):
            tokens.append(('for_close', None))
        pos = m.end()
    if pos < len(src):
        tokens.append(('text', src[pos:]))
    return tokens


def parse(tokens):
    """Recursive-descent parse into a tree using an index-based walk."""
    pos = [0]

    def parse_children(stop_kind):
        nodes = []
        while pos[0] < len(tokens):
            kind, val = tokens[pos[0]]
            if kind == stop_kind:
                pos[0] += 1
                return nodes
            if kind == 'text':
                nodes.append(('text', val))
                pos[0] += 1
            elif kind == 'if_open':
                pos[0] += 1
                children = parse_children('if_close')
                nodes.append(('if', val, children))
            elif kind == 'for_open':
                pos[0] += 1
                children = parse_children('for_close')
                expr, var = val
                nodes.append(('for', expr, var, children))
            else:
                raise ValueError("Unexpected token %s at top level" % kind)
        return nodes

    return parse_children(None)


# ---------------------------------------------------------------------------
# Emit JS
# ---------------------------------------------------------------------------

TAG_RE = re.compile(r'<([a-zA-Z][\w-]*)((?:\s+[^<>]*)?)\s*(/?)>')
ATTR_RE = re.compile(r'([a-zA-Z][\w:-]*)\s*=\s*"([^"]*)"')
INTERP_RE = re.compile(r'\{\{([^}]*)\}\}')
TEXTAREA_RE = re.compile(r'<textarea([^>]*)>(.*?)</textarea>', re.S)

def resolve_expr(expr, scope):
    expr = expr.strip()
    root = re.split(r'[.\[]', expr, 1)[0]
    if root in scope:
        return expr
    return 'vals.' + expr


def process_textarea(m, scope):
    attrs_str = m.group(1)
    attrs = ATTR_RE.findall(attrs_str)
    out_attrs = []
    inner = ''
    for name, val in attrs:
        im = INTERP_RE.fullmatch(val)
        if not im:
            out_attrs.append('%s="%s"' % (name, val))
            continue
        expr = resolve_expr(im.group(1), scope)
        lname = name.lower()
        if lname == 'value':
            inner = '${esc(' + expr + ')}'
        elif lname == 'onchange':
            out_attrs.append('data-h-change="${H(' + expr + ')}"')
        elif lname == 'onclick':
            out_attrs.append('data-h-click="${H(' + expr + ')}"')
        elif lname == 'onfocus':
            out_attrs.append('data-h-focus="${H(' + expr + ')}"')
        elif lname in ('readonly', 'disabled', 'checked'):
            out_attrs.append('${' + expr + ' ? "' + name + '" : ""}')
        else:
            out_attrs.append(name + '="${escAttr(' + expr + ')}"')
    open_tag = '<textarea ' + ' '.join(out_attrs) + '>' if out_attrs else '<textarea>'
    return open_tag + inner + '</textarea>'


def process_tag(m, scope):
    tagname = m.group(1)
    attrs_str = m.group(2)
    selfclose = m.group(3)
    if not attrs_str.strip():
        return m.group(0)
    attrs = ATTR_RE.findall(attrs_str)
    out_attrs = []
    for name, val in attrs:
        im = INTERP_RE.fullmatch(val)
        if not im:
            out_attrs.append('%s="%s"' % (name, val))
            continue
        expr = resolve_expr(im.group(1), scope)
        lname = name.lower()
        if lname == 'onclick':
            out_attrs.append('data-h-click="${H(' + expr + ')}"')
        elif lname == 'onchange':
            out_attrs.append('data-h-change="${H(' + expr + ')}"')
        elif lname == 'onfocus':
            out_attrs.append('data-h-focus="${H(' + expr + ')}"')
        elif lname in ('checked', 'disabled', 'readonly'):
            out_attrs.append('${' + expr + ' ? "' + name + '" : ""}')
        elif lname == 'value' and tagname.lower() == 'select':
            out_attrs.append('data-value="${escAttr(' + expr + ')}"')
        else:
            out_attrs.append(name + '="${escAttr(' + expr + ')}"')
    tag = '<' + tagname
    if out_attrs:
        tag += ' ' + ' '.join(out_attrs)
    tag += selfclose + '>'
    return tag


def compile_text(text, scope):
    # 1. textareas first (whole-element)
    text = TEXTAREA_RE.sub(lambda m: process_textarea(m, scope), text)
    # 2. other tags with attributes
    text = TAG_RE.sub(lambda m: process_tag(m, scope) if m.group(1).lower() != 'textarea' else m.group(0), text)
    # 3. remaining bare {{expr}} text-node interpolations
    def repl_text_interp(m):
        expr = resolve_expr(m.group(1), scope)
        return '${esc(' + expr + ')}'
    text = INTERP_RE.sub(repl_text_interp, text)
    # The source markup contains no literal backtick, backslash or `$`
    # characters (verified before writing this compiler), so the resulting
    # JS template literal needs no further escaping here.
    return text


def compile_nodes(nodes, scope):
    parts = []
    for node in nodes:
        kind = node[0]
        if kind == 'text':
            parts.append(compile_text(node[1], scope))
        elif kind == 'if':
            expr = resolve_expr(node[1], scope)
            inner = compile_nodes(node[2], scope)
            parts.append('${(' + expr + ') ? `' + inner + '` : ""}')
        elif kind == 'for':
            _, expr_raw, var, children = node
            expr = resolve_expr(expr_raw, scope)
            inner = compile_nodes(children, scope + [var])
            parts.append('${(' + expr + ' || []).map(function(' + var + '){ return `' + inner + '`; }).join("")}')
    return ''.join(parts)


def main():
    src_path, out_path = sys.argv[1], sys.argv[2]
    with open(src_path) as f:
        src = f.read()
    for ch in ('`', '\\', '$'):
        if ch in src:
            raise SystemExit(
                "Source markup contains literal %r which this compiler does not "
                "escape (assumed absent) - add proper escaping before proceeding." % ch
            )
    tokens = tokenize(src)
    tree = parse(tokens)
    body = compile_nodes(tree, [])
    js = "function renderApp(vals){\n  return `" + body + "`;\n}\n"
    with open(out_path, 'w') as f:
        f.write(js)
    print("Wrote", out_path, len(js), "chars")


if __name__ == '__main__':
    main()
