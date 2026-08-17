/**
 * Page-specific FAQ content. Each page has at least 10 questions relevant to that page.
 * Used by FAQSection.astro across the site.
 */

export const aboutFaqs = [
  { question: 'Who is behind Advertising Systems?', answer: "Advertising Systems is built by Multisystems, the same team behind Hotel Systems and ReputationSystems. We're a distributed team of engineers, data scientists, and marketers focused on making advertising profitable and effortless for businesses of every size." },
  // "in 30+ countries" removed 2026-08-16: an unverifiable aggregate of the same
  // class as the claims the honesty pass stripped from the feature pages. The
  // capability statement stands on its own without a number nobody can check.
  // "for years" removed 2026-08-16 (owner ruling) — same class as the "30+
  // countries" and "free audit" claims. The question is really "are you real",
  // and the verified export answers that better than a tenure number would.
  { question: 'How long have you been in business?', answer: "Advertising Systems is a Multisystems product, built by a team that has run this work from the operator side. Rather than lean on how long we have been around, we publish one verified 30-day platform export, reconciled line by line — judge us on that." },
  { question: 'Where is Advertising Systems available?', answer: 'Advertising Systems is available globally. Live platform support depends on the regions supported by Google Ads, Meta Ads, Expedia TravelAds, Microsoft/Bing Ads, YouTube, and any custom channels approved during onboarding. Support is offered in English with more languages coming.' },
  { question: 'What makes you different from other ad tech companies?', answer: "We unify Google, Meta, and OTA advertising in one AI engine and one dashboard. We're also part of the Multisystems ecosystem, so your ads can connect to reputation and revenue systems." },
  { question: 'Do you work with agencies?', answer: 'Yes. Agencies use Advertising Systems to manage multiple client accounts, get unified reporting, and deliver better ROAS. Contact us for agency-specific pricing and workflows.' },
  { question: 'What industries do you serve?', answer: 'We serve travel and hospitality, e-commerce, SaaS, and any business running paid campaigns across Google, Meta, or OTAs. Case studies span these verticals.' },
  { question: 'Can I evaluate the platform before buying?', answer: 'Yes. Choose the plan you are considering and book a demo. The demo form keeps that plan selected so we can walk through your account setup, plan fit, integrations, and onboarding path before you commit.' },
  // "Enterprise has dedicated channels" cut 2026-08-16 (owner: we don't do it)
  // — one of four places that invented an Enterprise service tier.
  { question: 'How do I get in touch with the team?', answer: 'Use the Contact page or book a demo. For product support once you are set up, email the address in your plan. Every plan reaches the same team — there is no separate queue you have to buy into.' },
  { question: 'Where is your company headquartered?', answer: 'Multisystems operates as a distributed company. Our team is spread across time zones; you can reach us via contact form, email, or demo booking.' },
  { question: 'Do you have a partner or reseller program?', answer: "We work with select partners. If you're interested in reselling or referring Advertising Systems, reach out via the contact form and we'll follow up." },
];

export const contactFaqs = [
  // Second instance of the 24-hour SLA (the contact PAGE carried the other two).
  // Cut 2026-08-16 with the rest: a response-time guarantee with nobody on a
  // rota is a promise that breaks exactly when the inbox is busiest.
  { question: 'How quickly do you respond?', answer: 'A person reads every message and replies as soon as they can — we would rather not quote a turnaround we cannot hold to every time. If something is urgent, say so in the first line and it gets moved up. Booking a demo is the fastest route to a scheduled conversation, since it goes straight into the calendar.' },
  { question: 'Can I get a personalized demo?', answer: "Yes. Book a demo and we'll walk you through the platform with your use case in mind. Demos are free, about 30 minutes, and there's no commitment." },
  { question: 'Do you have phone support?', answer: "Not as a standing line. Email or the contact form is the fastest way to reach us, and we will move to a call whenever that is genuinely quicker than typing — say so in your message and we will set one up." },
  { question: 'What should I include in my message?', answer: 'Your name, company, and what you need (demo, pricing, technical question). The more context you give, the faster we can help.' },
  { question: 'Can I request a specific integration?', answer: 'Yes. Tell us which platform or tool you need. We prioritize based on demand and will let you know if and when we can support it.' },
  { question: 'Do you offer onboarding or implementation help?', answer: 'Yes, and it is included on every plan rather than sold as a tier — we walk you through connecting accounts and checking that the numbers reconcile before spend moves. Ask in your message if your setup has anything unusual in it.' },
  { question: 'Where do I go for product support after I sign up?', answer: 'In-app chat and email support are available on all plans. Check the Knowledge Base first; our team is there for anything that is not covered.' },
  { question: 'I have a press or partnership inquiry. Where do I send it?', answer: 'Use the contact form and select or mention "Partnership" or "Press" in your message. We route those to the right team.' },
  { question: 'Can you help with a security or privacy concern?', answer: 'For security issues, email security@advertisingsystems.ai. For privacy and data requests, see our Privacy Policy or email privacy@advertisingsystems.ai.' },
  { question: 'What if I need to talk to sales?', answer: 'Submit the contact form or book a demo and choose "Talk to sales" or mention Enterprise. Our team will get back to you with next steps.' },
];

