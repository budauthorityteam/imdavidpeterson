import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowDown, Mic, BookOpen, Sparkles, Check, Building2, Wrench, Cog } from 'lucide-react';
import CountUp from './CountUp';
import {
  Reveal,
  Item,
  MaskLine,
  TiltCard,
  Magnetic,
  RotatingWord,
  stagger,
} from './Motion';

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

const OUTLINE_WORDS = ['Build', 'Buy', 'Operate', 'Build', 'Buy', 'Operate'];

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

  return (
    <div>
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden pt-32 md:pt-44 pb-16 md:pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6 md:px-12 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Headline */}
            <div className="lg:col-span-7 space-y-7">
              <Item className="inline-flex items-center gap-2.5 bg-paper-2/80 border border-line px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-soft backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
                <span>Operator · Builder · Founder of BudAuthority</span>
              </Item>

              <h1
                id="hero-h1"
                className="font-display font-bold text-ink tracking-[-0.02em] leading-[0.95] text-5xl md:text-7xl"
              >
                <MaskLine>I scaled other</MaskLine>
                <MaskLine>
                  people's companies to{' '}
                  <span className="underline-swash">$30M+</span>.
                </MaskLine>
                <MaskLine className="mark serif-italic font-normal">Now I build my own.</MaskLine>
              </h1>

              <Item className="text-2xl md:text-3xl font-display font-medium text-ink-soft">
                Today that means{' '}
                <RotatingWord
                  className="text-accent"
                  words={['AI agents.', 'boring businesses.', 'SEO engines.', 'cash flow.']}
                />
              </Item>

              <Item className="text-ink-soft text-lg leading-relaxed max-w-xl">
                Twenty years of operating lessons, poured into code instead of org charts. No fluff,
                no yes-man answers.
              </Item>

              <Item className="flex flex-wrap items-center gap-4 pt-1">
                <Magnetic>
                  <button
                    onClick={() => handleNavClick('/contact')}
                    className="btn-accent px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide cursor-pointer flex items-center gap-2"
                  >
                    <span>Work With Me</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Magnetic>
                <a
                  href="#track-record"
                  className="group text-ink font-semibold text-sm flex items-center gap-2 link-underline"
                >
                  <span>See the track record</span>
                  <ArrowDown className="w-4 h-4 text-accent group-hover:translate-y-0.5 transition-transform" />
                </a>
              </Item>
            </div>

            {/* Proof stack card */}
            <div className="lg:col-span-5">
              <TiltCard className="ed-card rounded-3xl p-7 md:p-8 shadow-xl shadow-ink/5" max={7}>
                <div>
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
              </TiltCard>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================= KNOWN FOR MARQUEE ========================= */}
      <section className="border-y border-line bg-paper-2/50 py-7 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-4">
          <span className="kicker">Known for</span>
        </div>
        <div className="marquee-track relative">
          <div className="marquee">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
                {MARQUEE_ITEMS.map((it, i) => (
                  <span key={i} className="flex items-center text-ink font-display font-semibold text-2xl md:text-3xl whitespace-nowrap">
                    <span className="mx-6">{it}</span>
                    <span className="text-accent">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />
        </div>
      </section>

      {/* ============================== TRACK RECORD ============================== */}
      <Reveal as="section" id="track-record" className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32 scroll-mt-24">
        <div className="max-w-2xl space-y-4 mb-14">
          <Item as="span" className="kicker block">The receipts</Item>
          <Item as="h2" className="font-display font-bold text-ink text-4xl md:text-5xl tracking-tight leading-[1.02]">
            Before I built for myself,
            <br />
            I built for everyone else.
          </Item>
          <Item as="p" className="text-ink-soft text-lg">
            Two decades of hard numbers across operations, marketing, retail, and software. Not
            slideware. Outcomes.
          </Item>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROOF.map((p, index) => (
            <TiltCard key={index} className="ed-card rounded-2xl p-6" max={9}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="font-display font-bold text-5xl text-ink tracking-tight">
                      <CountUp value={p.metric} />
                    </div>
                    <span className="text-xs text-ink-faint font-medium mt-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="h-1 w-10 bg-accent rounded-full mt-3" />
                  <div className="text-ink font-semibold text-base mt-3">{p.label}</div>
                  <p className="text-ink-soft text-sm leading-relaxed mt-2">{p.detail}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-line text-xs text-ink-faint tracking-wide">
                  {p.where}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Reveal>

      {/* ============================== NEWSLETTER (ink band) ============================== */}
      <section className="px-6 md:px-12 pt-24 md:pt-32">
        <Reveal className="max-w-6xl mx-auto bg-ink text-paper rounded-[2rem] px-8 py-12 md:px-16 md:py-16 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-accent/25 blur-3xl pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Item as="span" className="kicker block">The Operator's Memo</Item>
              <Item as="h2" className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.02]">
                The playbook I wish
                <br />
                someone had handed me.
              </Item>
              <Item as="p" className="text-paper/70 text-lg max-w-xl">
                A short, occasional note on scaling operations, building with AI, and the ugly parts
                nobody puts on LinkedIn. No spam. Unsubscribe anytime.
              </Item>
            </div>
            <Item className="lg:col-span-5">
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
                  <Magnetic className="w-full" strength={0.2}>
                    <button
                      type="submit"
                      className="btn-accent w-full py-4 rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Get the memo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Magnetic>
                  <p className="text-paper/45 text-xs text-center">Join operators reading along as I build.</p>
                </form>
              )}
            </Item>
          </div>
        </Reveal>
      </section>

      {/* ============================== NOW / WHAT I'M BUILDING ============================== */}
      <Reveal as="section" className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-3">
            <Item as="span" className="kicker block">Right now</Item>
            <Item as="h2" className="font-display font-bold text-ink text-4xl md:text-5xl tracking-tight">
              What I'm
              <br />
              building
            </Item>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <Item as="p" className="text-ink text-xl md:text-2xl leading-relaxed font-light">
              I'm founding and operating my own portfolio of software and marketing companies. The
              daily work is architecting private, generative{' '}
              <span className="font-medium mark">AI agent systems</span> that automate the workflows
              entire teams used to run, applying twenty years of operating lessons directly to code
              instead of org charts.
            </Item>
            <Item as="p" className="text-ink-soft text-lg leading-relaxed">
              The specifics go live piece by piece. The{' '}
              <button onClick={() => handleNavClick('/now')} className="text-accent font-medium link-underline cursor-pointer">
                Now page
              </button>{' '}
              is where I keep the honest, quarterly snapshot.
            </Item>
            <Item>
              <button
                onClick={() => handleNavClick('/now')}
                className="inline-flex items-center gap-2 text-ink font-semibold text-sm group"
              >
                <span className="link-underline">Read what I'm focused on</span>
                <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
              </button>
            </Item>
          </div>
        </div>
      </Reveal>

      {/* ============================== BUILD / BUY / OPERATE ============================== */}
      <Reveal as="section" className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32">
        <div className="max-w-2xl space-y-4 mb-12">
          <Item as="span" className="kicker block">The thesis</Item>
          <Item as="h2" className="font-display font-bold text-ink text-4xl md:text-6xl tracking-tight leading-[0.98]">
            I don't chase unicorns.
            <br />
            I buy <span className="underline-swash mark serif-italic font-normal">boring</span>.
          </Item>
          <Item as="p" className="text-ink-soft text-lg leading-relaxed">
            The best businesses are unsexy: local, essential, and quietly printing cash. I acquire
            overlooked companies through unconventional deals, then drop twenty years of operating
            systems and AI on top. Build what should be built. Buy what already works.
          </Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Wrench, tag: 'Build', desc: 'Software and AI systems from scratch, where clean code beats another five hires.' },
            { icon: Building2, tag: 'Buy', desc: 'Boring, cash-flowing businesses the market ignores, acquired at sane multiples with creative terms.' },
            { icon: Cog, tag: 'Operate', desc: 'Two decades of operating discipline dropped on top, so the asset compounds instead of coasting.' },
          ].map((c, i) => (
            <TiltCard key={c.tag} className="ed-card rounded-2xl p-6" max={8}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-full bg-accent-soft flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-accent" />
                  </span>
                  <span className="font-display font-bold text-4xl text-line-2">0{i + 1}</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-ink tracking-tight mt-5">{c.tag}</h3>
                <p className="text-ink-soft leading-relaxed mt-2">{c.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Buy box */}
        <Item className="mt-5">
          <div className="ed-card rounded-2xl p-7 md:p-9">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
              <h3 className="font-display font-bold text-2xl text-ink tracking-tight">The buy box</h3>
              <span className="kicker">What I look for</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
              {[
                ['Revenue', '$500K to $5M, with real margin and real customers.'],
                ['Sector', 'Boring and essential: services, home trades, B2B, local.'],
                ['Situation', 'Owner ready to step back, no clean succession plan.'],
                ['Structure', 'Creative and fair: seller financing, earnouts, equity rolls.'],
                ['The tell', 'Fixable with systems and AI, not a heroic turnaround.'],
                ['The pass', 'Hype, hockey-stick decks, and anything that needs a miracle.'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start gap-3 py-1 border-t border-line pt-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <div>
                    <div className="font-semibold text-ink text-sm">{k}</div>
                    <div className="text-ink-soft text-sm leading-relaxed">{v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-ink-soft">Selling a business like this, or hunting one down together?</p>
              <Magnetic>
                <button
                  onClick={() => handleNavClick('/contact')}
                  className="btn-ink inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide cursor-pointer"
                >
                  <span>Let's talk deals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Magnetic>
            </div>
          </div>
        </Item>
      </Reveal>

      {/* ============================== OUTLINED MARQUEE BAND ============================== */}
      <section className="mt-24 md:mt-32 py-10 md:py-14 border-y border-line overflow-hidden marquee-track">
        <div className="marquee marquee--slow">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {OUTLINE_WORDS.map((w, i) => (
                <span key={i} className="flex items-center">
                  <span className="text-outline font-display font-bold text-6xl md:text-8xl uppercase tracking-tight mx-8">
                    {w}
                  </span>
                  <span className="text-accent text-5xl md:text-7xl">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============================== PODCAST / MEDIA ============================== */}
      <Reveal as="section" className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-3">
            <Item as="span" className="kicker block">Listen in</Item>
            <Item as="h2" className="font-display font-bold text-ink text-4xl md:text-5xl tracking-tight">
              Podcasts &amp; publications
            </Item>
          </div>
          <Item>
            <button
              onClick={() => handleNavClick('/media')}
              className="text-ink font-semibold text-sm flex items-center gap-2 group cursor-pointer"
            >
              <span className="link-underline">All episodes &amp; speaking</span>
              <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
            </button>
          </Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              tag: 'Podcast · Host',
              title: 'Taking Back Entrepreneurship',
              desc: 'Direct, no-nonsense breakdowns of what it actually takes to build a business. Zero survival bias, zero sugar-coating.',
            },
            {
              tag: 'Podcast · Co-Host',
              title: 'We Tried, We Failed',
              desc: 'Candid post-mortems of pivots, close calls, and hard-won resilience from builders who lost it and came back.',
            },
          ].map((c) => (
            <TiltCard key={c.title} className="ed-card rounded-2xl p-7 min-h-[220px] group" max={6}>
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-accent">
                    <Mic className="w-4 h-4" />
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
            </TiltCard>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
          {[
            { icon: BookOpen, tag: 'Publication', title: 'Game Changer vs Clout Chaser', desc: 'A framework auditing real business innovators against loud, superficial industry personalities.' },
            { icon: Sparkles, tag: 'Speaking · Keynotes', title: 'Operations, scale & applied AI', desc: 'Raw keynotes and workshops on marketing waste, agent software, and business restructuring.' },
          ].map((c) => (
            <TiltCard key={c.title} className="ed-card rounded-2xl p-6" max={6}>
              <div className="flex items-start gap-4 h-full">
                <span className="w-11 h-11 rounded-full bg-accent-soft flex items-center justify-center shrink-0">
                  <c.icon className="w-5 h-5 text-accent" />
                </span>
                <div className="space-y-1.5">
                  <span className="kicker">{c.tag}</span>
                  <h4 className="font-display font-bold text-lg text-ink tracking-tight">{c.title}</h4>
                  <p className="text-ink-soft text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Reveal>

      {/* ============================== PULL QUOTE ============================== */}
      <section className="px-6 md:px-12 pt-24 md:pt-32">
        <Reveal className="max-w-6xl mx-auto bg-paper-3 rounded-[2rem] px-8 py-16 md:px-16 md:py-24 text-center relative overflow-hidden">
          <Item as="div" className="text-accent font-display text-7xl leading-none mb-4">“</Item>
          <blockquote className="font-serif italic text-3xl md:text-5xl text-ink leading-[1.15] max-w-4xl mx-auto tracking-tight">
            <MaskLine>I'll give you my truthful, unfiltered</MaskLine>
            <MaskLine>two cents. If you want a yes-man,</MaskLine>
            <MaskLine>I'm genuinely not your guy.</MaskLine>
          </blockquote>
          <Item className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-line-2" />
            <span className="kicker">Operating principle no. 1</span>
            <span className="h-px w-8 bg-line-2" />
          </Item>
        </Reveal>
      </section>

      {/* ============================== ADVISORY ============================== */}
      <Reveal as="section" className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-3">
            <Item as="span" className="kicker block">Work with me</Item>
            <Item as="h2" className="font-display font-bold text-ink text-4xl md:text-5xl tracking-tight">
              Advisory
            </Item>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <Item as="p" className="text-ink text-xl md:text-2xl leading-relaxed font-light">
              I take a very small number of advisory engagements each year: operations, growth, and
              applied AI for real businesses. Engagements start at{' '}
              <span className="mark font-medium">$5,000/month</span>. If that number didn't scare
              you off, we should talk.
            </Item>
            <Item>
              <Magnetic>
                <button
                  onClick={() => handleNavClick('/contact')}
                  className="btn-ink inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide cursor-pointer"
                >
                  <span>Start a conversation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Magnetic>
            </Item>
          </div>
        </div>
      </Reveal>

      {/* ============================== FINAL CTA (ink band) ============================== */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32 pb-24 md:pb-32">
        <Reveal className="bg-ink text-paper rounded-[2rem] px-8 py-14 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -left-20 -bottom-24 w-80 h-80 rounded-full bg-accent/25 blur-3xl pointer-events-none" />
          <Item className="relative space-y-3 text-center md:text-left max-w-xl">
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-tight">
              Building something and want a straight answer?
            </h2>
            <p className="text-paper/70 text-lg">
              Skip the pitch deck. Tell me what you're working on and I'll tell you the truth.
            </p>
          </Item>
          <Item className="relative shrink-0">
            <Magnetic>
              <button
                onClick={() => handleNavClick('/contact')}
                className="btn-accent px-8 py-4 rounded-full text-sm font-semibold tracking-wide cursor-pointer flex items-center gap-2"
              >
                <span>Work With Me</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </Item>
        </Reveal>
      </section>
    </div>
  );
}
