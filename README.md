# Hog Dog Productions — site (draft)

A static site built with Node and served by a Cloudflare Worker. Same approach as the Lower Bucks MTB and PFWC sites. Requirements live in the two Word docs in this folder (Design Spec v1 and Requirements Document v1, Oct 8 2026); requirement IDs (F-xx, N-xx) are referenced in code comments.

## What's here
- **Public pages (14)**: Home, About, Services, Property, five sport pages (Agility, Pool, Nose Work, Sheep Herding, Disc), Rentals (arena and pool), Tiny House, RV and Camping, Calendar, Contact.
- **Private trial pages**: `/trials/<slug>/`, link only. Never in the menu, footer, sitemap or any public page; marked no-index in the page and by the Worker. Optional shared password per trial.
- **Booking routes**: arena and pool go to Acuity; RV and camping to camping@; tiny house to info@ (default until decided); lessons to each instructor's card; everything else to info@. No forms, no payments, no logins.

## Run it locally
- `npm run build`, then `npm start`: http://localhost:8080. Or open `site/index.html` directly.
- `npm run dev`: through the Worker (trial passwords, headers) at http://127.0.0.1:8787. Put test secrets in `.dev.vars` (ignored by Git).

## Draft vs publish
- `npm run build` makes a **draft**: yellow ribbon, search engines kept out, sample events and the sample trial included, and every missing item shown as a yellow **Needed:** highlight. The build prints the list of what's still needed.
- `npm run publish` builds the launch version and **refuses to finish while any placeholder is left**.

## Change things
Edit a file in `data/`, then `npm run build`. Text that starts with `TBD:` is a placeholder.
- Business facts, the three email addresses, Acuity links, Google Calendar ids: `data/site.js`.
- Sport overviews and instructor cards: `data/sports.js`.
- Property areas, rental rules and rates, tiny house, RV and camping: `data/places.js`.
- Trial pages: `data/trials.js` (instructions at the top); PDFs go in `files/trials/<slug>/`.
- Photos: `src/img/photos/<name>.jpg` (up to 1600 px) plus `<name>-sm.jpg` (720 px). Instructor headshots: `src/img/people/`. Originals from the old site are in `photos-source/` (ignored by Git).
- Layout: `build/lib.js` (page shell, nav) and `build/build.js` (pages). Style: `src/site.css`. Behavior: `src/site.js`.

## Email addresses
Addresses are never written in the page source (N-09). They are stored base64-encoded and turned into mail links in the browser; the build fails if a plain address slips into any page.

## Calendar
Make one public, events-only Google Calendar per event type (Trials, Fast CAT, Disc, Classes and seminars) in Hog Dog's Workspace, and paste each Calendar ID into `data/site.js` → `calendars`. Each gets its own color in the embed. Phones get the list view, computers the month grid. Rentals live in Acuity and can never appear here. Until ids are set, the draft shows sample events.

## Passwords (Cloudflare secrets; any username works)
- `DRAFT_PASSWORD`: while set, the whole site asks for it. Use while Amy reviews; delete at launch.
- `TRIAL_<SLUG>`: protects one trial page and its files, e.g. `TRIAL_FALL_USDAA_2026_X7K2`. Without it the trial is link-only.
- `npx wrangler secret put <NAME>`, or Cloudflare dashboard → Workers & Pages → `hogdogsite` → Settings → Variables and Secrets.

## Deploy (Cloudflare Workers Builds)
Build command `npm run build` (draft) or `npm run publish` (launch); deploy command `npx wrangler deploy`. At launch, attach hogdogproductions.net as a custom domain under Hog Dog's own Cloudflare account (N-10), and add redirects for old WordPress addresses (N-11). See `BACKLOG.md` for open decisions.
