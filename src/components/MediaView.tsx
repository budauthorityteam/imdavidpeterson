import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, ExternalLink, Mic, Check, ArrowRight } from 'lucide-react';
import { TiltCard } from './Motion';

interface MediaViewProps {
  setActiveTab: (tab: string) => void;
}

export default function MediaView({ setActiveTab }: MediaViewProps) {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const episodes = [
    {
      id: 'tbe-ep48',
      podcast: 'Taking Back Entrepreneurship',
      title: 'Ep. 48: The Fractional COO Myth: Why Strategy Without Operations Is Dead Weight',
      duration: '42:15',
      published: 'July 10, 2026',
      desc: "David breaks down where standard strategic consultants fail and the exact operational checklist he uses to step in, find the leaks, and turn a business around on day one.",
    },
    {
      id: 'wtwf-ep31',
      podcast: 'We Tried, We Failed',
      title: 'Ep. 31: Moving Too Fast, Moving Too Late: Rebuilding Core Infrastructure Under Volatile Margins',
      duration: '58:40',
      published: 'June 24, 2026',
      desc: 'The brutal operational lessons of a national education rebrand: the pivot to custom online member platforms and handling millions in transactional errors.',
    },
    {
      id: 'tbe-ep45',
      podcast: 'Taking Back Entrepreneurship',
      title: 'Ep. 45: Channel Scaling & The 80/20 Account Retention Formula',
      duration: '35:10',
      published: 'May 18, 2026',
      desc: 'How David grew a channel business unit from $5M to $30M+ ARR with zero ad spend, scaling organic relationships across existing customer pipelines.',
    },
  ];

  const speakingTopics = [
    { title: 'Tactical entrepreneurship', desc: 'Beyond survival bias and venture hype: the practical reality of bootstrapping cash-flowing operations.' },
    { title: 'Operations at scale', desc: 'Surgical auditing of marketing technology, workflow structure, and P&L accountability.' },
    { title: 'Applied AI in real businesses', desc: 'How to audit, implement, and run generative AI systems that replace repetitive human labor.' },
    { title: 'Building with agents', desc: 'Autonomous system architectures that run 24/7 inside sales, support, and marketing.' },
  ];

  const speakingFormats = [
    'Keynote addresses',
    'Panel moderation & participation',
    'Podcast guest appearances',
    'Remote executive workshops',
  ];

  const pressMentions = [
    { outlet: 'Forbes Business Council', title: 'The Rise of the Embedded Operator: Why Middle-Market Firms Are Abandoning Traditional Advisors', date: 'March 2026' },
    { outlet: 'Wired Technology Review', title: 'Migrating Legacy IT Under Pressure: Custom Platforms vs. Monolithic SaaS', date: 'January 2026' },
    { outlet: 'Entrepreneur', title: 'Game Changer vs. Clout Chaser: How to Audit Your Service Agency for Real Outcomes', date: 'November 2025' },
    { outlet: 'Rhode Island Business Journal', title: 'BudAuthority: Local Founders Launch Proprietary Search Intelligence Suite', date: 'August 2025' },
  ];

  const togglePlayback = (epId: string) => setIsPlaying(isPlaying === epId ? null : epId);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="pb-28 pt-32 md:pt-44">
      {/* Header */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div variants={item} className="max-w-3xl space-y-4">
          <span className="kicker">Podcasts &amp; speaking</span>
          <h1 id="media-title" className="font-display font-bold text-ink text-5xl md:text-7xl tracking-tight leading-[0.98]">
            Raw takes, on the record.
          </h1>
          <p className="text-ink-soft text-lg leading-relaxed">
            Unfiltered conversations on scale, organizational change, and the operations behind
            marketing that actually works. Two shows, a growing back catalog, and a keynote stage.
          </p>
        </motion.div>
      </section>

      {/* Episodes */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-16">
        <motion.div variants={item} className="flex items-center justify-between border-b border-line pb-4 mb-6">
          <div className="flex items-center gap-2 text-ink">
            <Mic className="w-4 h-4 text-accent" />
            <h2 className="kicker !text-ink">Featured episodes</h2>
          </div>
          <span className="text-sm text-ink-faint hidden sm:inline">Tap play for a sample</span>
        </motion.div>

        <div className="space-y-4">
          {episodes.map((ep) => {
            const playing = isPlaying === ep.id;
            return (
              <motion.div
                key={ep.id}
                variants={item}
                className={`rounded-2xl border p-6 transition-all ${
                  playing ? 'bg-paper-2 border-line-2 shadow-sm' : 'bg-paper-2/50 border-line hover:border-line-2'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => togglePlayback(ep.id)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        playing ? 'bg-accent text-white' : 'bg-ink text-paper hover:bg-accent'
                      }`}
                      aria-label={playing ? 'Pause episode' : 'Play episode'}
                    >
                      {playing ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      )}
                    </button>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-accent bg-accent-soft px-2.5 py-0.5 rounded-full">
                          {ep.podcast}
                        </span>
                        <span className="text-xs text-ink-faint">{ep.published}</span>
                      </div>
                      <h3 className="font-display font-semibold text-lg text-ink tracking-tight leading-snug">
                        {ep.title}
                      </h3>
                      <p className="text-ink-soft leading-relaxed max-w-2xl">{ep.desc}</p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                    <span className="text-sm text-ink-faint">{ep.duration}</span>
                    {playing && (
                      <div className="flex items-end gap-0.5 h-4">
                        <span className="w-0.5 bg-accent animate-[pulse_0.8s_infinite] h-3" />
                        <span className="w-0.5 bg-accent animate-[pulse_1.2s_infinite] h-4" />
                        <span className="w-0.5 bg-accent animate-[pulse_0.9s_infinite] h-2" />
                        <span className="w-0.5 bg-accent animate-[pulse_1.4s_infinite] h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Speaking */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div variants={item} className="lg:col-span-8 space-y-6">
            <h2 className="kicker">Speaking topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {speakingTopics.map((t, i) => (
                <TiltCard key={i} className="ed-card rounded-2xl p-6" max={6}>
                  <div className="space-y-2">
                    <h3 className="font-display font-semibold text-lg text-ink tracking-tight">{t.title}</h3>
                    <p className="text-ink-soft leading-relaxed">{t.desc}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="lg:col-span-4 space-y-5">
            <h2 className="kicker">Formats</h2>
            <div className="ed-card rounded-2xl p-6 space-y-3.5">
              {speakingFormats.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-ink-soft">{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleNavClick('/contact')}
              className="btn-ink w-full py-3.5 rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book me to speak</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Press */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-24 md:pt-32">
        <motion.h2 variants={item} className="kicker mb-6">
          Press &amp; editorials
        </motion.h2>
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pressMentions.map((press, i) => (
            <TiltCard key={i} className="ed-card rounded-2xl p-5 group" max={5}>
              <a href="#" className="flex justify-between items-center gap-4 h-full">
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-2 text-xs text-ink-faint">
                    <span className="font-medium text-accent">{press.outlet}</span>
                    <span>·</span>
                    <span>{press.date}</span>
                  </div>
                  <h3 className="font-display font-semibold text-ink tracking-tight leading-snug">
                    {press.title}
                  </h3>
                </div>
                <span className="w-9 h-9 rounded-full bg-paper border border-line flex items-center justify-center shrink-0 text-ink-soft group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-all">
                  <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            </TiltCard>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}
