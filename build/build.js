#!/usr/bin/env node
// Builds the static site into ./site.  Usage: node build/build.js [--publish]
// Default is a draft: ribbon on every page, search engines kept out, sample events and trials included,
// placeholders highlighted. --publish drops all of that and stops if any "TBD:" placeholder is left.
const fs = require('fs');
const path = require('path');
const { site, sports, root, PUBLISH, esc, txt, isTbd, todo, photo, mailBtn, mailText, layout } = require('./lib');
const places = require('../data/places');
const sampleEvents = require('../data/events');
const trials = require('../data/trials').filter(t => !(PUBLISH && t.sample));

const out = path.join(root, 'site');
fs.rmSync(out, { recursive: true, force: true });
['assets/css', 'assets/js', 'assets/fonts', 'assets/img/photos', 'assets/img/people'].forEach(d => fs.mkdirSync(path.join(out, d), { recursive: true }));

// ---- assets ----
const copyDir = (from, to) => fs.readdirSync(path.join(root, from)).filter(f => !f.startsWith('.')).forEach(f => fs.copyFileSync(path.join(root, from, f), path.join(out, to, f)));
copyDir('src/fonts', 'assets/fonts');
copyDir('src/img/photos', 'assets/img/photos');
copyDir('src/img/people', 'assets/img/people');
fs.copyFileSync(path.join(root, 'src/img/favicon.svg'), path.join(out, 'assets/img/favicon.svg'));
fs.copyFileSync(path.join(root, 'src/site.css'), path.join(out, 'assets/css/site.css'));
fs.copyFileSync(path.join(root, 'src/site.js'), path.join(out, 'assets/js/site.js'));

const pages = [];
const write = (file, opts) => {
  const depth = file.split('/').length - 1;
  fs.mkdirSync(path.dirname(path.join(out, file)), { recursive: true });
  fs.writeFileSync(path.join(out, file), layout({ depth, current: file, ...opts }));
  if (!opts.noindex) pages.push(file);
};
const up = '';
const list = items => `<ul class="list">${items.map(i => `<li>${txt(i)}</li>`).join('')}</ul>`;
const paras = ps => ps.map(p => `<p>${txt(p)}</p>`).join('');
const pageHead = (eyebrow, h1, lead, extra = '') => `<section class="page-head"><div class="wrap"><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(h1)}</h1>${lead ? `<p class="lead">${txt(lead)}</p>` : ''}${extra}</div></section>`;
const placeholderPhoto = label => `<div class="ph-photo" role="img" aria-label="Photo needed: ${esc(label)}"><span>${txt(`TBD: photo of the ${label}`)}</span></div>`;

// ================= Home =================
const homeCards = [
  ...sports.map(s => ({ href: `${s.slug}.html`, name: s.navName || s.name, text: s.summary, photo: s.photo, alt: s.photoAlt })),
  { href: 'rentals.html', name: 'Arena and pool rentals', text: 'Practice time in the covered arena or the pools, booked online.', photo: 'arena-seesaw', alt: 'A terrier on the seesaw in the covered arena' },
  { href: 'tiny-house.html', name: 'Tiny house', text: 'A place to stay on the farm.', photo: '', alt: '' },
  { href: 'rv-camping.html', name: 'RV and camping', text: 'Hookups and camping for event weekends.', photo: '', alt: '' }
];
const card = c => `<li class="svc"><a href="${c.href}">${c.photo ? photo(up, c.photo, c.alt, { sizes: '(max-width: 560px) 100vw, 360px' }) : `<div class="svc-blank" aria-hidden="true"></div>`}<span class="svc-body"><b>${esc(c.name)}</b><span>${esc(c.text)}</span></span></a></li>`;

