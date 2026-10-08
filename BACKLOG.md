# Backlog

Open work for the Hog Dog site. Move items to Done with the date when finished.

## Decision needed first: how staff edit the site
The requirements make staff editing a **Must**: F-15 (instructor cards), F-52 (trial page from a template in under 15 minutes), F-60 (text and photos), with F-61 preview as a Should. This draft is edited through files in `data/`, which meets none of them for non-technical staff. Options:
1. **Git-backed CMS (Sveltia or Decap CMS)** on top of this repo: a web editor at `/admin` with forms for instructors, trials and pages; saves commit to GitHub and Cloudflare redeploys. Free, no database, keeps this build. Needs GitHub logins for editors.
2. **PFWC-style admin** in the Worker with Cloudflare D1/R2: custom forms we build and maintain.
3. **Hosted builder** (Squarespace, Wix): meets editing and backups out of the box, but we'd rebuild the design there and pay a subscription.
Recommendation: option 1 once the content settles. It also covers N-03/N-04 (no plugins; Git history is the backup).

## Open decisions from the spec (defaults used in this draft)
- Tiny house inquiries: Acuity, camping@ or info@? **Draft uses info@.**
- Instructor contact: email only, or phone too? **Draft shows email (or website) as published on the old site; no phones.** Every instructor must approve their card.
- Public calendar event types: **draft legend uses Trials, Fast CAT and lure coursing, Disc, Classes and seminars.** The earlier draft said trials, Fast CAT and disc only; drop "Classes and seminars" if that holds.
- Pool approval or waiver wording (after attorney review): placeholder above the pool booking button (F-22).
- Who may rent: old site says members only; placeholder on Rentals.
- Trial passwords: built (optional per trial, F-54); off unless a secret is set.
- Brand: no logo or colors from Hog Dog yet. Draft uses a placeholder "HD" mark, pasture green and barn orange.
- Business name styling: old site uses "Hog Dog Productions"; the spec writes "HogDog". Draft uses "Hog Dog".

## Content needed (the build prints the full list)
- Tiny house and RV/camping: descriptions, amenities, hookups, rules, photos (nothing on the old site).
- Arena rental rates; Acuity links for arena and pool.
- Christine Tschech's own email (old site shows Cynthia's); Karen Chandler bio and photo; Debi Hutchison headshot.
- Disc: instructors or club contacts (old site only links MAD Dogs).
- A wide photo of the property for the home page and Property page; current photos generally (old-site photos are 2021).
- Confirm old-site facts: pool rates ($40/$33 per 30 min), herding rates ($70 lesson, $15 practice), herding schedule, instructor schedules, street address on Contact, founder story on About.

## Before launch
- Google Calendar ids (one public calendar per event type).
- Map old WordPress URLs to new pages (N-11), e.g. `/sports/` → `/services.html`, `/facilities/` → `/property.html`, `/rules/` → `/rentals.html#rules`, `/events/` → `/calendar.html`, `/contact/` → `/contact.html`.
- Google Business Profile link (N-08); accessibility scan (N-05); domain and Cloudflare under Hog Dog accounts (N-10).

## Done
- 2026-10-08: First draft. 14 public pages, sample trial page, Worker with trial and draft passwords, scraper-safe email buttons, lightbox, sitemap without trial pages, publish build that blocks on placeholders.
