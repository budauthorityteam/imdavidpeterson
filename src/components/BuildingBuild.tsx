import { useRef, useState } from 'react';
import {
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import { ArrowRight } from 'lucide-react';
import BuildingScene from './BuildingScene';

/**
 * "Built brick by brick" — a scroll-pinned construction sequence. A real 3D
 * office tower (BuildingScene) assembles from the foundation up as you scroll:
 * floors rise and lock into place, window bands light up copper, and enterprise
 * value climbs from $0 to $10M.
 */

// Floor labels, top (built last) to bottom (built first)
const FLOOR_LABELS = ['Headquarters', 'AI layer', 'Systems', 'Sales engine', 'Operations', 'The business'];
const STAGES = ['Foundation', 'Operations', 'Growth', 'Systems', 'AI layer', 'Topped out'];

export default function BuildingBuild({ onNav }: { onNav: (t: string) => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 });

  const progressRef = useRef(0);
  const [val, setVal] = useState(0);
  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, 'change', (v) => {
    progressRef.current = v;
    setVal(Math.round((v < 0.9 ? v / 0.9 : 1) * 10_000_000));
    setStage(Math.min(5, Math.floor(v * 6)));
  });

  const fmtV = (n: number) => (n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1000)}K`);

  return (
    <section ref={ref} className="relative bg-paper" style={{ height: reduce ? 'auto' : '400vh' }}>
      <div className={`${reduce ? '' : 'sticky top-0'} min-h-screen flex items-center overflow-hidden`}>
        {/* ambient */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 tech-grid opacity-60" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: narrative + live readout */}
          <div className="lg:col-span-5 space-y-6">
            <span className="mono text-[12px] uppercase tracking-[0.2em] text-accent">Brick by brick</span>
            <h2 className="font-display font-extrabold text-ink text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[0.95]">
              I build companies
              <br />
              <span className="text-accent">from the ground up.</span>
            </h2>
            <p className="text-ink-soft text-lg md:text-xl leading-relaxed max-w-md">
              Foundation, operations, a demand engine, systems, an AI layer, then the headquarters on
              top. Scroll to watch a business get built, floor by floor.
            </p>

            <div className="rounded-2xl glass p-5 space-y-4 max-w-sm">
              <div className="flex items-end justify-between">
                <div>
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">Enterprise value</div>
                  <div className="font-display font-bold text-4xl md:text-5xl text-ink tabular-nums">{fmtV(val)}</div>
                </div>
                <div className="text-right">
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">Phase</div>
                  <div className="font-display font-bold text-lg text-accent">{STAGES[stage]}</div>
                </div>
              </div>
              <div className="flex gap-1.5">
                {STAGES.map((s, i) => (
                  <div key={s} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= stage ? 'bg-accent' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>

            <button onClick={() => onNav('/contact')} className="inline-flex items-center gap-2 text-ink font-semibold text-base group">
              <span className="link-underline">Build one with me</span>
              <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: the 3D rising tower */}
          <div className="lg:col-span-7 relative min-h-[460px] sm:min-h-[520px] lg:min-h-[600px]">
            <BuildingScene progressRef={progressRef} reduce={reduce} />
            {/* floating floor labels sync with construction phase */}
            <div className="absolute top-4 right-2 md:right-6 space-y-1.5 text-right pointer-events-none hidden md:block">
              {FLOOR_LABELS.map((label, i) => {
                const shown = stage >= 5 - i;
                return (
                  <div
                    key={label}
                    className={`mono text-[10px] uppercase tracking-[0.14em] transition-all duration-500 ${
                      shown ? 'text-ink-faint opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                    }`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
