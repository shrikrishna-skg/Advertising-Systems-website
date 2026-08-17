export interface OTAPlatform {
  name: string;
  logo: string;
  description: string;
  adModel: string;
  reach: string;
  features: string[];
  status: 'live' | 'coming-soon';
}

export interface OTAPainPoint {
  icon: string;
  title: string;
  desc: string;
}

export interface OTACapability {
  icon: string;
  title: string;
  desc: string;
}

export interface OTAStat {
  value: string;
  label: string;
  detail: string;
}

export const otaPlatforms: OTAPlatform[] = [
  {
    name: 'Expedia Group',
    logo: 'expedia',
    description: 'TravelAds sponsored listings across the full Expedia Group network — Expedia, Hotels.com, Vrbo, Orbitz, Travelocity, Hotwire, and 200+ white-label partner sites. One campaign, maximum reach.',
    adModel: 'CPC (Pay-Per-Click)',
    reach: 'Full Expedia Group network and its partner sites',
    features: ['Hotels.com & Vrbo cross-brand reach', 'Orbitz, Travelocity & Hotwire included', 'Automated AI-powered bidding', 'Real-time ROAS & occupancy reporting'],
    status: 'live',
  },
  {
    name: 'Booking.com',
    logo: 'booking',
    description: 'Booking Network Sponsored Ads across the entire Booking Holdings portfolio — Booking.com, Priceline, Agoda, Kayak, and Rentalcars.com. CPC second-price auction with first-page placement guarantees.',
    adModel: 'CPC (Second-Price Auction)',
    reach: 'Booking Holdings portfolio, incl. Priceline and Agoda',
    features: ['Priceline, Agoda & Kayak network reach', 'First-page placement guarantee', 'Check-in date & travel window targeting', 'Real-time ROAS reporting'],
    status: 'live',
  },
  {
    name: 'TripAdvisor',
    logo: 'tripadvisor',
    description: 'Sponsored Placements and Business Advantage listings. CPC model with Standard, Direct Booking, and Enterprise tiers.',
    adModel: 'CPC / Subscription',
    reach: 'Global review and travel-planning audience',
    features: ['Market comparison placements', 'Direct booking integration', 'Business Advantage profiles', 'Review management tools'],
    status: 'coming-soon',
  },
  {
    name: 'Google Hotel Ads',
    logo: 'google',
    description: 'Free booking links and paid Hotel Ads across Google Search, Maps, and Travel. Reach travelers at the moment of intent.',
    adModel: 'CPC / CPA / Free Links',
    reach: 'Search, Maps and Google Travel surfaces',
    features: ['Free booking links', 'Google Maps integration', 'Real-time price accuracy', 'Commission-based option'],
    status: 'coming-soon',
  },
  {
    name: 'Trivago',
    logo: 'trivago',
    description: 'Hotel metasearch with CPA-based advertising (transitioned from CPC in 2025). Pay only when a guest completes a booking.',
    adModel: 'CPA (Commission-Based)',
    reach: 'Broad international coverage',
    features: ['Pay-per-booking model', 'Visibility-based commission tiers', '+32% higher conversion vs CPC', 'Direct booking support'],
    status: 'coming-soon',
  },
  {
    name: 'Agoda',
    logo: 'agoda',
    description: 'Growth Express and Sponsored Listings for APAC and global reach. Flexible, commitment-free campaigns with search ranking boosts.',
    adModel: 'CPC / Commission',
    reach: 'Strong APAC presence',
    features: ['Growth Express campaigns', 'Origin & lead time targeting', 'Boosted badge visibility', 'Multi-channel marketing'],
    status: 'coming-soon',
  },
  {
    name: 'Vrbo',
    logo: 'vrbo',
    description: 'Promotion tools for vacation rentals across the Expedia Group network. Early booking, last minute, and mobile promotions.',
    adModel: 'Promotion-Based',
    reach: 'Vacation-rental and whole-home demand',
    features: ['Early booking promotions', 'Last minute deals', 'Mobile-specific boosts', 'Loyalty member targeting'],
    status: 'coming-soon',
  },
  {
    name: 'Kayak',
    logo: 'kayak',
    description: 'Metasearch advertising with CPC-based sponsored hotel listings. Drive direct bookings from price-comparison shoppers.',
    adModel: 'CPC (Metasearch)',
    reach: 'Part of Booking Holdings',
    features: ['Price comparison visibility', 'Direct booking flow', 'Cross-platform syndication', 'Real-time rate display'],
    status: 'coming-soon',
  },
  {
    name: 'Priceline',
    logo: 'priceline',
    description: 'Sponsored ads and programmatic display through Priceline Media Group. First-party traveler data targeting.',
    adModel: 'CPC / Programmatic',
    reach: 'Metasearch audience comparing rates across OTAs',
    features: ['First-party data targeting', 'Custom audience creation', 'Email sponsorships', 'Booking lift analysis'],
    status: 'coming-soon',
  },
  {
    name: 'Skyscanner',
    logo: 'skyscanner',
    description: 'Metasearch for flights, hotels, and car rentals. Sponsored placement opportunities for accommodation providers.',
    adModel: 'CPC (Metasearch)',
    reach: 'Metasearch audience across flights and stays',
    features: ['Flight + hotel bundle visibility', 'Price alert integration', 'Redirect-to-book model', 'Global traveler reach'],
    status: 'coming-soon',
  },
];

