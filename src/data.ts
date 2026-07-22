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
    linkedin: 'https://linkedin.com/in/imdavidpeterson',
    twitter: 'https://twitter.com/imdavidpeterson-placeholder',
    instagram: 'https://instagram.com/imdavidpeterson-placeholder',
    youtube: 'https://youtube.com/imdavidpeterson-placeholder',
  },
  realEstate: 'https://petersonhomes.com',
  // Entrepreneur Leadership Network contributor — real author page.
  entrepreneur: 'https://www.entrepreneur.com/author/david-peterson',
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
    id: "deeproots",
    period: "2025",
    role: "Head of Operations",
    company: "deeproots partners",
    location: "Los Angeles, CA",
    description: "Partnered directly with the CEO to turn strategic vision into an actionable operating roadmap, building company-wide infrastructure that boosted productivity and scalability across a fast-growing SEO agency.",
    achievements: [
      "Commanded local-SEO client delivery, overseeing content production and web development pipelines to guarantee measurable partner ROI.",
      "Architected the org structure and recruited, trained, and led a high-performing remote team through rapid growth.",
      "Used the full SEO tech stack (GA4, GSC, Looker Studio, Ahrefs, SEMrush) to drive data-informed strategy."
    ],
    highlightMetric: { value: "100%", label: "Delivery Owned" }
  },
  {
    id: "dylan-jahraus",
    period: "2023 - 2024",
    role: "Chief Operating Officer",
    company: "Dylan Jahraus",
    location: "San Diego, CA",
    description: "COO for a high-ticket info-product business. Built the entire operational backbone from scratch and scaled it to consistent million-dollar months.",
    achievements: [
      "Scaled to consecutive $1M+ revenue months while holding 60%+ profit margins.",
      "Built the full operating system: SOPs, KPIs, CRM, and performance management.",
      "Launched a micro-SaaS product and doubled the client base in under 12 months."
    ],
    highlightMetric: { value: "$1M+", label: "Monthly Revenue" }
  },
  {
    id: "wordagents",
    period: "2021 - 2023",
    role: "Chief Operating Officer",
    company: "WordAgents",
    location: "Brightwaters, NY",
    description: "Led day-to-day operations for a large content-production company, aligning service delivery, customer success, HR, and finance behind the CEO's growth plan.",
    achievements: [
      "Led a remote team of 350+ employees.",
      "Ran operations on OKRs and KPIs, installing corrective systems where needed.",
      "Oversaw service delivery, Customer Success, HR, project management, and finance."
    ],
    highlightMetric: { value: "350+", label: "Team Members" }
  },
  {
    id: "namco",
    period: "2020 - 2021",
    role: "VP of Sales & Marketing",
    company: "Namco Pools",
    location: "Rocky Hill, CT",
    description: "Drove a full digital transformation and revenue turnaround across inside sales, e-commerce, and retail during a volatile period.",
    achievements: [
      "Grew inside-sales revenue 300% and e-commerce revenue 150% YTD.",
      "Led ERP migration, website transition, and POS implementation.",
      "Held a 62% gross margin and cut customer-service wait times by 75%."
    ],
    highlightMetric: { value: "300%", label: "Sales Growth" }
  },
  {
    id: "onthegosystems",
    period: "2019",
    role: "Head of Sales, Marketing & Product",
    company: "OnTheGoSystems",
    location: "Hong Kong (Remote)",
    description: "Led product development plus sales and marketing for the business, driving commercialization and market entry.",
    achievements: [
      "Owned product, sales, and marketing for the entire entity.",
      "Built go-to-market and demand generation for a global, remote-first operation.",
      "Established brand-market fit across international channels."
    ],
    highlightMetric: { value: "1st", label: "Product & GTM Lead" }
  },
  {
    id: "crossover",
    period: "2016 - 2018",
    role: "Senior Marketing Strategist / Advisor to CEO",
    company: "Crossover (Trilogy Software)",
    location: "Austin, TX (Remote)",
    description: "Advisor to the CEO on global marketing strategy, owning budget and campaigns that drove multi-million-dollar revenue.",
    achievements: [
      "Managed a $600K annual marketing budget contributing to $5.5M+ in revenue.",
      "Optimized global digital campaigns for significant performance gains.",
      "Advised leadership on positioning, demand, and channel strategy."
    ],
    highlightMetric: { value: "$5.5M+", label: "Revenue Driven" }
  },
  {
    id: "aurea",
    period: "2012 - 2016",
    role: "Head of Global Channel Business Operations",
    company: "Aurea Software (Trilogy)",
    location: "Austin, TX (Remote)",
    description: "Scaled the channel business unit from $5M to $30M+ ARR while building the operating systems and partner network that made the growth durable.",
    achievements: [
      "Grew channel business from $400K to $2.5M+ MRR ($5M to $30M+ ARR).",
      "Built operating systems supporting 600+ partners with a team of 50+.",
      "Installed performance management and accountability across a global remote team."
    ],
    highlightMetric: { value: "$30M+", label: "ARR Scaled" }
  },
  {
    id: "versata",
    period: "2011 - 2012",
    role: "Global M&A Operations Manager",
    company: "Versata Software (Trilogy)",
    location: "Austin, TX (Remote)",
    description: "Ran post-merger operations across a portfolio of software acquisitions, wringing out cost and inefficiency.",
    achievements: [
      "Reduced acquisition debt 75%, saving over $7M across 10 company purchases.",
      "Directed post-merger efficiency programs across multiple departments.",
      "Standardized operations to make acquired companies run lean."
    ],
    highlightMetric: { value: "$7M", label: "Saved / 10 Deals" }
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