write('index.html', {
  title: '',
  desc: `${site.name}: agility, dock diving and swimming, nose work, sheep herding and disc on a 26-acre farm in ${site.town}. Arena and pool rentals, events and trials.`,
  body: `<section class="hero"><div class="wrap hero-grid">
  <div class="hero-copy">
    <p class="eyebrow">${esc(site.town)} · since ${site.founded}</p>
    <h1>Dog sports on a <span>working farm</span></h1>
    <p class="lead">${esc(site.oneLiner)}</p>
    <div class="btn-row"><a class="btn" href="services.html">Explore services</a><a class="btn btn-ghost" href="rentals.html">Rent arena or pool time</a><a class="btn btn-ghost" href="calendar.html">Events calendar</a></div>
  </div>
  <div class="mosaic">
    ${photo(up, 'agility-jump', 'A border collie leaping toward the camera over an agility jump', { eager: true, cls: 'm1', sizes: '(max-width: 760px) 100vw, 40vw' })}
    ${photo(up, 'dock-dive', 'A dog diving off the dock into the pool', { cls: 'm2', sizes: '(max-width: 760px) 50vw, 20vw' })}
    ${photo(up, 'lambs-field', 'Dorper lambs on the farm', { cls: 'm3', sizes: '(max-width: 760px) 50vw, 20vw' })}
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><h2>What we offer</h2><p>Instructors teach five dog sports here, each on their own schedule. Contact them directly from their sport’s page.</p></div>
  <ul class="svc-grid">${homeCards.map(card).join('')}</ul>
</div></section>

<section class="section alt"><div class="wrap split">
  <div>${photo(up, 'fastcat', 'A dog sprinting after the lure on the Fast CAT track', { zoom: true })}</div>
  <div>
    <h2>Trials, Fast CAT and disc days</h2>
    <p>Hog Dog hosts agility trials, Fast CAT runs, disc events and seminars through the year. See what’s coming up, then open an event for times and details.</p>
    <div class="btn-row"><a class="btn" href="calendar.html">See the calendar</a><a class="btn btn-ghost" href="property.html">Tour the property</a></div>
  </div>
</div></section>`
});

// ================= About =================
write('about.html', {
  title: 'About',
  desc: `Who we are: ${site.name}, a dog sports training facility on a 26-acre farm in ${site.town} since ${site.founded}, and a USDAA club since ${site.usdaaSince}.`,
  body: `${pageHead('About us', 'A farm built around dog sports', `${site.name} has been home to agility and other dog sports in ${site.town} since ${site.founded}.`)}
<section class="section"><div class="wrap split">
  <div>
    <h2>The farm story</h2>
    <p>Hog Dog started in ${site.founded} with one goal: to give dog sports a home. Our founder Lee has been running agility since 1994 and earned a NATCH with Luke, a Louisiana Catahoula Leopard Dog, the “hog dog” the farm is named after.</p>
    <p>What began as an agility field became a 26-acre training center: a covered, heated arena, two pools, an open field with a Fast CAT track, and our own flock of sheep. We have been a USDAA club since ${site.usdaaSince}, and we host trials, Fast CAT runs, disc days and seminars through the year.</p>
    <p>${txt('TBD: a few sentences from Amy on today’s Hog Dog: who runs it and what the place feels like.')}</p>
  </div>
  <figure class="fig">${photo(up, 'catahoula', 'A Catahoula Leopard Dog, the breed the farm is named after', { zoom: true })}<figcaption>The Catahoula Leopard Dog: the original hog dog.</figcaption></figure>
</div></section>
<section class="section alt"><div class="wrap">
  <div class="section-head"><h2>What makes it different</h2></div>
  <ul class="values">
    <li><h3>Five sports, one place</h3><p>Agility, dock diving and swimming, nose work, sheep herding and disc, all on one property.</p></li>
    <li><h3>All-weather arena</h3><p>A 160 by 110 foot covered, heated arena with a sand, felt and rubber equine surface.</p></li>
    <li><h3>Real livestock</h3><p>A resident flock of 20 to 40 Dorper sheep for herding lessons and practice.</p></li>
    <li><h3>Independent instructors</h3><p>Experienced instructors who set their own schedules and take students directly.</p></li>
  </ul>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><h2>Get in touch</h2><p>For anything that isn’t a lesson or a booking, email us.</p></div>
  ${mailBtn(up, site.email.info, 'Email us', 'Question from the website')}
</div></section>`
});

// ================= Services =================
write('services.html', {
  title: 'Services',
  desc: `Everything offered at ${site.name}: agility, pool, nose work, sheep herding and disc lessons, arena and pool rentals, the tiny house, and RV and camping.`,
  body: `${pageHead('Services', 'Everything we offer', 'Lessons are run by independent instructors; rentals and stays are booked with us. Pick a service to see details and who to contact.')}
<section class="section"><div class="wrap">
  <h2 class="h-sm">Sports and lessons</h2>
  <ul class="svc-grid">${homeCards.slice(0, sports.length).map(card).join('')}</ul>
  <h2 class="h-sm">Rentals and stays</h2>
  <ul class="svc-grid">${homeCards.slice(sports.length).map(card).join('')}</ul>
</div></section>`
});

