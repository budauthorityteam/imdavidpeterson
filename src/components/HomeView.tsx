import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowDown, Mic, BookOpen, Sparkles, Check, Building2, Wrench, TrendingUp } from 'lucide-react';
import CountUp from './CountUp';
import LiveOps from './LiveOps';
import {
  Reveal,
  Item,
  MaskLine,
  TiltCard,
  Magnetic,
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

const OUTLINE_WORDS = ['Grow', 'Build', 'Buy', 'Grow', 'Build', 'Buy'];

const PROOF = [
  { metric: '$30M+', label: 'ARR grown from $5M', detail: 'Scaled a channel business unit in under three years with an 80/20 organic strategy.', where: 'Aurea Software · Austin, TX' },
  { metric: '350+', label: 'People led', detail: 'Ran a 350-person operation across artists, staff, and logistics under razor-thin margins.', where: 'Music industry · New York, NY' },
  { metric: '300%+', label: 'Sales growth YTD', detail: 'Grew inside sales 300%+, e-commerce 150%+, and foot traffic 200%+ across 17 stores.', where: 'Retail & inside sales · CT' },
  { metric: '$5.5M+', label: 'Revenue driven', detail: 'Owned a $600K/year marketing budget and P&L that produced $5.5M+ over 2.5 years.', where: 'P&L ownership · Austin, TX' },
  { metric: '100%', label: 'Moved online', detail: 'Rebuilt a national education org from brick-and-mortar to fully online, payments and all.', where: 'Digital rebuild · Tucson, AZ' },
  { metric: '30+', label: 'Retainer clients', detail: 'Founder of BudAuthority, running proprietary SEO intelligence software for 30+ brands.', where: 'BudAuthority · Rhode Island' },
];

/* Section eyebrow: number + label, for rhythm between sections */
function Eyebrow({ n, label, light = false }: { n: string; label: string; light?: boolean }) {
  return (
    <Item className="flex items-center gap-3">
      <span className={`font-display font-bold text-sm ${light ? 'text-ink-faint' : 'text-line-2'}`}>{n}</span>
      <span className="h-px w-6 bg-current opacity-30" />
      <span className="kicker">{label}</span>
    </Item>
  );
}

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
      {/* ============================== HERO (dark, cinematic) ============================== */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12">
        {/* Ambient dark field: copper + cyan aurora, faint tech grid */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="aurora aurora-a" />
          <div className="aurora aurora-b" />
          <div className="absolute inset-0 tech-grid" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center"
        >
          {/* Statement */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col gap-6">
            <Item className="mono text-[11px] uppercase tracking-[0.2em] text-accent flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
              Operator × Builder — Rhode Island, USA
            </Item>

            <h1
              id="hero-h1"
              className="font-display font-bold text-ink tracking-[-0.035em] leading-[0.9] text-[3rem] sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]"
              style={{ textWrap: 'balance' as any }}
            >
              I scaled companies to{' '}
              <span className="text-accent [text-shadow:0_0_40px_rgba(224,138,79,0.45)]">$30M+</span>.
              <span className="block">Now I build my own.</span>
            </h1>

            <Item className="text-ink-soft text-lg md:text-xl leading-relaxed max-w-xl">
              Two decades operating and scaling other people&apos;s businesses. Now I pour it into my
              own: software, AI systems, and boring companies that quietly print cash.
            </Item>

            <Item className="flex flex-wrap items-center gap-3.5 pt-1">
              <Magnetic>
                <button
                  onClick={() => handleNavClick('/contact')}
                  className="btn-accent px-7 py-4 rounded-full text-[15px] tracking-wide cursor-pointer flex items-center gap-2"
                >
                  <span>Work With Me</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Magnetic>
              <a
                href="#track-record"
                className="group glass text-ink font-semibold text-[15px] flex items-center gap-2 px-6 py-4 rounded-full hover:border-accent/50 transition-colors"
              >
                <span>See the track record</span>
                <ArrowDown className="w-4 h-4 text-accent group-hover:translate-y-0.5 transition-transform" />
              </a>
            </Item>

            {/* Stat row */}
            <Item className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 mt-1 border-t border-line">
              {[
                ['$30M+', 'ARR scaled'],
                ['350+', 'people led'],
                ['300%+', 'sales growth'],
                ['30+', 'clients'],
              ].map(([n, l], i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight tabular-nums">
                    <CountUp value={n} />
                  </span>
                  <span className="text-xs text-ink-faint uppercase tracking-wider">{l}</span>
                </div>
              ))}
            </Item>
          </div>

          {/* Portrait emerging from the dark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5 order-1 lg:order-2 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[600px]"
          >
            {/* warm glow behind the figure */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full blur-[60px]"
              style={{ background: 'radial-gradient(circle, rgba(224,138,79,0.32), transparent 68%)' }}
            />
            <img
              src="/david-hero.png"
              alt="David Peterson"
              loading="eager"
              className="absolute inset-0 w-full h-full object-contain object-bottom -scale-x-100 select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ========================= KNOWN FOR MARQUEE (paper-2 band) ========================= */}
      <section className="border-y border-line bg-paper-2 py-7 overflow-hidden">
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper-2 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper-2 to-transparent" />
        </div>
      </section>

      {/* ============================== MEET DAVID (story band + B&W portrait) ============================== */}
      <section className="bg-paper-2">
        <Reveal className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Color half-body on a clean white panel (white bg melts, no filters) */}
            <Item className="lg:col-span-6">
              <div className="relative rounded-[1.75rem] bg-gradient-to-b from-paper-2 to-paper border border-line shadow-[0_36px_80px_-46px_rgba(0,0,0,0.7)] overflow-hidden aspect-[5/6] lg:aspect-[4/5] lg:min-h-[620px]">
                <img
                  src="/david-about.png"
                  alt="David Peterson"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-[center_top] select-none"
                />
              </div>
            </Item>

            {/* Story */}
            <div className="lg:col-span-6 space-y-6">
              <Item as="h2" className="font-display font-extrabold text-ink text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[0.98]">
                The operator behind
                <br />
                the build.
              </Item>
              <Item as="p" className="text-ink-soft text-lg md:text-xl leading-relaxed max-w-2xl">
                I started in the independent music industry, running a 350-person operation under
                razor-thin timelines. From there: scaling a software channel from{' '}
                <strong className="text-ink font-semibold">$5M to $30M+</strong>, launching a venture
                out of Hong Kong, moving a national org 100% online, and 300%+ sales turnarounds.
              </Item>
              <Item as="p" className="text-ink-soft text-lg leading-relaxed max-w-2xl">
                Now I build my own portfolio, software, AI systems, and boring, cash-flowing
                companies, and share the playbook without the yes-man filter.
              </Item>
              <Item className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
                <button
                  onClick={() => handleNavClick('/about')}
                  className="btn-ink inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide cursor-pointer"
                >
                  <span>Read my full story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="mono text-[12px] uppercase tracking-[0.14em] text-ink-faint">
                  Music → SaaS → Retail → AI
                </div>
              </Item>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================== TRACK RECORD (cream) ============================== */}
      <section id="track-record" className="bg-paper scroll-mt-24">
        <Reveal className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-2xl space-y-4 mb-14">
            <Item as="h2" className="font-display font-extrabold text-ink text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[0.98]">
              Before I built for myself,
              <br />
              I built for everyone else.
            </Item>
            <Item as="p" className="text-ink-soft text-lg md:text-xl">
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
      </section>

      {/* ============================== THESIS: GROW / BUILD / BUY (dark band) ============================== */}
      <section className="bg-paper-2 border border-line text-ink">
        <Reveal className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-2xl space-y-5 mb-14">
            <Eyebrow n="02" label="The thesis" light />
            <Item as="h2" className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[0.95]">
              I don't chase unicorns.
              <br />
              I grow <span className="serif-italic font-normal text-accent">boring</span> ones.
            </Item>
            <Item as="p" className="text-ink-soft text-lg leading-relaxed">
              The best businesses are unglamorous: local, essential, and quietly profitable, doing
              $500K to $1M in revenue. I help operators take them to $2M to $10M in sales, and I help
              the right people buy into or work with that kind of company.
            </Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: TrendingUp, tag: 'Grow', desc: 'Take a real, boring business doing $500K to $1M and help it reach $2M to $10M in sales, with operating systems and demand that compound.' },
              { icon: Wrench, tag: 'Build', desc: 'Software and AI systems built from scratch, where clean code replaces headcount and lifts margin.' },
              { icon: Building2, tag: 'Buy', desc: 'Help the right operator find, acquire, or partner into a boring, cash-flowing company worth owning.' },
            ].map((c, i) => (
              <TiltCard key={c.tag} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6" max={8}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <span className="w-11 h-11 rounded-full bg-accent flex items-center justify-center">
                      <c.icon className="w-5 h-5 text-white" />
                    </span>
                    <span className="font-display font-bold text-4xl text-ink/15">0{i + 1}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl tracking-tight mt-5">{c.tag}</h3>
                  <p className="text-ink-soft leading-relaxed mt-2">{c.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>

          <Item className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-ink-soft text-lg">Growing one of these, or want to get into one?</p>
            <Magnetic>
              <button
                onClick={() => handleNavClick('/contact')}
                className="btn-accent inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide cursor-pointer"
              >
                <span>Let's talk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </Item>
        </Reveal>
      </section>

      {/* ============================== WHAT I'M BUILDING (soft) ============================== */}
      <section className="bg-paper-2">
        <Reveal className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-4">
              <Eyebrow n="03" label="Right now" />
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
                <span className="font-medium mark">AI agent systems</span> that automate the
                workflows entire teams used to run, applying twenty years of operating lessons
                directly to code instead of org charts.
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

          {/* Live operations panel — a real look at the software I build */}
          <Item className="mt-14 space-y-4">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <p className="font-display font-semibold text-ink text-xl md:text-2xl tracking-tight">
                Systems that do the work of teams.
              </p>
              <p className="text-ink-faint text-sm max-w-xs">
                A live look at one of them: agents scanning, ranking, and shipping fixes.
              </p>
            </div>
            <LiveOps />
          </Item>
        </Reveal>
      </section>

      {/* ============================== NEWSLETTER (deep cream + ink card) ============================== */}
      <section className="bg-paper-3">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal className="bg-paper-2 border border-line text-ink rounded-[2rem] px-8 py-12 md:px-16 md:py-16 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-accent/25 blur-3xl pointer-events-none" />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-4">
                <Item as="span" className="kicker block">The Operator's Memo</Item>
                <Item as="h2" className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.02]">
                  The playbook I wish
                  <br />
                  someone had handed me.
                </Item>
                <Item as="p" className="text-ink-soft text-lg max-w-xl">
                  A short, occasional note on scaling operations, building with AI, and the ugly
                  parts nobody puts on LinkedIn. No spam. Unsubscribe anytime.
                </Item>
              </div>
              <Item className="lg:col-span-5">
                {subscribed ? (
                  <div className="bg-white/10 border border-white/10 rounded-2xl p-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </span>
                    <div>
                      <div className="font-semibold">You're in.</div>
                      <div className="text-ink-faint text-sm">Watch your inbox for the next memo.</div>
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
                      className="w-full bg-white/10 border border-white/15 rounded-full px-6 py-4 text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
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
                    <p className="text-ink-faint text-xs text-center">Join operators reading along as I build.</p>
                  </form>
                )}
              </Item>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== OUTLINED MARQUEE BAND ============================== */}
      <section className="py-10 md:py-14 border-y border-line bg-paper overflow-hidden marquee-track">
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

      {/* ============================== PODCAST / MEDIA (soft) ============================== */}
      <section className="bg-paper-2">
        <Reveal className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-3">
              <Eyebrow n="04" label="Listen in" />
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
              { tag: 'Podcast · Host', title: 'Taking Back Entrepreneurship', desc: 'Direct, no-nonsense breakdowns of what it actually takes to build a business. Zero survival bias, zero sugar-coating.' },
              { tag: 'Podcast · Co-Host', title: 'We Tried, We Failed', desc: 'Candid post-mortems of pivots, close calls, and hard-won resilience from builders who lost it and came back.' },
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
      </section>

      {/* ============================== PULL QUOTE (deep cream) ============================== */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal className="bg-paper-3 rounded-[2rem] px-8 py-16 md:px-16 md:py-24 text-center relative overflow-hidden">
            <Item as="div" className="text-accent font-serif text-7xl leading-none mb-4">“</Item>
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
        </div>
      </section>

      {/* ============================== ADVISORY (soft) ============================== */}
      <section className="bg-paper-2">
        <Reveal className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-4">
              <Eyebrow n="05" label="Work with me" />
              <Item as="h2" className="font-display font-bold text-ink text-4xl md:text-5xl tracking-tight">
                Advisory
              </Item>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <Item as="p" className="text-ink text-xl md:text-2xl leading-relaxed font-light">
                I take a very small number of advisory engagements each year: operations, growth, and
                applied AI for real businesses. Engagements start at{' '}
                <span className="mark font-medium">$10,000/month</span>. If that number didn't scare
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
      </section>

      {/* ============================== FINAL CTA (dark band) ============================== */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal className="bg-paper-2 border border-line text-ink rounded-[2rem] px-8 py-14 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute -left-20 -bottom-24 w-80 h-80 rounded-full bg-accent/25 blur-3xl pointer-events-none" />
            <Item className="relative space-y-3 text-center md:text-left max-w-xl">
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-tight">
                Building something and want a straight answer?
              </h2>
              <p className="text-ink-soft text-lg">
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
        </div>
      </section>
    </div>
  );
}
