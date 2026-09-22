// Real end-to-end test for the two remaining acceptance-test cases Lee
// specified: a proposal over 10 pages (test_b, expect 20 pages, no cap),
// and a minimal proposal (test_c, expect no unnecessary blank pages).
// Same real-browser, real-click, real-download flow as e2e_test.js, but
// seeds localStorage with each fixture before the app boots so the UI
// itself builds/generates from that exact data.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const EXE = process.env.PW_EXECUTABLE_PATH;
const BASE = "http://localhost:4173";
const DOWNLOAD_DIR = path.join(__dirname, "e2e_downloads");
const LS_CURRENT_KEY = "snn_proposal_generator_v1_current";
const LS_PROPOSALS_KEY = "snn_proposal_generator_v1_proposals";

async function runCase(context, label, fixturePath, expectedMinPages) {
  const proposal = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
  const page = await context.newPage();
  page.on("pageerror", (err) => console.log(`[${label}] [browser page error]`, err.message));

  // Seed localStorage with this fixture as both the current proposal and
  // the only saved proposal, BEFORE the app's componentDidMount runs, by
  // navigating once first to establish the origin, then setting storage,
  // then reloading.
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.evaluate(
    ({ key, listKey, data }) => {
      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(listKey, JSON.stringify([data]));
    },
    { key: LS_CURRENT_KEY, listKey: LS_PROPOSALS_KEY, data: proposal }
  );
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForSelector(".app", { timeout: 5000 });

  await page.click('button:has-text("Preview")');
  await page.waitForSelector(".proposal-pages", { timeout: 5000 });
  const onScreenPages = await page.$$eval(".proposal-pages > .pg", (els) => els.length);
  console.log(`[${label}] on-screen preview page count:`, onScreenPages);

  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 30000 }),
    page.click('button:has-text("Save as PDF")'),
  ]);
  const suggested = download.suggestedFilename();
  const savedPath = path.join(DOWNLOAD_DIR, `${label}__${suggested}`);
  await download.saveAs(savedPath);
  const stat = fs.statSync(savedPath);
  console.log(`[${label}] REAL DOWNLOAD CAPTURED:`, suggested, "->", stat.size, "bytes");

  await page.close();
  return { onScreenPages, savedPath, size: stat.size };
}

async function main() {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
  const browser = await chromium.launch(EXE ? { executablePath: EXE } : undefined);
  const context = await browser.newContext({ acceptDownloads: true });

  console.log("--- TEST B: long proposal (>10 pages), via real UI interaction ---");
  const b = await runCase(context, "TEST_B", path.join(__dirname, "..", "test_b_proposal.json"), 11);

  console.log("\n--- TEST C: minimal proposal, via real UI interaction ---");
  const c = await runCase(context, "TEST_C", path.join(__dirname, "..", "test_c_proposal.json"), 1);

  await browser.close();
  console.log("\nDone.", JSON.stringify({ b, c }));
}

main().catch((e) => {
  console.error("E2E TEST (B/C) FAILED:", e);
  process.exit(1);
});
