import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const llmsTxt = `# Advertising Systems
> AI-Powered Advertising Management Platform by Multisystems

## What is Advertising Systems?
Advertising Systems is an AI-powered advertising management platform that unifies Google Ads, Meta Ads, and OTA (Online Travel Agency) advertising campaigns into a single intelligent dashboard. It automates campaign optimization, provides real-time analytics, and uses AI to maximize return on ad spend (ROAS).

## Parent Company
Multisystems (https://www.multisystems.ai) — builds AI operating systems for service-driven businesses. Advertising Systems is part of the Multisystems product family alongside Hotel Systems (https://hotelsystems.ai), Reputation Systems (https://reputationsystems.ai), Revenue Systems (https://www.revenuesystems.app), OTA Systems (https://otasystems.ai), and Image Systems (https://imagesystems.ai).

## Core Features
- Multi-Platform Campaign Management: Manage Google Ads, Meta Ads (Facebook/Instagram), and OTA campaigns from one dashboard
- AI-Powered Optimization: Automated bid adjustment, budget reallocation, and audience targeting powered by machine learning
- Real-Time Analytics & ROI Tracking: Live performance dashboards, revenue attribution, and custom reporting
- Campaign Automation: Rules-based automation for campaign management tasks
- Budget Intelligence: AI-driven budget allocation across channels for maximum ROAS
- Cross-Platform Reporting: Unified reporting across all advertising channels

## Supported Platforms
Google Ads, Meta Ads (Facebook & Instagram), Booking.com, Expedia, TripAdvisor, Google Analytics, TikTok, LinkedIn, YouTube, Airbnb, Hotels.com, Bing Ads, Trivago, Kayak, Vrbo, Reddit Ads

## Pricing
- Launch: $199/month (1 ad account)
- Growth: $499/month (up to 5 ad accounts)
- Scale: $1,299/month (up to 15 ad accounts)
- Enterprise: Custom pricing (unlimited ad accounts)
Ad spend is separate. All plans include unlimited campaigns, AI optimization, and real-time analytics.

## Key Metrics
- $40K/month in hotel paid digital advertising managed through the platform
- $480K+ in annual hotel ad spend optimized
- 12 hours per week saved on average

## Target Audience
Business owners, marketing directors, and hotel/hospitality operators who manage advertising across multiple platforms and want to maximize their return on ad spend with AI-powered automation.

## Pages
- Homepage: https://advertisingsystems.ai/
- Features Overview: https://advertisingsystems.ai/features
- Campaign Intelligence: https://advertisingsystems.ai/features/campaign-management
- AI Optimization Engine: https://advertisingsystems.ai/features/ai-optimization
- Performance Analytics: https://advertisingsystems.ai/features/analytics
- Automation Studio: https://advertisingsystems.ai/features/automation
- Budget Allocator: https://advertisingsystems.ai/features/budget-intelligence
- Pricing: https://advertisingsystems.ai/pricing
- About: https://advertisingsystems.ai/about
- Blog: https://advertisingsystems.ai/blog
- Contact: https://advertisingsystems.ai/contact
- Book a Demo: https://advertisingsystems.ai/book-demo
- FAQ: https://advertisingsystems.ai/faq
- Case Studies: https://advertisingsystems.ai/case-studies
- Integrations: https://advertisingsystems.ai/integrations
- Knowledge Base: https://advertisingsystems.ai/knowledge-base
- Careers: https://advertisingsystems.ai/careers
- Decision Guides: https://advertisingsystems.ai/decision-guides
- Expedia TravelAds Guide: https://advertisingsystems.ai/decision-guides/expedia-travelads
- Booking Sponsored Listings Guide: https://advertisingsystems.ai/decision-guides/booking-sponsored-listings
- Expedia vs Booking Hotel Ads: https://advertisingsystems.ai/decision-guides/expedia-vs-booking-hotel-ads
- OTA Low Occupancy Ads: https://advertisingsystems.ai/decision-guides/ota-ads-low-occupancy
- vs Manual Management: https://advertisingsystems.ai/vs/manual
- vs Google Ads Only: https://advertisingsystems.ai/vs/google-ads
- vs Meta Ads Only: https://advertisingsystems.ai/vs/meta-ads
- Privacy Policy: https://advertisingsystems.ai/privacy
- Terms of Service: https://advertisingsystems.ai/terms
- Cookie Policy: https://advertisingsystems.ai/cookies
- Security: https://advertisingsystems.ai/security

## Contact
- Website: https://advertisingsystems.ai
- Demo: https://advertisingsystems.ai/book-demo
- Email: contact@multisystems.ai
- Parent: https://www.multisystems.ai
`;

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
