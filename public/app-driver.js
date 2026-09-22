// App driver: wires the ported Component (business-logic.js) and the
// compiled render() function (compiled_render.js) into a real DOM app,
// using a handler-registry + event-delegation pattern (since real function
// references can't be embedded in an HTML string) and a focus/cursor
// preservation step around each full re-render (since every render()
// call rebuilds the whole subtree from scratch).

(function () {
  "use strict";

  function escHtml(s) {
    if (s === null || s === undefined) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  var currentHandlers = [];
  function H(fn) {
    currentHandlers.push(typeof fn === "function" ? fn : function () {});
    return currentHandlers.length - 1;
  }
  function esc(v) {
    return escHtml(v);
  }
  function escAttr(v) {
    return escHtml(v);
  }

  // esc/escAttr/H are called as bare (unqualified) identifiers from inside
  // compiled_render.js's renderApp() function, which is defined in its own
  // top-level script scope, separate from this IIFE. Expose them on window
  // so that free-variable lookup from renderApp() resolves to these.
  window.escHtml = escHtml;
  window.esc = esc;
  window.escAttr = escAttr;
  window.H = H;

  // DCLogic-compatible base class for the browser. Exposed on window
  // immediately (this script loads first) so that business-logic.js's
  // `class Component extends DCLogic` can resolve it when that script
  // executes next.
  class DCLogic {
    constructor(props) {
      this.props = props || {};
      this.state = {};
      this._pendingRender = false;
    }
    setState(patch, cb) {
      var next = typeof patch === "function" ? patch(this.state) : patch;
      this.state = Object.assign({}, this.state, next);
      if (cb) cb();
      scheduleRender();
    }
    componentDidMount() {}
    componentDidUpdate() {}
    componentWillUnmount() {}
  }
  window.DCLogic = DCLogic;

  // #app-root is above these <script> tags in the document, so it already
  // exists by the time this script runs -- no need to wait for it.
  var root = document.getElementById("app-root");
  // Assigned once business-logic.js's Component class is available (see the
  // deferred block at the bottom of this file). Declared here, at the same
  // scope as scheduleRender/doRender, so DCLogic.setState (above) and every
  // closure below can see the live value once it's set.
  var comp;
  var renderScheduled = false;

  function scheduleRender() {
    if (renderScheduled) return;
    renderScheduled = true;
    requestAnimationFrame(function () {
      renderScheduled = false;
      doRender();
    });
  }

  function captureFocus() {
    var el = document.activeElement;
    if (!el || el === document.body || !root.contains(el)) return null;
    var field = el.getAttribute("data-field-id") || null;
    if (!field) {
      // fall back to a positional key: tag + index among same tag
      var all = Array.prototype.slice.call(root.querySelectorAll(el.tagName));
      field = "pos:" + el.tagName + ":" + all.indexOf(el);
    }
    var info = { field: field, scrollTop: root.scrollTop };
    if (typeof el.selectionStart === "number") {
      info.selStart = el.selectionStart;
      info.selEnd = el.selectionEnd;
    }
    return info;
  }

  function restoreFocus(info) {
    if (!info) return;
    var el = null;
    if (info.field && info.field.indexOf("pos:") === 0) {
      var parts = info.field.split(":");
      var tag = parts[1];
      var idx = Number(parts[2]);
      var all = root.querySelectorAll(tag);
      el = all[idx] || null;
    } else if (info.field) {
      el = root.querySelector('[data-field-id="' + info.field + '"]');
    }
    if (!el) return;
    try {
      el.focus({ preventScroll: true });
      if (typeof info.selStart === "number" && typeof el.setSelectionRange === "function") {
        el.setSelectionRange(info.selStart, info.selEnd);
      }
    } catch (e) {}
    root.scrollTop = info.scrollTop;
  }

  function syncSelectValues() {
    var sels = root.querySelectorAll("select[data-value]");
    for (var i = 0; i < sels.length; i++) {
      var s = sels[i];
      var v = s.getAttribute("data-value");
      s.value = v;
      s.removeAttribute("data-value");
    }
  }

  function doRender() {
    currentHandlers = [];
    var vals;
    try {
      vals = comp.renderVals();
    } catch (e) {
      root.innerHTML =
        '<div style="padding:40px;font-family:monospace;white-space:pre-wrap;color:#a33;">Render error:\n' +
        escHtml(e && e.stack ? e.stack : String(e)) +
        "</div>";
      console.error(e);
      return;
    }
    var html;
    try {
      html = window.renderApp(vals);
    } catch (e) {
      root.innerHTML =
        '<div style="padding:40px;font-family:monospace;white-space:pre-wrap;color:#a33;">Template error:\n' +
        escHtml(e && e.stack ? e.stack : String(e)) +
        "</div>";
      console.error(e);
      return;
    }
    var focusInfo = captureFocus();
    root.innerHTML = html;
    syncSelectValues();
    restoreFocus(focusInfo);
  }

  function dispatch(eventType, e) {
    var attr = "data-h-" + eventType;
    var el = e.target.closest("[" + attr + "]");
    if (!el) return;
    var id = el.getAttribute(attr);
    var fn = currentHandlers[Number(id)];
    if (typeof fn === "function") fn(e);
  }

  root.addEventListener("click", function (e) {
    dispatch("click", e);
  });
  root.addEventListener("change", function (e) {
    dispatch("change", e);
  });
  root.addEventListener("input", function (e) {
    // The compiled markup only ever emits data-h-change (compile_template.py
    // maps every onChange="..." to data-h-change, never data-h-input -- see
    // raw_markup.html / compiled_render.js). That's correct for
    // checkboxes/radios/selects, where the native "change" event already
    // fires on every interaction. But for text-like <input>/<textarea>
    // fields, the browser only fires "change" on blur -- NOT per keystroke
    // -- so without this, typing into any text field never reaches app
    // state until the user clicks away. Route "input" events through the
    // same data-h-change handler lookup so state updates on every keystroke
    // too. This can cause a handler to run twice for a given final value
    // (once on "input", once more on the trailing "change" at blur), but
    // that's harmless: the handler always sets state from the event
    // target's current value, so re-invoking it with the same value is a
    // no-op.
    dispatch("input", e);
    dispatch("change", e);
  });
  root.addEventListener(
    "focusin",
    function (e) {
      dispatch("focus", e);
    },
    true
  );

  // Instantiating Component and kicking off the first render needs
  // window.Component, which business-logic.js (loaded after this file)
  // defines. Defer just this part until the whole document -- including
  // every script tag -- has finished executing, so business-logic.js and
  // compiled_render.js are guaranteed to have already run by the time this
  // fires.
  document.addEventListener("DOMContentLoaded", function () {
    comp = new window.Component({});
    // expose for debugging
    window.__snnApp = comp;
    comp.componentDidMount();
    doRender();
  });
})();
