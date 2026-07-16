import React from 'react';
import { motion } from 'motion/react';
import { Clock, ArrowRight } from 'lucide-react';

interface NowViewProps {
  setActiveTab: (tab: string) => void;
}

export default function NowView({ setActiveTab }: NowViewProps) {
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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-36"
    >
      <motion.div variants={itemVariants} className="space-y-4 mb-12">
        <div className="flex items-center space-x-2.5 text-zinc-400 font-mono text-xs uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] pulse-dot"></span>
          <Clock className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Status Page</span>
          <span className="text-[#10B981]">•</span>
          <span>Rhode Island, USA</span>
        </div>
        <h1 id="now-title" className="text-4xl md:text-6xl font-black font-display tracking-tighter">
          <span className="text-gradient">Now</span>
        </h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider">
          Last updated: July 15, 2026
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-12 border-t border-zinc-900 pt-10">
        <p className="text-zinc-300 font-sans text-base md:text-lg leading-relaxed font-light">
          This page is inspired by the <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300 transition-colors">/now page</a> movement. It is a quarterly snapshot of current focus, priorities, and physical location.
        </p>

        {/* 
          Refreshed quarterly in ten minutes.
          Maintains momentum and quiet focus without public product disclosures.
        */}
        
        <div className="space-y-8 font-sans">
          <div className="group border-l border-zinc-800 pl-6 space-y-2 hover:border-[#10B981] transition-colors">
            <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-widest block font-semibold">01 / SOFTWARE ARCHITECTURE</span>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed">
              Architecting private, generative agent microservices that coordinate complex customer lifecycle and marketing automation workflows. I am systematically stripping out operational bloat and replacing traditional headcount with system design.
            </p>
          </div>

          <div className="group border-l border-zinc-800 pl-6 space-y-2 hover:border-[#10B981] transition-colors">
            <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-widest block font-semibold">02 / OPERATIONS & SERVICES</span>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed">
              Managing organic growth systems and search visibility infrastructure under my primary digital marketing and SEO platform, servicing select enterprise retainers.
            </p>
          </div>

          <div className="group border-l border-zinc-800 pl-6 space-y-2 hover:border-[#10B981] transition-colors">
            <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-widest block font-semibold">03 / AUDIO MEDIA</span>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed">
              Recording and producing weekly long-form discussions for <span className="text-white italic">Taking Back Entrepreneurship</span> and <span className="text-white italic">We Tried, We Failed</span>, analyzing raw, survivor-bias-free operator realities.
            </p>
          </div>

          <div className="group border-l border-zinc-800 pl-6 space-y-2 hover:border-[#10B981] transition-colors">
            <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-widest block font-semibold">04 / ASSET ADVISORY</span>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed">
              Maintaining active real estate brokerage licensing in Rhode Island and Massachusetts. Advising select clients on off-market commercial property transactions and localized digital search targeting for physical assets.
            </p>
          </div>

          <div className="group border-l border-zinc-800 pl-6 space-y-2 hover:border-[#10B981] transition-colors">
            <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-widest block font-semibold">05 / SYSTEMS ENGINEERING</span>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed">
              Applying twenty years of hard-won operations to writing code instead of managing bloated org charts. I'm currently focused on model chaining, optimizing context-window management, and automated workflow triggers.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-16 pt-10 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="text-zinc-500 text-xs font-mono">
          Are you aligned on any of these verticals?
        </p>
        <button
          onClick={() => handleNavClick('/contact')}
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-white hover:text-zinc-300 transition-all group"
        >
          <span>Get in Touch</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
}