export const otaPainPoints: OTAPainPoint[] = [
  {
    icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z',
    title: 'Fragmented Dashboards',
    desc: "Logging into Booking.com, Expedia, TripAdvisor, and Google Hotel Ads separately. Each has its own interface, bidding rules, and reporting. You're wasting 2-4 hours daily just keeping things in sync.",
  },
  {
    icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
    title: 'Wasted Ad Spend',
    desc: "Running ads during high-occupancy periods when bookings would happen organically. Without cross-platform intelligence, you're paying commissions on revenue you would have captured anyway.",
  },
  {
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    title: 'No Unified ROAS View',
    desc: "Each OTA reports metrics differently. You can't compare Booking.com CPC performance against Expedia TravelAds or TripAdvisor Sponsored Placements in one place. True cross-OTA ROAS is invisible.",
  },
];

export const otaCapabilities: OTACapability[] = [
  {
    icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
    title: 'Unified OTA Dashboard',
    desc: 'Manage Booking.com, Expedia, TripAdvisor, Google Hotel Ads, Trivago, and more from a single command center. One login, one view, one strategy.',
  },
  {
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z',
    title: 'AI-Powered Bid Optimization',
    desc: 'ML algorithms optimize CPC bids across every OTA in real time. Automatic bid adjustments based on occupancy, seasonality, local rate signals, and traveler intent signals.',
  },
  {
    icon: 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5',
    title: 'Cross-OTA Budget Allocation',
    desc: 'AI shifts spend from underperforming OTAs to top performers automatically. If Expedia is outperforming Booking.com this week, budget moves in real time.',
  },
  {
    icon: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75',
    title: 'Occupancy-Aware Pacing',
    desc: 'Automatically pause or reduce OTA ad spend during high-occupancy periods. Stop paying commissions on bookings that would happen organically.',
  },
  {
    icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605',
    title: 'Unified Performance Analytics',
    desc: 'Compare ROAS, CPA, and conversion rates across all OTAs side-by-side. Cross-platform attribution shows which OTA truly drives incremental revenue.',
  },
  {
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    title: 'Traveler Intent Targeting',
    desc: 'Leverage check-in dates, travel windows, origin markets, and length-of-stay data to bid smarter. Target the right travelers at the right time on every platform.',
  },
];

/* Verified-export figures (single managed property, 30 days, Expedia
   TravelAds, clicked-path attribution) — the same reconciled numbers as the
   case study. The previous aggregates here ($40K/mo, $480K+, 30% lift, $12M+)
   had no provenance anywhere in the repo and are gone. */
export const otaStats: OTAStat[] = [
  { value: '$592.93', label: 'Ad Spend, 30 Days', detail: 'One managed property, Expedia TravelAds — verified export' },
  { value: '$16,175', label: 'Booking Revenue', detail: '86 reservations · 192 room nights, same export' },
  { value: '27.3:1', label: 'Return on Ad Spend', detail: 'Platform cites an 8:1–12:1 lodging benchmark' },
  { value: '6.03%', label: 'Click-Through Rate', detail: 'Against a 2–3% platform lodging benchmark' },
];

/**
 * HONESTY PASS 2026-08-16 (owner ruling). The `spend` field carried $8.2B /
 * $7.4B / $2.6B / $2.1B annual marketing spend with no source anywhere on the
 * site, plus "50% of revenue goes to marketing" and "+25% YoY". Third-party
 * figures need a citation or they are just numbers we typed.
 *
 * What replaces them is the part a reader can verify in ten seconds and that
 * actually makes the point: WHICH BRANDS sit under each group. A property
 * competing on Booking.com is competing with Priceline, Agoda and Kayak money
 * whether or not anyone knows the exact figure.
 *
 * If the spend numbers are wanted back, they belong beside a named source and
 * a year, the way the decision guides already do it with `sourceNotes`.
 */
export const otaMarketInsights = [
  {
    title: 'Booking Holdings',
    brands: 'Booking.com · Priceline · Agoda · Kayak · Rentalcars',
    detail: 'The largest OTA advertiser globally. A bid on Booking.com is a bid against the whole portfolio\u2019s marketing budget.',
  },
  {
    title: 'Expedia Group',
    brands: 'Expedia · Hotels.com · Vrbo · Orbitz · Travelocity · Hotwire',
    detail: 'One TravelAds campaign reaches the full network, which is why a single placement carries further here than the brand name suggests.',
  },
  {
    title: 'Airbnb',
    brands: 'Airbnb',
    detail: 'Invests heavily in brand and performance marketing for vacation rentals \u2014 competing for the same traveller earlier in the journey.',
  },
  {
    title: 'Trip.com Group',
    brands: 'Ctrip · Trip.com · Skyscanner',
    detail: 'The strongest APAC demand engine, and the route into that market for most Western properties.',
  },
];
