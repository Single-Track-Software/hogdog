// Core facts for the Hog Dog Productions site. Every page is rebuilt from this file.
// Text that starts with "TBD:" shows as a yellow placeholder in the draft and blocks a `--publish` build.
// Facts marked "old site" came from hogdogproductions.net (Oct 2026) and need Amy to confirm.

module.exports = {
  name: 'Hog Dog Productions',
  short: 'Hog Dog',
  tagline: 'A canine sport academy on a working farm in Millersville, Maryland',
  // One or two sentences for the home page (F-01).
  oneLiner: 'Hog Dog Productions is a dog sports training facility on a 26-acre farm in Millersville, Maryland, just south of BWI. Instructors teach agility, dock diving and swimming, nose work, sheep herding and disc here, and the arena and pools are available to rent.',
  founded: 2002,
  usdaaSince: 2007,
  town: 'Millersville, Maryland',
  // Shown on the Contact page only. Confirm Amy wants the street address public (it is on the old site).
  address: { street: '470 Ski Lane', city: 'Millersville', state: 'MD', zip: '21108' },
  facebook: 'https://www.facebook.com/HogDogProductions',
  domain: 'hogdogproductions.net',

  // The three request routes (design spec, "Booking and contact routing"). No other inboxes appear on the site.
  email: {
    info: 'info@hogdogproductions.net',
    camping: 'camping@hogdogproductions.net',
    // Open decision: tiny house inquiries go to Acuity, camping@ or info@. Requirements default: info@.
    tinyHouse: 'info@hogdogproductions.net'
  },

  // Acuity scheduling links for rentals (F-21). Paste the real links from Acuity; leave '' to show a placeholder.
  acuity: {
    arena: '',
    pool: ''
  },

  // Public events calendar (F-40 to F-46). Google Calendar ids, one calendar per event type so each gets its own
  // color in the embed. Find an id in Google Calendar: Settings, the calendar, "Integrate calendar", Calendar ID.
  // Every calendar must be made public ("Make available to public"). While all ids are empty the page shows the
  // sample events in data/events.js instead, so the layout can be reviewed.
  timeZone: 'America/New_York',
  calendars: [
    { type: 'Trials', id: '', color: '#B5401B' },
    { type: 'Fast CAT and lure coursing', id: '', color: '#2E6B4A' },
    { type: 'Disc', id: '', color: '#2A5C8F' },
    { type: 'Classes and seminars', id: '', color: '#7A5A10' }
  ]
};
