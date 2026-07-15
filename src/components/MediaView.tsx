import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, ExternalLink, Mic, Volume2, Video, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';

interface MediaViewProps {
  setActiveTab: (tab: string) => void;
}

export default function MediaView({ setActiveTab }: MediaViewProps) {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  // Navigation helper
  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const episodes = [
    {
      id: "tbe-ep48",
      podcast: "Taking Back Entrepreneurship",
      title: "Ep. 48: The Fractional COO Myth — Why Strategy Without Operations is Dead Weight",
      duration: "42:15",
      published: "July 10, 2026",
      desc: "David breaks down the failure vectors of standard strategic consultants and details the exact operational checklist needed to step in, diagnose leaks, and turn business models around on day one.",
      audioUrl: "#"
    },
    {
      id: "wtwf-ep31",
      podcast: "We Tried, We Failed",
      title: "Ep. 31: Moving Too Fast, Moving Too Late — Rebuilding Core Infrastructure Under Volatile Margins",
      duration: "58:40",
      published: "June 24, 2026",
      desc: "Co-hosts explore the brutal operational lessons of a national education rebrand, detailing the infrastructure pivot to custom online member platforms and handling millions in transactional errors.",
      audioUrl: "#"
    },
    {
      id: "tbe-ep45",
      podcast: "Taking Back Entrepreneurship",
      title: "Ep. 45: Channel Scaling & The 80/20 Account Retention Formula",
      duration: "35:10",
      published: "May 18, 2026",
      desc: "How David grew Aurea's channel business unit from $5M to $30M+ ARR using zero ad spend and scaling organic relationships across existing customer pipelines.",
      audioUrl: "#"
    }
  ];

  const speakingTopics = [
    {
      title: "Tactical Entrepreneurship",
      desc: "Moving beyond survival bias and venture-backed hype. The practical realities of bootstrapping cash-flowing operations."
    },
    {
      title: "Operations at Scale",
      desc: "Surgical auditing of marketing technology, workflow structures, and P&L accountability."
    },
    {
      title: "Applied AI in Real Businesses",
      desc: "How to audit, implement, and run generative AI systems that replace repetitive human labor and manual workflows."
    },
    {
      title: "Building with Agents",
      desc: "Developing autonomous system architectures that operate 24/7 inside sales, support, and marketing."
    }
  ];

  const speakingFormats = [
    "Keynote Addresses",
    "Panel Moderation & Participation",
    "Podcast Guest Appearances",
    "Remote Executive Workshops"
  ];

  const pressMentions = [
    {
      outlet: "Forbes Business Council",
      title: "The Rise of the Embedded Operator: Why Middle-Market Firms are Abandoning Traditional Advisors",
      date: "March 2026",
      link: "#"
    },
    {
      outlet: "Wired Technology Review",
      title: "Migrating Legacy IT Under Pressure: Custom Platforms vs. Monolithic SaaS",
      date: "January 2026",
      link: "#"
    },
    {
      outlet: "Entrepreneur",
      title: "Game Changer vs. Clout Chaser: How to Audit Your Service Agency for Real Outcomes",
      date: "November 2025",
      link: "#"
    },
    {
      outlet: "Rhode Island Business Journal",
      title: "BudAuthority: Local Agency Founders Launch Proprietary Search Intelligence Suite",
      date: "August 2025",
      link: "#"
    }
  ];

  const togglePlayback = (epId: string) => {
    setIsPlaying(isPlaying === epId ? null : epId);
  };

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
      className="space-y-24 md:space-y-32 pb-24 pt-32 md:pt-40"
    >
      {/* Header section */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold block">Media & Speaking</span>
          <h1 id="media-title" className="text-4xl md:text-6xl font-black font-display tracking-tight text-white leading-none">
            Podcast Hub & Speaking
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl font-sans font-light">
            Hear David's raw, unfiltered commentary on scale, organizational change, and digital marketing operations across active podcasts and publications.
          </p>
        </div>
      </section>

      {/* Podcast Console & Player */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div className="flex items-center space-x-2">
              <Mic className="w-4 h-4 text-zinc-500" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold">Featured Episodes</h3>
            </div>
            <span className="text-[10px] text-zinc-600 font-mono tracking-widest hidden sm:inline">SELECT TO PLAY SAMPLE</span>
          </div>

          <div className="space-y-4">
            {episodes.map((ep) => {
              const isEpPlaying = isPlaying === ep.id;
              return (
                <div 
                  key={ep.id}
                  className={`p-6 rounded-lg border transition-all duration-300 ${
                    isEpPlaying 
                      ? 'bg-zinc-900/60 border-zinc-500' 
                      : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={() => togglePlayback(ep.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                          isEpPlaying 
                            ? 'bg-white border-white text-black' 
                            : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white hover:border-white'
                        }`}
                        aria-label={isEpPlaying ? "Pause episode" : "Play episode"}
                      >
                        {isEpPlaying ? (
                          <Pause className="w-4.5 h-4.5 fill-current" />
                        ) : (
                          <Play className="w-4.5 h-4.5 fill-current translate-x-0.5" />
                        )}
                      </button>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-mono font-bold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded tracking-wider">
                            {ep.podcast}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">{ep.published}</span>
                        </div>
                        
                        <h4 className="text-sm md:text-base font-bold tracking-tight text-white font-display">
                          {ep.title}
                        </h4>
                        
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-2xl font-light">
                          {ep.desc}
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 shrink-0 border-t sm:border-t-0 border-zinc-900 pt-3 sm:pt-0">
                      <span className="text-[10px] font-mono text-zinc-500">{ep.duration}</span>
                      
                      {isEpPlaying && (
                        <div className="flex items-end space-x-0.5 h-4 pb-0.5">
                          <span className="w-0.5 bg-white animate-[pulse_0.8s_infinite] h-3"></span>
                          <span className="w-0.5 bg-white animate-[pulse_1.2s_infinite] h-4"></span>
                          <span className="w-0.5 bg-white animate-[pulse_0.9s_infinite] h-2"></span>
                          <span className="w-0.5 bg-white animate-[pulse_1.4s_infinite] h-3.5"></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Speaking Topics & Formats */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto border-t border-zinc-900 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Speaking Topics Left */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center space-x-2 border-b border-zinc-900 pb-4">
              <Video className="w-4 h-4 text-zinc-500" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold">Speaking Topics</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {speakingTopics.map((topic, i) => (
                <div key={i} className="bg-zinc-950 border border-zinc-900 rounded-lg p-5 space-y-2 hover:border-zinc-800 transition-colors">
                  <h4 className="text-sm md:text-base font-bold font-display text-white">{topic.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light">{topic.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Formats Right */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border-b border-zinc-900 pb-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold">Available Formats</h3>
            </div>

            <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-5 space-y-3.5">
              {speakingFormats.map((format, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span className="text-xs text-zinc-300 font-sans font-light">{format}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleNavClick('/contact')}
              className="w-full text-center py-3.5 bg-zinc-950 border border-zinc-900 hover:border-white text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-white transition-all rounded-lg font-bold"
            >
              Inquire for Speaking
            </button>
          </div>
        </div>
      </section>

      {/* Press Mentions List */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto border-t border-zinc-900 pt-20">
        <div className="space-y-8">
          <div className="border-b border-zinc-900 pb-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-zinc-500" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold">Press & Editorials</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pressMentions.map((press, i) => (
              <div 
                key={i} 
                className="p-5 bg-zinc-950 border border-zinc-900 rounded-lg flex justify-between items-center group hover:border-zinc-800 transition-all"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center space-x-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                    <span>{press.outlet}</span>
                    <span>•</span>
                    <span>{press.date}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug group-hover:text-zinc-300 transition-colors">
                    {press.title}
                  </h4>
                </div>
                
                <a 
                  href={press.link} 
                  className="w-8 h-8 rounded bg-zinc-900 border border-zinc-850 flex items-center justify-center shrink-0 text-zinc-500 group-hover:text-white group-hover:bg-zinc-800 transition-all"
                  title="Read editorial placeholder"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
