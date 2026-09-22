// Dynamic, page-count-agnostic PDF builder for the SNN Sports proposal.
// Ported 1:1 from the already-tested pdfgen/build_pdf.py (same constants,
// same pagination algorithm, same page order) onto the Node Playwright API
// + pdf-lib, and now driven from the SAME `vals` the browser app's own
// Preview tab renders from (server/compute-vals.js), so the PDF can never
// drift from what the user sees on screen. No page count is hard-coded
// anywhere in this file — page counts fall out purely from real measured
// content height.

const os = require("os");
const path = require("path");
const fs = require("fs/promises");
const { chromium } = require("playwright");
const { PDFDocument } = require("pdf-lib");
const { pageShell } = require("./shared-css");

const PAGE_W = 794;
const PAGE_H = 1123;
const TOP_PAD = 72;
const BOTTOM_PAD = 86;
const HEADER_H_STANDARD = 90;
const HEADER_H_COMPACT = 60;
const GAP_STANDARD = 12;
const GAP_TERMS = 14;

function esc(s) {
  return String(s === null || s === undefined ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function budgetFor(headerH, bottomPad = BOTTOM_PAD, topPad = TOP_PAD) {
  return PAGE_H - topPad - bottomPad - headerH;
}

// ---------------------------------------------------------------------------
// Fixed (single-page, bounded-content) sections
// ---------------------------------------------------------------------------

function coverBody(vals) {
  const preview = vals.preview;
  const logos = vals.logos || {};
  const logoHtml = logos.hasClient
    ? `<img src="${esc(logos.clientSrc || "")}" style="max-width:100%;max-height:100%;object-fit:contain;">`
    : `<span style="font-family:'Space Grotesk',sans-serif;font-weight:700;color:var(--snn-blue);font-size:22px;">${esc(
        preview.clientInitial || "?"
      )}</span>`;
  return `
<div class="cover-top"><div class="cover-snn-mark">SNN SPORTS</div></div>
<div>
  <div class="cover-kicker">Sponsorship &amp; Media Partnership Proposal</div>
  <h1 class="cover-title">${esc(preview.campaignTitle || "")}</h1>
  <div class="cover-campaign">${esc(preview.campaignDateRange || "")}</div>
  <div class="cover-client-row">
    <div class="cover-client-logo">${logoHtml}</div>
    <div class="cover-client-name">${esc(preview.clientNameDisplay || "")}</div>
  </div>
</div>
<div class="cover-bottom">
  <div>
    <div class="cover-prepared-label">Prepared by</div>
    <div class="cover-prepared-name">Lee Anderson</div>
    <div class="cover-prepared-sub">CEO, SNN Sports</div>
  </div>
  <div class="cover-date">${esc(preview.proposalDateDisplay || "")}</div>
</div>
`;
}

function aboutBody() {
  return `
<div class="pg-kicker">SNN Sports</div>
<h2 class="pg-title">About SNN Sports</h2>
<div class="about-copy">
  <p>SNN Sports is a Scottish sports media platform built around football, delivering daily coverage and analysis across social, video and digital platforms. We follow the game closely — match by match, story by story — and put that coverage in front of an audience that is genuinely engaged with Scottish football.</p>
  <p>Our content spans social video, matchday coverage, written articles and long-form features, distributed across Facebook, Instagram, TikTok, X and YouTube as well as our own website. That multi-platform approach lets us reach our audience where they already spend their time, rather than asking them to come to us.</p>
  <p>For commercial partners, SNN Sports offers a direct route into a Scottish football audience through content that sits naturally alongside the coverage that audience already follows — rather than as separate, disconnected advertising.</p>
</div>
<div class="about-entity">SNN Sports is operated by 1606 Ltd t/a SNN Sports · www.snnsports.co.uk</div>
`;
}

function audienceBody(vals) {
  const tiles = (vals.preview.statsTiles || []);
  const items = tiles
    .map((st) => {
      const sub = st.hasSub ? `<div class="stat-sub">${esc(st.sublabel || "")}</div>` : "";
      return `<div class="stat-tile"><div class="stat-num">${esc(st.value || "")}</div><div class="stat-label">${esc(
        st.label || ""
      )}</div>${sub}</div>`;
    })
    .join("");
  return `
<div class="pg-kicker">Our Audience</div>
<h2 class="pg-title">Reach &amp; Engagement</h2>
<div class="stats-grid">${items}</div>
`;
}

function investmentBody(vals) {
  const preview = vals.preview;
  const commercial = vals.commercial || {};
  const lines = (preview.investmentLines || [])
    .map(
      (ln) =>
        `<div class="${esc(ln.className || "inv-line")}"><span>${esc(ln.label || "")}</span><span class="val">${esc(
          ln.value || ""
        )}</span></div>`
    )
    .join("");
  const perf = preview.hasPerformanceNote
    ? `<div class="inv-note"><strong>Performance-based commission: </strong>${esc(commercial.performanceNotes || "")}</div>`
    : "";
  return `
<div class="pg-kicker">Investment</div>
<h2 class="pg-title">Commercial Terms</h2>
${lines}
<div class="inv-note">${esc(preview.vatFootnote || "")}</div>
${perf}
`;
}

function whyBody(vals) {
  const items = (vals.whyPoints || [])
    .map(
      (w) =>
        `<div class="why-item"><div class="why-check"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg></div><div class="why-text">${esc(
          w.text || ""
        )}</div></div>`
    )
    .join("");
  return `
<div class="pg-kicker">Why SNN Sports</div>
<h2 class="pg-title">A Direct Route Into Scottish Football</h2>
<div class="why-list">${items}</div>
`;
}

function nextStepsBody(vals) {
  const preview = vals.preview;
  return `
<div class="pg-kicker">Next Steps</div>
<h2 class="pg-title">Taking This Forward</h2>
<div class="next-copy">${esc(preview.nextStepsCopy || "")}</div>
<div class="contact-card">
  <div class="contact-name">Lee Anderson</div>
  <div class="contact-role">CEO, SNN Sports</div>
  <div class="contact-links"><span>lee@snnsports.co.uk</span><span>www.snnsports.co.uk</span></div>
</div>
`;
}

function signoffBody(vals) {
  const preview = vals.preview;
  const signature = vals.signature || {};
  const banner = preview.acceptedTerms
    ? '<div class="accept-banner yes"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>Terms &amp; Conditions accepted by the client</div>'
    : '<div class="accept-banner no">Awaiting client sign-off</div>';
  const clientSig = preview.hasClientSignature
    ? `<div class="sig-script">${esc(signature.clientName || "")}</div>`
    : '<div class="sig-script empty">Awaiting client signature</div>';
  const snnSig = preview.hasSnnSignature
    ? `<div class="sig-script">${esc(signature.snnName || "")}</div>`
    : '<div class="sig-script empty">Awaiting SNN Sports signature</div>';
  return `
<div class="pg-kicker">Proposal Acceptance</div>
<h2 class="pg-title">Sign-off</h2>
${banner}
<div class="sig-block">
  <div class="sig-role">Signed for and on behalf of ${esc(preview.clientNameShort || "")}</div>
  ${clientSig}
  <div class="sig-meta"><span>${esc(signature.clientTitle || "")}</span><span>${esc(
    preview.clientSignatureDateDisplay || ""
  )}</span></div>
</div>
<div class="sig-block">
  <div class="sig-role">Signed for and on behalf of SNN Sports</div>
  ${snnSig}
  <div class="sig-meta"><span>${esc(signature.snnTitle || "")}</span><span>${esc(
    preview.snnSignatureDateDisplay || ""
  )}</span></div>
</div>
<div class="sig-disclaimer">This page may be printed and signed by hand, signed digitally using your own e-signature tool, or completed here by typing a full name in place of a handwritten signature. This proposal, once signed by both parties, is intended to form a binding agreement on the terms set out on the preceding pages.</div>
`;
}

// ---------------------------------------------------------------------------
// Flowing (unbounded, auto-paginated) sections
// ---------------------------------------------------------------------------

function opportunityBlocks(vals) {
  const preview = vals.preview;
  const blocks = [];
  if (preview.hasObjectiveTags) {
    const tags = (preview.objectiveTags || []).map((t) => `<span class="opp-tag">${esc(t.label || "")}</span>`).join("");
    blocks.push(`<div class="opp-tags">${tags}</div>`);
  }
  (preview.opportunityParagraphs || []).forEach((p) => {
    blocks.push(`<div class="opp-para">${esc(p.text || "")}</div>`);
  });
  if (preview.opportunityNotesPresent) {
    blocks.push(`<div class="opp-para"><strong>Additional context: </strong>${esc(vals.objectivesNotes || "")}</div>`);
  }
  return blocks;
}

function deliverablesBlocks(vals) {
  const preview = vals.preview;
  if (preview.hasDeliverables) {
    return (preview.deliverables || []).map((d) => {
      const meta = d.hasMeta ? `<div class="pdeliv-meta">${esc(d.meta || "")}</div>` : "";
      const desc = d.hasDescription ? `<div class="pdeliv-desc">${esc(d.description || "")}</div>` : "";
      const notes = d.hasNotes ? `<div class="pdeliv-notes">${esc(d.notes || "")}</div>` : "";
      return `<div class="pdeliv"><div class="pdeliv-name">${esc(d.name || "")}</div>${meta}${desc}${notes}</div>`;
    });
  }
  return ['<div class="empty-state">No deliverables added yet — add them in the Package Builder tab.</div>'];
}

function termsBlocks(vals) {
  const termsText = (vals.terms && vals.terms.value) || "";
  let clauses = termsText.split("\n\n").filter((c) => c.trim() !== "");
  if (clauses.length === 0) clauses = [termsText];
  return clauses.map((c) => `<div class="terms-clause">${esc(c)}</div>`);
}

// ---------------------------------------------------------------------------
// Pagination engine (real measurement via headless Chromium)
// ---------------------------------------------------------------------------

async function measureHeights(page, blocksHtml) {
  const containerHtml =
    '<div id="measure" style="width:658px;">' +
    blocksHtml.map((b, i) => `<div class="measure-item" data-i="${i}">${b}</div>`).join("") +
    "</div>";
  await page.setContent(pageShell(containerHtml));
  return page.$$eval(".measure-item", (els) => els.map((el) => el.getBoundingClientRect().height));
}

function paginate(blocksHtml, heights, budgetPx, gapPx) {
  const pages = [];
  let current = [];
  let used = 0;
  for (let i = 0; i < blocksHtml.length; i++) {
    const h = heights[i];
    const add = current.length === 0 ? h : h + gapPx;
    if (current.length > 0 && used + add > budgetPx) {
      pages.push(current);
      current = [blocksHtml[i]];
      used = h;
    } else {
      current.push(blocksHtml[i]);
      used += add;
    }
  }
  if (current.length > 0) pages.push(current);
  if (pages.length === 0) pages.push([]);
  return pages;
}

async function renderFlowingSection(
  page,
  kicker,
  title,
  blocks,
  { headerH = HEADER_H_STANDARD, bottomPad = BOTTOM_PAD, gapPx = GAP_STANDARD, compactTitle = false } = {}
) {
  if (!blocks || blocks.length === 0) blocks = ['<div class="empty-state">Nothing to show.</div>'];
  const budget = budgetFor(headerH, bottomPad);
  const heights = await measureHeights(page, blocks);
  const pagesBlocks = paginate(blocks, heights, budget, gapPx);
  const out = [];
  const total = pagesBlocks.length;
  pagesBlocks.forEach((pageBlocks, idx) => {
    const suffix = idx === 0 ? "" : " (continued)";
    const titleClass = compactTitle ? "pg-title compact" : "pg-title";
    const body =
      `<div class="pg-kicker">${esc(kicker)}</div><h2 class="${titleClass}">${esc(title)}${suffix}</h2>` +
      pageBlocks.join("");
    out.push(body);
  });
  return out;
}

// ---------------------------------------------------------------------------
// Assembly
// ---------------------------------------------------------------------------

async function buildPages(measurePage, vals) {
  const pages = [];

  pages.push({ body: coverBody(vals), footer: null, extraClass: "pg-cover" });
  pages.push({ body: aboutBody(), footer: "About SNN Sports", extraClass: "" });
  pages.push({ body: audienceBody(vals), footer: "Reach & Engagement", extraClass: "" });

  const oppPages = await renderFlowingSection(
    measurePage,
    "The Opportunity",
    `Why This Partnership, For ${vals.preview.clientNameShort || ""}`,
    opportunityBlocks(vals)
  );
  oppPages.forEach((p) => pages.push({ body: p, footer: "The Opportunity", extraClass: "" }));

  const delPages = await renderFlowingSection(measurePage, "Proposed Partnership", "Deliverables", deliverablesBlocks(vals));
  delPages.forEach((p) => pages.push({ body: p, footer: "Deliverables", extraClass: "" }));

  pages.push({ body: investmentBody(vals), footer: "Commercial Terms", extraClass: "" });
  pages.push({ body: whyBody(vals), footer: "Why SNN Sports", extraClass: "" });

  const termsPages = await renderFlowingSection(measurePage, "Terms & Conditions", "Terms & Conditions", termsBlocks(vals), {
    headerH: HEADER_H_COMPACT,
    bottomPad: 58,
    gapPx: GAP_TERMS,
    compactTitle: true,
  });
  termsPages.forEach((p) => pages.push({ body: p, footer: "Terms & Conditions", extraClass: "", termsPad: true }));

  pages.push({ body: nextStepsBody(vals), footer: "Next Steps", extraClass: "" });
  pages.push({ body: signoffBody(vals), footer: "Sign-off", extraClass: "" });

  return pages;
}

function finalizeHtml(page, index, total, footerRight) {
  const pad = page.termsPad ? "56px 68px 58px" : "72px 68px 86px";
  const footBottom = page.termsPad ? "22px" : "30px";
  const cls = ("pg " + (page.extraClass || "")).trim();
  let footerHtml = "";
  if (page.footer !== null) {
    footerHtml =
      `<div class="pg-foot" style="left:68px;right:68px;bottom:${footBottom};">` +
      `<span>SNN Sports — Sponsorship Proposal</span>` +
      `<span>Page ${index} of ${total}</span>` +
      `<span>${esc(footerRight)}</span></div>`;
  }
  const body = `<div class="${cls}" style="padding:${pad};">${page.body}${footerHtml}</div>`;
  return pageShell(body);
}

/**
 * vals: the exact `vals` object produced by the browser app's own
 * renderVals() for this proposal (server/compute-vals.js#computeVals).
 * Returns a Buffer containing the finished, multi-page PDF. The page
 * count is never capped: it is purely `pages.length` after real
 * height-based pagination of the unbounded sections.
 */
async function buildProposalPdf(vals, { executablePath } = {}) {
  if (!vals || !vals.preview) {
    throw new Error("computeVals() did not return proposal data (vals.preview missing)");
  }
  const footerRight = vals.preview.footerRight || "Confidential";

  const browser = await chromium.launch(executablePath ? { executablePath } : undefined);
  try {
    const measurePage = await browser.newPage();
    const pages = await buildPages(measurePage, vals);
    await measurePage.close();

    const total = pages.length;
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "snn_pdf_"));
    const pdfPaths = [];
    const renderPage = await browser.newPage();
    for (let i = 0; i < pages.length; i++) {
      const htmlDoc = finalizeHtml(pages[i], i + 1, total, footerRight);
      await renderPage.setContent(htmlDoc);
      await renderPage.waitForTimeout(30);
      const pdfPath = path.join(tmpDir, `page_${String(i + 1).padStart(3, "0")}.pdf`);
      await renderPage.pdf({
        path: pdfPath,
        width: `${PAGE_W}px`,
        height: `${PAGE_H}px`,
        printBackground: true,
        margin: { top: "0px", bottom: "0px", left: "0px", right: "0px" },
      });
      pdfPaths.push(pdfPath);
    }
    await renderPage.close();

    const merged = await PDFDocument.create();
    for (const p of pdfPaths) {
      const bytes = await fs.readFile(p);
      const doc = await PDFDocument.load(bytes);
      const copiedPages = await merged.copyPages(doc, doc.getPageIndices());
      copiedPages.forEach((pg) => merged.addPage(pg));
    }
    const mergedBytes = await merged.save();

    await fs.rm(tmpDir, { recursive: true, force: true });

    return { buffer: Buffer.from(mergedBytes), totalPages: total };
  } finally {
    await browser.close();
  }
}

module.exports = { buildProposalPdf };
