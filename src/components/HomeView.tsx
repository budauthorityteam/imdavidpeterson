import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDown, Mic, BookOpen, Volume2, Calendar, ShieldCheck, Play } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import CountUp from './CountUp';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
}

const MARQUEE_ITEMS = [
  'Operations',
  'Growth',
  'Applied AI',
  'Fractional Executive',
  'SEO Intelligence',
  'Austin, TX',
  'New York, NY',
  'Hong Kong',
  'Tucson, AZ',
  'Rocky Hill, CT',
  'Rhode Island',
];

export default function HomeView({ setActiveTab }: HomeViewProps) {

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const proofPoints = [
    {
      metric: "350+",
      label: "Team Members Led",
      detail: "Orchestrated scale and cross-functional alignment as senior operations leader.",
      location: "New York, NY"
    },
    {
      metric: "$30M+",
      label: "ARR Growth from $5M",
      detail: "Scaled channel business unit using an 80/20 organic strategy focused on the existing account base.",
      location: "Austin, TX"
    },
    {
      metric: "300%+",
      label: "Sales Growth",
      detail: "Grew inside sales 300%+, e-commerce 150%+, and retail foot traffic 200%+ YTD in under a year.",
      location: "Rocky Hill, CT"
    },
    {
      metric: "$5.5M+",
      label: "Revenue Generated",
      detail: "Managed a $600K/year marketing budget and P&L that drove $5.5M+ in revenue over 2.5 years.",
      location: "Austin, TX"
    },
    {
      metric: "100%",
      label: "Digital Migration Success",
      detail: "Executed organizational rebrand and rebuilt technology infrastructure to move a national network fully online.",
      location: "Tucson, AZ"
    },
    {
      metric: "Hong Kong",
      label: "Subsidiary Launch",
      detail: "Led product development, sales, and marketing for a brand-new commercial entity owned by OnTheGoSystems.",
      location: "Hong Kong"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-24 md:space-y-36 pb-24"
    >
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-4">
        {/* Interactive agent-network backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <HeroCanvas />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </div>

        <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          
          {/* Left: Text Details */}
          <div className="md:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2.5 bg-zinc-900/80 border border-[#10B981]/30 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-zinc-300 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] pulse-dot"></span>
              <span>Available for Selective Advisory</span>
            </div>

            <h1 id="hero-h1" className="text-4xl md:text-6xl font-black font-display text-white tracking-tight leading-none">
              I spent twenty years running other people's businesses. <br />
              <span className="text-gradient">Now I build my own.</span>
            </h1>
            
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl font-sans font-light">
              Currently: building software that replaces headcount with systems. More when it's time.
            </p>

            <div className="pt-4 flex items-center space-x-4">
              <button
                onClick={() => handleNavClick('/contact')}
                className="btn-shine text-black px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-widest transition-transform hover:scale-[1.03] rounded cursor-pointer shadow-lg shadow-[#10B981]/10"
              >
                Get in Touch
              </button>
              <a
                href="#the-public-part"
                className="group text-zinc-400 hover:text-[#34D399] transition-colors text-xs font-mono uppercase tracking-widest flex items-center space-x-1.5"
              >
                <span>Track Record</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Stealth Profile Headshot */}
          <div className="md:col-span-4 flex justify-center">
            <div className="gradient-ring relative w-48 h-48 md:w-56 md:h-56 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between p-6 shadow-2xl group">
              {/* Artistic Grid Mask lines representing technical building */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.10),transparent_55%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

              <div className="text-[10px] font-mono text-[#34D399]/80 uppercase tracking-widest relative z-10">
                PROFILE ID: DP // 2026
              </div>

              {/* Minimalist Graphic Element acting as high contrast headshot */}
              <div className="flex flex-col items-center justify-center space-y-3 relative z-10 my-4">
                <div className="w-14 h-14 rounded-full bg-zinc-950 border border-[#10B981]/40 flex items-center justify-center text-white group-hover:border-[#10B981] transition-colors duration-500 shadow-lg shadow-[#10B981]/10">
                  <span className="font-display font-black text-sm tracking-tighter">DP</span>
                </div>
                <div className="text-center">
                  <span className="block text-[11px] text-white font-mono uppercase tracking-wider font-semibold">David Peterson</span>
                  <span className="block text-[9px] text-zinc-600 font-mono uppercase tracking-widest mt-0.5">Founding Operator</span>
                </div>
              </div>

              <div className="text-[8px] font-mono text-zinc-600 text-center uppercase tracking-wider">
                Rhode Island / Massachusetts // US
              </div>
            </div>
          </div>

        </div>
        </div>
      </section>

      {/* MARQUEE BAND */}
      <div className="marquee-track relative overflow-hidden border-y border-zinc-900 bg-zinc-950/40 py-4">
        <div className="marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i} className="flex items-center text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 whitespace-nowrap">
                  <span className="mx-6">{item}</span>
                  <span className="text-[#10B981]">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
      </div>

      {/* 2. TRACK RECORD */}
      <section id="the-public-part" className="px-6 md:px-12 max-w-5xl mx-auto border-t border-zinc-900 pt-20 scroll-mt-20">
        <div className="space-y-12">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#10B981] font-bold block">The Public Part</span>
            <h2 className="text-2xl md:text-4xl font-bold font-display text-white tracking-tight">
              Before I built for myself, I built for others. <br className="hidden sm:inline" />
              <span className="text-zinc-500">That part I can talk about.</span>
            </h2>
            <p className="text-zinc-500 text-xs font-mono">
              / Hard metrics from twenty years of scaling enterprise operations, marketing networks, and products.
            </p>
          </div>

          {/* Cards Grid: Only loud elements on the site */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {proofPoints.map((point, index) => (
              <div
                key={index}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
                }}
                className="spotlight glow-card bg-zinc-950 border border-zinc-900 rounded-xl p-6 flex flex-col justify-between space-y-4 relative overflow-hidden group"
              >
                {/* Visual accent inside card */}
                <div className="absolute top-0 right-0 p-3 text-[9px] font-mono text-zinc-700 group-hover:text-[#10B981]/70 transition-colors select-none z-10">
                  [S.{index+1}]
                </div>

                <div className="space-y-2 relative z-10">
                  <div className="text-3xl md:text-4xl font-black font-display text-gradient tracking-tight">
                    <CountUp value={point.metric} />
                  </div>
                  <div className="text-xs font-semibold font-mono text-zinc-300 uppercase tracking-wide">
                    {point.label}
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed font-light">
                    {point.detail}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-zinc-900/60 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  <span>{point.location}</span>
                  <span className="text-[#10B981]/70">• Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NOW (WHAT I'M BUILDING) */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto border-t border-zinc-900 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#10B981] font-bold block">What I'm Building</span>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">
              Now
            </h2>
          </div>
          <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 p-8 rounded-2xl relative overflow-hidden space-y-6">
            {/* Locked Door effect: beautiful ambient glow */}
            <div className="absolute -right-24 -bottom-24 w-56 h-56 bg-[radial-gradient(circle,rgba(16,185,129,0.16),transparent_70%)] rounded-full blur-2xl pointer-events-none" />
            
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-sans font-light max-w-2xl">
              I am currently founding and operating my own portfolio of software and digital marketing companies. My daily focus is architecting private generative AI systems and agent networks that automate workflows traditionally managed by entire teams. By applying twenty years of operational lessons directly to code rather than complex organizational structures, I build lean systems that scale.
            </p>
            <p className="text-zinc-400 text-xs md:text-sm font-sans font-light">
              The specifics aren't public yet. If you have a reason to know more, the contact page works.
            </p>

            <div className="pt-2 flex items-center space-x-6">
              <button
                onClick={() => handleNavClick('/now')}
                className="text-white hover:text-zinc-300 font-mono text-xs uppercase tracking-widest flex items-center space-x-1.5 transition-colors font-semibold cursor-pointer"
              >
                <span>Read Current focus Page</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE UNFILTERED BIT */}
      <section className="relative bg-zinc-950 border-y border-zinc-900 py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.14),transparent_70%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#10B981] font-bold block">Fair Warning</span>
          <h2 className="text-2xl md:text-5xl font-black font-display text-white tracking-tight leading-tight max-w-3xl mx-auto">
            <span className="text-gradient">“</span>I give my truthful, unfiltered two cents to anyone who asks. If you want a yes-man, I'm not your guy.<span className="text-gradient">”</span>
          </h2>
          <div className="accent-hairline h-[1px] w-12 mx-auto mt-6"></div>
          <p className="text-[#34D399]/70 font-mono text-xs uppercase tracking-widest">
            - OPERATIONAL PRINCIPLE NO. 1
          </p>
        </div>
      </section>

      {/* 5. MEDIA */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto">
        <div className="space-y-12">
          <div className="border-b border-zinc-900 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#10B981] font-bold block">Audio & Publications</span>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">
                Where You've Maybe Heard Me
              </h2>
            </div>
            <button
              onClick={() => handleNavClick('/media')}
              className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white border-b border-zinc-900 pb-0.5 hover:border-white transition-all text-left cursor-pointer"
            >
              All episodes & speakings →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: TBE */}
            <div className="glow-card bg-zinc-950 border border-zinc-900 p-5 rounded-lg flex flex-col justify-between h-48">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                  <Mic className="w-3.5 h-3.5" />
                  <span>Podcast • Host</span>
                </div>
                <h4 className="text-sm font-bold font-display text-white leading-snug">
                  Taking Back Entrepreneurship
                </h4>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed font-light line-clamp-3">
                  Direct, no-nonsense breakdowns of the realities of business building, minus the survival bias.
                </p>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block pt-2 border-t border-zinc-900/60">Listen to Episodes</span>
            </div>

            {/* Card 2: WTWF */}
            <div className="glow-card bg-zinc-950 border border-zinc-900 p-5 rounded-lg flex flex-col justify-between h-48">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                  <Mic className="w-3.5 h-3.5" />
                  <span>Podcast • Co-Host</span>
                </div>
                <h4 className="text-sm font-bold font-display text-white leading-snug">
                  We Tried, We Failed
                </h4>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed font-light line-clamp-3">
                  Candid post-mortems of business pivot decisions, structural failures, and hard-won resilience.
                </p>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block pt-2 border-t border-zinc-900/60">Listen to Episodes</span>
            </div>

            {/* Card 3: Publication */}
            <div className="glow-card bg-zinc-950 border border-zinc-900 p-5 rounded-lg flex flex-col justify-between h-48">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Strategic Publication</span>
                </div>
                <h4 className="text-sm font-bold font-display text-white leading-snug">
                  Game Changer vs Clout Chaser
                </h4>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed font-light line-clamp-3">
                  An analytical operational framework auditing corporate innovation against loud media profiles.
                </p>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block pt-2 border-t border-zinc-900/60 font-semibold text-white">Creator</span>
            </div>

            {/* Card 4: Speaking */}
            <div className="glow-card bg-zinc-950 border border-zinc-900 p-5 rounded-lg flex flex-col justify-between h-48">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                  <Play className="w-3.5 h-3.5" />
                  <span>speaking & keynotes</span>
                </div>
                <h4 className="text-sm font-bold font-display text-white leading-snug">
                  Operations & Scale
                </h4>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed font-light line-clamp-3">
                  Delivering raw keynotes on marketing waste, custom agent software, and business restructuring.
                </p>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block pt-2 border-t border-zinc-900/60">View Speaking Topics</span>
            </div>

          </div>
        </div>
      </section>

      {/* 6. ADVISORY */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto border-t border-zinc-900 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#10B981] font-bold block">Working With Me</span>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">
              Advisory
            </h2>
          </div>
          
          <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 p-8 rounded-2xl space-y-6">
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-sans font-light max-w-2xl">
              I take on a very small number of advisory engagements: operations, growth, and applied AI for real businesses. Engagements start at <span className="text-gradient font-medium">$5,000/month</span>. If that number didn't scare you, get in touch.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('/contact')}
                className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-white hover:text-zinc-300 transition-colors font-bold cursor-pointer"
              >
                <span>Initiate Advisory Inquiry</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 animate-[bounce_1.5s_infinite]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA BAND */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto pt-12 pb-16">
        <div className="p-8 md:p-12 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-[#10B981]/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-[radial-gradient(circle,rgba(16,185,129,0.18),transparent_70%)] pointer-events-none" />
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none select-none">
            <ShieldCheck className="w-64 h-64 text-[#10B981]" />
          </div>

          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">
              Ready to automate operations or scale?
            </h3>
            <p className="text-zinc-400 text-xs md:text-sm font-sans font-light">
              Skip the pitch deck. Get in touch directly to review strategic alignment.
            </p>
          </div>

          <button
            onClick={() => handleNavClick('/contact')}
            className="btn-shine text-black px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest rounded cursor-pointer shrink-0 transition-transform hover:scale-[1.03] shadow-lg shadow-[#10B981]/10 relative"
          >
            Get in Touch
          </button>
        </div>
      </section>
    </motion.div>
  );
}