// ================= Property =================
const area = a => `<article class="area" id="${a.id}">
  <div class="area-photos">${a.photos.length ? a.photos.map(([p, alt]) => photo(up, p, alt, { zoom: true, sizes: '(max-width: 760px) 50vw, 25vw' })).join('') : placeholderPhoto(a.name.toLowerCase().replace('rv ', 'RV '))}</div>
  <div class="area-text"><h2>${esc(a.name)}</h2><p>${txt(a.text)}</p>${a.link ? `<a class="btn btn-ghost" href="${a.link.href}">${esc(a.link.label)}</a>` : ''}</div>
</article>`;
write('property.html', {
  title: 'The property',
  desc: `Tour ${site.name}: the covered arena, dock diving and swimming pools, grass field and Fast CAT track, tiny house, RV and camping areas, and the farm.`,
  body: `${pageHead('The property', '26 acres in Millersville', 'Tap any photo to see it larger.', `<nav class="jump" aria-label="On this page">${places.areas.map(a => `<a href="#${a.id}">${esc(a.name)}</a>`).join('')}</nav>`)}
<section class="section"><div class="wrap areas">${places.areas.map(area).join('')}</div>
<div class="wrap"><div class="cta-band"><p><b>Want to use the arena or pools?</b> Rentals are booked online.</p><a class="btn" href="rentals.html">View rentals</a></div></div></section>`
});

// ================= Sport pages =================
const initials = n => n.split(/\s+/).map(w => w[0]).join('').slice(0, 2);
function instructorCard(s, i) {
  const c = i.contact;
  const btns = [
    c.email ? mailBtn(up, c.email, `Email ${i.name.split(' ')[0]}`, `${s.name} lessons at Hog Dog`) : '',
    c.phone ? `<a class="btn btn-ghost" href="tel:${esc(c.phone.replace(/[^\d+]/g, ''))}">Call ${esc(c.phone)}</a>` : '',
    c.web ? `<a class="btn btn-ghost" href="${esc(c.web)}">Website</a>` : ''
  ].filter(Boolean);
  const pic = i.photo ? `<img src="assets/img/people/${i.photo}.jpg" alt="${esc(i.name)}" width="160" height="160" loading="lazy">` : `<span class="initials" aria-hidden="true">${esc(initials(i.name))}</span>`;
  return `<li class="person"><div class="person-pic">${pic}</div><div class="person-body"><h3>${esc(i.name)}</h3><p class="role">${esc(i.role)}</p><p>${txt(i.bio)}</p><div class="btn-row">${btns.join('') || txt('TBD: contact details')}</div></div></li>`;
}
sports.forEach(s => write(`${s.slug}.html`, {
  title: s.name,
  desc: `${s.name} at ${site.name} in ${site.town}: ${s.summary.charAt(0).toLowerCase()}${s.summary.slice(1)} Meet the instructors and contact them directly.`,
  body: `<section class="sport-head"><div class="wrap split">
  <div><p class="eyebrow"><a href="services.html">Services</a> / ${esc(s.name)}</p><h1>${esc(s.navName || s.name)}</h1>${paras(s.overview)}
  <div class="btn-row"><a class="btn" href="#instructors">Contact an instructor</a>${s.cta ? `<a class="btn btn-ghost" href="${s.cta.href}">${esc(s.cta.label)}</a>` : ''}</div></div>
  <div>${photo(up, s.photo, s.photoAlt, { zoom: true, eager: true })}</div>
</div></section>
<section class="section alt" id="instructors"><div class="wrap">
  <div class="section-head"><h2>${s.instructors.length === 1 ? 'Your instructor' : 'Instructors'}</h2><p>Instructors run their own classes and schedules. Contact them directly to sign up or ask about lessons.</p></div>
  <ul class="people">${s.instructors.map(i => instructorCard(s, i)).join('')}</ul>
</div></section>`
}));

// ================= Rentals =================
const R = places.rentals;
const acuityBtn = (key, label) => site.acuity[key]
  ? `<a class="btn" href="${esc(site.acuity[key])}">${esc(label)}</a>`
  : `<span class="btn btn-off">${txt(`TBD: Acuity link for ${key} rentals`)}</span>`;
