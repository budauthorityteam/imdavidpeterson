// -----------------------------------------------------------------------------
// PROFILE: single source of truth for identity + external links.
// TODO(David): replace the `-placeholder` URLs below with your real profiles.
// These feed the footer, contact page, and (for the real ones) the JSON-LD in
// index.html. Leave a value as null to hide that link everywhere.
// -----------------------------------------------------------------------------
export const PROFILE = {
  name: 'David Peterson',
  email: 'davidpetersonri@gmail.com',
  siteUrl: 'https://imdavidpeterson.com',
  location: 'Rhode Island, USA',
  agency: { name: 'BudAuthority', url: 'https://budauthority.com' },
  social: {
    linkedin: 'https://linkedin.com/in/imdavidpeterson-placeholder',
    twitter: 'https://twitter.com/imdavidpeterson-placeholder',
    instagram: 'https://instagram.com/imdavidpeterson-placeholder',
    youtube: 'https://youtube.com/imdavidpeterson-placeholder',
  },
  realEstate: 'https://davidpeterson.realestate-placeholder.com',
} as const;

export interface ProofPoint {
  id: string;
  metric: string;
  label: string;
  detail: string;
  location: string;
  year?: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  whoItsFor: string[];
  engagement: string;
  problemsSolved: string[];
}

export interface MediaProject {
  id: string;
  title: string;
  role: string;
  description: string;
  link: string;
  badge?: string;
  type: 'podcast' | 'agency' | 'book';
}

export interface TimelineStop {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  highlightMetric?: {
    value: string;
    label: string;
  };
}

export const PROOF_POINTS: ProofPoint[] = [
  {
    id: "aurea-growth",
    metric: "$30M+",
    label: "ARR GROWTH FROM $5M",
    detail: "Grew Aurea's channel business unit from $5M ARR in 2012 to $30M+ by September 2015 using an 80/20 organic growth strategy focused on the existing account base.",
    location: "Austin, TX",
    year: "2012 - 2015"
  },
  {
    id: "operations-leadership",
    metric: "350+",
    label: "TEAM MEMBERS MANAGED",
    detail: "Led an organization of 350+ team members as the senior operations leader, orchestrating complex cross-functional alignment and scale.",
    location: "New York, NY",
    year: "Senior Operations Leader"
  },
  {
    id: "inside-sales",
    metric: "300%+",
    label: "US INSIDE SALES REVENUE YTD",
    detail: "Grew inside sales 300%+, e-commerce revenue 150%+, and retail foot traffic across 17 stores 200%+ YTD from August 2020 to May 2021.",
    location: "Rocky Hill, CT",
    year: "2020 - 2021"
  },
  {
    id: "marketing-budget",
    metric: "$5.5M+",
    label: "REVENUE GENERATED",
    detail: "Managed a $600K/year marketing budget and P&L that drove $5.5M+ in revenue over 2.5 years, optimizing CAC and expanding margins.",
    location: "Austin, TX",
    year: "P&L Ownership"
  },
  {
    id: "budauthority",
    metric: "30+",
    label: "ACTIVE RETAINER CLIENTS",
    detail: "Founder and principal of BudAuthority, a digital marketing agency serving 30+ retainer clients with proprietary SEO intelligence software.",
    location: "Rhode Island",
    year: "Agency Founder"
  },
  {
    id: "digital-rebuild",
    metric: "100%",
    label: "ONLINE TRANSITION SUCCESS",
    detail: "Executed a complete organizational rebrand and rebuilt IT infrastructure to move a national education organization fully online, including a custom membership and payment platform.",
    location: "Tucson, AZ",
    year: "Infrastructure Overhaul"
  },
  {
    id: "onthegosystems",
    metric: "1st",
    label: "PRODUCT & SALES LEAD",
    detail: "Led product development, sales, and marketing for a new business entity owned by OnTheGoSystems, establishing brand-market fit and commercial channels.",
    location: "Wan Chai, Hong Kong",
    year: "Product Strategy"
  }
];