export const blogFaqs = [
  { question: 'How often do you publish?', answer: 'We publish new articles regularly — product updates, advertising tips, case studies, and industry trends. Subscribe to our newsletter for a weekly digest.' },
  { question: 'Can I contribute a guest post?', answer: 'We occasionally work with industry experts. If you have a strong angle on advertising, ROAS, or cross-channel strategy, reach out via contact with your idea.' },
  { question: 'Where can I get product help?', answer: 'For how-to guides and setup, check our Knowledge Base. For general questions, see the main FAQ or contact support.' },
  { question: 'Do you cover OTA and travel advertising?', answer: 'Yes. We write about Google, Meta, and OTA (Booking.com, Expedia, TripAdvisor) advertising, plus cross-channel strategy and AI optimization.' },
  { question: 'Can I share or republish your articles?', answer: 'Contact us for permission. We generally allow sharing with attribution and a link. No republishing of full articles without approval.' },
  { question: 'How do I subscribe to the newsletter?', answer: 'Use the signup form on this blog page or on the homepage. We send a weekly digest; you can unsubscribe anytime.' },
  { question: 'Do you have a podcast or video content?', answer: "We're expanding into more formats. Follow our blog and newsletter for updates on new content types." },
  { question: 'Where can I find case studies?', answer: 'Case studies appear on the blog and on the dedicated Case Studies page. Filter by industry or outcome to find relevant stories.' },
  { question: 'How do I suggest a topic?', answer: 'We welcome topic ideas. Use the contact form and mention "Blog topic idea" — we consider reader suggestions when planning content.' },
  { question: 'Are blog posts used for SEO only?', answer: 'We write for both readers and search. Every post is meant to be useful: tactics, product updates, or real customer outcomes.' },
];

export const careersFaqs = [
  { question: 'Are you hiring remotely?', answer: "Yes. We're a remote-first team. We hire based on talent and fit, not location. Some roles may have time-zone or regional preferences." },
  { question: "What's the interview process like?", answer: 'It varies by role but typically includes a screening call, skills or portfolio review, and team interviews. We move quickly and keep you informed at each step.' },
  { question: 'Do you offer internships?', answer: "We occasionally have internship opportunities. Send your resume and interests to careers@multisystems.ai and we'll get back to you if something matches." },
  { question: 'What benefits do you offer?', answer: 'We offer competitive equity, health and wellness coverage, learning stipends, and remote-first flexibility. Details are shared during the process.' },
  { question: 'Do I need to be in a specific time zone?', answer: 'It depends on the role. Some positions require overlap with US or EU hours; others are flexible. We specify in the job description.' },
  { question: 'Can I apply for multiple roles?', answer: "Yes. Apply to each role that fits. If we think you're a better fit for another opening, we may suggest that instead." },
  { question: 'How do I stay updated on new openings?', answer: 'Check this careers page and our job board. You can also send your resume to careers@multisystems.ai to be considered for future roles.' },
  { question: 'Do you sponsor visas?', answer: 'We consider visa sponsorship on a case-by-case basis for the right role. Ask the recruiter during the process.' },
  { question: 'What does "ship with purpose" mean at Multisystems?', answer: "It means we build features that solve real customer problems. Every project ties back to helping businesses get better advertising results." },
  { question: 'Is the culture really transparent?', answer: 'We share roadmap, metrics, and decisions openly with the team. We believe transparency builds trust and better outcomes.' },
];

