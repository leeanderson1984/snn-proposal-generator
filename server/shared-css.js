// Ported from pdfgen/shared_css.py (same values, unchanged) — the CSS used
// to render each print page. Kept as its own module so the print layout
// stays a single, easy-to-audit source of truth, independent of the
// builder app's own styles.css.

const SHARED_CSS = `
  :root{
    --snn-blue:#28428c; --snn-blue-dark:#1b2f63; --snn-blue-tint:#eef1f9;
    --ink:#181a1f; --ink-soft:#565c6b; --ink-faint:#8a90a0;
    --line:#e2e5ee;
    --st-won-fg:#157347; --st-won-bg:#e6f6ed;
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;background:#ffffff;}
  body{font-family:'Manrope',ui-sans-serif,system-ui,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased;}
  h1,h2,h3{font-family:'Space Grotesk',ui-sans-serif,system-ui,sans-serif;font-weight:600;margin:0;letter-spacing:-0.01em;}
  p{margin:0;}
  .icon{width:14px;height:14px;flex-shrink:0;}

  .pg{width:794px;height:1123px;overflow:hidden;background:#fff;position:relative;padding:72px 68px 86px;display:flex;flex-direction:column;}
  .pg-foot{position:absolute;left:68px;right:68px;bottom:30px;display:flex;justify-content:space-between;font-size:10px;color:var(--ink-faint);border-top:1px solid var(--line);padding-top:10px;letter-spacing:0.02em;}
  .pg-kicker{font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:var(--snn-blue);margin-bottom:10px;}
  .pg h2.pg-title{font-size:28px;margin-bottom:26px;padding-bottom:18px;border-bottom:2px solid var(--line);position:relative;}
  .pg h2.pg-title::after{content:"";position:absolute;left:0;bottom:-2px;width:56px;height:2px;background:var(--snn-blue);}
  .pg h2.pg-title.compact{font-size:20px;margin-bottom:14px;padding-bottom:10px;}

  .pg-cover{color:#fff;background:linear-gradient(180deg,var(--snn-blue) 0%,var(--snn-blue-dark) 100%);justify-content:space-between;}
  .pg-cover .cover-top{display:flex;justify-content:space-between;align-items:flex-start;}
  .cover-snn-mark{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;letter-spacing:0.02em;background:rgba(255,255,255,0.14);padding:8px 14px;border-radius:8px;}
  .cover-kicker{font-size:12.5px;letter-spacing:0.16em;text-transform:uppercase;color:#c7d1ec;margin-bottom:18px;}
  .cover-title{font-size:40px;line-height:1.12;max-width:560px;}
  .cover-campaign{margin-top:26px;font-size:17px;color:#e6ebfa;}
  .cover-client-row{display:flex;align-items:center;gap:16px;margin-top:44px;}
  .cover-client-logo{width:84px;height:84px;background:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;}
  .cover-client-logo img{max-width:100%;max-height:100%;object-fit:contain;}
  .cover-client-name{font-size:22px;font-weight:700;font-family:'Space Grotesk',sans-serif;}
  .cover-bottom{display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid rgba(255,255,255,0.25);padding-top:22px;}
  .cover-prepared-label{font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#aebbdf;margin-bottom:6px;}
  .cover-prepared-name{font-size:15px;font-weight:700;}
  .cover-prepared-sub{font-size:12.5px;color:#cbd4ef;margin-top:2px;}
  .cover-date{font-size:12.5px;color:#cbd4ef;text-align:right;}

  .about-copy{font-size:14.5px;line-height:1.75;color:var(--ink-soft);}
  .about-copy p + p{margin-top:14px;}
  .about-entity{margin-top:30px;font-size:11.5px;color:var(--ink-faint);border-top:1px solid var(--line);padding-top:14px;}

  .stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:4px;}
  .stat-tile{border:1px solid var(--line);border-left:3px solid var(--snn-blue);border-radius:12px;padding:20px 22px;background:#fbfbfd;}
  .stat-num{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:32px;color:var(--snn-blue);line-height:1.1;}
  .stat-label{font-size:12.5px;color:var(--ink-soft);margin-top:6px;font-weight:600;}
  .stat-sub{font-size:11.5px;color:var(--ink-faint);margin-top:3px;}

  .opp-para{font-size:14px;line-height:1.75;color:var(--ink-soft);}
  .opp-para + .opp-para{margin-top:14px;}
  .opp-tags{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:22px;}
  .opp-tag{font-size:11.5px;font-weight:700;color:var(--snn-blue-dark);background:var(--snn-blue-tint);border-radius:999px;padding:5px 12px;}

  .pdeliv{border:1px solid var(--line);border-radius:12px;padding:16px 18px;background:#fbfbfd;}
  .pdeliv + .pdeliv{margin-top:12px;}
  .pdeliv-name{font-size:14.5px;font-weight:700;}
  .pdeliv-meta{font-size:11.5px;color:var(--snn-blue-dark);background:var(--snn-blue-tint);display:inline-block;border-radius:999px;padding:3px 10px;margin-top:6px;font-weight:700;}
  .pdeliv-desc{font-size:13px;color:var(--ink-soft);margin-top:9px;line-height:1.6;}
  .pdeliv-notes{font-size:12px;color:var(--ink-faint);margin-top:7px;font-style:italic;}
  .empty-state{border:1.5px dashed var(--line);border-radius:12px;padding:36px 20px;text-align:center;color:var(--ink-faint);font-size:13.5px;}

  .inv-line{display:flex;justify-content:space-between;padding:11px 0;font-size:14px;color:var(--ink-soft);border-bottom:1px solid var(--line);}
  .inv-line .val{font-family:'Space Grotesk',sans-serif;font-weight:600;color:var(--ink);}
  .inv-line.emph{font-size:19px;font-weight:700;padding-top:16px;border-bottom:none;color:var(--snn-blue-dark);}
  .inv-line.emph .val{color:var(--snn-blue-dark);}
  .inv-note{font-size:12px;color:var(--ink-faint);margin-top:16px;line-height:1.6;}

  .why-list{display:flex;flex-direction:column;gap:14px;}
  .why-item{display:flex;gap:13px;align-items:flex-start;}
  .why-check{width:22px;height:22px;border-radius:999px;background:var(--snn-blue-tint);color:var(--snn-blue);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
  .why-text{font-size:14px;color:var(--ink-soft);line-height:1.6;padding-top:1px;}

  .next-copy{font-size:15px;line-height:1.75;color:var(--ink-soft);background:#fbfbfd;border:1px solid var(--line);border-radius:12px;padding:22px;}
  .contact-card{margin-top:30px;border-top:2px solid var(--snn-blue);padding-top:22px;}
  .contact-name{font-size:19px;font-weight:700;font-family:'Space Grotesk',sans-serif;}
  .contact-role{font-size:13px;color:var(--ink-soft);margin-top:2px;}
  .contact-links{margin-top:12px;display:flex;flex-direction:column;gap:4px;font-size:13.5px;color:var(--snn-blue);font-weight:600;}

  .terms-clause{font-size:12px;line-height:1.55;color:var(--ink-soft);white-space:pre-line;}
  .terms-clause + .terms-clause{margin-top:14px;}

  .sig-block{border:1px solid var(--line);border-radius:12px;padding:22px;background:#fbfbfd;}
  .sig-block + .sig-block{margin-top:16px;}
  .sig-role{font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--ink-faint);font-weight:700;margin-bottom:10px;}
  .sig-script{font-family:'Caveat',cursive;font-size:42px;line-height:1;color:var(--ink);min-height:52px;border-bottom:1.5px solid var(--line);padding-bottom:8px;}
  .sig-script.empty{color:var(--ink-faint);font-family:'Manrope',sans-serif;font-size:13px;font-style:italic;border-bottom-style:dashed;}
  .sig-meta{display:flex;justify-content:space-between;margin-top:10px;font-size:12px;color:var(--ink-soft);}
  .sig-disclaimer{font-size:10.5px;color:var(--ink-faint);margin-top:24px;line-height:1.6;border-top:1px solid var(--line);padding-top:12px;}
  .accept-banner{display:inline-flex;align-items:center;gap:7px;font-size:11.5px;font-weight:700;border-radius:999px;padding:5px 12px;margin-bottom:16px;}
  .accept-banner.yes{color:var(--st-won-fg);background:var(--st-won-bg);}
  .accept-banner.no{color:var(--ink-faint);background:#eceef3;}

  /* measurement helper */
  .measure-block{width:658px;}
`.trim();

const FONT_LINK =
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap">';

function pageShell(bodyHtml) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
${FONT_LINK}
<style>${SHARED_CSS}</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

module.exports = { SHARED_CSS, FONT_LINK, pageShell };
