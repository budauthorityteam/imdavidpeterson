import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowDown, Mic, BookOpen, Sparkles, Check } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import CountUp from './CountUp';
import { FEATURED_LOGOS } from '../data';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
}

const MARQUEE_ITEMS = [
  'Operations',
  'Growth',
  'Applied AI',
  'Turnarounds',
  'SEO Intelligence',
  'Fractional Leadership',
  'Systems over Headcount',
];

const PROOF = [
  { metric: '$30M+', label: 'ARR grown from $5M', detail: 'Scaled a channel business unit in under three years with an 80/20 organic strategy.', where: 'Aurea Software · Austin, TX' },
  { metric: '350+', label: 'People led', detail: 'Ran a 350-person operation across artists, staff, and logistics under razor-thin margins.', where: 'Music industry · New York, NY' },
  { metric: '300%+', label: 'Sales growth YTD', detail: 'Grew inside sales 300%+, e-commerce 150%+, and foot traffic 200%+ across 17 stores.', where: 'Retail & inside sales · CT' },
  { metric: '$5.5M+', label: 'Revenue driven', detail: 'Owned a $600K/year marketing budget and P&L that produced $5.5M+ over 2.5 years.', where: 'P&L ownership · Austin, TX' },
  { metric: '100%', label: 'Moved online', detail: 'Rebuilt a national education org from brick-and-mortar to fully online, payments and all.', where: 'Digital rebuild · Tucson, AZ' },
  { metric: '30+', label: 'Retainer clients', detail: 'Founder of BudAuthority, running proprietary SEO intelligence software for 30+ brands.', where: 'BudAuthority · Rhode Island' },
];

