import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import { ArrowRight } from 'lucide-react';

/**
 * "Built brick by brick" — a scroll-pinned construction sequence. An office
 * tower assembles from the foundation up: bricks rise into place, windows light
 * up copper floor by floor, a crane tops it off, and enterprise value climbs.
 * All 50 bricks are driven by ONE scroll value through CSS calc (--p), so it
 * stays perfectly smooth.
 */

const COLS = 6;
const FLOORS = 6;
const BASE_COLS = 8;
const N_FOUNDATION = BASE_COLS;
const N_FLOORS = COLS * FLOORS;
const N_ROOF = COLS;
const N_TOTAL = N_FOUNDATION + N_FLOORS + N_ROOF;

// Floor labels, top (built last) to bottom (built first)
const FLOOR_LABELS = ['Headquarters', 'AI layer', 'Systems', 'Sales engine', 'Operations', 'The business'];
const STAGES = ['Foundation', 'Operations', 'Growth', 'Systems', 'AI layer', 'Topped out'];

export default function BuildingBuild({ onNav }: { onNav: (t: string) => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 });

  const [val, setVal] = useState(0);
  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, 'change', (v) => {
    setVal(Math.round((v < 0.9 ? v / 0.9 : 1) * 10_000_000));
    setStage(Math.min(5, Math.floor(v * 6)));
  });

  const fmtV = (n: number) => (n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1000)}K`);

  // build-order index helpers
  const floorBrickI = (rowFromTop: number, c: number) => {
    const rowFromBottom = FLOORS - 1 - rowFromTop; // bottom floor builds first
    return N_FOUNDATION + rowFromBottom * COLS + c;
  };
  const roofBrickI = (c: number) => N_FOUNDATION + N_FLOORS + c;

  const brickStyle = (i: number) => ({ ['--i' as any]: i, ['--n' as any]: N_TOTAL });

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

          {/* Right: the rising tower */}
          <div className="lg:col-span-7 relative flex items-end justify-center min-h-[460px] lg:min-h-[560px]">
            {/* crane */}
            <div aria-hidden="true" className="absolute -top-2 right-6 sm:right-16 bottom-0 hidden sm:block">
              <div className="relative h-full w-px bg-line ml-auto mr-8">
                <div className="absolute top-6 -left-24 w-32 h-px bg-line" />
                <div className="absolute top-6 -left-24 w-2 h-2 -mt-1 rounded-full bg-accent" />
                <motion.div
                  className="absolute top-6 -left-16 w-px bg-accent/60"
                  initial={{ height: 20 }}
                  animate={reduce ? {} : { height: [20, 60, 20] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="absolute -bottom-1 -left-[3px] w-[7px] h-[7px] border-2 border-accent rounded-sm" />
                </motion.div>
              </div>
            </div>

            {/* rooftop beacon (reveals near the top-out) */}
            <motion.div
              aria-hidden="true"
              className="brickfield absolute z-10 flex flex-col items-center"
              style={reduce ? undefined : ({ ['--p' as any]: p } as any)}
            >
              <div className="brick" style={brickStyle(N_TOTAL - 1)}>
                <div className="w-2.5 h-2.5 rounded-full bg-accent glow-warm mb-1 mx-auto" />
              </div>
            </motion.div>

            {/* the tower */}
            <motion.div
              className="brickfield relative"
              style={reduce ? undefined : ({ ['--p' as any]: p } as any)}
            >
              {/* roof cap */}
              <div className="flex gap-[3px] justify-center mb-[3px] mx-1">
                {Array.from({ length: COLS }, (_, c) => (
                  <div key={c} className="brick brick-solid !bg-accent/80 w-[42px] sm:w-[48px] h-[10px]" style={brickStyle(roofBrickI(c))} />
                ))}
              </div>
              {/* floors */}
              <div className="flex flex-col gap-[3px]">
                {Array.from({ length: FLOORS }, (_, r) => (
                  <div key={r} className="flex gap-[3px] justify-center relative">
                    {Array.from({ length: COLS }, (_, c) => {
                      const isWin = c >= 1 && c <= COLS - 2;
                      return (
                        <div
                          key={c}
                          className={`brick ${isWin ? 'brick-win' : 'brick-solid'} w-[42px] sm:w-[48px] h-[30px] sm:h-[34px]`}
                          style={brickStyle(floorBrickI(r, c))}
                        />
                      );
                    })}
                    {/* floor label */}
                    <div
                      className="brick absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap mono text-[10px] uppercase tracking-[0.14em] text-ink-faint hidden md:block"
                      style={brickStyle(floorBrickI(r, 0))}
                    >
                      {FLOOR_LABELS[r]}
                    </div>
                  </div>
                ))}
              </div>
              {/* foundation */}
              <div className="flex gap-[3px] justify-center mt-[3px]">
                {Array.from({ length: BASE_COLS }, (_, c) => (
                  <div key={c} className="brick brick-base w-[42px] sm:w-[48px] h-[14px]" style={brickStyle(c)} />
                ))}
              </div>
              {/* ground line */}
              <div className="mt-2 h-px w-[130%] -ml-[15%] bg-gradient-to-r from-transparent via-line-2 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
