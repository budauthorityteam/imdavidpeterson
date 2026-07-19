import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

/**
 * First-load intro: a full-bleed ink panel with a 0 -> 100 counter and the
 * wordmark, then it wipes up to reveal the site. Plays once per page load.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1150;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 260);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-ink text-paper flex flex-col justify-between px-6 py-8 md:px-12 md:py-10"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-paper flex items-center justify-center text-ink font-display font-bold text-[13px]">
              D
            </div>
            <span className="font-display font-semibold tracking-tight text-[15px]">David Peterson</span>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold tracking-tight leading-[0.9] text-5xl md:text-8xl"
            >
              Operator <span className="serif-italic font-normal text-accent">/</span> Builder
            </motion.div>
          </div>

          <div className="flex items-end justify-between">
            <span className="text-paper/50 text-sm">Grow. Build. Buy.</span>
            <span className="font-display font-bold text-6xl md:text-8xl tabular-nums leading-none">
              {n}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
