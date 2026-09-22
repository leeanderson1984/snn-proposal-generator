const path = require("path");
const express = require("express");
const { computeVals } = require("./compute-vals");
const { buildProposalPdf } = require("./pdf");

const app = express();
const PORT = process.env.PORT || 4173;

// Optional: only used in this development/testing sandbox, where the
// normal Playwright browser download is blocked by network policy. On a
// real machine (including Lee's), `npm install` runs `playwright install
// chromium` via postinstall and this env var is simply unset, so
// chromium.launch() resolves its browser normally.
const PW_EXECUTABLE_PATH = process.env.PW_EXECUTABLE_PATH || undefined;

// Shared-password gate: this app is reachable at a public URL once hosted,
// so every route except the host's health check requires a single shared
// username/password (HTTP Basic Auth). The credentials themselves are NOT
// in this file -- they only ever exist as BASIC_AUTH_USER / BASIC_AUTH_PASS
// environment variables set on the hosting platform, so they never end up
// in source control or a deploy log. Change them any time from the
// platform's dashboard; no code change needed.
const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS;
// Local dev (npm start on your own machine) is already private, so only
// enforce the gate when both env vars are actually set -- which they will
// be on the hosting platform, and deliberately won't be on localhost.
const AUTH_ENABLED = !!(BASIC_AUTH_USER && BASIC_AUTH_PASS);
if (!AUTH_ENABLED) {
  console.log("BASIC_AUTH_USER/BASIC_AUTH_PASS not set -- running without a login gate (expected for local dev only).");
}

function timingSafeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return require("crypto").timingSafeEqual(bufA, bufB);
}

app.use((req, res, next) => {
  if (!AUTH_ENABLED) return next();
  if (req.path === "/api/health") return next(); // let the host's health check through unauthenticated
  const header = req.headers.authorization || "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const sep = decoded.indexOf(":");
    const user = sep === -1 ? decoded : decoded.slice(0, sep);
    const pass = sep === -1 ? "" : decoded.slice(sep + 1);
    if (timingSafeEqual(user, BASIC_AUTH_USER) && timingSafeEqual(pass, BASIC_AUTH_PASS)) {
      return next();
    }
  }
  res.set("WWW-Authenticate", 'Basic realm="SNN Sports Proposal Generator"');
  res.status(401).send("Authentication required.");
});

app.use(express.json({ limit: "25mb" }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.post("/api/generate-pdf", async (req, res) => {
  const proposal = req.body && req.body.proposal;
  if (!proposal || typeof proposal !== "object") {
    return res.status(400).json({ error: "No proposal data was received." });
  }
  let vals;
  try {
    vals = computeVals(proposal);
  } catch (e) {
    console.error("computeVals failed:", e);
    return res.status(500).json({ error: "Could not process the proposal data: " + (e && e.message ? e.message : String(e)) });
  }
  try {
    const { buffer, totalPages } = await buildProposalPdf(vals, { executablePath: PW_EXECUTABLE_PATH });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("X-Total-Pages", String(totalPages));
    res.setHeader("Content-Length", String(buffer.length));
    res.status(200).send(buffer);
  } catch (e) {
    console.error("PDF generation failed:", e);
    res.status(500).json({ error: "PDF generation failed: " + (e && e.message ? e.message : String(e)) });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`SNN Sports Proposal Generator running at http://localhost:${PORT}`);
});