write('rentals.html', {
  title: 'Arena and pool rentals',
  desc: `Rent the covered arena or the dock diving and swimming pools at ${site.name}. Rules, rates, who may rent, and online booking.`,
  body: `${pageHead('Rentals', 'Rent the arena or the pools', 'Practice on your own time in the covered arena or the pools. Read the rules for your space, then book a slot online.', `<nav class="jump" aria-label="On this page"><a href="#who">Who may rent</a><a href="#arena">Arena</a><a href="#pool">Pools</a><a href="#rules">Property rules</a></nav>`)}
<section class="section" id="who"><div class="wrap narrow">
  <h2>Who may rent</h2>
  <p>${txt(R.eligibility)}</p>
  <h3>How booking works</h3>
  <ol class="steps"><li>Check you are eligible and read the rules for the space you want.</li><li>Pick a time in our online scheduler (Acuity).</li><li>You get a confirmation by email. Cancel or change at least 48 hours ahead.</li></ol>
</div></section>
<section class="section alt" id="arena"><div class="wrap split">
  <div>${photo(up, 'arena-ramp', 'The covered arena with the A-frame set out', { zoom: true })}</div>
  <div>
    <h2>Covered arena</h2>
    <p>160 by 110 feet, covered and heated, with a sand, felt and rubber equine surface.</p>
    <h3>Rates</h3><p>${txt(R.arena.rates)}</p>
    <h3>Included</h3>${list(R.arena.included)}
    <h3>Arena rules</h3>${list(R.arena.rules)}
    <div class="btn-row">${acuityBtn('arena', 'Book arena time')}</div>
  </div>
</div></section>
<section class="section" id="pool"><div class="wrap split">
  <div>${photo(up, 'pool-swim', 'A dog swimming in the dock diving pool', { zoom: true })}</div>
  <div>
    <h2>Pools</h2>
    <p>A 41-foot dock diving pool and a 29-foot swimming pool. Open in season, closed in winter.</p>
    <h3>Rates</h3><p>${txt(R.pool.rates)}</p>
    <h3>Pool rules</h3>${list(R.pool.rules)}
    <div class="callout" role="note"><h3>Before you book the pool</h3><p>${txt(R.pool.approval)}</p></div>
    <div class="btn-row">${acuityBtn('pool', 'Book pool time')}</div>
  </div>
</div></section>
<section class="section alt" id="rules"><div class="wrap narrow">
  <h2>Rules for everyone on the property</h2>
  <p>Hog Dog is also a family home and a working farm. These apply to every visit.</p>
  ${list(R.property)}
  <p class="muted">Looking for a place to stay? See the <a href="tiny-house.html">tiny house</a> or <a href="rv-camping.html">RV and camping</a>.</p>
</div></section>`
});

// ================= Tiny house and RV/camping =================
const stayPage = (file, title, h1, d, email, extra) => write(file, {
  title,
  desc: `${title} at ${site.name} in ${site.town}: description, ${extra.toLowerCase()}, rules and how to ask about a stay.`,
  body: `${pageHead('Stay on the farm', h1, d.description)}
<section class="section"><div class="wrap split">
  <div class="gallery">${d.photos.length ? d.photos.map(([p, alt]) => photo(up, p, alt, { zoom: true })).join('') : placeholderPhoto(title.replace('Tiny', 'tiny'))}</div>
  <div>
    <h2>${esc(extra)}</h2>${list(d[extra === 'Amenities' ? 'amenities' : 'hookups'])}
    <h2>House rules</h2>${list(d.rules)}
    <div class="callout"><h3>How to ask</h3><p>Send us an email with your dates, the number of people and dogs${file === 'rv-camping.html' ? ', and your rig length and hookup needs' : ''}. We’ll reply to confirm.</p>
    ${mailBtn(up, email, `Email ${email.split('@')[0]}@ to request a stay`, d.subject)}</div>
  </div>
</div></section>`
});
stayPage('tiny-house.html', 'Tiny house', 'The tiny house', places.tinyHouse, site.email.tinyHouse, 'Amenities');
stayPage('rv-camping.html', 'RV and camping', 'RV and camping', places.camping, site.email.camping, 'Hookups and sites');