export default function HomeView({ setActiveTab }: HomeViewProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden pt-32 md:pt-44 pb-16 md:pb-24">
        {/* Subtle systems network + fade to paper */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-70">
            <HeroCanvas />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
        </div>

        <div className="relative z-10 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Headline */}
            <motion.div variants={item} className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2.5 bg-paper-2/80 border border-line px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-soft backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
                <span>Operator · Builder · Founder of BudAuthority</span>
              </div>

              <h1 id="hero-h1" className="font-display font-bold text-ink tracking-[-0.02em] leading-[0.98] text-5xl md:text-7xl">
                I scaled other people's
                <br className="hidden md:block" /> companies to{' '}
                <span className="underline-swash">$30M+</span>.
                <br />
                <span className="mark serif-italic font-normal">Now I build my own.</span>
              </h1>

              <p className="text-ink-soft text-lg leading-relaxed max-w-xl">
                Twenty years running operations, growth, and P&amp;Ls for other people. Today I build
                AI systems that do the work of whole teams, and I share exactly how, no fluff, no
                yes-man answers.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={() => handleNavClick('/contact')}
                  className="btn-accent px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide cursor-pointer flex items-center gap-2"
                >
                  <span>Work With Me</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#track-record"
                  className="group text-ink font-semibold text-sm flex items-center gap-2 link-underline"
                >
                  <span>See the track record</span>
                  <ArrowDown className="w-4 h-4 text-accent group-hover:translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Proof stack card */}
            <motion.div variants={item} className="lg:col-span-5">
              <div className="ed-card rounded-3xl p-7 md:p-8 shadow-xl shadow-ink/5">
                <div className="kicker mb-6">The short version</div>
                <div className="divide-y divide-line">
                  {[
                    { n: '$30M+', l: 'ARR scaled from $5M' },
                    { n: '350+', l: 'people led at peak' },
                    { n: '30+', l: 'clients at BudAuthority' },
                  ].map((s) => (
                    <div key={s.l} className="flex items-baseline justify-between py-4 first:pt-0 last:pb-0">
                      <span className="font-display font-bold text-4xl md:text-5xl text-ink tracking-tight">
                        <CountUp value={s.n} />
                      </span>
                      <span className="text-ink-soft text-sm text-right max-w-[9rem]">{s.l}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-line flex items-center gap-2 text-xs text-ink-faint">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Rhode Island, USA · building in public</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================= AS FEATURED / MARQUEE ========================= */}
      <motion.section variants={item} className="border-y border-line bg-paper-2/50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row md:items-center gap-6">
          <span className="kicker shrink-0">Known for</span>
          <div className="marquee-track relative overflow-hidden flex-1">
            <div className="marquee">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
                  {MARQUEE_ITEMS.map((it, i) => (
                    <span key={i} className="flex items-center text-ink font-display font-medium text-lg whitespace-nowrap">
                      <span className="mx-5">{it}</span>
                      <span className="text-accent">/</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-paper-2/90 to-transparent" />
          </div>
        </div>
      </motion.section>

      {/* ============================== TRACK RECORD ============================== */}
      <section id="track-record" className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32 scroll-mt-24">
        <motion.div variants={item} className="max-w-2xl space-y-4 mb-14">
          <span className="kicker">The receipts</span>
          <h2 className="font-display font-bold text-ink text-4xl md:text-5xl tracking-tight leading-[1.02]">
            Before I built for myself,
            <br />
            I built for everyone else.
          </h2>
          <p className="text-ink-soft text-lg">
            Two decades of hard numbers across operations, marketing, retail, and software. Not
            slideware. Outcomes.
          </p>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROOF.map((p, index) => (
            <div key={index} className="ed-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-5 right-5 text-xs text-ink-faint font-medium">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="space-y-3">
                <div className="font-display font-bold text-5xl text-ink tracking-tight">
                  <CountUp value={p.metric} />
                </div>
                <div className="h-1 w-10 bg-accent rounded-full" />
                <div className="text-ink font-semibold text-base">{p.label}</div>
                <p className="text-ink-soft text-sm leading-relaxed">{p.detail}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-line text-xs text-ink-faint tracking-wide">
                {p.where}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ============================== NEWSLETTER (ink band) ============================== */}
      <section className="px-6 md:px-12 pt-24 md:pt-32">
        <motion.div
          variants={item}
          className="max-w-6xl mx-auto bg-ink text-paper rounded-[2rem] px-8 py-12 md:px-16 md:py-16 relative overflow-hidden"
        >
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="kicker">The Operator's Memo</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.02]">
                The playbook I wish
                <br />
                someone had handed me.
              </h2>
              <p className="text-paper/70 text-lg max-w-xl">
                A short, occasional note on scaling operations, building with AI, and the ugly parts
                nobody puts on LinkedIn. No spam. Unsubscribe anytime.
              </p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-paper/10 border border-paper/20 rounded-2xl p-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </span>
                  <div>
                    <div className="font-semibold">You're in.</div>
                    <div className="text-paper/60 text-sm">Watch your inbox for the next memo.</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    aria-label="Email address"
                    className="w-full bg-paper/10 border border-paper/25 rounded-full px-6 py-4 text-paper placeholder:text-paper/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                  <button
                    type="submit"
                    className="btn-accent w-full py-4 rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get the memo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-paper/45 text-xs text-center">Join operators reading along as I build.</p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============================== NOW / WHAT I'M BUILDING ============================== */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div variants={item} className="lg:col-span-4 space-y-3">
            <span className="kicker">Right now</span>
            <h2 className="font-display font-bold text-ink text-4xl md:text-5xl tracking-tight">
              What I'm
              <br />
              building
            </h2>
          </motion.div>
          <motion.div variants={item} className="lg:col-span-8 space-y-6">
            <p className="text-ink text-xl md:text-2xl leading-relaxed font-light">
              I'm founding and operating my own portfolio of software and marketing companies. The
              daily work is architecting private, generative <span className="font-medium mark">AI agent systems</span>{' '}
              that automate the workflows entire teams used to run, applying twenty years of
              operating lessons directly to code instead of org charts.
            </p>
            <p className="text-ink-soft text-lg leading-relaxed">
              The specifics go live piece by piece. The{' '}
              <button onClick={() => handleNavClick('/now')} className="text-accent font-medium link-underline cursor-pointer">
                Now page
              </button>{' '}
              is where I keep the honest, quarterly snapshot.
            </p>
            <button
              onClick={() => handleNavClick('/now')}
              className="inline-flex items-center gap-2 text-ink font-semibold text-sm group"
            >
              <span className="link-underline">Read what I'm focused on</span>
              <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============================== PODCAST / MEDIA ============================== */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32">
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-3">
            <span className="kicker">Listen in</span>
            <h2 className="font-display font-bold text-ink text-4xl md:text-5xl tracking-tight">
              Podcasts &amp; publications
            </h2>
          </div>
          <button
            onClick={() => handleNavClick('/media')}
            className="text-ink font-semibold text-sm flex items-center gap-2 group cursor-pointer"
          >
            <span className="link-underline">All episodes &amp; speaking</span>
            <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Two flagship podcasts, larger */}
          {[
            {
              icon: Mic,
              tag: 'Podcast · Host',
              title: 'Taking Back Entrepreneurship',
              desc: 'Direct, no-nonsense breakdowns of what it actually takes to build a business. Zero survival bias, zero sugar-coating.',
            },
            {
              icon: Mic,
              tag: 'Podcast · Co-Host',
              title: 'We Tried, We Failed',
              desc: 'Candid post-mortems of pivots, close calls, and hard-won resilience from builders who lost it and came back.',
            },
          ].map((c) => (
            <div key={c.title} className="ed-card rounded-2xl p-7 flex flex-col justify-between min-h-[220px] group">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-accent">
                  <c.icon className="w-4 h-4" />
                  <span className="kicker">{c.tag}</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-ink tracking-tight">{c.title}</h3>
                <p className="text-ink-soft leading-relaxed">{c.desc}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-line flex items-center gap-2 text-ink font-semibold text-sm">
                <span className="link-underline">Listen to episodes</span>
                <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
          {[
            { icon: BookOpen, tag: 'Publication', title: 'Game Changer vs Clout Chaser', desc: 'A framework auditing real business innovators against loud, superficial industry personalities.' },
            { icon: Sparkles, tag: 'Speaking · Keynotes', title: 'Operations, scale & applied AI', desc: 'Raw keynotes and workshops on marketing waste, agent software, and business restructuring.' },
          ].map((c) => (
            <div key={c.title} className="ed-card rounded-2xl p-6 flex items-start gap-4">
              <span className="w-11 h-11 rounded-full bg-accent-soft flex items-center justify-center shrink-0">
                <c.icon className="w-5 h-5 text-accent" />
              </span>
              <div className="space-y-1.5">
                <span className="kicker">{c.tag}</span>
                <h4 className="font-display font-bold text-lg text-ink tracking-tight">{c.title}</h4>
                <p className="text-ink-soft text-sm leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ============================== PULL QUOTE ============================== */}
      <section className="px-6 md:px-12 pt-24 md:pt-32">
        <motion.div variants={item} className="max-w-6xl mx-auto bg-paper-3 rounded-[2rem] px-8 py-16 md:px-16 md:py-24 text-center relative overflow-hidden">
          <div className="text-accent font-display text-7xl leading-none mb-4">“</div>
          <blockquote className="font-serif italic text-3xl md:text-5xl text-ink leading-[1.15] max-w-4xl mx-auto tracking-tight">
            I'll give you my truthful, unfiltered two cents. If you want a yes-man,
            I'm genuinely not your guy.
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-line-2" />
            <span className="kicker">Operating principle no. 1</span>
            <span className="h-px w-8 bg-line-2" />
          </div>
        </motion.div>
      </section>

      {/* ============================== ADVISORY ============================== */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div variants={item} className="lg:col-span-4 space-y-3">
            <span className="kicker">Work with me</span>
            <h2 className="font-display font-bold text-ink text-4xl md:text-5xl tracking-tight">
              Advisory
            </h2>
          </motion.div>
          <motion.div variants={item} className="lg:col-span-8 space-y-6">
            <p className="text-ink text-xl md:text-2xl leading-relaxed font-light">
              I take a very small number of advisory engagements each year: operations, growth, and
              applied AI for real businesses. Engagements start at{' '}
              <span className="mark font-medium">$5,000/month</span>. If that number didn't scare
              you off, we should talk.
            </p>
            <button
              onClick={() => handleNavClick('/contact')}
              className="btn-ink inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide cursor-pointer"
            >
              <span>Start a conversation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============================== FINAL CTA (ink band) ============================== */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32 pb-24 md:pb-32">
        <motion.div
          variants={item}
          className="bg-ink text-paper rounded-[2rem] px-8 py-14 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute -left-20 -bottom-24 w-80 h-80 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          <div className="relative space-y-3 text-center md:text-left max-w-xl">
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-tight">
              Building something and want a straight answer?
            </h2>
            <p className="text-paper/70 text-lg">
              Skip the pitch deck. Tell me what you're working on and I'll tell you the truth.
            </p>
          </div>
          <button
            onClick={() => handleNavClick('/contact')}
            className="btn-accent px-8 py-4 rounded-full text-sm font-semibold tracking-wide cursor-pointer shrink-0 flex items-center gap-2"
          >
            <span>Work With Me</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>
    </motion.div>
  );
}
