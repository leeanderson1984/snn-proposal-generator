# SNN Sports Sponsorship Proposal Generator

A standalone app (not a Claude artifact) that builds sponsorship proposals
and saves them as a real PDF that downloads straight to your computer.

## Quickstart

You need [Node.js](https://nodejs.org) installed (any recent version, 18+).
Open a terminal in this folder and run:

```
npm install
npm start
```

The first `npm install` also downloads the PDF-rendering browser
(Chromium) that runs in the background — this only happens once and can
take a minute or two.

Then open **http://localhost:4173** in your normal browser (Chrome,
Edge, Safari, etc.). That's the app. Leave the terminal window open while
you're using it — closing it stops the app.

To stop the app, go back to the terminal and press `Ctrl+C`.

## How it works

- **Builder tab** — fill in client details, objectives, deliverables,
  commercial terms, stats, etc. Everything saves automatically to your
  browser's local storage as you go (nothing is sent anywhere unless you
  click Save as PDF).
- **Preview tab** — see the full proposal laid out with SNN Sports
  branding.
- **Save as PDF** — sends the proposal to a small local PDF-rendering
  service (running on your own machine, started by `npm start`), which
  builds a real `.pdf` file and hands it back to your browser, which
  downloads it normally — same as downloading any file from any website.
  The file lands in your browser's normal Downloads folder, named
  `SNN Sports - [Client Name] - Sponsorship Proposal.pdf`.

The PDF is generated dynamically: however many pages the content needs —
10, 20, 30 — that's how many pages the PDF has. There's no page limit and
no blank filler pages.

Note: because the on-screen Preview tab shows every section as one
continuous scrollable page each, while the downloaded PDF applies real
print pagination (splitting any section whose content overflows a page
onto a continuation page), a long proposal's PDF can have more physical
pages than the Preview tab shows on screen. The content itself — every
field, every deliverable, every line of terms — is identical between the
two; only how it's chunked into pages differs. This is the same behaviour
the original Claude-artifact version had.

## Where your data lives

Proposals are stored in your browser's local storage on whichever
computer/browser you're using. They are **not** synced anywhere. If you
want to keep proposals long-term or share them across computers, use the
Save/Duplicate controls to export what you need, or ask about adding a
proper shared database later.

## Files

- `public/` — the browser-side app (HTML/CSS/JS). This is what your
  browser loads.
- `server/` — the small local Node.js/Express service that generates
  PDFs using Playwright (a headless browser) and pdf-lib.
- `raw_markup.html` / `raw_style.css` / `compile_template.py` — the
  source template and compiler used to generate `compiled_render.js`.
  If you (or a future Claude session) need to change the builder/preview
  UI, edit `raw_markup.html` (and `raw_style.css` for styling) and then
  run `python3 compile_template.py raw_markup.html compiled_render.js`
  to regenerate the compiled file — don't hand-edit `compiled_render.js`
  directly, it's generated output.
- `business-logic.js` — all the app's logic: client fields, objectives,
  deliverables, commercial calculations, stats, terms, CRM prospect
  search, and PDF-request handling. Used both in the browser (for the
  Preview tab) and on the server (to compute the exact same data for the
  PDF), so the two can never drift apart.
- `e2e_test.js` / `e2e_test_bc.js` — automated browser tests that open
  the app, click through Preview and Save as PDF, and verify a real file
  downloads. Run with `node e2e_test.js` (server must already be running
  via `npm start` in another terminal).

## Tested

This build was verified with a real, automated browser (not just code
review): it opens the running app, clicks "Preview", clicks "Save as
PDF", and captures the actual browser download event.

- Normal proposal: real PDF downloaded, 10 pages, opened and verified.
- Long proposal (15 deliverables, 9 objectives, long terms & conditions):
  real PDF downloaded, **20 pages**, all content present, no page cap.
- Minimal/empty proposal: real PDF downloaded, 10 pages (the fixed
  cover/about/audience/etc. sections), no extra blank pages.