export const caseStudiesFaqs = [
  { question: 'Why is there only one case study?', answer: 'Because we only publish what we can verify. Every case on this page is a real platform export, reconciled against its own daily data, published with the property’s details withheld until we have written consent to name them. More cases appear as they clear that bar.' },
  { question: 'Are the numbers verified?', answer: 'Yes, and here is what that means: every headline figure is recomputed from the platform export’s own daily series — spend, bookings, room nights and revenue summed line by line — not copied from a summary screen. Where the export itself contained internal errors, we corrected them and used the reconciled figures.' },
  { question: 'Why is the property not named?', answer: 'Naming a property requires its written consent, which we have not published without. The case identifies the segment and market type only. The numbers lose nothing by the name being withheld.' },
  // "We provide a free audit before onboarding" removed 2026-08-16 (owner
  // ruling: not a service we offer). Replaced with an actual answer to the
  // timing question, drawn from behaviour the site already documents.
  { question: 'How long does it take to see results?', answer: 'It depends on your starting point, ad spend, tracking quality, and market. Once accounts are connected the engine works on its normal 15-minute cycle from day one, but a channel needs enough conversion volume before its numbers mean anything. The published case covers a single 30-day window on one channel — evidence, not a forecast for your property.' },
  { question: 'Do you work with small businesses?', answer: 'Yes. Our Launch plan is built for smaller teams — one ad account, one operator. The same AI and workflows apply at every scale.' },
  { question: 'Can I talk to a reference customer?', answer: 'We can sometimes connect you with a reference after you’re in a serious evaluation stage. Ask your demo contact.' },
  { question: 'What if my results are different?', answer: 'They will be — results vary by industry, spend, and starting point, and a single-property case is not a forecast. That is exactly why we publish reconciled data instead of aggregate claims.' },
  { question: 'What metrics do you report?', answer: 'What the platform export reports: spend, impressions, clicks, CTR, CPC, bookings, room nights, booking revenue, ROAS, sponsored rank, and pacing. If it isn’t in the export, it isn’t in the case.' },
  { question: 'Can I use a case study in my own materials?', answer: 'Contact us for permission. We often allow quotes or summaries with attribution and approval.' },
  { question: 'How do I get results like these?', answer: 'Start with a demo. We will review your ad accounts, plan fit, goals, and current reporting before you connect accounts and start using AI recommendations.' },
];

export const integrationsFaqs = [
  { question: 'How do I connect my ad accounts?', answer: 'Use OAuth for supported live platforms such as Google, Meta, Expedia TravelAds, Google Analytics, Microsoft/Bing Ads, and YouTube. You sign in with your existing credentials; we request the access needed for reporting and optimization.' },
  // Second REST API claim (the integrations page carried the other). Cut
  // 2026-08-16 with it — and note it also pointed at "our API docs", which do
  // not exist anywhere in the repo or the sitemap.
  { question: 'Is there an API for custom integrations?', answer: 'Not yet. A REST API for CRM, BI and internal-tool connections is planned rather than shipped, and we list it that way so nobody picks a plan for it. Tell us what you would connect and to what — that is what decides the order things get built in.' },
  { question: "What if my platform isn't listed?", answer: "We add new integrations regularly. Tell us what you use via the Request Integration link or contact form — we prioritize based on demand." },
  { question: 'Can I request TikTok, LinkedIn, Reddit, or another ad network?', answer: 'Yes. Some networks are planned or early-access rather than live for every account. Tell us which channels you need during the demo, and we will confirm what is available now versus what requires custom rollout.' },
  { question: 'Can I connect multiple Google or Meta accounts?', answer: 'Yes. Your plan limits how many ad accounts you can connect: Launch includes 1, Growth includes up to 5, Scale includes up to 15, and Enterprise is unlimited. Each account is connected via OAuth.' },
  { question: 'How often does data sync?', answer: 'Data syncs every 15 minutes by default. Critical metrics can update more frequently. You can see last sync time in the dashboard.' },
  { question: 'Do you integrate with Google Analytics?', answer: 'Yes. Google Analytics 4 can be connected for attribution and conversion data. This helps the AI optimize based on full-funnel results.' },
  { question: 'What about CRM or PMS integrations?', answer: 'Growth, Scale, and Enterprise plans include API access so you can build or use pre-built connectors to your CRM or property management system.' },
  { question: 'Is my OAuth data secure?', answer: 'Yes. We use official OAuth flows; we never see your password. Tokens are encrypted and stored securely. See our Security page for details.' },
  { question: 'Can I disconnect an integration later?', answer: 'Yes. You can disconnect any account from your account settings. Data already synced may be retained per our data policy; we don’t keep pushing changes once disconnected.' },
];

