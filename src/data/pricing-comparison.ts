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
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
}

export const planFeatureMatrix: PlanFeatureRow[] = [
  { feature: 'Ad accounts', starter: 'Up to 2', professional: 'Up to 10', enterprise: 'Unlimited' },
  { feature: 'Campaign Intelligence (unified dashboard)', starter: true, professional: true, enterprise: true },
  { feature: 'AI Optimization Engine (autonomous bids & budgets)', starter: true, professional: true, enterprise: true },
  { feature: 'Performance Analytics & attribution', starter: true, professional: true, enterprise: true },
  { feature: 'Automation Studio (rules-based)', starter: true, professional: true, enterprise: true },
  { feature: 'Budget Allocator (cross-channel)', starter: true, professional: true, enterprise: true },
  { feature: 'Google Ads, Meta Ads, OTA integrations', starter: true, professional: true, enterprise: true },
  { feature: 'TikTok, LinkedIn, Bing, Pinterest', starter: true, professional: true, enterprise: true },
  { feature: 'Real-time sync (every 15 min)', starter: true, professional: true, enterprise: true },
  { feature: 'Email & chat support', starter: true, professional: true, enterprise: true },
  { feature: 'REST API access', starter: false, professional: true, enterprise: true },
  { feature: 'Custom integrations (CRM, PMS, BI)', starter: false, professional: true, enterprise: true },
  { feature: 'Dedicated customer success', starter: false, professional: false, enterprise: true },
  { feature: 'SSO, custom contracts, SLA', starter: false, professional: false, enterprise: true },
  { feature: 'Guided onboarding', starter: true, professional: true, enterprise: true },
];

export const ourDifferentiators = [
  {
    title: 'One price, no surprises',
    body: 'We charge by ad account count, not by ad spend or percentage. No overage fees, no per-click add-ons. What you see is what you pay.',
  },
  {
    title: 'Google + Meta + OTAs in one place',
    body: 'Most teams lose time reconciling separate dashboards. We unify Google Ads, Meta Ads, and OTA campaigns (Booking.com, Expedia, TripAdvisor) in a single AI and dashboard.',
  },
  {
    title: 'True cross-channel AI',
    body: 'Our AI optimizes across all connected accounts every 15 minutes, shifting budget and bids where they perform best instead of staying trapped inside one platform.',
  },
  {
    title: 'Built for travel and every vertical',
    body: 'OTA integration is built in. Part of the Multisystems ecosystem so your ads connect to hotel and reputation systems when you need it.',
  },
];

export const pricingPageFaqs = [
  {
    question: 'How is your pricing different from single-channel ad tools?',
    answer: 'Advertising Systems uses a flat monthly price by ad account count. You get unified Google Ads, Meta Ads, OTA reporting, AI optimization, and cross-channel analytics without percentage-of-spend pricing, overage fees, or hidden add-ons.',
  },
  {
    question: 'What counts as an "ad account"?',
    answer: 'Each connected Google Ads account, Meta Ads account, or OTA advertising account (e.g. one Booking.com, one Expedia) counts as one. Starter allows 2, Professional 10, Enterprise unlimited.',
  },
  {
    question: 'Are there any overage or extra fees?',
    answer: "No. If you're on Professional with 10 accounts, you pay $249/mo whether those accounts spend $1K or $500K. We don't charge per click, per campaign, or percentage of spend.",
  },
  {
    question: 'Do you offer annual billing?',
    answer: "Yes. You can choose annual billing for a discount. The option appears at signup or in your account settings. We don't require long-term contracts.",
  },
  {
    question: 'How can I evaluate the platform before committing?',
    answer: 'Book a demo or create a signup request. We can review your ad account setup, plan fit, integrations, and onboarding path before you commit.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Yes. Upgrade or downgrade anytime from your account. Changes apply at the start of the next billing cycle. We prorate when you upgrade.',
  },
  {
    question: 'Why is Enterprise "Custom"?',
    answer: 'Enterprise is for unlimited ad accounts, dedicated success, SSO, custom SLAs, and tailored contracts. We quote based on your account count and requirements. Contact sales for a proposal.',
  },
];
