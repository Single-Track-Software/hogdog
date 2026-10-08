// Shared helpers for the site generator: escaping, placeholders, photos, email buttons and the page layout.
const fs = require('fs');
const path = require('path');
const site = require('../data/site');
const sports = require('../data/sports');

const root = path.join(__dirname, '..');
const PUBLISH = process.argv.includes('--publish');

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---- placeholders ----
// Any text starting with "TBD:" renders as a highlighted placeholder in the draft. A --publish build stops and
// lists them all, so nothing unfinished goes live.
const todo = new Set();
const isTbd = s => typeof s === 'string' && s.startsWith('TBD:');
function txt(s) {
  if (!isTbd(s)) return esc(s);
  todo.add(s);
  return `<mark class="tbd">${esc(s.slice(4).trim())}</mark>`;
}

// ---- photos ----
// Reads a JPEG's size from its header so every <img> carries width and height (no layout shift).
function jpegSize(file) {
  const b = fs.readFileSync(file);
  for (let i = 2; i < b.length;) {
    const marker = b[i + 1], len = b.readUInt16BE(i + 2);
    if (marker >= 0xC0 && marker <= 0xCF && ![0xC4, 0xC8, 0xCC].includes(marker)) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  throw new Error(`Can't read size of ${file}`);
}
const sizeCache = {};
const sizeOf = rel => (sizeCache[rel] ??= jpegSize(path.join(root, 'src/img', rel)));

// A photo from src/img/photos. Shows the -sm version; `zoom` wraps it in a link to the large one (F-06).
function photo(up, name, alt, { zoom = false, cls = '', eager = false, sizes = '(max-width: 760px) 100vw, 50vw' } = {}) {
  const sm = `photos/${name}-sm.jpg`, lg = `photos/${name}.jpg`;
  const s = sizeOf(sm), l = sizeOf(lg);
  const srcset = l.w > s.w ? ` srcset="${up}assets/img/${sm} ${s.w}w, ${up}assets/img/${lg} ${l.w}w"` : '';
  const img = `<img class="${cls}" src="${up}assets/img/${sm}"${srcset} sizes="${sizes}" width="${s.w}" height="${s.h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
  return zoom ? `<a class="zoom" href="${up}assets/img/${lg}" data-caption="${esc(alt)}">${img}</a>` : img;
}

// ---- email buttons (N-09) ----
// The address is stored base64-encoded in a data attribute and decoded by site.js, so the page source never holds
// a plain address for scrapers. Without JavaScript the button goes to the Contact page instead.
const rev = s => Buffer.from(s).toString('base64');
function mailBtn(up, address, label, subject = '', cls = 'btn') {
  if (isTbd(address)) return `<span class="${cls} btn-off">${txt(address)}</span>`;
  return `<a class="${cls}" href="${up}contact.html" data-m="${esc(rev(address))}"${subject ? ` data-s="${esc(subject)}"` : ''}>${esc(label)}</a>`;
}
// The address itself as text, also assembled in the browser. Fallback reads "info at hogdogproductions dot net".
const mailText = address => `<span class="addr" data-m="${esc(rev(address))}">${esc(address.replace('@', ' at ').replace(/\./g, ' dot '))}</span>`;

// ---- layout ----
const NAV = [
  { label: 'Services', href: 'services.html', items: [['services.html', 'All services'], ...sports.map(s => [`${s.slug}.html`, s.navName || s.name])] },
  { label: 'Property', href: 'property.html' },
  { label: 'Rentals', href: 'rentals.html', items: [['rentals.html', 'Arena and pool'], ['tiny-house.html', 'Tiny house'], ['rv-camping.html', 'RV and camping']] },
  { label: 'Calendar', href: 'calendar.html' },
  { label: 'About', href: 'about.html' },
  { label: 'Contact', href: 'contact.html' }
];

const LOGO = `<svg class="mark" viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="12" fill="currentColor"/><g fill="var(--mark-spot)"><ellipse cx="14" cy="15" rx="5" ry="4"/><ellipse cx="34" cy="13" rx="3.5" ry="3"/><ellipse cx="37" cy="33" rx="5" ry="4.2"/><ellipse cx="12" cy="35" rx="3" ry="2.6"/></g><text x="24" y="30.5" text-anchor="middle" font-family="Archivo, Arial, sans-serif" font-weight="900" font-size="17" fill="var(--mark-ink)">HD</text></svg>`;

function nav(up, current) {
  return NAV.map(n => {
    const here = n.href === current || (n.items || []).some(([f]) => f === current);
    if (!n.items) return `<li><a href="${up}${n.href}"${here ? ' aria-current="page"' : ''}>${n.label}</a></li>`;
    return `<li><details class="sub"><summary${here ? ' class="here"' : ''}>${n.label}</summary><ul>${n.items.map(([f, l]) => `<li><a href="${up}${f}"${f === current ? ' aria-current="page"' : ''}>${esc(l)}</a></li>`).join('')}</ul></details></li>`;
  }).join('');
}

// `noindex` is set for trial pages (and for everything in a draft build).
function layout({ title, desc, body, depth = 0, current = '', noindex = false }) {
  const up = '../'.repeat(depth);
  const pageTitle = title ? `${title} · ${site.name}` : `${site.name} · Dog sports in ${site.town}`;
  if (!desc) throw new Error(`Page "${title}" needs a description (N-07)`);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(desc)}">
${noindex || !PUBLISH ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<link rel="icon" href="${up}assets/img/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#1E3D26">
<link rel="preload" href="${up}assets/fonts/archivo-latin-wdth-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${up}assets/css/site.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${PUBLISH ? '' : '<div class="ribbon" role="note">Draft for review · yellow text marks content still needed</div>\n'}<header class="site-head">
  <div class="wrap">
    <a class="brand" href="${up}index.html" aria-label="${esc(site.name)}, home">${LOGO}<span class="wordmark">Hog Dog<small>Productions</small></span></a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav" hidden>Menu</button>
    <nav id="nav" class="nav" aria-label="Main"><ul>${nav(up, current)}</ul></nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-foot">
  <div class="wrap">
    <div class="foot-brand">${LOGO}<p><b>${esc(site.name)}</b><br>${esc(site.town)} · since ${site.founded}</p></div>
    <div class="foot-mail"><p>Questions? Email us.</p>${mailBtn(up, site.email.info, 'Email info@', 'Question from the website', 'btn btn-light')}</div>
    <p class="foot-links"><a href="${up}contact.html">Contact</a> · <a href="${up}calendar.html">Calendar</a> · <a href="${esc(site.facebook)}">Facebook</a></p>
  </div>
</footer>
<dialog class="lightbox" aria-label="Photo"><form method="dialog"><button class="lb-close" aria-label="Close photo">×</button></form><img alt=""><p class="lb-cap"></p></dialog>
<script src="${up}assets/js/site.js"></script>
</body>
</html>
`;
}

module.exports = { site, sports, root, PUBLISH, esc, txt, isTbd, todo, photo, sizeOf, mailBtn, mailText, layout, NAV };
