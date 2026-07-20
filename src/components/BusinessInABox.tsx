import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import { Building2, Cog, TrendingUp, Cpu, BookOpen, Package, ArrowRight } from 'lucide-react';

/**
 * "Business in a box" — a scroll-pinned assembly sequence. As you scroll, the
 * layers of a real, boring business stack up one by one (like a build sheet),
 * revenue climbs from $500K to $8M, and at the end the whole stack packages
 * into a sellable "business in a box." Inspired by maximalist product-assembly
 * scroll sites, adapted to the acquire-grow-build thesis.
 */

const LAYERS = [
  { icon: Building2, title: 'A boring, cash-flowing business', sub: '$500K–$1M in revenue' },
  { icon: Cog, title: 'Operating systems & SOPs', sub: 'the machine runs without you' },
  { icon: TrendingUp, title: 'A demand engine', sub: 'SEO + content that compounds' },
  { icon: Cpu, title: 'AI agents on the work', sub: 'headcount replaced by systems' },
  { icon: BookOpen, title: 'The documented playbook', sub: 'repeatable, teachable, sellable' },
];

const STAGES = ['Acquire', 'Systematize', 'Scale', 'Package'];

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return `$${Math.round(n / 1000)}K`;
}

export default function BusinessInABox({ onNav }: { onNav: (t: string) => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 });

  // Revenue counter
  const revenue = useTransform(p, [0.06, 0.7], [500_000, 8_000_000]);
  const [rev, setRev] = useState(500_000);
  useMotionValueEvent(revenue, 'change', (v) => setRev(v));

  // Active stage index (0-3)
  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, 'change', (v) => {
    setStage(v < 0.24 ? 0 : v < 0.48 ? 1 : v < 0.72 ? 2 : 3);
  });

  // Box-wrap at the end
  const stackScale = useTransform(p, [0.72, 0.9], [1, 0.86]);
  const stackShift = useTransform(p, [0.72, 0.9], [0, -6]);
  const boxOpacity = useTransform(p, [0.76, 0.9], [0, 1]);
  const boxLabelY = useTransform(p, [0.8, 0.96], [16, 0]);
  const boxLabelOpacity = useTransform(p, [0.8, 0.96], [0, 1]);

  // Per-layer reveal (fixed hook count = 5 layers). Each layer rises + lights up.
  const w = (i: number) => 0.08 + i * 0.13;
  const mk = (i: number) => ({
    opacity: useTransform(p, [w(i) - 0.03, w(i) + 0.05], [0.12, 1]),
    y: useTransform(p, [w(i) - 0.03, w(i) + 0.05], [26, 0]),
    active: useTransform(p, [w(i) - 0.02, w(i) + 0.04, w(i) + 0.16], [0, 1, 0.35]),
  });
  const L0 = mk(0);
  const L1 = mk(1);
  const L2 = mk(2);
  const L3 = mk(3);
  const L4 = mk(4);
  const layerMotion = [L0, L1, L2, L3, L4];

  return (
    <section ref={ref} className="relative bg-paper" style={{ height: reduce ? 'auto' : '320vh' }}>
      <div
        className={`${reduce ? '' : 'sticky top-0'} min-h-screen flex items-center overflow-hidden`}
      >
        {/* ambient */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 tech-grid opacity-70" />
          <motion.div
            style={{ opacity: boxOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[90px]"
          >
            <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(224,138,79,0.18),transparent_70%)]" />
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: narrative + live readout */}
          <div className="lg:col-span-5 space-y-6">
            <span className="mono text-[11px] uppercase tracking-[0.2em] text-accent">The model</span>
            <h2 className="font-display font-extrabold text-ink text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[0.98]">
              A business,
              <br />
              <span className="text-accent">in a box.</span>
            </h2>
            <p className="text-ink-soft text-lg leading-relaxed max-w-md">
              I take a real, boring company and bolt on the parts that make it scale, then package the
              whole machine so it runs, grows, and can be handed off or sold.
            </p>

            {/* Live revenue + stage readout */}
            <div className="rounded-2xl glass p-5 space-y-4 max-w-sm">
              <div className="flex items-end justify-between">
                <div>
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">Revenue</div>
                  <div className="font-display font-bold text-4xl text-ink tabular-nums">{fmt(rev)}</div>
                </div>
                <div className="text-right">
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">Stage</div>
                  <div className="font-display font-bold text-xl text-accent">{STAGES[stage]}</div>
                </div>
              </div>
              <div className="flex gap-1.5">
                {STAGES.map((s, i) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i <= stage ? 'bg-accent' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => onNav('/contact')}
              className="inline-flex items-center gap-2 text-ink font-semibold text-sm group"
            >
              <span className="link-underline">Build or buy one with me</span>
              <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: the assembling stack */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] lg:min-h-[560px]">
            <motion.div
              style={reduce ? undefined : { scale: stackScale, y: stackShift }}
              className="relative w-full max-w-md [perspective:1200px]"
            >
              <div className="flex flex-col gap-3 [transform:rotateX(6deg)]">
                {LAYERS.map((layer, i) => {
                  const m = layerMotion[i];
                  return (
                    <motion.div
                      key={layer.title}
                      style={reduce ? undefined : { opacity: m.opacity, y: m.y }}
                      className="relative rounded-2xl border border-line bg-paper-2/80 backdrop-blur-sm px-5 py-4 flex items-center gap-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)]"
                    >
                      {/* active copper edge */}
                      <motion.span
                        style={reduce ? undefined : { opacity: m.active }}
                        className="absolute inset-0 rounded-2xl ring-1 ring-accent/60 [box-shadow:0_0_30px_-6px_rgba(224,138,79,0.5)] pointer-events-none"
                      />
                      <span className="relative grid place-items-center w-11 h-11 rounded-xl bg-accent-soft border border-accent/30 shrink-0">
                        <layer.icon className="w-5 h-5 text-accent" />
                      </span>
                      <div className="relative min-w-0">
                        <div className="font-display font-semibold text-ink leading-tight">{layer.title}</div>
                        <div className="text-ink-faint text-sm">{layer.sub}</div>
                      </div>
                      <span className="relative ml-auto mono text-[11px] text-ink-faint">0{i + 1}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* The "box" that wraps the finished stack */}
              <motion.div
                aria-hidden="true"
                style={reduce ? { opacity: 1 } : { opacity: boxOpacity }}
                className="absolute -inset-5 rounded-[1.75rem] border-2 border-accent/50 pointer-events-none"
              >
                <span className="absolute -top-3 left-6 bg-paper px-2 mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Packaged
                </span>
              </motion.div>
              <motion.div
                style={reduce ? { opacity: 1, y: 0 } : { opacity: boxLabelOpacity, y: boxLabelY }}
                className="absolute -bottom-16 left-0 right-0 text-center"
              >
                <div className="inline-flex items-center gap-2.5 rounded-full bg-accent text-[#1A1206] px-5 py-2.5 font-bold text-sm shadow-[0_14px_40px_-12px_rgba(224,138,79,0.55)]">
                  <Package className="w-4 h-4" />
                  Business in a box — built to sell
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
