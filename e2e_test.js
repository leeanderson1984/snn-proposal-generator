// Real end-to-end test: drives an actual (headless) browser against the
// actual running server, fills in the actual UI, clicks the actual
// "Save as PDF" button, and captures the actual browser download event --
// exactly Lee's acceptance test, automated.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const EXE = process.env.PW_EXECUTABLE_PATH;
const BASE = "http://localhost:4173";
const DOWNLOAD_DIR = "/tmp/claude-0/-home-claude/5d453e73-a004-5885-8f1b-f2ce2567c5c3/scratchpad/snn-standalone/e2e_downloads";

async function main() {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
  const browser = await chromium.launch(EXE ? { executablePath: EXE } : undefined);
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") console.log("[browser console error]", msg.text());
  });
  page.on("pageerror", (err) => console.log("[browser page error]", err.message));

  console.log("--- TEST A: normal demo proposal, via real UI interaction ---");
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForSelector(".app", { timeout: 5000 });

  // Confirm the demo proposal loaded (app seeds one on first run).
  const title = await page.textContent(".brand-title");
  console.log("Loaded app, brand title:", title);

  // Go to Preview tab.
  await page.click('button:has-text("Preview")');
  await page.waitForSelector(".proposal-pages", { timeout: 5000 });
  const pageCountOnScreen = await page.$$eval(".proposal-pages > .pg", (els) => els.length);
  console.log("On-screen preview page count (Test A, demo data):", pageCountOnScreen);

  // Click "Save as PDF" and capture the real download event.
  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 30000 }),
    page.click('button:has-text("Save as PDF")'),
  ]);
  const suggested = download.suggestedFilename();
  const savedPath = path.join(DOWNLOAD_DIR, suggested);
  await download.saveAs(savedPath);
  console.log("REAL DOWNLOAD CAPTURED. Filename:", suggested, "-> saved to", savedPath);
  const stat = fs.statSync(savedPath);
  console.log("Downloaded file size:", stat.size, "bytes");

  await browser.close();
  console.log("\nDone.");
}

main().catch((e) => {
  console.error("E2E TEST FAILED:", e);
  process.exit(1);
});