export const SERVICES: Service[] = [
  {
    id: "fractional-executive",
    title: "Fractional Executive",
    tagline: "Senior leadership without the full-time overhead",
    description: "An embedded operator for mid-market and fast-growing companies that need veteran leadership across operations, marketing, or technology but aren't ready for a full-time executive salary.",
    whoItsFor: [
      "Founders overwhelmed by daily operational drag",
      "SMEs scaling from $5M to $30M+ needing structured leadership",
      "Organizations in transition requiring an experienced turn-around hand"
    ],
    engagement: "Retainer-based, integrated deeply into your Slack, standups, and leadership team. Minimum 3-month commitment.",
    problemsSolved: [
      "Operational bottlenecks and broken internal communication",
      "Lack of scaling systems, KPIs, and structured P&L tracking",
      "Misaligned product, sales, and marketing teams"
    ]
  },
  {
    id: "consulting-advisory",
    title: "Consulting & Advisory",
    tagline: "Surgical, project-based problem solving",
    description: "High-impact advisory at the intersection of marketing technology, operations, and organic search. I come in to solve specific, complex roadblocks with absolute clarity and practical execution roadmaps.",
    whoItsFor: [
      "PE-backed portfolio companies needing an independent audit",
      "Teams struggling to execute large-scale digital rebranding/infrastructure migrations",
      "Founders seeking an objective sounding board who has actually been in the trenches"
    ],
    engagement: "Project-scoped deliverables or monthly recurring advisory sessions. Clear, upfront milestones with zero fluff.",
    problemsSolved: [
      "Muddled positioning and ineffective marketing spend ($600k P&L scale experience)",
      "Legacy software architectures blocking digital migration",
      "SEO & Organic acquisition stagnation (powered by agency-level insights)"
    ]
  },
  {
    id: "speaking-workshops",
    title: "Speaking & Workshops",
    tagline: "Direct, raw, battle-tested keynotes",
    description: "Remote or in-person speaking engagements for executive groups, entrepreneurial hubs, and conferences. Topics center on organizational change, the intrapreneur philosophy, and the unfiltered truth about scaling.",
    whoItsFor: [
      "Corporate leadership retreats driving digital transformations",
      "Business incubators and accelerator groups",
      "Industry events looking for a high-energy speaker with zero corporate fluff"
    ],
    engagement: "Single-session keynotes or half-day interactive executive workshops.",
    problemsSolved: [
      "Indecision and fear of disruptive organizational change",
      "Disengaged team members lacking ownership mindset",
      "Over-complicated, theoretical strategies that fail on Monday morning"
    ]
  }
];

export const PROJECTS: MediaProject[] = [
  {
    id: "taking-back-entrepreneurship",
    title: "Taking Back Entrepreneurship",
    role: "Host",
    description: "The direct, no-nonsense podcast dissecting what it actually takes to run a business in the modern economy. No survival bias, no sugar-coating.",
    link: "#",
    badge: "Podcast",
    type: "podcast"
  },
  {
    id: "we-tried-we-failed",
    title: "We Tried, We Failed",
    role: "Co-Host",
    description: "A candid exploration of business failures, close calls, and the hard lessons learned by builders who lost it all and got back up to do it again.",
    link: "#",
    badge: "Podcast",
    type: "podcast"
  },
  {
    id: "game-changer-clout-chaser",
    title: "Game Changer vs Clout Chaser",
    role: "Creator",
    description: "The strategic framework and publication evaluating real business innovators against loud, superficial industry personalities.",
    link: "#",
    badge: "Strategic Publication",
    type: "book"
  },
  {
    id: "budauthority",
    title: "BudAuthority",
    role: "Founder & Principal",
    description: "A premier digital marketing and SEO agency serving 30+ enterprise clients utilizing proprietary custom search intelligence engines.",
    link: "https://budauthority.com",
    badge: "Agency",
    type: "agency"
  }
];

