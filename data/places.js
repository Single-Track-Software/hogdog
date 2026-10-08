// The property (F-05), rentals (F-20 to F-22), the tiny house (F-24) and RV and camping (F-23).
// Photos are file names in src/img/photos (each has a -sm version). Rules marked "old site" came from the
// old Rules and FAQ pages; Amy confirms them before launch.

module.exports = {
  // Property page: one entry per area, each with at least one photo and a short description.
  areas: [
    {
      id: 'arena', name: 'Covered arena',
      text: 'A 160 by 110 foot covered, heated arena with an equine surface of sand, felt and rubber crumb. Agility classes run here most days of the week, and it can be rented for practice.',
      photos: [['arena-seesaw', 'A terrier crossing the seesaw in the arena'], ['arena-ramp', 'A dog running the A-frame in the covered arena']],
      link: { href: 'rentals.html#arena', label: 'Rent the arena' }
    },
    {
      id: 'pool', name: 'Pools and dock',
      text: 'A 41-foot dock diving pool and a 29-foot swimming pool, open in season. Used for lessons, practice and private rentals.',
      photos: [['dock-dive', 'A dog leaping from the dock into the pool'], ['pool-swim', 'A dog swimming in the dock diving pool, framed by the distance markers']],
      link: { href: 'rentals.html#pool', label: 'Rent pool time' }
    },
    {
      id: 'field', name: 'Grass field and Fast CAT track',
      text: 'About three and a half acres of open, unfenced grass with water and power, used for outdoor agility, disc and events. The Fast CAT track is a 100-yard dash where dogs chase a lure one at a time.',
      photos: [['fastcat', 'A dog sprinting after the lure on the Fast CAT track'], ['field-course', 'An outdoor agility course set on the grass field']]
    },
    {
      id: 'tiny-house', name: 'Tiny house',
      text: 'TBD: one or two sentences on the tiny house.',
      photos: [],
      link: { href: 'tiny-house.html', label: 'About the tiny house' }
    },
    {
      id: 'camping', name: 'RV and camping areas',
      text: 'TBD: one or two sentences on the RV sites and camping area.',
      photos: [],
      link: { href: 'rv-camping.html', label: 'RV and camping' }
    },
    {
      id: 'farm', name: 'The farm',
      text: 'Twenty-six acres of working farmland, home to a flock of Dorper sheep used for herding lessons. It is also a family home, so please keep to the areas for your sport.',
      photos: [['lambs-field', 'Dorper lambs inside the sheep fence'], ['herding', 'Young lambs in the herding pasture']]
    }
  ],

  // Rentals page. Arena and pool time is booked in Acuity (data/site.js → acuity).
  rentals: {
    // Open decision: who may rent. The old site says you must be a member to rent the pools.
    eligibility: 'TBD: who may rent. The old site says renters must be Hog Dog members. Confirm the wording and how someone becomes eligible.',
    arena: {
      rates: 'TBD: arena rental rates',
      included: ['Use of the agility equipment already set out on the floor', 'Crates in the arena (please don’t move them)', 'Fans and lights'],
      rules: [
        'Use only the equipment already out on the floor, and put back anything you move.',
        'Turn off the fans and lights when you leave.',
        'If something breaks, tell us by email.',
        'Accidents in the arena carry a $5 fine.',
        'Please leave within 15 minutes of the end of your time.'
      ]
    },
    pool: {
      rates: '$40 per 30 minutes for the large (dock diving) pool, $33 per 30 minutes for the small pool (old site rates). Open in season only.',
      // F-22: shown above the pool scheduler button.
      approval: 'TBD: what a renter must complete before booking the pool (approval, experience check or waiver), after attorney review.',
      rules: [
        'No people in the pools. There is no lifeguard and the water is not treated for people; entering to help your dog is at your own risk.',
        'Children under 10 are not allowed on the docks or in the pools.',
        'Never push or force a dog into the water.',
        'No human jumping or diving from the docks.',
        'Ask before using the extreme vertical, fetch-it rig or speed retrieve; training is available.',
        'Big pool: the up ramp is on the right, the down ramp on the left. Leave the down ramp gate open when you finish.',
        'Cancel or change at least 48 hours ahead. Weather cancellations are refunded even with less notice.',
        'Please leave within 15 minutes of the end of your time.'
      ]
    },
    // Rules for everyone on the property (old site Rules page).
    property: [
      '15 mph down the hill, 5 mph at the white building.',
      'Park in the area for your sport. Never park on the big field next to the pools.',
      'Dogs stay leashed except during their own turn or in the fenced off-leash area. Don’t let your dog approach dogs it doesn’t know.',
      'Vaccines must be current (titers accepted).',
      'Pick up after your dog, and no pottying on or near any structure.',
      'No dogs in the restrooms (behind the tenant house).',
      'Use only the equipment for your own sport.',
      'No smoking in any building.',
      'Please stay away from the sheep, the house on the hill, the tiny yellow house and the tenant house.'
    ]
  },

  tinyHouse: {
    photos: [],
    description: 'TBD: description of the tiny house, who it is for (event exhibitors, instructors, guests) and when it is available.',
    amenities: ['TBD: sleeps how many', 'TBD: kitchen and bath', 'TBD: heat and air conditioning', 'TBD: dogs welcome, and how many'],
    rules: ['TBD: check-in and check-out', 'TBD: dog rules inside the house', 'TBD: minimum or maximum stay'],
    subject: 'Tiny house request'
  },

  camping: {
    photos: [],
    description: 'TBD: description of the RV sites and tent camping, and which events they serve.',
    hookups: ['TBD: number of RV sites', 'TBD: electric (amps) and water', 'TBD: dump station or not', 'TBD: tent camping'],
    rules: ['TBD: quiet hours', 'TBD: generators', 'TBD: arrival and departure times', 'Dogs leashed and picked up after, as everywhere on the property.'],
    subject: 'RV and camping request'
  }
};