// ================= Calendar =================
const cals = site.calendars.filter(c => c.id);
const legend = `<ul class="legend" aria-label="Event types">${site.calendars.map(c => `<li><span class="dot" style="background:${c.color}"></span>${esc(c.type)}</li>`).join('')}</ul>`;
function googleEmbed(mode) {
  const q = new URLSearchParams();
  cals.forEach(c => { q.append('src', c.id); q.append('color', c.color); });
  Object.entries({ ctz: site.timeZone, mode, showTitle: 0, showPrint: 0, showTabs: 0, showCalendars: 0, showTz: 0, wkst: 1 }).forEach(([k, v]) => q.set(k, v));
  return `https://calendar.google.com/calendar/embed?${q}`;
}
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dparse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)); };
const dfmt = d => `${DOW[d.getUTCDay()]} ${MONTHS[d.getUTCMonth()].slice(0, 3)} ${d.getUTCDate()}`;
function sampleList() {
  const byMonth = {};
  sampleEvents.forEach(e => { const d = dparse(e.date); (byMonth[`${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`] ??= []).push({ ...e, d }); });
  const color = t => (site.calendars.find(c => c.type === t) || { color: '#666' }).color;
  return Object.entries(byMonth).map(([m, evs]) => `<section class="month"><h2>${m}</h2><ul class="events">${evs.map(e => `<li><details class="event" style="--type:${color(e.type)}"><summary><span class="ev-date">${dfmt(e.d)}${e.end ? `–${dparse(e.end).getUTCDate()}` : ''}</span><span class="ev-title">${esc(e.title)}</span><span class="ev-type">${esc(e.type)}</span></summary><div class="ev-body"><p><b>${esc(e.time)}</b></p><p>${esc(e.text)}</p>${e.link ? `<p><a href="${esc(e.link)}">Trial details</a></p>` : ''}</div></details></li>`).join('')}</ul></section>`).join('');
}
write('calendar.html', {
  title: 'Events calendar',
  desc: `Upcoming trials, Fast CAT runs, disc days, classes and seminars at ${site.name} in ${site.town}.`,
  body: `${pageHead('Calendar', 'Events at Hog Dog', 'Trials, Fast CAT, disc days, classes and seminars. Open an event for its time and details. Rentals and private bookings are never shown here.', legend)}
<section class="section"><div class="wrap">
${cals.length ? `<div class="gcal"><iframe class="gcal-month" src="${esc(googleEmbed('MONTH'))}" title="Hog Dog events, month view" loading="lazy"></iframe><iframe class="gcal-list" src="${esc(googleEmbed('AGENDA'))}" title="Hog Dog events, list view" loading="lazy"></iframe></div>`
    : PUBLISH ? `<p>${txt('TBD: connect the Google Calendar ids in data/site.js')}</p>`
      : `<div class="callout"><p><b>Sample events.</b> This list shows the layout only. Once the events-only Google Calendars are set up and their ids added in <code>data/site.js</code>, the live calendar replaces it: a month grid on computers and a scrolling list on phones.</p></div>${sampleList()}`}
</div></section>`
});

// ================= Contact =================
const routes = [
  ['Lessons and classes', 'Contact the instructor directly from their sport’s page.', `<a class="btn btn-ghost" href="services.html">Find an instructor</a>`],
  ['Arena and pool rentals', 'Book online in our scheduler.', `<a class="btn btn-ghost" href="rentals.html">Rentals</a>`],
  ['RV and camping', mailText(site.email.camping), mailBtn(up, site.email.camping, 'Email camping@', 'RV and camping request', 'btn btn-ghost')],
  ['Tiny house', mailText(site.email.tinyHouse), mailBtn(up, site.email.tinyHouse, 'Email about the tiny house', 'Tiny house request', 'btn btn-ghost')],
  ['Everything else', mailText(site.email.info), mailBtn(up, site.email.info, 'Email info@', 'Question from the website', 'btn btn-ghost')]
];
const a = site.address;
write('contact.html', {
  title: 'Contact',
  desc: `How to reach ${site.name}: which email address to use for what, plus booking and instructor contacts.`,
  body: `${pageHead('Contact', 'Get in touch', 'We answer by email. Pick the right route below so your message reaches the person who can help.')}
<section class="section"><div class="wrap narrow">
  <div class="primary-mail"><h2>General questions</h2><p class="big">${mailText(site.email.info)}</p>${mailBtn(up, site.email.info, 'Email us', 'Question from the website')}</div>
  <h2>Which address for what</h2>
  <ul class="routes">${routes.map(([h, d, b]) => `<li><div><h3>${h}</h3><p>${d}</p></div>${b}</li>`).join('')}</ul>
  <h2>Visiting</h2>
  <p>${esc(a.street)}, ${esc(a.city)}, ${esc(a.state)} ${esc(a.zip)}. Hog Dog is open only for classes, rentals and events, so please come at your scheduled time. The property is also a family home.</p>
  <p><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street}, ${a.city}, ${a.state} ${a.zip}`)}">Open in Google Maps</a> · <a href="${esc(site.facebook)}">Hog Dog on Facebook</a></p>