export const TIMELINE: TimelineStop[] = [
  {
    id: "budauthority-timeline",
    period: "2016 - Present",
    role: "Founder & Principal",
    company: "BudAuthority",
    location: "Rhode Island",
    description: "Established a leading boutique digital marketing agency. Engineered proprietary custom search engine optimization algorithms and intelligence software that empowers clients to dominate search real estate.",
    achievements: [
      "Scale to 30+ recurring retainer clients through purely organic, outcome-driven consulting.",
      "Developed internal tech stack for keyword monitoring, competitor audits, and automated SEO reporting.",
      "Serve as chief consultant for high-growth consumer brands and SaaS platforms."
    ],
    highlightMetric: {
      value: "30+",
      label: "Retainer Clients"
    }
  },
  {
    id: "inside-sales-ops",
    period: "2020 - 2021",
    role: "Operations & Sales Expansion Lead",
    company: "Retail & Inside Sales Operation",
    location: "Rocky Hill, CT",
    description: "Brought in to optimize performance across multiple channels, managing both digital sales streams and physical footprint retail networks during a historically volatile period.",
    achievements: [
      "Accelerated US inside sales revenue by 300%+ YTD.",
      "Drove e-commerce platform revenue up 150% YTD through rapid UX optimization and retargeting.",
      "Increased walk-in customer foot traffic by 200%+ YTD across 17 brick-and-mortar retail locations."
    ],
    highlightMetric: {
      value: "300%+",
      label: "Sales Growth"
    }
  },
  {
    id: "aurea-timeline",
    period: "2012 - 2015",
    role: "Senior Operations Leader",
    company: "Aurea Software",
    location: "Austin, TX",
    description: "Charged with scaling the channel business unit and introducing strict operational discipline across divisions. Pioneered organic key-account expansion strategies.",
    achievements: [
      "Grew channel business unit from $5M to $30M+ ARR in under 3 years.",
      "Designed and executed an 80/20 organic account expansion protocol that dramatically lowered customer acquisition cost.",
      "Led cross-functional international teams to align product support and sales operations."
    ],
    highlightMetric: {
      value: "$30M",
      label: "ARR Scaled"
    }
  },
  {
    id: "national-education-timeline",
    period: "Mid-Career",
    role: "Infrastructure & Digital Rebuild Director",
    company: "National Education Organization",
    location: "Tucson, AZ",
    description: "Spearheaded a complete technical migration and structural rebrand to shift a national brick-and-mortar educational network fully online.",
    achievements: [
      "Designed a custom membership system that handles seamless student onboarding and progression.",
      "Engineered full payment processing gateways capable of handling millions in recurring membership fees.",
      "Dramatically reduced administrative overhead by automating classroom scheduling and database syncs."
    ],
    highlightMetric: {
      value: "100%",
      label: "Moved Online"
    }
  },
  {
    id: "onthegosystems-timeline",
    period: "Early-to-Mid Career",
    role: "Product development, Sales, & Marketing Lead",
    company: "OnTheGoSystems",
    location: "Wan Chai, Hong Kong",
    description: "Led the commercialization, early-stage product development, and initial market entry for a brand-new corporate subsidiary.",
    achievements: [
      "Established brand identity and ran high-converting global outreach campaigns.",
      "Worked closely with engineering to map user experience flows and build a highly responsive feedback loop.",
      "Landed initial key accounts, establishing immediate product-market fit."
    ],
    highlightMetric: {
      value: "1st",
      label: "Product Lead"
    }
  },
  {
    id: "music-executive-timeline",
    period: "Early Career",
    role: "Music Industry Executive & Operator",
    company: "Independent Music Label & Artist Representation",
    location: "New York, NY",
    description: "Acquired critical foundational skills in management, contract negotiations, promotion, and business P&Ls as a senior leader in the highly competitive music ecosystem.",
    achievements: [
      "Led operations managing 350+ team members, artists, and event staff.",
      "Negotiated distribution and sync-licensing deals with major national entertainment networks.",
      "Managed tour logistics, press campaigns, and marketing spends with strict ROI standards."
    ],
    highlightMetric: {
      value: "350+",
      label: "Staff Managed"
    }
  }
];

export const TESTIMONIALS = [
  {
    quote: "David doesn't tell you what you want to hear. He tells you what your P&L is crying out for. He restructured our marketing ops, cut the fat, and got us growing within two months.",
    author: "SaaS Founder & Chief Executive",
    location: "Austin, TX"
  },
  {
    quote: "Most consultants hand you a slide deck. David embedded himself with our department heads, refocused our organic search playbook, and personally ensured our team executed. The results spoke for themselves.",
    author: "VP of Business Operations",
    location: "New York, NY"
  }
];

export const FEATURED_LOGOS = [
  "Forbes", "Wired", "Fast Company", "Entrepreneur", "Inc", "TechCrunch"
];
