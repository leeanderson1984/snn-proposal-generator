// Loads the SAME business-logic.js the browser app uses (single source of
// truth for every computed field: totals, stats tiles, investment lines,
// opportunity paragraphs, terms, signature display, etc.) inside a small
// Node-side shim, and exposes computeVals(proposal) -> the exact `vals`
// object renderVals() would produce in the browser. This is what keeps
// "Preview must equal PDF" true by construction rather than by hoping two
// separate implementations stay in sync.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const scriptSrc = fs.readFileSync(path.join(__dirname, "..", "public", "business-logic.js"), "utf8");

function makeSandbox() {
  const store = {};
  const sandbox = {
    console,
    localStorage: {
      getItem(k) {
        return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null;
      },
      setItem(k, v) {
        store[k] = String(v);
      },
      removeItem(k) {
        delete store[k];
      },
    },
    navigator: { platform: "Node", userAgent: "snn-pdf-generator" },
    document: {
      querySelectorAll() {
        return [];
      },
      createElement() {
        return { setAttribute() {}, style: {}, addEventListener() {}, click() {} };
      },
      head: { appendChild() {} },
      body: { appendChild() {}, removeChild() {} },
      addEventListener() {},
    },
    URL: {
      createObjectURL() {
        return "blob://x";
      },
      revokeObjectURL() {},
    },
    fetch: undefined,
  };
  sandbox.window = sandbox;
  sandbox.global = sandbox;

  class DCLogic {
    constructor(props) {
      this.props = props || {};
      this.state = {};
    }
    setState(patch, cb) {
      const next = typeof patch === "function" ? patch(this.state) : patch;
      this.state = Object.assign({}, this.state, next);
      if (cb) cb();
    }
    componentDidMount() {}
    componentDidUpdate() {}
    componentWillUnmount() {}
  }
  sandbox.DCLogic = DCLogic;

  vm.createContext(sandbox);
  vm.runInContext(scriptSrc + "\nglobal.Component = Component; global.ensureShape = ensureShape;", sandbox);
  return sandbox;
}

/**
 * proposal: a plain proposal object (same shape as produced by the app's
 * makeBlankProposal()/current state). Returns the same `vals` shape the
 * live app's Preview tab renders from.
 */
function computeVals(proposal) {
  const sandbox = makeSandbox();
  const shaped = sandbox.ensureShape(JSON.parse(JSON.stringify(proposal)));
  const comp = new sandbox.Component({});
  comp.state = { current: shaped, loaded: true, screen: "builder", activeTab: "preview", proposals: [shaped] };
  return comp.renderVals();
}

module.exports = { computeVals };
