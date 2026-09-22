const fs = require("fs");
const path = require("path");

// Where the shared proposals list lives on disk. On the hosted app this
// should point at a mounted persistent volume (set PROPOSALS_DATA_DIR to
// that mount path, e.g. "/data") so the list survives redeploys and
// container restarts -- without that, it would live on the container's
// ephemeral filesystem and vanish on every deploy. Locally it just falls
// back to a "data" folder next to the app, which is fine for dev.
const DATA_DIR = process.env.PROPOSALS_DATA_DIR || path.join(__dirname, "..", "data");
const DATA_FILE = path.join(DATA_DIR, "proposals.json");

function ensureDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readAll() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    // Missing file (first run) or unreadable/corrupt content -- either way,
    // starting from an empty list is the safe default rather than crashing
    // the whole app over the shared proposals list.
    return [];
  }
}

function writeAll(list) {
  ensureDir();
  // Write-then-rename so a crash or concurrent read mid-write can never
  // observe a half-written file.
  const tmpFile = DATA_FILE + "." + process.pid + "." + Date.now() + ".tmp";
  fs.writeFileSync(tmpFile, JSON.stringify(list), "utf8");
  fs.renameSync(tmpFile, DATA_FILE);
}

// This app expects a small team's worth of concurrent editors, not heavy
// concurrent writes -- so rather than a real database, a single in-process
// promise chain is enough to make sure reads/writes never interleave and
// corrupt the file, while keeping every operation simple and dependency-free.
let queue = Promise.resolve();
function serialize(fn) {
  const result = queue.then(fn, fn);
  // Swallow rejections here so one failed operation doesn't wedge the queue
  // for every operation queued after it; callers still see their own error.
  queue = result.then(
    () => {},
    () => {}
  );
  return result;
}

function listProposals() {
  return serialize(() => readAll());
}

function upsertProposal(proposal) {
  return serialize(() => {
    const list = readAll();
    const idx = list.findIndex((p) => p.id === proposal.id);
    if (idx >= 0) list[idx] = proposal;
    else list.push(proposal);
    writeAll(list);
    return proposal;
  });
}

function deleteProposal(id) {
  return serialize(() => {
    const list = readAll();
    const next = list.filter((p) => p.id !== id);
    const removed = next.length !== list.length;
    if (removed) writeAll(next);
    return removed;
  });
}

module.exports = { listProposals, upsertProposal, deleteProposal, DATA_FILE };
