// SAMPLE events, shown on the Calendar page only while no Google Calendar ids are set in data/site.js.
// They exist so the page layout can be reviewed. Real events are added in Google Calendar, never here.
// `type` must match a `type` in data/site.js → calendars.

module.exports = [
  { date: '2026-10-17', time: '8:00 AM – 5:00 PM', type: 'Fast CAT and lure coursing', title: 'Fall Fast CAT (sample)', text: 'AKC Fast CAT runs all day on the field track.' },
  { date: '2026-10-24', end: '2026-10-25', time: 'All day', type: 'Trials', title: 'USDAA agility trial (sample)', text: 'Two-day trial in the covered arena. Exhibitor details are on the trial page.', link: 'trials/fall-usdaa-2026-x7k2/' },
  { date: '2026-11-07', time: '9:00 AM – 3:00 PM', type: 'Disc', title: 'MAD Dogs disc league day (sample)', text: 'Distance and freestyle rounds on the grass field.' },
  { date: '2026-11-14', time: '10:00 AM – 4:00 PM', type: 'Classes and seminars', title: 'Handling seminar (sample)', text: 'A one-day handling seminar. Contact the instructor to register.' },
  { date: '2026-12-05', end: '2026-12-06', time: 'All day', type: 'Trials', title: 'AKC agility trial (sample)', text: 'Two-day trial in the covered arena.' },
  { date: '2027-01-16', time: '1:00 PM – 3:00 PM', type: 'Classes and seminars', title: 'Nose work intro workshop (sample)', text: 'An introduction to scent work for new teams.' }
];