export const knowledgeBaseFaqs = [
  { question: 'Where do I start?', answer: 'Start with the Quick start guide, then Account setup and Your first campaign. Those three get you live in under 15 minutes.' },
  { question: 'How do I get help with a specific feature?', answer: 'Use the category cards to find your topic (e.g. AI & Optimization, Integrations). Each category lists the main articles. Can\'t find it? Check the main FAQ or contact support.' },
  { question: 'Do you have video tutorials?', answer: "We're adding video walkthroughs for key flows. In the meantime, the written guides and in-app tooltips cover setup and daily use." },
  { question: 'How do I connect Google Ads?', answer: 'Go to Integrations in the app, choose Google Ads, and sign in with the Google account that owns the ad account. Grant the requested permissions.' },
  { question: 'How do I connect Meta Ads?', answer: 'In Integrations, select Meta Ads and log in with your Facebook account. Choose the ad account(s) and grant access. Same for Instagram if linked.' },
  { question: 'What is the AI Optimization Engine?', answer: 'It’s our module that automatically adjusts bids, budgets, and targeting across connected platforms. It learns from your data and runs every 15 minutes.' },
  { question: 'How do I create a campaign?', answer: 'Use Campaign Intelligence: create a new campaign, choose objective and channels, set budget and targeting. Guides in the Knowledge Base walk through each step.' },
  { question: 'Where do I see my invoices?', answer: 'Account & Billing in the app (or in your account settings). You can download invoices and update payment method there.' },
  { question: 'How do I add team members?', answer: 'In Account & Billing, open Team or Users and invite by email. You can set roles and permissions per person.' },
  { question: 'Can I export my data?', answer: 'Yes. Use reporting and export options in the dashboard. API access on Growth, Scale, and Enterprise also lets you pull data into your own systems.' },
];

export const signupFaqs = [
  { question: 'Do I need a credit card to start?', answer: 'No. The website signup request does not collect payment details. Payment details are collected only when you select a paid plan in the secure app.' },
  { question: 'What happens after I submit the signup form?', answer: 'We record your signup intent, send a confirmation, and direct you to the secure app flow to continue account setup.' },
  { question: 'Can I change plans later?', answer: 'You can upgrade or downgrade anytime from your account. Changes apply at the start of the next billing cycle; we prorate when you upgrade.' },
  { question: 'What do I get after signup?', answer: 'You can continue account setup in the secure app, connect your ad accounts, and choose the plan that fits your team.' },
  { question: 'How many ad accounts can I connect?', answer: 'Launch: 1. Growth: up to 5. Scale: up to 15. Enterprise: unlimited. You choose your plan at signup and can change it later.' },
  { question: 'Is there a long-term contract?', answer: 'No. All plans are month-to-month. Cancel anytime from your account. We don’t lock you into annual contracts unless you choose an annual discount.' },
  { question: 'What payment methods do you accept?', answer: 'We accept major credit cards and, for Enterprise, invoice billing. Payment details are collected only when you choose a paid plan.' },
  { question: 'Can I use my work email?', answer: 'Yes. Use the email you use for your ad accounts so we can match your data and send important product updates.' },
  { question: 'What if I already have an account?', answer: 'Use the Log in link instead of signing up. If you forgot your password, use the password reset flow on the login page.' },
  { question: 'Do you offer annual billing?', answer: 'Yes. You can choose annual billing for a discount. The option appears when you subscribe or in your account settings.' },
];

