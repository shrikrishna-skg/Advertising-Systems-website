export interface DecisionGuideCta {
  label: string;
  href: string;
}

export interface DecisionGuideStat {
  label: string;
  value: string;
  caption: string;
  tone: 'blue' | 'green' | 'amber' | 'rose' | 'violet';
}

export interface DecisionGuideCard {
  label: string;
  title: string;
  body: string;
}

export interface DecisionGuideSection {
  eyebrow: string;
  title: string;
  intro: string;
  cards: DecisionGuideCard[];
}

export interface DecisionGuideTable {
  title: string;
  intro: string;
  columns: string[];
  rows: string[][];
}

export interface DecisionGuideSource {
  label: string;
  href: string;
  note: string;
}

export interface DecisionGuide {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  category: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  primaryCta: DecisionGuideCta;
  secondaryCta: DecisionGuideCta;
  heroStats: DecisionGuideStat[];
  sections: DecisionGuideSection[];
  table?: DecisionGuideTable;
  proofMetrics: DecisionGuideCard[];
  sourceNotes: DecisionGuideSource[];
  relatedSlugs: string[];
}

export const decisionGuides: DecisionGuide[] = [
  {
    slug: 'expedia-travelads',
    title: 'Expedia TravelAds: Costs, Bidding, and ROAS for Hotels',
    shortTitle: 'Expedia TravelAds',
    eyebrow: 'OTA advertising guide',
    category: 'Expedia',
    excerpt:
      'Expedia TravelAds is pay-per-click hotel advertising in Expedia Group search results. Learn how bids, daily budgets, traveler targeting, and booking reports work.',
    metaTitle: 'Expedia TravelAds: Costs, Bidding & ROAS | Advertising Systems',
    metaDescription:
      'How Expedia TravelAds works for hotels: CPC costs, daily budgets, automated bidding, and ROAS reporting. Learn what to check before increasing spend.',
    primaryCta: { label: 'View Expedia Report', href: '/expedia-report' },
    secondaryCta: { label: 'Book a Demo', href: '/book-demo' },
    heroStats: [
      { label: 'Placement', value: 'Top search', caption: 'Paid visibility inside Expedia Group results', tone: 'blue' },
      { label: 'Model', value: 'PPC', caption: 'Control CPC bids and daily spend', tone: 'green' },
      { label: 'Signal', value: 'Intent', caption: 'Target travelers by demand context', tone: 'amber' },
    ],
    sections: [
      {
        eyebrow: 'Why advertise there',
        title: 'How Expedia TravelAds works',
        intro:
          'TravelAds adds paid hotel visibility while travelers compare dates, rooms, and prices. You pay for clicks and control your daily spend. Bids and targeting affect where that budget goes.',
        cards: [
          {
            label: 'Demand capture',
            title: 'Show up when the booking decision is active',
            body:
              'TravelAds places a hotel in sponsored search moments, so the ad is attached to live travel intent instead of broad audience guessing.',
          },
          {
            label: 'Control',
            title: 'Scale, pause, or adjust spend by need period',
            body:
              'Hotels can use daily spend controls and bid strategy to push visibility during low occupancy, event demand, or weak weekday windows.',
          },
          {
            label: 'Message',
            title: 'Use photos and copy to answer the hesitation',
            body:
              'Expedia allows customizable content, so the ad can highlight the reason to choose your property for that search context.',
          },
        ],
      },
      {
        eyebrow: 'How the algorithm behaves',
        title: 'Visibility depends on eligibility, bid strategy, targeting, and market demand',
        intro:
          'The platform is not only asking who pays more. It also needs available inventory, relevant targeting, useful creative, and a bid strategy that can compete when demand changes.',
        cards: [
          {
            label: 'Availability',
            title: 'Ads only help when rooms can actually be booked',
            body:
              'If rates, dates, or inventory are weak, extra visibility can turn into paid clicks without profitable bookings.',
          },
          {
            label: 'Bid strategy',
            title: 'CPC bids and daily budgets control spend',
            body:
              'There is no single CPC that applies to every hotel. Set bids and a daily budget for your market; automated bidding can adjust bids as demand changes. Check actual spend before raising the budget.',
          },
          {
            label: 'Targeting',
            title: 'Better targeting protects ROAS',
            body:
              'The strongest campaigns focus on valuable traveler segments instead of paying equally for every search and every date.',
          },
        ],
      },
      {
        eyebrow: 'What changes near the top',
        title: 'Higher visibility changes the size and quality of the opportunity',
        intro:
          'Moving into stronger search positions usually changes the top of the funnel first: more impressions, more clicks, and more chances to convert demand that may have gone elsewhere.',
        cards: [
          {
            label: 'Before',
            title: 'The hotel is technically listed but not being seen enough',
            body:
              'A property may have rates and availability, but if it sits too low in search, travelers may choose before they ever compare it.',
          },
          {
            label: 'During',
            title: 'Sponsored visibility creates a second chance to be considered',
            body:
              'TravelAds can add a paid placement alongside organic presence, giving the hotel another path into the traveler comparison set.',
          },
          {
            label: 'After',
            title: 'Reporting decides whether the spend was worth it',
            body:
              'Compare ad spend with attributed room revenue, room nights, and ROAS. Attributed bookings alone do not prove incremental demand; evaluate comparable stay dates, cancellations, and net revenue before judging the return.',
          },
        ],
      },
    ],
    table: {
      title: 'When Expedia TravelAds is usually worth testing',
      intro: 'Use TravelAds when the hotel has demand to capture and a clear reason to pay for visibility.',
      columns: ['Hotel situation', 'Why TravelAds can help', 'Advertising Systems guardrail'],
      rows: [
        ['Low occupancy dates', 'Buy visibility only where unsold rooms need demand', 'Pace budget by stay date and pickup'],
        ['Event or seasonal windows', 'Reach travelers searching around compressed demand', 'Watch CPC, revenue, and sell-through together'],
        ['New or repositioned property', 'Get into the comparison set faster', 'Separate awareness clicks from booking revenue'],
        ['Weak weekday demand', 'Target travelers most likely to book the slow nights', 'Shift spend away from naturally full nights'],
      ],
    },
    proofMetrics: [
      { label: 'Report metric', title: 'Spend vs booked revenue', body: 'Shows whether paid visibility is creating enough room revenue to justify the CPC cost.' },
      { label: 'Report metric', title: 'Room nights by stay date', body: 'Separates bookings that help occupancy from bookings that would have filled naturally.' },
      { label: 'Report metric', title: 'Bid strength and missed demand', body: 'Highlights where budget or bid settings may be limiting profitable visibility.' },
    ],
    sourceNotes: [
      {
        label: 'Expedia Sponsored Listings',
        href: 'https://partner.expediagroup.com/en-us/solutions/advertise-with-us/sponsored-listings',
        note: 'Expedia describes TravelAds as PPC sponsored listings with targeting, reporting, customizable content, and automated bidding.',
      },
      {
        label: 'Expedia visibility boosters',
        href: 'https://partner.expediagroup.com/en-us/resources/blog/travelads-and-accelerator-hotel-visibility-boosters',
        note: 'Expedia says top sort positions capture a large share of clicks and explains TravelAds budget, targeting, creative, and reporting steps.',
      },
      {
        label: 'TravelAds automated bidding',
        href: 'https://partner.expediagroup.com/en-us/landing-pages/automated-bidding-checklist',
        note: 'Expedia explains automated bidding as dynamically adjusting bids while keeping daily budget control.',
      },
    ],
    relatedSlugs: ['booking-sponsored-listings', 'expedia-vs-booking-hotel-ads', 'ota-ads-low-occupancy'],
  },
  {
    slug: 'booking-sponsored-listings',
    title: 'Booking Sponsored Listings: How Hotels Compete for High-Intent Travelers',
    shortTitle: 'Booking Sponsored Listings',
    eyebrow: 'OTA advertising guide',
    category: 'Booking.com',
    excerpt:
      'A practical guide to Booking Sponsored Listings, CPC auctions, Publisher Score, targeting controls, sponsored placements, and ROAS reporting.',
    metaTitle: 'Booking Sponsored Listings Guide for Hotels | Advertising Systems',
    metaDescription:
      'Learn how Booking Sponsored Listings work, why CPC bid and Publisher Score matter, and how hotels should report sponsored placement performance.',
    primaryCta: { label: 'View Sample Report', href: '/sample-report' },
    secondaryCta: { label: 'Book a Demo', href: '/book-demo' },
    heroStats: [
      { label: 'Auction', value: 'CPC + relevance', caption: 'Bid plus Publisher Score', tone: 'violet' },
      { label: 'Network', value: '3 brands', caption: 'Booking.com, Agoda, Priceline', tone: 'blue' },
      { label: 'Control', value: 'Targeting', caption: 'Dates, device, country, trip type', tone: 'green' },
    ],
    sections: [
      {
        eyebrow: 'Why advertise there',
        title: 'Booking demand is close to the reservation decision',
        intro:
          'Booking.com users are comparing available rooms, reviews, policies, and prices. Sponsored Listings help a hotel enter the short list when travelers are already filtering choices.',
        cards: [
          {
            label: 'Intent',
            title: 'Reach travelers who are already searching lodging',
            body:
              'Sponsored placement is tied to active search behavior, so the budget is used closer to the booking moment.',
          },
          {
            label: 'Network',
            title: 'Extend reach across Booking Holdings brands',
            body:
              'The sponsored listings program can place ads across Booking.com, Agoda, and Priceline, depending on context and eligibility.',
          },
          {
            label: 'Precision',
            title: 'Target the trip patterns that matter',
            body:
              'Hotels can use dimensions like check-in date, length of stay, traveler country, device, travel window, and traveler type.',
          },
        ],
      },
      {
        eyebrow: 'How the auction works',
        title: 'Winning is a blend of bid competitiveness and relevance',
        intro:
          'Booking Sponsored Listings ranks eligible ads with a combination of CPC bid and Publisher Score. Higher bids can help, but relevance and alignment with the traveler search also matter.',
        cards: [
          {
            label: 'Bid',
            title: 'CPC sets how aggressively you compete',
            body:
              'Your maximum bid helps determine whether the ad can win sponsored inventory for a relevant search.',
          },
          {
            label: 'Publisher Score',
            title: 'Relevance keeps spend attached to good matches',
            body:
              'Publisher Score is based on search context, property attributes, and how well the property fits the query.',
          },
          {
            label: 'Second price',
            title: 'Winning does not mean paying the full bid',
            body:
              'Booking describes the auction as second-price, where the winner pays just above the next eligible bid rather than the full maximum bid.',
          },
        ],
      },
      {
        eyebrow: 'What changes near the top',
        title: 'Sponsored slots put the hotel back into the comparison set',
        intro:
          'If the property is not visible during the traveler shortlist phase, the guest may never inspect photos, reviews, room types, or rates. Sponsored positions change that first moment of consideration.',
        cards: [
          {
            label: 'Search result',
            title: 'More visibility in dedicated sponsored positions',
            body:
              'Booking.com sponsored ads are eligible for labeled sponsored slots such as positions 2, 4, and 6.',
          },
          {
            label: 'Click path',
            title: 'More travelers inspect the listing',
            body:
              'Visibility only matters if the listing earns the click. Photos, review score, policies, and rate confidence still carry the conversion.',
          },
          {
            label: 'Revenue proof',
            title: 'ROAS decides where to push and where to pause',
            body:
              'A reporting layer should expose which dates, devices, countries, and stay lengths turn sponsored visibility into profitable bookings.',
          },
        ],
      },
    ],
    table: {
      title: 'Booking Sponsored Listings control map',
      intro: 'Treat Booking.com like an auction plus conversion system, not a simple boost button.',
      columns: ['Lever', 'What it changes', 'What to watch'],
      rows: [
        ['Base CPC bid', 'Auction competitiveness', 'Cost per click, bookings, ROAS'],
        ['Targeting boosts', 'Visibility for selected traveler segments', 'Country, device, travel window performance'],
        ['Campaign structure', 'Budget and reporting clarity per hotel', 'Hotel-level spend, pickup, and revenue'],
        ['Listing quality', 'Click and conversion confidence', 'Photos, reviews, fees, policies, rate consistency'],
      ],
    },
    proofMetrics: [
      { label: 'Report metric', title: 'Sponsored spend by segment', body: 'Shows which traveler country, device, or stay window deserves budget.' },
      { label: 'Report metric', title: 'CPC to booking path', body: 'Connects paid click cost with confirmed reservation value.' },
      { label: 'Report metric', title: 'ROAS and occupancy impact', body: 'Separates profitable demand from spend that only adds cost to already-full dates.' },
    ],
    sourceNotes: [
      {
        label: 'Booking Sponsored Listings auction',
        href: 'https://intercom.help/booking-holdings-sponsored-listings/en/articles/14874823-how-booking-holdings-sponsored-listings-works',
        note: 'Booking explains the CPC bid plus Publisher Score auction model, second-price pricing, and sponsored placement slots.',
      },
      {
        label: 'Booking targeting controls',
        href: 'https://intercom.help/booking-holdings-sponsored-listings/en/articles/8376303-add-targeting',
        note: 'Booking documents targeting by check-in date, length of stay, traveler country, device type, travel window, day of week, and traveler type.',
      },
      {
        label: 'Booking best practices',
        href: 'https://intercom.help/booking-holdings-sponsored-listings/en/articles/8617609-best-practices',
        note: 'Booking recommends campaign structure, always-on setup, daily budgets, ROAS goals, pacing, and bid automation practices.',
      },
    ],
    relatedSlugs: ['expedia-travelads', 'expedia-vs-booking-hotel-ads', 'ota-ads-low-occupancy'],
  },
  {
    slug: 'expedia-vs-booking-hotel-ads',
    title: 'Expedia vs Booking Hotel Ads: Where Should a Hotel Advertise First?',
    shortTitle: 'Expedia vs Booking',
    eyebrow: 'Channel decision guide',
    category: 'OTA strategy',
    excerpt:
      'A side-by-side guide for deciding when Expedia TravelAds, Booking Sponsored Listings, or both should be part of a hotel advertising mix.',
    metaTitle: 'Expedia vs Booking Hotel Ads | Advertising Systems Decision Guide',
    metaDescription:
      'Compare Expedia TravelAds and Booking Sponsored Listings as hotel advertising channels, including visibility, targeting, bidding, reporting, and ROAS guardrails.',
    primaryCta: { label: 'View Expedia Report', href: '/expedia-report' },
    secondaryCta: { label: 'Book a Demo', href: '/book-demo' },
    heroStats: [
      { label: 'Expedia', value: 'Creative + reach', caption: 'PPC visibility and custom ads', tone: 'blue' },
      { label: 'Booking', value: 'Auction + intent', caption: 'CPC bid plus relevance score', tone: 'violet' },
      { label: 'Decision', value: 'ROAS', caption: 'Let reporting choose the winner', tone: 'green' },
    ],
    sections: [
      {
        eyebrow: 'Decision psychology',
        title: 'Hotels should not pick a favorite OTA by opinion',
        intro:
          'Expedia and Booking both create paid visibility, but they do it with different controls. The right answer depends on unsold dates, traveler segments, conversion strength, and true incremental revenue.',
        cards: [
          {
            label: 'Expedia fit',
            title: 'Use when creative, reach, and flexible TravelAds control matter',
            body:
              'Expedia is useful when the hotel wants paid placement with custom ad copy, photos, targeting, daily budget control, and real-time reporting.',
          },
          {
            label: 'Booking fit',
            title: 'Use when Booking demand is strong but visibility needs help',
            body:
              'Booking Sponsored Listings are useful when the property can win high-intent searches through better bids, relevance, targeting, and listing quality.',
          },
          {
            label: 'Both fit',
            title: 'Use both only when each channel proves incremental demand',
            body:
              'Running both makes sense when reporting shows each OTA fills different dates, markets, or traveler cohorts profitably.',
          },
        ],
      },
      {
        eyebrow: 'How to come on top',
        title: 'Top placement is earned by different levers on each platform',
        intro:
          'On Expedia, the hotel needs budget, targeting, bidding, availability, and compelling creative. On Booking, the hotel needs competitive CPC, relevance, and listing confidence.',
        cards: [
          {
            label: 'Bid',
            title: 'Do not bid blind',
            body:
              'Push bids only where the hotel needs demand and where revenue per booking can support the CPC cost.',
          },
          {
            label: 'Listing',
            title: 'Ads amplify the listing quality you already have',
            body:
              'Photos, reviews, policies, fees, room clarity, and rate confidence influence whether extra visibility becomes bookings.',
          },
          {
            label: 'Timing',
            title: 'Stay-date pacing matters more than monthly spend',
            body:
              'The best OTA ad plan protects naturally full nights and pushes visibility into low-occupancy or high-opportunity dates.',
          },
        ],
      },
      {
        eyebrow: 'What changes when visibility improves',
        title: 'More visibility creates more responsibility',
        intro:
          'Higher placement can bring more impressions and clicks, but it can also expose weak pricing, poor photos, fee surprises, or bad tracking faster.',
        cards: [
          {
            label: 'More shoppers',
            title: 'The hotel enters more comparison moments',
            body:
              'Top visibility increases the number of travelers who actually consider the hotel before choosing another property.',
          },
          {
            label: 'More cost',
            title: 'Spend rises before revenue is proven',
            body:
              'A dashboard should quickly show whether new clicks produce booking value or simply add cost.',
          },
          {
            label: 'More learning',
            title: 'The report reveals which OTA deserves the next dollar',
            body:
              'Advertising Systems should compare OTA spend, revenue, room nights, ROAS, and missed opportunities in one view.',
          },
        ],
      },
    ],
    table: {
      title: 'Expedia vs Booking: practical channel choice',
      intro: 'This comparison is about channel fit, not replacing one OTA with another.',
      columns: ['Question', 'Expedia TravelAds', 'Booking Sponsored Listings'],
      rows: [
        ['How does visibility happen?', 'Sponsored PPC placement with custom ads and targeting', 'Auctioned sponsored slots using CPC bid and Publisher Score'],
        ['What can the hotel tune?', 'Daily spend, bid strategy, targeting, copy, photos', 'Base bid, boosts, multipliers, targeting, campaign structure'],
        ['Where can it help most?', 'Broad reach, creative differentiation, low-demand dates', 'High-intent searches where listing confidence is strong'],
        ['What proves success?', 'Room nights, revenue, ROAS, demand by stay date', 'Bookings, ROAS, segment performance, occupancy impact'],
      ],
    },
    proofMetrics: [
      { label: 'Report metric', title: 'OTA spend mix', body: 'Shows how much budget went to each OTA and whether spend is balanced by revenue.' },
      { label: 'Report metric', title: 'Incremental room nights', body: 'Identifies whether ads filled need dates instead of buying bookings that likely would have happened anyway.' },
      { label: 'Report metric', title: 'Next-dollar recommendation', body: 'Explains whether the next dollar should go to Expedia, Booking, Google, Meta, or nowhere.' },
    ],
    sourceNotes: [
      {
        label: 'Expedia TravelAds',
        href: 'https://partner.expediagroup.com/en-us/solutions/advertise-with-us/sponsored-listings',
        note: 'Expedia describes TravelAds controls such as targeting, daily spend, real-time reporting, and customizable content.',
      },
      {
        label: 'Booking Sponsored Listings',
        href: 'https://intercom.help/booking-holdings-sponsored-listings/en/articles/14874823-how-booking-holdings-sponsored-listings-works',
        note: 'Booking explains how sponsored placement is ranked through CPC bid and Publisher Score.',
      },
    ],
    relatedSlugs: ['expedia-travelads', 'booking-sponsored-listings', 'ota-ads-low-occupancy'],
  },
  {
    slug: 'ota-ads-low-occupancy',
    title: 'OTA Ads for Low Occupancy: When to Push Expedia and Booking Spend',
    shortTitle: 'OTA Low-Occupancy Ads',
    eyebrow: 'Demand planning guide',
    category: 'OTA strategy',
    excerpt:
      'A hotel advertising guide for using Expedia and Booking spend to fill the right dates without buying demand the hotel would have earned naturally.',
    metaTitle: 'OTA Ads for Low Occupancy Hotels | Advertising Systems',
    metaDescription:
      'Learn how hotels should use Expedia and Booking advertising during low occupancy, event windows, weak weekdays, and shoulder dates.',
    primaryCta: { label: 'Book a Demo', href: '/book-demo' },
    secondaryCta: { label: 'View Sample Report', href: '/sample-report' },
    heroStats: [
      { label: 'Goal', value: 'Fill need dates', caption: 'Do not buy already-secure demand', tone: 'green' },
      { label: 'Timing', value: 'Stay-date first', caption: 'Plan by occupancy window', tone: 'amber' },
      { label: 'Proof', value: 'ROAS + pickup', caption: 'Measure revenue and rooms together', tone: 'blue' },
    ],
    sections: [
      {
        eyebrow: 'Why timing matters',
        title: 'OTA ads should follow the demand calendar',
        intro:
          'Hotels waste money when ads run evenly across dates that do not need help. Expedia and Booking campaigns work better when spend follows actual occupancy gaps.',
        cards: [
          {
            label: 'Low occupancy',
            title: 'Push when unsold rooms need exposure',
            body:
              'Use paid OTA visibility when organic demand is not enough to put the hotel into the traveler comparison set.',
          },
          {
            label: 'High occupancy',
            title: 'Protect nights that are likely to sell anyway',
            body:
              'If the hotel is already near full, paid clicks can increase cost without creating much incremental room revenue.',
          },
          {
            label: 'Shoulder dates',
            title: 'Use ads around events, not only during events',
            body:
              'Travelers may shift dates before or after peak nights. Ads can help capture demand around the edges of compression.',
          },
        ],
      },
      {
        eyebrow: 'How to control spend',
        title: 'The best OTA ad plan has guardrails before it has budget',
        intro:
          'A budget without rules can chase clicks. A budget with occupancy, ROAS, and stay-date guardrails can buy visibility where it matters.',
        cards: [
          {
            label: 'Guardrail 1',
            title: 'Set spend by stay date need',
            body:
              'Break out whether each ad dollar is helping low occupancy, shoulder dates, weak weekdays, or specific arrival windows.',
          },
          {
            label: 'Guardrail 2',
            title: 'Watch rate and room consistency',
            body:
              'If pricing, fees, or room availability look wrong, top placement can expose friction faster.',
          },
          {
            label: 'Guardrail 3',
            title: 'Pause when the hotel is full enough',
            body:
              'A good system should stop buying demand when remaining availability is too limited or too profitable organically.',
          },
        ],
      },
      {
        eyebrow: 'What to show owners',
        title: 'Owners do not need channel noise. They need the revenue story.',
        intro:
          'The report should show why spend happened, where it happened, and whether it created room nights the hotel actually needed.',
        cards: [
          {
            label: 'Before',
            title: 'Occupancy gap and target dates',
            body:
              'Show the low-demand window that justified the ad push before showing clicks or spend.',
          },
          {
            label: 'During',
            title: 'Spend, visibility, and booking pickup',
            body:
              'Connect campaign activity to stay-date pickup, not only booking-date performance.',
          },
          {
            label: 'After',
            title: 'Revenue, ROAS, and next action',
            body:
              'End with whether to continue, raise budget, shift channels, or pause spend.',
          },
        ],
      },
    ],
    table: {
      title: 'OTA ad timing playbook',
      intro: 'Use this as the simple operating model for Expedia and Booking spend.',
      columns: ['Demand signal', 'Ad action', 'Dashboard check'],
      rows: [
        ['Low weekday occupancy', 'Increase targeted visibility for those arrival dates', 'Pickup, ADR, ROAS, remaining rooms'],
        ['High weekend occupancy', 'Lower or pause paid OTA spend', 'Displacement risk and organic pickup'],
        ['Event compression', 'Push early, then taper as rooms fill', 'CPC trend, conversion, sell-through pace'],
        ['New listing or refreshed property', 'Use ads to accelerate consideration', 'Photos, CTR, booking conversion, review trend'],
      ],
    },
    proofMetrics: [
      { label: 'Report metric', title: 'Occupancy-aware spend', body: 'Shows whether budget went to need dates rather than already-full dates.' },
      { label: 'Report metric', title: 'Pickup by stay date', body: 'Connects OTA ad activity with room-night pickup for the dates that matter.' },
      { label: 'Report metric', title: 'Pause recommendation', body: 'Makes it clear when the hotel should stop paying for visibility.' },
    ],
    sourceNotes: [
      {
        label: 'Expedia TravelAds controls',
        href: 'https://partner.expediagroup.com/en-us/resources/blog/travelads-and-accelerator-hotel-visibility-boosters',
        note: 'Expedia explains daily budget, targeting, creative, and real-time reporting as part of TravelAds campaign control.',
      },
      {
        label: 'Booking campaign setup',
        href: 'https://intercom.help/booking-holdings-sponsored-listings/en/articles/8375653-create-a-custom-campaign',
        note: 'Booking documents budget types, ROAS goal, pacing, bid automation, targeting, and hotel activation controls.',
      },
      {
        label: 'Booking performance reporting',
        href: 'https://intercom.help/booking-holdings-sponsored-listings/en/articles/8511259-understand-my-campaign-performance',
        note: 'Booking explains performance views, filters, dimensions, custom tables, saved reports, and campaign metrics.',
      },
    ],
    relatedSlugs: ['expedia-travelads', 'booking-sponsored-listings', 'expedia-vs-booking-hotel-ads'],
  },
];

export const futureDecisionGuideIdeas = [
  'Hotel Sponsored Listings ROAS',
  'Hotel OTA Ad Ranking',
  'Hotel Ad Visibility Score',
  'Hotel Event Demand Ads',
  'Booking Engine vs OTA Ads',
  'Multi-Property OTA Ad Management',
];

export function getDecisionGuide(slug: string): DecisionGuide | undefined {
  return decisionGuides.find((guide) => guide.slug === slug);
}

export function getRelatedDecisionGuides(slugs: string[]): DecisionGuide[] {
  return slugs
    .map((slug) => getDecisionGuide(slug))
    .filter((guide): guide is DecisionGuide => Boolean(guide));
}

export function getAllDecisionGuideSlugs(): string[] {
  return decisionGuides.map((guide) => guide.slug);
}
