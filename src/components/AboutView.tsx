import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Check, ChevronRight, ArrowRight } from 'lucide-react';
import { TIMELINE } from '../data';
import CountUp from './CountUp';

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
      {/* Bio */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div variants={item} className="max-w-3xl space-y-5">
          <span className="kicker">About</span>
          <h1
            id="about-title"
            className="font-display font-bold text-ink text-5xl md:text-7xl tracking-tight leading-[0.98]"
          >
            Operator first.
            <br />
            <span className="mark serif-italic font-normal">Builder now.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-14">
          {/* Aside */}
          <motion.div variants={item} className="lg:col-span-4 space-y-8">
            <p className="font-serif italic text-xl text-ink leading-relaxed border-l-2 border-accent pl-5">
              "For twenty years I solved problems by aligning people, processes, and budgets. Today
              I solve the same problems by aligning systems, code, and automations."
            </p>
            <div className="space-y-1.5">
              <span className="kicker">Currently</span>
              <div className="text-ink font-semibold">Founding operator</div>
              <div className="text-ink-soft text-sm">Rhode Island, USA</div>
            </div>
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