export const bookDemoFaqs = [
  { question: 'Is the demo really free?', answer: 'Yes. The demo is free and there’s no obligation. We show you the platform and discuss how it could work for your business.' },
  { question: 'How long is the demo?', answer: 'About 30 minutes. We’ll walk through the modules that matter most to you and leave time for your questions.' },
  { question: 'What if I selected a plan from the pricing page?', answer: 'That plan is carried through to the booking page and shown above the scheduler, so you know which one you picked. If you came directly to the demo page, we do not ask for plan interest up front. You can compare plans or discuss a better fit during the call.' },
  { question: 'What if I need to reschedule?', answer: 'Use the reschedule or cancel link in your booking confirmation email, or reply to the calendar invite. We’re happy to find another time that works.' },
  { question: 'Who will I meet with?', answer: 'A product specialist or solutions lead who knows the platform and can answer technical and commercial questions.' },
  { question: 'Can I invite my team?', answer: 'Yes. Include their email when you book or reply to the confirmation, and we’ll send them the meeting link.' },
  { question: 'Do you do demos in my time zone?', answer: 'Yes. The scheduler detects your timezone and shows every available slot in local time, so what you pick is what you get.' },
  { question: 'What do I need to prepare?', answer: 'Nothing required. If you have ad account metrics or goals in mind, that helps us tailor the walkthrough.' },
  { question: 'Will you try to sell me something?', answer: 'We’ll show you the product and discuss fit and pricing. There’s no pressure; the goal is to help you decide if Advertising Systems is right for you.' },
  { question: 'Can we review billing and ad spend on the call?', answer: 'Yes. We can review software plan cost, media spend, expected account count, and whether Launch, Growth, Scale, or Enterprise is the right starting point.' },
  { question: 'What happens after the demo?', answer: 'You’ll get follow-up next steps based on the plan and account setup we discussed, including the secure signup or onboarding path if you decide to continue.' },
];

/**
 * HONESTY PASS 2026-08-16 — owner ruling: we do not hold SOC 2 Type II.
 * "Yes. We're SOC 2 Type II certified" was the single highest-risk sentence on
 * the site: it is the one claim enterprise procurement verifies, and answering
 * a direct compliance question falsely is worse than having no certification.
 * The answer now says where we actually are. Third-party penetration testing
 * and the hardware security module went with it — same class, same absence of
 * an artefact to show.
 */
export const securityFaqs = [
  { question: 'Is my data encrypted?', answer: 'Yes. Data is encrypted in transit with TLS and at rest with AES-256. API tokens and OAuth credentials are stored encrypted, under keys separate from the application data.' },
  { question: 'Are you SOC 2 certified?', answer: 'Not today. We are not going to claim a certification we do not hold — if you ask this question, you will check. We are happy to complete your security questionnaire and walk through our controls in detail, and we will say plainly where a control is a practice rather than an audited artefact.' },
  { question: 'How do I report a security issue?', answer: 'Email security@advertisingsystems.ai with details. We respond within 2 business days and don’t pursue legal action against researchers who follow responsible disclosure.' },
  { question: 'Do you sell or share my data?', answer: 'No. We don’t sell your data, share it with other customers, use it to target advertising, or train models on it. It is used to run your account and nothing else. See our Privacy Policy.' },
  { question: 'Where is data stored?', answer: 'On managed cloud infrastructure. If you have a specific residency requirement, ask before you sign — we will tell you whether we can meet it rather than assume.' },
  { question: 'How do you handle access to production?', answer: 'Production access requires multi-factor authentication, is limited to the people whose job needs it, and is granted per task rather than standing.' },
  { question: 'What about GDPR or CCPA?', answer: 'We support data subject access, export and deletion requests. See our Privacy Policy for the full detail and how to make a request.' },
  { question: 'Can I get a security questionnaire or SIG?', answer: 'Yes. Send it over and we will complete it, including the questions where the honest answer is “not yet”. Contact security@advertisingsystems.ai.' },
  { question: 'How are credentials stored?', answer: 'Ad platforms connect over OAuth, so we never receive or store your Google, Meta or Microsoft passwords. The OAuth tokens we do hold are encrypted, and you can revoke our access from the platform at any time.' },
];