</div></section>`
});

// ================= 404 =================
write('404.html', { title: 'Page not found', desc: 'This page does not exist.', noindex: true, body: `${pageHead('404', 'Page not found', 'That page has moved or never existed.')}<section class="section"><div class="wrap"><a class="btn" href="/">Go to the home page</a></div></section>` });

// ================= Private trial pages =================
const section = (t, s) => {
  const body = s.type === 'text' ? paras(s.paragraphs)
    : s.type === 'list' ? list(s.items)
      : s.type === 'links' ? `<ul class="list">${s.items.map(([l, h]) => `<li><a href="${esc(h)}">${esc(l)}</a></li>`).join('')}</ul>`
        : `<ul class="files">${s.items.map(([l, f]) => `<li><a href="${esc(f)}" download>${esc(l)}</a></li>`).join('')}</ul>`;
  return `<section class="trial-sec"><h2>${esc(s.heading)}</h2>${body}</section>`;
};
const trialLinks = [];
trials.forEach(t => {
  if (!/^[a-z0-9-]+-[a-z0-9]{4,}$/.test(t.slug)) throw new Error(`Trial slug "${t.slug}" needs a random ending like -x7k2 so the link can't be guessed`);
  write(`trials/${t.slug}/index.html`, {
    title: t.title, noindex: true,
    desc: `${t.title}, ${t.dates}.`,
    body: `${pageHead(`Trial information · ${t.host}`, t.title, t.dates)}
<section class="section"><div class="wrap narrow">${t.sections.map(s => section(t, s)).join('')}
<p class="muted small">This page is shared by link only. Questions about the trial: ${mailBtn('../../', site.email.info, 'email info@', `${t.title} question`, 'inline-mail')}.</p></div></section>`
  });
  const dir = path.join(root, 'files/trials', t.slug);
  if (fs.existsSync(dir)) fs.readdirSync(dir).filter(f => !f.startsWith('.')).forEach(f => fs.copyFileSync(path.join(dir, f), path.join(out, 'trials', t.slug, f)));
  trialLinks.push(`  /trials/${t.slug}/${t.password ? `  (password: secret TRIAL_${t.slug.toUpperCase().replace(/[^A-Z0-9]/g, '_')})` : ''}`);
});

// ---- robots and sitemap (trial pages are never listed) ----
const base = `https://${site.domain}/`;
fs.writeFileSync(path.join(out, 'robots.txt'), PUBLISH ? `User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `  <url><loc>${base}${p === 'index.html' ? '' : p}</loc></url>`).join('\n')}\n</urlset>\n`);

// ---- checks ----
const html = fs.readdirSync(out, { recursive: true }).filter(f => f.endsWith('.html'));
for (const f of html) {
  const src = fs.readFileSync(path.join(out, f), 'utf8');
  if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(src.replace(/<script[\s\S]*?<\/script>/g, ''))) throw new Error(`${f} contains a plain email address (N-09)`);
  if (!f.startsWith('trials/') && trials.some(t => src.includes(`trials/${t.slug}`)) && !(f === 'calendar.html' && !PUBLISH)) throw new Error(`${f} links to a private trial page (F-51)`);
}
console.log(`Built ${html.length} pages into site/ (${PUBLISH ? 'PUBLISH' : 'draft'})`);
if (trialLinks.length) console.log('Private trial pages (share these links directly):\n' + trialLinks.join('\n'));
if (todo.size) {
  console.log(`\n${todo.size} placeholders still need content:\n` + [...todo].map(s => '  - ' + s.slice(4).trim()).join('\n'));
  if (PUBLISH) { console.error('\nPublish build stopped: fill in the placeholders above first.'); process.exit(1); }
}
