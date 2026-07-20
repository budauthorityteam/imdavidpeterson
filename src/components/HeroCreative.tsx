import type { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import CountUp from './CountUp';
import { Magnetic } from './Motion';

/**
 * Interactive hero: mouse-reactive parallax layers (a colossal kinetic word
 * behind the portrait, the portrait itself, and floating copper sticker-tags),
 * inspired by maximalist award sites but tuned to the dark institutional brand.
 */
export default function HeroCreative({ onNav }: { onNav: (t: string) => void }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 45, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Parallax depths (px of travel across the viewport)
  const bgX = useTransform(sx, [-0.5, 0.5], [34, -34]);
  const bgY = useTransform(sy, [-0.5, 0.5], [20, -20]);
  const portX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const portY = useTransform(sy, [-0.5, 0.5], [-16, 16]);
  const gX = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const gY = useTransform(sy, [-0.5, 0.5], [12, -12]);

  const badges = [
    { label: '$30M+ SCALED', pos: 'top-2 -left-2 sm:left-2', rot: '-9deg', accent: true },
    { label: '20 YRS OPERATING', pos: 'top-1/3 -right-3 sm:-right-6', rot: '7deg', accent: false },
    { label: 'AI SYSTEMS', pos: 'bottom-24 -left-4 sm:left-0', rot: '6deg', accent: false },
    { label: 'BUILDER', pos: 'bottom-6 right-2 sm:right-6', rot: '-6deg', accent: true },
  ];

  // Fixed-count parallax transforms for the four badges (no hooks in loops).
  const bx0 = useTransform(sx, [-0.5, 0.5], [46, -46]);
  const by0 = useTransform(sy, [-0.5, 0.5], [28, -28]);
  const bx1 = useTransform(sx, [-0.5, 0.5], [-40, 40]);
  const by1 = useTransform(sy, [-0.5, 0.5], [-24, 24]);
  const bx2 = useTransform(sx, [-0.5, 0.5], [-34, 34]);
  const by2 = useTransform(sy, [-0.5, 0.5], [-20, 20]);
  const bx3 = useTransform(sx, [-0.5, 0.5], [38, -38]);
  const by3 = useTransform(sy, [-0.5, 0.5], [23, -23]);
  const badgeXY = [
    { x: bx0, y: by0 },
    { x: bx1, y: by1 },
    { x: bx2, y: by2 },
    { x: bx3, y: by3 },
  ];

  return (
    <section
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-hidden min-h-[92vh] flex items-center pt-28 md:pt-32 pb-16 px-6 md:px-12"
    >
      {/* Ambient field */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="absolute inset-0 tech-grid" />
        {/* Colossal kinetic word, parallaxed behind everything */}
        <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 flex items-center justify-center">
          <span className="text-outline font-display font-black uppercase leading-none tracking-[-0.03em] text-[30vw] lg:text-[24vw] opacity-[0.05] select-none whitespace-nowrap">
            OPERATOR
          </span>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center w-full"
      >
        {/* Statement */}
        <motion.div style={{ x: gX, y: gY }} className="lg:col-span-7 order-2 lg:order-1 flex flex-col gap-6">
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="mono text-[11px] uppercase tracking-[0.2em] text-accent flex items-center gap-2.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
            Operator × Builder — Rhode Island, USA
          </motion.div>

          <motion.h1
            id="hero-h1"
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="font-display font-bold text-ink tracking-[-0.035em] leading-[0.9] text-[3rem] sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]"
            style={{ textWrap: 'balance' as any }}
          >
            I scaled companies to{' '}
            <span className="text-accent [text-shadow:0_0_40px_rgba(224,138,79,0.5)]">$30M+</span>.
            <span className="block">Now I build my own.</span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="text-ink-soft text-lg md:text-xl leading-relaxed max-w-xl"
          >
            Two decades operating and scaling other people&apos;s businesses. Now I pour it into my
            own: software, AI systems, and boring companies that quietly print cash.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-wrap items-center gap-3.5 pt-1"
          >
            <Magnetic>
              <button
                onClick={() => onNav('/contact')}
                className="btn-accent px-7 py-4 rounded-full text-[15px] tracking-wide cursor-pointer flex items-center gap-2"
              >
                <span>Work With Me</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Magnetic>
            <a
              href="#track-record"
              className="group glass text-ink font-semibold text-[15px] flex items-center gap-2 px-6 py-4 rounded-full hover:border-accent/50 transition-colors"
            >
              <span>See the track record</span>
              <ArrowDown className="w-4 h-4 text-accent group-hover:translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 mt-1 border-t border-line"
          >
            {[
              ['$30M+', 'ARR scaled'],
              ['350+', 'people led'],
              ['300%+', 'sales growth'],
              ['30+', 'clients'],
            ].map(([n, l]) => (
              <div key={l} className="flex items-baseline gap-2">
                <span className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight tabular-nums">
                  <CountUp value={n} />
                </span>
                <span className="text-xs text-ink-faint uppercase tracking-wider">{l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Portrait + floating sticker-tags */}
        <div className="lg:col-span-5 order-1 lg:order-2 relative min-h-[440px] sm:min-h-[520px] lg:min-h-[620px]">
          <motion.img
            src="/david-hero.png"
            alt="David Peterson"
            loading="eager"
            style={{ x: portX, y: portY }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="absolute inset-0 mx-auto w-auto h-full max-h-[640px] object-contain object-bottom -scale-x-100 select-none [mask-image:radial-gradient(115%_125%_at_52%_42%,#000_55%,transparent_96%)]"
          />

          {badges.map((b, i) => {
            return (
              <motion.div
                key={b.label}
                style={{ x: badgeXY[i].x, y: badgeXY[i].y, rotate: b.rot }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 200, damping: 14 }}
                className={`absolute ${b.pos} z-20`}
              >
                <motion.div
                  animate={reduce ? {} : { y: [0, -7, 0] }}
                  transition={{ duration: 3.4 + i, repeat: Infinity, ease: 'easeInOut' }}
                  className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] shadow-xl ${
                    b.accent
                      ? 'bg-accent text-[#1A1206] shadow-[0_10px_30px_-8px_rgba(224,138,79,0.6)]'
                      : 'glass text-ink'
                  }`}
                >
                  {b.label}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-ink-faint"
      >
        <span className="mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}
