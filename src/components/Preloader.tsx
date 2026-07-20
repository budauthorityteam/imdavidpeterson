import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Building2, Cog, TrendingUp, Cpu, BookOpen } from 'lucide-react';

/**
 * Intro loader: a business assembles itself. Five blocks drop in with spring
 * physics and stack up, revenue counts to $8M, a copper "box" snaps around the
 * finished stack, then the whole panel wipes up to reveal the site.
 */

const BLOCKS = [
  { icon: Building2, label: 'Business' },
  { icon: Cog, label: 'Systems' },
  { icon: TrendingUp, label: 'Demand' },
  { icon: Cpu, label: 'AI Agents' },
  { icon: BookOpen, label: 'Playbook' },
];

const fmt = (n: number) => (n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1000)}K`);

export default function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [rev, setRev] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setRev(Math.round((1 - Math.pow(1 - p, 3)) * 8_000_000));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const t = setTimeout(() => setDone(true), 2300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-paper text-ink flex flex-col items-center justify-center gap-7 px-6 overflow-hidden"
        >
          {/* ambient */}
          <div aria-hidden="true" className="absolute inset-0 tech-grid opacity-60 pointer-events-none" />
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full blur-[90px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(224,138,79,0.16), transparent 70%)' }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative mono text-[11px] uppercase tracking-[0.3em] text-accent"
          >
            Assembling the business
          </motion.div>

          {/* Assembling stack */}
          <div className="relative w-full max-w-[300px] [perspective:900px]">
            <div className="flex flex-col gap-2.5 [transform:rotateX(9deg)]">
              {BLOCKS.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ y: -150, opacity: 0, rotate: -5 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 + i * 0.16, type: 'spring', stiffness: 560, damping: 20, mass: 0.7 }}
                  className="rounded-xl border border-line bg-paper-2 px-4 py-3 flex items-center gap-3 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.9)]"
                >
                  <span className="grid place-items-center w-8 h-8 rounded-lg bg-accent-soft border border-accent/30 shrink-0">
                    <b.icon className="w-4 h-4 text-accent" />
                  </span>
                  <span className="font-display font-semibold text-ink text-sm">{b.label}</span>
                  <span className="ml-auto mono text-[10px] text-ink-faint">0{i + 1}</span>
                </motion.div>
              ))}
            </div>

            {/* box wraps the finished stack */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, type: 'spring', stiffness: 220, damping: 16 }}
              className="absolute -inset-3.5 rounded-2xl border-2 border-accent/60 pointer-events-none"
            >
              <span className="absolute -top-2.5 left-4 bg-paper px-2 mono text-[9px] uppercase tracking-[0.2em] text-accent">
                Business in a box
              </span>
            </motion.div>
          </div>

          {/* revenue counter */}
          <div className="relative font-display font-bold text-5xl md:text-6xl tabular-nums text-ink">{fmt(rev)}</div>

          {/* signature */}
          <div className="relative script text-4xl text-accent">David Peterson</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
