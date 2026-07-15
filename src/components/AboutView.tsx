import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, CheckCircle2, ChevronRight, CornerDownRight } from 'lucide-react';
import { TIMELINE } from '../data';

interface AboutViewProps {
  setActiveTab: (tab: string) => void;
}

export default function AboutView({ setActiveTab }: AboutViewProps) {
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(0);

  // Navigation helper
  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
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
      className="space-y-24 md:space-y-32 pb-24 pt-32 md:pt-40"
    >
      {/* Bio / Full Arc Block */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold block">Biography</span>
            <h1 id="about-title" className="text-4xl md:text-6xl font-black font-display tracking-tight text-white leading-none">
              Operator First. <br />
              Builder Now.
            </h1>
            <div className="h-[1px] w-20 bg-zinc-800"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
            {/* Left Column - Core Philosophy */}
            <div className="lg:col-span-4">
              <p className="text-zinc-400 text-sm font-serif italic leading-relaxed border-l border-zinc-800 pl-4 py-1">
                "For twenty years, I solved problems by aligning people, processes, and budgets. Today, I solve those same problems by aligning systems, code, and automations."
              </p>
              <div className="mt-8 space-y-2">
                <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">CURRENT STATUS</span>
                <span className="block text-xs text-zinc-300 font-mono">Founding Operator</span>
                <span className="block text-[10px] text-zinc-500 font-mono">Based in Rhode Island, USA</span>
              </div>
            </div>

            {/* Right Column - First Person Narrative (500-700 words) */}
            <div className="lg:col-span-8 space-y-6 text-zinc-300 text-sm md:text-base leading-relaxed font-sans font-light">
              <p>
                I spent nearly two decades navigating the hyper-competitive intersection of marketing, software engineering, digital media, and business operations. My career began not in cozy corporate suites, but in the fast-paced, high-stress ecosystem of the independent music industry. As a music industry executive and operator in New York City, I was tasked with leading an organization of over <strong>350 team members</strong>, managing international tour logistics, coordinate press campaigns, and negotiate complex distribution contracts. This early trial by fire taught me how to coordinate massive cross-functional alignments under tight margins and razor-thin timelines.
              </p>

              <p>
                When SaaS, cybersecurity, and digital products started reshaping the enterprise landscape, I transitioned my operational baseline into tech. I joined Aurea Software in Austin, Texas, as a Senior Operations Leader. There, I led the organic scaling of our channel business unit, implementing an 80/20 organic account expansion protocol that took our portfolio unit from <strong>$5M ARR to over $30M+ ARR</strong> in under three years. It was during this phase that I refined my core operating thesis: acting as an <em>intrapreneur</em> inside established systems to strip away inefficiencies and execute turnaround strategies with extreme ownership.
              </p>

              <p>
                My operational path has taken me around the globe. I led product development, sales strategy, and international market entry for a brand-new commercial enterprise owned by OnTheGoSystems out of <strong>Wan Chai, Hong Kong</strong>. Later, I directed a full-scale digital restructuring and rebrand for a national education organization in <strong>Tucson, Arizona</strong>, moving a legacy brick-and-mortar network 100% online by constructing custom student onboarding frameworks, membership systems, and secure payment processing gates.
              </p>

              <p>
                Through all of these chapters, my job was to build engines that made companies grow and run smoothly. I managed complex P&Ls, directed $600K/year marketing budgets, boosted inside sales revenue by 300%+ YTD, and optimized e-commerce platforms. But over time, the landscape shifted. I watched teams of people spend hours manual-handling tasks that could be executed with absolute precision by well-designed software. 
              </p>

              <p>
                Today, I operate out of Rhode Island. I no longer build systems for other people. I write code, design custom search intelligence algorithms, and deploy private generative AI agent systems that automate entire organizational workflows. I build and operate my own portfolio of software and digital marketing companies. The products themselves are not listed on this site—the work speaks for itself through the cash flow and operational stability they generate. 
              </p>

              <p className="pt-4 text-zinc-400 text-xs md:text-sm">
                If you are doing diligence, exploring high-level advisory alignments, or looking for an experienced operational partner, feel free to check what I am{' '}
                <button
                  onClick={() => handleNavClick('/now')}
                  className="text-white underline hover:text-zinc-300 transition-colors font-medium cursor-pointer"
                >
                  focusing on now
                </button>
                {' '}or reach out{' '}
                <button
                  onClick={() => handleNavClick('/contact')}
                  className="text-white underline hover:text-zinc-300 transition-colors font-medium cursor-pointer"
                >
                  directly
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline Section */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto border-t border-zinc-900 pt-20">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-900 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold block">SELECT COMPLETED CHAPTERS</span>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">
                The Battle Record
              </h2>
            </div>
            <p className="text-zinc-500 text-xs font-mono">
              / Career milestones and verifiable operational results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Timeline Left Selector */}
            <div className="lg:col-span-4 space-y-1">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">CHOOSE STOP:</div>
              <div className="flex flex-col space-y-1">
                {TIMELINE.map((stop, index) => {
                  const isActive = activeTimelineIdx === index;
                  return (
                    <button
                      key={stop.id}
                      onClick={() => setActiveTimelineIdx(index)}
                      className={`w-full text-left p-3.5 rounded border transition-all text-xs flex justify-between items-center ${
                        isActive 
                          ? 'bg-zinc-950 border-white text-white font-bold pl-5' 
                          : 'bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-mono text-[9px] text-zinc-500">{stop.period}</div>
                        <div className="font-display text-sm leading-snug">{stop.company}</div>
                        <div className="text-[10px] text-zinc-500">{stop.role}</div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'rotate-90 text-white' : 'text-zinc-600'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timeline Detail Pane */}
            <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 p-6 md:p-8 rounded-lg relative min-h-[420px] flex flex-col justify-between">
              {/* Highlight big metric */}
              {TIMELINE[activeTimelineIdx].highlightMetric && (
                <div className="absolute top-6 right-8 text-right hidden sm:block">
                  <div className="text-5xl font-black font-display text-white leading-none">
                    {TIMELINE[activeTimelineIdx].highlightMetric?.value}
                  </div>
                  <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mt-1">
                    {TIMELINE[activeTimelineIdx].highlightMetric?.label}
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2 max-w-[85%]">
                  <div className="inline-flex items-center space-x-2 bg-zinc-900 px-2.5 py-1 rounded text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
                    <Calendar className="w-3 h-3 text-zinc-500" />
                    <span>{TIMELINE[activeTimelineIdx].period}</span>
                    <span className="text-zinc-700">|</span>
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    <span>{TIMELINE[activeTimelineIdx].location}</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">
                    {TIMELINE[activeTimelineIdx].role}
                  </h3>
                  <p className="text-xs font-semibold font-mono text-zinc-500">
                    {TIMELINE[activeTimelineIdx].company}
                  </p>
                </div>

                <div className="h-px bg-zinc-900 my-4"></div>

                <div className="space-y-4">
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans font-light">
                    {TIMELINE[activeTimelineIdx].description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">VERIFIABLE RESULTS ACHIEVED:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {TIMELINE[activeTimelineIdx].achievements.map((ach, i) => (
                        <div key={i} className="bg-zinc-900/30 border border-zinc-900 p-3 rounded flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans">{ach}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Back to Home CTA trigger */}
              <div className="pt-6 border-t border-zinc-900 flex justify-between items-center text-xs mt-8">
                <span className="font-mono text-zinc-600">/ CHAPTER 0{activeTimelineIdx + 1} OF 06</span>
                <button
                  onClick={() => handleNavClick('/contact')}
                  className="text-white hover:text-zinc-300 font-mono text-xs uppercase tracking-widest flex items-center space-x-1.5 transition-colors group"
                >
                  <span>Inquire about this background</span>
                  <CornerDownRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
