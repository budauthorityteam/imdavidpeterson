import { Building2, Cog, TrendingUp, Cpu, BookOpen, Package, ArrowRight } from 'lucide-react';
import { Reveal, Item } from './Motion';

/**
 * "Business in a box" — the productized-company model. A calm, one-shot reveal
 * (not a scroll-pinned build): the layers of a real, boring business are shown
 * already stacked, wrapped in a "Packaged" frame with a "built to sell" badge.
 *
 * Deliberately does NOT re-run the "watch it build as you scroll" pattern — the
 * cinematic tower film under the hero owns that moment. This section just states
 * the model and lets the stack fade up once as it enters view.
 */

const LAYERS = [
  { icon: Building2, title: 'A boring, cash-flowing business', sub: '$500K–$1M in revenue' },
  { icon: Cog, title: 'Operating systems & SOPs', sub: 'the machine runs without you' },
  { icon: TrendingUp, title: 'A demand engine', sub: 'SEO + content that compounds' },
  { icon: Cpu, title: 'AI agents on the work', sub: 'headcount replaced by systems' },
  { icon: BookOpen, title: 'The documented playbook', sub: 'repeatable, teachable, sellable' },
];

export default function BusinessInABox({ onNav }: { onNav: (t: string) => void }) {
  return (
    <section className="relative bg-paper overflow-hidden">
      {/* static ambient warmth */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 tech-grid opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[90px]">
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(224,138,79,0.12),transparent_70%)]" />
        </div>
      </div>

      <Reveal className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32" amount={0.25}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: the model */}
          <div className="lg:col-span-5 space-y-6">
            <Item>
              <span className="mono text-[11px] uppercase tracking-[0.2em] text-accent">The model</span>
            </Item>
            <Item as="h2" className="font-display font-extrabold text-ink text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[0.98]">
              A business,
              <br />
              <span className="text-accent">in a box.</span>
            </Item>
            <Item as="p" className="text-ink-soft text-lg leading-relaxed max-w-md">
              I take a real, boring company and bolt on the parts that make it scale, then package the
              whole machine so it runs, grows, and can be handed off or sold.
            </Item>
            <Item>
              <button
                onClick={() => onNav('/contact')}
                className="inline-flex items-center gap-2 text-ink font-semibold text-sm group"
              >
                <span className="link-underline">Build or buy one with me</span>
                <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
              </button>
            </Item>
          </div>

          {/* Right: the packaged stack (revealed once, not scroll-scrubbed) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[420px] pb-16 lg:pb-0">
            <div className="relative w-full max-w-md [perspective:1200px]">
              <div className="flex flex-col gap-3 [transform:rotateX(6deg)]">
                {LAYERS.map((layer, i) => (
                  <Item
                    key={layer.title}
                    className="relative rounded-2xl border border-line bg-paper-2/80 backdrop-blur-sm px-5 py-4 flex items-center gap-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)] ring-1 ring-accent/15"
                  >
                    <span className="grid place-items-center w-11 h-11 rounded-xl bg-accent-soft border border-accent/30 shrink-0">
                      <layer.icon className="w-5 h-5 text-accent" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-display font-semibold text-ink leading-tight">{layer.title}</div>
                      <div className="text-ink-faint text-sm">{layer.sub}</div>
                    </div>
                    <span className="ml-auto mono text-[11px] text-ink-faint">0{i + 1}</span>
                  </Item>
                ))}
              </div>

              {/* Packaged frame around the finished stack */}
              <Item className="absolute -inset-5 rounded-[1.75rem] border-2 border-accent/50 pointer-events-none">
                <span className="absolute -top-3 left-6 bg-paper px-2 mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Packaged
                </span>
              </Item>

              {/* built-to-sell badge */}
              <Item className="absolute -bottom-16 left-0 right-0 text-center">
                <div className="inline-flex items-center gap-2.5 rounded-full bg-accent text-[#1A1206] px-5 py-2.5 font-bold text-sm shadow-[0_14px_40px_-12px_rgba(224,138,79,0.55)]">
                  <Package className="w-4 h-4" />
                  Business in a box — built to sell
                </div>
              </Item>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
