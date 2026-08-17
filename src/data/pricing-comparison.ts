/**
 * Neutral pricing comparison and detailed plan data for the Pricing page.
 */

export interface PricingComparisonRow {
  name: string;
  pricingModel: string;
  visibility: string;
  automation: string;
  bestFit: string;
  highlighted?: boolean;
}

export const pricingComparisonRows: PricingComparisonRow[] = [
  {
    name: 'Advertising Systems',
    pricingModel: 'Flat monthly price by ad account count',
    visibility: 'Google Ads, Meta Ads, OTAs, and reporting in one place',
    automation: 'Cross-channel AI for budgets, bids, pacing, and reporting',
    bestFit: 'Teams that need one source of truth for paid growth',
    highlighted: true,
  },
  {
    name: 'Manual spreadsheets',
    pricingModel: 'Low software cost, high team time cost',
    visibility: 'Data is copied from channel to channel after the fact',
    automation: 'Manual checks, formulas, and delayed decisions',
    bestFit: 'Very small accounts with limited spend and simple goals',
  },
  {
    name: 'Single-channel dashboards',
    pricingModel: 'Each channel has its own workflow and reporting view',
    visibility: 'Clear within one platform, weaker across total revenue impact',
    automation: 'Optimizes inside one channel, not across the full mix',
    bestFit: 'Teams focused on one primary ad platform',
  },
  {
    name: 'Agency reporting',
    pricingModel: 'Often bundled into retainers or service packages',
    visibility: 'Periodic summaries instead of always-on operational control',
    automation: 'Depends on analyst review, meetings, and reporting cadence',
    bestFit: 'Teams that want outsourced management more than software control',
  },
];

export interface PlanFeatureRow {
  feature: string;
  launch: boolean | string;
  growth: boolean | string;
  scale: boolean | string;
  enterprise: boolean | string;
}

export const planFeatureMatrix: PlanFeatureRow[] = [
  { feature: 'Monthly software price', launch: '$199', growth: '$499', scale: '$1,299', enterprise: 'Custom' },
  { feature: 'Ad accounts', launch: '1', growth: 'Up to 5', scale: 'Up to 15', enterprise: 'Unlimited' },
  { feature: 'Team users', launch: '1', growth: 'Up to 10', scale: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Report exports', launch: 'Unlimited', growth: 'Unlimited', scale: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Campaign Intelligence (unified dashboard)', launch: true, growth: true, scale: true, enterprise: true },
  { feature: 'AI Optimization Engine (autonomous bids & budgets)', launch: true, growth: true, scale: true, enterprise: true },
  { feature: 'Performance Analytics & attribution', launch: true, growth: true, scale: true, enterprise: true },
  { feature: 'Automation Studio (rules-based)', launch: true, growth: true, scale: true, enterprise: true },
  { feature: 'Budget Allocator (cross-channel)', launch: true, growth: true, scale: true, enterprise: true },
  { feature: 'Google Ads, Meta Ads, Expedia TravelAds, GA4', launch: true, growth: true, scale: true, enterprise: true },
  { feature: 'Microsoft/Bing Ads and YouTube reporting', launch: true, growth: true, scale: true, enterprise: true },
  { feature: 'Additional OTA and ad network rollout review', launch: false, growth: true, scale: true, enterprise: true },
  { feature: 'Real-time sync (every 15 min)', launch: true, growth: true, scale: true, enterprise: true },
  { feature: 'Email & chat support', launch: true, growth: true, scale: true, enterprise: true },
  // Third and most consequential REST API claim: this matrix is what someone
  // picks a plan from. `formatCell` passes strings through, so the row now says
  // Planned instead of Yes rather than disappearing — a buyer who was counting
  // on it can still see it is coming, and cannot mistake it for shipped.
  { feature: 'REST API access', launch: '—', growth: 'Planned', scale: 'Planned', enterprise: 'Planned' },
  // REMOVED 2026-08-16 (owner: "we don't do it"):
  //   'Custom integrations (CRM, PMS, BI)'  — scale + enterprise
  //   'Dedicated customer success'          — scale + enterprise
  //   'SSO, custom contracts, SLA'          — enterprise
  // Three service tiers nobody staffs, in the table a buyer picks a plan from.
  // Deleted rather than marked Planned: unlike the REST API these are not on a
  // roadmap, and a Planned label would just be the same promise with a delay.
  // Enterprise's real difference is account scope and a quote, which the
  // 'Ad accounts included' row already states.
  { feature: 'Guided onboarding', launch: true, growth: true, scale: true, enterprise: true },
];

export const ourDifferentiators = [
  {
    title: 'One price, no surprises',
    body: 'We charge by ad account count, not by ad spend or percentage. No overage fees, no per-click add-ons. What you see is what you pay.',
  },
  {
    title: 'Google + Meta + travel ads in one place',
    body: 'Most teams lose time reconciling separate dashboards. We unify Google Ads, Meta Ads, Expedia TravelAds, analytics, and booking revenue context in a single AI and dashboard.',
  },
  {
    title: 'True cross-channel AI',
    body: 'Our AI optimizes across all connected accounts every 15 minutes, shifting budget and bids where they perform best instead of staying trapped inside one platform.',
  },
  {
    title: 'Built for travel and every vertical',
    body: 'Travel advertising is part of the product direction, with Expedia TravelAds in the current live focus and additional OTA channels reviewed during onboarding or custom rollout.',
  },
];

export const pricingPageFaqs = [
  {
    question: 'How is your pricing different from single-channel ad tools?',
    answer: 'Advertising Systems uses a flat monthly price by ad account count. You get unified supported ad accounts, AI optimization, and cross-channel analytics without percentage-of-spend pricing, overage fees, or hidden add-ons.',
  },
  {
    question: 'What counts as an "ad account"?',
    answer: 'Each connected advertising account counts as one account, such as one Google Ads account, one Meta Ads account, one Microsoft/Bing Ads account, or one supported OTA advertising account. Launch includes 1, Growth includes up to 5, Scale includes up to 15, and Enterprise is unlimited.',
  },
  {
    question: 'Are there any overage or extra fees?',
    answer: "No. Your software price is flat for the plan you choose. Ad spend remains separate, and we don't charge per click, per campaign, or percentage of spend.",
  },
  {
    question: 'Do you offer annual billing?',
    answer: "Yes. You can choose annual billing for a discount. We confirm billing details during demo or onboarding, and you can manage billing from account settings after setup. We don't require long-term contracts.",
  },
  {
    question: 'How can I evaluate the platform before committing?',
    answer: 'Select the plan you are considering and book a demo. The demo form keeps that plan selected, so we can review your ad account setup, plan fit, integrations, and onboarding path before you commit.',
  },
  {
    question: 'What happens when I select a plan?',
    answer: 'Plan buttons send you to the book-demo page with that plan preselected. We use it as sales context, not a checkout step, so you can confirm fit before starting billing.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Yes. Upgrade or downgrade anytime from your account. Changes apply at the start of the next billing cycle. We prorate when you upgrade.',
  },
  {
    question: 'Why is Enterprise "Custom"?',
    answer: 'Enterprise is for unlimited ad accounts and unlimited seats, priced to your scope rather than off the standard tiers. It is the same product as the other plans — there is no hidden enterprise feature set behind it. Book an Enterprise demo and we will quote against your account count, channels, and rollout.',
  },
];
