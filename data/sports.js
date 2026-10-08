// The five sport pages (F-10 to F-14). Each sport has a short program overview and one card per instructor.
// Card fields: name, role, photo (file in src/img/people, or '' for initials), bio (three sentences or fewer),
// and contact: { email, phone, web }. Leave a contact field '' to hide it. Phone numbers appear only if the
// instructor chooses to share one (open decision).
//
// DRAFT: bios are condensed from the old site's Sports page and contact details are the ones published there.
// Each instructor must review and approve their own card before launch (launch checklist).

module.exports = [
  {
    slug: 'agility',
    name: 'Agility',
    photo: 'agility-jump',
    photoAlt: 'A black and white border collie mid-leap over an agility jump',
    summary: 'Classes, practices and private lessons in the covered, heated arena.',
    overview: [
      'Agility is a timed, off-leash sport: a handler guides their dog through a course of jumps, tunnels, weave poles and contacts using only voice and body. It is a team sport, so the handler learns as much as the dog.',
      'Hog Dog has been a USDAA club since 2007. Our instructors teach from first foundations to championship handling across AKC, USDAA, UKI, NADAC and CPE, each on their own schedule in the 160 by 110 foot covered, heated arena.',
      'Sign up directly with an instructor. Most classes are full with wait lists, so ask about the next foundation class. If your dog is reactive with other dogs, ask about private lessons first.'
    ],
    instructors: [
      {
        name: 'Debi Hutchison',
        role: 'Wednesday and Thursday evenings · NADAC and AKC',
        photo: '',
        bio: 'Debi founded PAWZAZZ agility in the early 1990s and is its head trainer. Her students compete successfully in every agility format, and she teaches seminars internationally.',
        contact: { email: 'tebi13@verizon.net', phone: '', web: '' }
      },
      {
        name: 'Cynthia Hornor',
        role: 'Wednesday days and Friday nights · AKC, USDAA and UKI',
        photo: 'cynthia-hornor',
        bio: 'Cynthia has competed since 1997 and has earned championships with several Shelties and Border Collies. Her classes focus on fun, positive reinforcement and consistent handling.',
        contact: { email: 'farsidek9@comcast.net', phone: '', web: '' }
      },
      {
        name: 'Chelsea Singer',
        role: 'Tuesday evenings and summer Fridays · Beginner foundations',
        photo: 'chelsea-singer',
        bio: 'Chelsea is a high school counselor who competes in USDAA, AKC and CPE. She teaches beginners the foundations, with an emphasis on bonding with your dog and keeping training fun.',
        contact: { email: 'Agilityhearts@gmail.com', phone: '', web: '' }
      },
      {
        name: 'Christine Tschech',
        role: 'Mondays · Foundation skills',
        photo: 'christine-tschech',
        bio: 'Christine started agility about ten years ago with her Labrador and now competes with two Border Collies. She builds a strong foundation one small skill at a time and keeps it fun.',
        // The old site lists Cynthia's address for Christine.
        contact: { email: 'TBD: Christine’s own email (old site shows Cynthia’s address)', phone: '', web: '' }
      }
    ]
  },
  {
    slug: 'pool',
    name: 'Pool',
    navName: 'Pool (dock diving and swimming)',
    photo: 'dock-dive',
    photoAlt: 'A dog flying off the dock into the dock diving pool',
    summary: 'Dock diving and swimming lessons, plus private pool rentals in season.',
    overview: [
      'Hog Dog has a 41-foot dock diving pool and a 29-foot swimming pool, open seasonally and closed in winter.',
      'There are no group dock diving classes: dogs progress at very different speeds, so lessons are one-on-one. A strong swimmer with a big drive for toys is the best start. Swimming lessons are available too, and no dog is ever forced into the water.',
      'The pools are not treated or monitored for people, and there is no lifeguard, so people stay out of the water. To rent pool time for your own dog, see Rentals.'
    ],
    cta: { href: 'rentals.html#pool', label: 'Rent pool time' },
    instructors: [
      {
        name: 'Mindy Len',
        role: 'Dock diving and swimming · Private lessons',
        photo: 'mindy-len',
        bio: 'Mindy has trained dogs and worked in behavior modification for more than 20 years, and has taught dock diving for eight. Her dogs have earned national titles and Worlds invitations, including a NADD National title for her boxer Sophia at age eight.',
        contact: { email: 'mindymins00@gmail.com', phone: '', web: '' }
      }
    ]
  },
  {
    slug: 'nose-work',
    name: 'Nose Work',
    photo: 'nosework-vehicle',
    photoAlt: 'A dog searching the outside of a parked vehicle during a nose work exercise',
    summary: 'Scent work classes and privates for dogs of any age, size or confidence.',
    overview: [
      'K9 Nose Work taps into a dog’s natural hunting instinct: dogs learn to find a target scent and tell their handler where it is. It suits dogs of any age, size or ability, including shy and reactive dogs, since they work one at a time.',
      'It builds confidence, burns mental energy and is easy to practice at home. Teams can compete or simply play.'
    ],
    instructors: [
      {
        name: 'Jessica Daggit',
        role: 'ABCDT, ANWI · Classes and private lessons',
        photo: 'jessica-daggit',
        bio: 'Jessica became a certified dog trainer in 2013 and found K9 Nose Work in a class with Cindy Knowlton. She teaches a dog-driven approach: handlers learn to trust their dog and follow its lead. Her Connection, Cooperation and Control class draws on Suzanne Clothier’s Relationship Centered Training.',
        // All of Jessica's classes and privates are booked through her own website.
        contact: { email: '', phone: '', web: 'https://jdnosework.squarespace.com/' }
      }
    ]
  },
  {
    slug: 'sheep-herding',
    name: 'Sheep Herding',
    photo: 'herding',
    photoAlt: 'Young Dorper lambs in the herding field',
    summary: 'Instinct tests, lessons and practice with our own flock of Dorper sheep.',
    overview: [
      'Hog Dog is home to a flock of 20 to 40 purebred Dorper and Dorper Katahdin sheep. Herding lessons run one Monday and one Thursday a month, with instinct tests, beginner lessons and round ring work on other days.',
      'Lessons are $70 for up to 30 minutes and practice time is $15 per visit (old site rates). There are no ducks or cattle on site.'
    ],
    instructors: [
      {
        name: 'Susan Rhoades',
        role: 'Monthly lessons · Keepstone Farm, Berryville, VA',
        photo: 'susan-rhoades',
        bio: 'Susan has taught herding at Hog Dog for more than 14 years and runs Keepstone Farm in Berryville, Virginia. She competes nationally and currently works five dogs.',
        contact: { email: '', phone: '', web: 'http://www.keepstonefarm.com/' }
      },
      {
        name: 'Karen Chandler',
        role: 'Instinct tests, beginner lessons and practice',
        photo: '',
        bio: 'TBD: two or three sentences from Karen.',
        contact: { email: 'karen.chandler3@verizon.net', phone: '', web: '' }
      }
    ]
  },
  {
    slug: 'disc',
    name: 'Disc',
    photo: 'disc-catch',
    photoAlt: 'A dog leaping to catch a flying disc',
    summary: 'Disc dog practice and competition with the Mid-Atlantic Disc Dog Club.',
    overview: [
      'Disc dog is throw-and-catch made into a sport: distance and accuracy games, and freestyle routines set to music.',
      'Hog Dog is a home field for MAD Dogs, the Mid-Atlantic Disc Dog Club, which welcomes teams at every level and puts good sportsmanship first.'
    ],
    // The old site lists the club, not individual instructors. Spec needs instructor cards (F-12).
    instructors: [
      {
        name: 'MAD Dogs',
        role: 'Mid-Atlantic Disc Dog Club',
        photo: '',
        bio: 'TBD: disc instructors or club contacts, with their own bios.',
        contact: { email: '', phone: '', web: 'http://www.mad-dogs.us/' }
      }
    ]
  }
];