export const featuresIndexFaqs = [
  { question: 'Do I need all five modules?', answer: 'You get access to all modules on your plan. Most customers use Campaign Intelligence and AI Optimization from day one, then adopt Analytics, Automation, and Budget Allocator as they scale.' },
  { question: 'How is this different from using each platform alone?', answer: 'Advertising Systems unifies supported ad accounts, analytics, booking revenue context, and AI recommendations in one place. You avoid switching tabs and manual reporting while the AI helps optimize across connected channels.' },
  { question: 'Can I evaluate before I buy?', answer: 'Yes. Select the plan you are considering and book a demo. We will use that plan as context while we walk through the product, connected account needs, and onboarding path.' },
  { question: 'What is Campaign Intelligence?', answer: 'It’s your single command center: create and manage campaigns across Google, Meta, and OTAs from one dashboard instead of logging into each platform.' },
  { question: 'What is the AI Optimization Engine?', answer: 'It automatically adjusts bids, budgets, and targeting across connected accounts every 15 minutes using reinforcement learning and your performance data.' },
  { question: 'What is Performance Analytics?', answer: 'Real-time dashboards, cross-channel attribution, and anomaly detection. You see true ROI and can slice by channel, campaign, or time period.' },
  { question: 'What is Automation Studio?', answer: 'Rules-based automation: set conditions and actions (e.g. pause underperformers, shift budget). The system executes so you don’t have to do repetitive tasks manually.' },
  { question: 'What is Budget Allocator?', answer: 'AI-driven budget distribution across channels and campaigns. It shifts spend to top performers in real time to maximize ROAS.' },
  { question: 'How do I get started with the platform?', answer: 'Choose a plan from pricing and book a demo. The selected plan carries into the demo form, then we confirm account scope and guide you through secure OAuth connection during onboarding.' },
  { question: 'Where can I see pricing?', answer: 'See the Pricing section on the homepage or the Pricing Intelligence page. Plans are based on ad account count; no per-click or hidden fees.' },
];

/** Generic FAQ for feature subpages (campaign, ai-optimization, analytics, automation, budget-intelligence) */
export const featureSubpageFaqs = [
  { question: 'How do I get access to this feature?', answer: 'All plans include access to our core modules. Connect your ad accounts in the dashboard and the feature is available. Book a demo if you want a walkthrough.' },
  { question: 'Does this work with my ad platforms?', answer: 'Yes for supported live platforms including Google Ads, Meta Ads, Expedia TravelAds, Google Analytics, Microsoft/Bing Ads, and YouTube. Additional OTA or ad network connections are reviewed during demo or custom rollout.' },
  { question: 'Where can I see pricing?', answer: 'See our Pricing Intelligence page or the pricing section on the homepage. Plans are based on the number of ad accounts; there are no per-click or hidden fees.' },
  { question: 'Do I need to install anything?', answer: 'No. Advertising Systems is a cloud platform. You connect accounts via OAuth in the browser; no desktop install or plugin required.' },
  { question: 'How long until I see results?', answer: 'Most customers see meaningful improvements within 30–90 days. The AI starts optimizing soon after you connect; results depend on your starting point and spend.' },
  { question: 'Can I turn off or limit the AI?', answer: 'Yes. You can set guardrails, approval workflows, or manual-only mode. You stay in control of how much the system automates.' },
  { question: 'Does this replace my existing ad accounts?', answer: 'No. We connect to your existing Google, Meta, and OTA accounts. We optimize and report; your accounts stay where they are.' },
  { question: 'What if I use an agency or freelancer?', answer: 'You can add team members and control their access. Agencies often use Advertising Systems to manage multiple client accounts from one place.' },
  { question: 'Can I evaluate this feature first?', answer: 'Yes. Book a demo and we can walk through the feature, connected account requirements, and plan fit before you commit.' },
  { question: 'Where do I get support?', answer: 'Knowledge Base first, then email support — on every plan, from the same team. Our team can walk you through any feature on this page if the guide does not cover your case.' },
];

