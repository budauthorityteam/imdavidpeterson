import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Check, ChevronRight, ArrowRight, Wrench, Building2, TrendingUp } from 'lucide-react';
import { TIMELINE } from '../data';
import CountUp from './CountUp';
import { Reveal, Item, PhotoFrame } from './Motion';

interface AboutViewProps {
  setActiveTab: (tab: string) => void;
}

export default function AboutView({ setActiveTab }: AboutViewProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const active = TIMELINE[activeIdx];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="pb-28 pt-32 md:pt-44"
    >
      {/* Bio hero — bold, photo-led */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <motion.div variants={item} className="lg:col-span-6 order-2 lg:order-1 space-y-7">
            <span className="kicker">About</span>
            <h1
              id="about-title"
              className="font-display font-bold text-ink text-6xl md:text-7xl xl:text-8xl tracking-[-0.03em] leading-[0.9]"
            >
              Operator first.
              <br />
              <span className="mark serif-italic font-normal">Builder now.</span>
            </h1>
            <p className="text-ink-soft text-xl md:text-2xl leading-relaxed max-w-xl font-light">
              Twenty years spent aligning people, processes, and budgets. Today I align systems,
              code, and automations, and I do it in the open.
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line max-w-md pt-6">
              <div className="space-y-1">
                <span className="kicker">Currently</span>
                <div className="text-ink font-semibold">Founding operator</div>
                <div className="text-ink-soft text-sm">Rhode Island, USA</div>
              </div>
              <div className="space-y-1">
                <span className="kicker">Since</span>
                <div className="text-ink font-semibold">Two decades in</div>
                <div className="text-ink-soft text-sm">Music → SaaS → AI</div>
              </div>
            </div>
          </motion.div>

          {/* Big, bold portrait with offset clay frame */}
          <motion.div variants={item} className="lg:col-span-6 order-1 lg:order-2 relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 rounded-[2.25rem] bg-accent"
            />
            <PhotoFrame
              src="/david-about.png"
              alt="David Peterson"
              className="relative z-10 aspect-[4/5] w-full rounded-[2.25rem] border border-line bg-gradient-to-b from-paper-2 to-paper shadow-[0_50px_90px_-45px_rgba(0,0,0,0.8)]"
              imgClassName="object-top"
            />
          </motion.div>
        </div>

        {/* Pull quote + narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-24 md:pt-32">
          <motion.div variants={item} className="lg:col-span-4 space-y-4 lg:sticky lg:top-28 self-start">
            <span className="font-serif text-accent text-7xl leading-[0.5] block" aria-hidden="true">“</span>
            <p className="font-serif italic text-2xl text-ink leading-relaxed">
              For twenty years I solved problems by aligning people, processes, and budgets. Today
              I solve the same problems by aligning systems, code, and automations.
            </p>
          </motion.div>

          {/* Narrative */}
          <motion.div variants={item} className="lg:col-span-8 space-y-5 text-ink-soft text-lg leading-relaxed">
            <p>
              I spent nearly two decades at the intersection of marketing, software, media, and
              operations. My career didn't start in a corporate suite. It started in the fast,
              high-stress world of the independent music industry, where I led an organization of
              over <strong className="text-ink font-semibold">350 people</strong>, ran international
              tour logistics, coordinated press, and negotiated distribution deals. That trial by
              fire taught me how to align large, messy teams under razor-thin timelines.
            </p>
            <p>
              When SaaS and digital products started reshaping the enterprise, I moved my operating
              baseline into tech. At Aurea Software in Austin, I led the organic scaling of our
              channel business unit, taking it from{' '}
              <strong className="text-ink font-semibold">$5M to $30M+ ARR</strong> in under three
              years with an 80/20 account-expansion protocol. That's where I refined my thesis: act
              like an <em>intrapreneur</em> inside established systems, strip out the inefficiency,
              and execute with extreme ownership.
            </p>
            <p>
              The work took me around the globe: product, sales, and market entry for a new venture
              out of <strong className="text-ink font-semibold">Hong Kong</strong>; a full digital
              rebuild that moved a national education org 100% online from{' '}
              <strong className="text-ink font-semibold">Tucson</strong>, custom membership and
              payments included. Through all of it, my job was to build engines that made companies
              grow and run smoothly. $600K marketing budgets, 300%+ sales growth, e-commerce
              rebuilds.
            </p>
            <p>
              Then the landscape shifted. I watched teams spend hours on work that well-designed
              software could do with precision. So today, out of Rhode Island, I no longer build
              systems for other people. I write code, design search-intelligence algorithms, and
              deploy private generative AI agents that automate entire workflows, across my own
              portfolio of software and marketing companies.
            </p>
            <p>
              Building is only half of it. I spend just as much time inside real, boring,
              cash-flowing companies, taking a business doing $500K to $1M and helping it reach
              $2M to $10M in sales, and helping the right people buy into or partner with that kind
              of company. Unsexy is the entire point.
            </p>
            <p className="text-ink">
              If you're doing diligence, exploring advisory, or looking for an operating partner,
              see what I'm{' '}
              <button
                onClick={() => handleNavClick('/now')}
                className="text-accent font-medium link-underline cursor-pointer"
              >
                focused on now
              </button>{' '}
              or{' '}
              <button
                onClick={() => handleNavClick('/contact')}
                className="text-accent font-medium link-underline cursor-pointer"
              >
                reach out directly
              </button>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* Acquisition thesis */}
      <Reveal as="section" className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32">
        <div className="bg-paper-2 border border-line text-ink rounded-[2rem] px-8 py-12 md:px-14 md:py-16 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-accent/25 blur-3xl pointer-events-none" />
          <div className="relative space-y-9">
            <div className="max-w-2xl space-y-4">
              <Item as="span" className="kicker block">Grow. Build. Buy.</Item>
              <Item as="h2" className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-[1.02]">
                Grow what already works.
                <br />
                Build what should exist.
              </Item>
              <Item as="p" className="text-ink-soft text-lg leading-relaxed">
                These days my time splits between growing real, boring, cash-flowing companies and
                building the software that runs them. I take a business doing $500K to $1M and help
                it reach $2M to $10M in sales, and I help the right people buy into that kind of
                company too.
              </Item>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: TrendingUp, tag: 'Grow', desc: 'Take a $500K to $1M business to $2M to $10M in sales with operating systems and demand.' },
                { icon: Wrench, tag: 'Build', desc: 'Software and AI systems from scratch, where clean code replaces headcount.' },
                { icon: Building2, tag: 'Buy', desc: 'Help the right operator acquire or partner into a boring, cash-flowing company.' },
              ].map((c) => (
                <Item key={c.tag} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                  <span className="w-11 h-11 rounded-full bg-accent flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-white" />
                  </span>
                  <h3 className="font-display font-bold text-xl tracking-tight">{c.tag}</h3>
                  <p className="text-ink-soft text-sm leading-relaxed">{c.desc}</p>
                </Item>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Timeline */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32">
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-3">
            <span className="kicker">The track record</span>
            <h2 className="font-display font-bold text-ink text-4xl md:text-5xl tracking-tight">
              Chapters that shipped
            </h2>
          </div>
          <p className="text-ink-soft text-lg">Career milestones and verifiable results.</p>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Selector */}
          <div className="lg:col-span-5 space-y-2">
            {TIMELINE.map((stop, index) => {
              const isActive = activeIdx === index;
              return (
                <button
                  key={stop.id}
                  onClick={() => setActiveIdx(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center gap-3 ${
                    isActive
                      ? 'bg-paper-2 border-line-2 shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-paper-2/60'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs text-ink-faint font-medium">{stop.period}</div>
                    <div className="font-display font-semibold text-lg text-ink tracking-tight leading-snug">
                      {stop.company}
                    </div>
                    <div className="text-sm text-ink-soft">{stop.role}</div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 shrink-0 transition-all ${
                      isActive ? 'text-accent translate-x-0' : 'text-ink-faint -translate-x-1'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div className="lg:col-span-7 ed-card rounded-2xl p-7 md:p-8 relative min-h-[440px] flex flex-col justify-between">
            {active.highlightMetric && (
              <div className="absolute top-7 right-8 text-right hidden sm:block">
                <div className="font-display font-bold text-5xl text-accent leading-none tracking-tight">
                  <CountUp value={active.highlightMetric.value} />
                </div>
                <div className="text-xs text-ink-faint mt-1">{active.highlightMetric.label}</div>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-3 max-w-[80%]">
                <div className="inline-flex items-center gap-2 bg-paper px-3 py-1.5 rounded-full text-xs text-ink-soft border border-line">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{active.period}</span>
                  <span className="text-line-2">·</span>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{active.location}</span>
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight">
                  {active.role}
                </h3>
                <p className="text-ink-soft font-medium">{active.company}</p>
              </div>

              <div className="h-px bg-line" />

              <p className="text-ink-soft text-lg leading-relaxed">{active.description}</p>

              <div className="space-y-3">
                <div className="kicker">What came out of it</div>
                <div className="grid grid-cols-1 gap-2.5">
                  {active.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-1" />
                      <p className="text-ink-soft leading-relaxed">{ach}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-line flex justify-between items-center">
              <span className="text-sm text-ink-faint">
                Chapter {String(activeIdx + 1).padStart(2, '0')} of {String(TIMELINE.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => handleNavClick('/contact')}
                className="text-ink font-semibold text-sm flex items-center gap-1.5 group cursor-pointer"
              >
                <span className="link-underline">Ask me about this</span>
                <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
