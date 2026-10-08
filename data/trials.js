// Private trial pages (F-50 to F-54). Each trial is built at /trials/<slug>/ and is reachable only by its link:
// it is never in the menu, footer, sitemap or any public page, and search engines are told to skip it.
// A link-only page is hidden, not secured. Post nothing that would cause harm if the link spread:
// no owner phone numbers, entry lists with home addresses, or payment details.
//
// To add a trial: copy an entry, give it a new slug ending in a few random letters so it can't be guessed,
// put its PDFs in files/trials/<slug>/, and rebuild. Share the link printed by the build.
// password: true asks for a shared password set as a Cloudflare secret named TRIAL_<SLUG> (see README).
//
// Section types: text (paragraphs), list (bullets), links ([label, href]), files ([label, file in the trial's folder]).

module.exports = [
  {
    slug: 'fall-usdaa-2026-x7k2',
    sample: true,
    title: 'USDAA Agility Trial',
    dates: 'Saturday and Sunday, October 24–25, 2026 (sample)',
    host: 'Hog Dog Productions',
    password: false,
    sections: [
      { heading: 'Schedule', type: 'list', items: ['Grounds open 7:00 AM', 'Briefing 7:45 AM', 'First dog on the line 8:00 AM', 'Running order is posted at the score table each morning'] },
      { heading: 'Classes offered', type: 'text', paragraphs: ['Standard, Jumpers, Gamblers, Snooker, Pairs Relay and Grand Prix, all levels.'] },
      { heading: 'Directions and parking', type: 'text', paragraphs: ['Follow the signs to the trial parking field. Drive 15 mph down the hill and 5 mph at the white building. Crating is in the covered area beside the arena.'] },
      { heading: 'Announcements', type: 'list', items: ['Dogs must be leashed outside the ring.', 'Please stay away from the sheep and the houses on the property.'] },
      { heading: 'Downloads', type: 'files', items: [['Premium (PDF)', 'premium.pdf']] },
      { heading: 'Results', type: 'links', items: [['Results will be linked here after the trial', '#']] }
    ]
  }
];