/** OTA Advertising page FAQ */
export const otaAdvertisingFaqs = [
  { question: 'What is OTA advertising?', answer: "OTA (Online Travel Agency) advertising lets hotels and properties pay for premium visibility on platforms like Booking.com, Expedia, TripAdvisor, and Google Hotel Ads. Most OTAs use cost-per-click (CPC) or cost-per-acquisition (CPA) models where you bid for higher placement in search results." },
  { question: 'Which OTA platforms will Advertising Systems support?', answer: "Expedia TravelAds is part of the current live focus. Other OTA and travel channels such as Booking.com, TripAdvisor, Trivago, Hotels.com, Kayak, and Vrbo are handled as planned, early-access, or custom rollout depending on the account. Book a demo and we will confirm what is available for your property." },
  { question: 'How does OTA advertising differ from Google or Meta Ads?', answer: "OTA ads target travelers who are already searching for accommodation — the intent is much higher. Instead of broad keyword or interest targeting, you bid on placement within OTA search results based on check-in dates, travel windows, and traveler origin. The conversion path is shorter but competition for top positions is fierce." },
  { question: 'What is a Sponsored Listing on Booking.com?', answer: "Booking Holdings Sponsored Listings let your property appear in premium positions (typically #2 in search) across Booking.com, Priceline, and Agoda. It uses a second-price CPC auction — you bid, but only pay the minimum needed to win. 80% of bookings go to first-page properties, so visibility matters." },
  { question: "What is Expedia's TravelAds?", answer: "TravelAds is Expedia Group's pay-per-click platform. Your property appears as a sponsored listing across 200+ travel sites and apps reaching 10M+ daily visitors. You control CPC bids, daily budgets, and can create custom audience segments by geography, trip type, and traveler behavior." },
  { question: 'How does Advertising Systems optimize OTA bids?', answer: "Our AI analyzes occupancy levels, seasonality patterns, local rate signals, and traveler intent signals to adjust CPC and CPA bids in real time across every connected OTA. It automatically pauses spend during high-occupancy periods and shifts budget to the OTA delivering the best ROAS." },
  { question: 'Can I manage OTA ads and Google/Meta ads in one place?', answer: "Yes, for supported connected channels. Advertising Systems brings Google, Meta, Expedia TravelAds, analytics, and booking-performance context into one operating view, with additional OTA channels reviewed during onboarding." },
  { question: 'What is occupancy-aware ad pacing?', answer: "It means automatically reducing or pausing OTA ad spend when your property is close to full occupancy. Instead of paying CPC commissions on bookings you would receive organically, the AI holds budget for low-occupancy periods when paid visibility has the highest incremental impact." },
  { question: 'How much do OTA ads cost?', answer: "Costs vary by platform and market. Booking.com uses second-price CPC auctions (you pay just above the next-highest bid). TripAdvisor Sponsored Placements start from ~$2.69/day. Expedia TravelAds lets you set your own CPC and daily budget. Trivago moved to a 10%+ CPA model. Our platform helps you optimize spend across all of them." },
  { question: 'When will OTA advertising be available on the platform?', answer: "OTA integrations are currently in development. We are onboarding properties for early access. Sign up for the waitlist on this page or book a demo to discuss your OTA advertising needs and get notified when integrations go live." },
];

/** Generic FAQ for vs comparison pages */
export const vsPageFaqs = [
  { question: 'Can I evaluate Advertising Systems before switching?', answer: 'Yes. Book a demo with the plan you are considering. You can review the workflow and keep using your current tools while you evaluate fit.' },
  { question: 'How long does migration take?', answer: 'Most teams are live in under 15 minutes. OAuth connects your accounts; historical data syncs automatically. No need to recreate campaigns.' },
  { question: 'What if I use both Advertising Systems and another tool?', answer: 'You can. Some customers run Advertising Systems for unified AI and reporting while keeping a legacy tool for a specific use case. We focus on being the single place for cross-channel optimization.' },
  { question: 'Will I lose my historical data?', answer: 'No. We import historical performance data when you connect. You keep your data in the original platforms too; we don’t delete anything.' },
  { question: 'Do you support the same ad platforms?', answer: 'Live support focuses on Google Ads, Meta Ads, Facebook, Instagram, Expedia TravelAds, Google Analytics, Microsoft/Bing Ads, and YouTube. Other OTA and ad network connections are reviewed during demo or custom rollout.' },
  { question: 'Is pricing similar?', answer: 'We use simple subscription pricing by ad account count — no per-click or percentage-of-spend fees. Compare with your current tool; many teams save while gaining cross-channel capability.' },
  { question: 'Can I import my campaigns or structure?', answer: 'We connect to your existing accounts; campaigns stay where they are. We don’t require you to recreate structure. The AI optimizes within your current setup.' },
  { question: 'What if my team is used to the other tool?', answer: 'We have a familiar dashboard and clear reporting. Many teams adopt Advertising Systems quickly. We also offer onboarding and support to smooth the transition.' },
  // "audit" as a migration step read as the same offer; "verify" is what the
  // step actually is — checking the connection and tracking before spend moves.
  { question: 'Do you have a migration or switch playbook?', answer: 'Yes. We’ll walk you through the connect, verify, and optimization steps. Book a demo and we can outline a migration plan for your case.' },
  { question: 'Why would I switch from a tool I already use?', answer: 'If you run Google, Meta, and OTAs (or plan to), one platform and one AI can replace multiple tools, reduce manual work, and improve cross-channel ROAS. A demo or guided evaluation shows the difference.' },
];
