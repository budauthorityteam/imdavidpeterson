import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

/**
 * "Built brick by brick" — a scroll-scrubbed cinematic construction film.
 *
 * Replaces the old Three.js LEGO tower. A Higgsfield-generated timelapse
 * (empty foundation + crane -> finished, copper-lit HQ) is scrubbed frame by
 * frame as you scroll the pinned section, so the building literally rises under
 * the reader's control. Enterprise value climbs $0 -> $10M and the phase
 * readout tracks the same progress. The video never autoplays or loops; scroll
 * is the transport. On reduced-motion (or if the video can't seek) we fall back
 * to the finished-tower poster.
 *
 * Assets live in /public:
 *   /building-film.mp4   — the 10s construction timelapse (muted, no audio track)
 *   /building-poster.jpg — the finished tower (poster + reduced-motion fallback)
 */

const FLOOR_LABELS = ['Headquarters', 'AI layer', 'Systems', 'Sales engine', 'Operations', 'The business'];
const STAGES = ['Foundation', 'Operations', 'Growth', 'Systems', 'AI layer', 'Topped out'];

export default function BuildingFilm({ onNav }: { onNav: (t: string) => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const [val, setVal] = useState(0);
  const [stage, setStage] = useState(0);
  const [ready, setReady] = useState(false);

  // Touch devices can't scroll-scrub a <video> via currentTime — iOS Safari
  // won't render seeked frames of an inline, non-playing video, so the film
  // would sit frozen on its first frame the whole way down. On those devices
  // we let the film simply autoplay in view instead, and drive the readout
  // from the video's own progress rather than scroll.
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const set = () => setIsTouch(mq.matches);
    set();
    mq.addEventListener?.('change', set);
    return () => mq.removeEventListener?.('change', set);
  }, []);

  // Scroll-scrubbing is desktop-with-motion only.
  const scrub = !reduce && !isTouch;

  // Video duration + a rAF-smoothed seek target, so scrubbing stays buttery
  // even when the browser can only seek keyframes.
  const durationRef = useRef(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(0);

  // Desktop scroll-scrub: ease the video's currentTime toward the scroll target.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !scrub) return;

    const onMeta = () => {
      durationRef.current = v.duration || 0;
      setReady(true);
    };
    v.addEventListener('loadedmetadata', onMeta);
    if (v.readyState >= 1) onMeta();

    // Smoothly ease the video's currentTime toward the scroll-driven target.
    const loop = () => {
      const dur = durationRef.current;
      if (dur > 0) {
        const target = targetRef.current * dur;
        const cur = currentRef.current;
        const next = cur + (target - cur) * 0.18; // critically-damped feel
        currentRef.current = next;
        // Only seek when the delta is meaningful — avoids thrashing the decoder.
        if (Math.abs(next - v.currentTime) > 1 / 60) {
          try { v.currentTime = next; } catch { /* seek not ready yet */ }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      v.removeEventListener('loadedmetadata', onMeta);
      cancelAnimationFrame(rafRef.current);
    };
  }, [scrub]);

  // Touch: autoplay the film when it enters view (pause when it leaves), and
  // drive the enterprise-value + phase readout from the video's own progress.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isTouch || reduce) return;
    setReady(true);

    const onTime = () => {
      const dur = v.duration || 0;
      if (!dur) return;
      const p = Math.min(1, v.currentTime / dur);
      setVal(Math.round(p * 10_000_000));
      setStage(Math.min(5, Math.floor(p * 6)));
    };
    v.addEventListener('timeupdate', onTime);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.35 },
    );
    io.observe(v);

    return () => {
      v.removeEventListener('timeupdate', onTime);
      io.disconnect();
    };
  }, [isTouch, reduce]);

  // Reduced motion: no film plays, so pin the readout to the finished tower.
  useEffect(() => {
    if (reduce) {
      setVal(10_000_000);
      setStage(5);
    }
  }, [reduce]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!scrub) return;
    // Building tops out slightly before the section ends so the finished HQ
    // holds on screen for a beat.
    const p = v < 0.9 ? v / 0.9 : 1;
    targetRef.current = p;
    setVal(Math.round(p * 10_000_000));
    setStage(Math.min(5, Math.floor(v * 6)));
  });

  const fmtV = (n: number) => (n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1000)}K`);

  return (
    <section ref={ref} className={`relative bg-paper ${scrub ? 'h-[300vh] md:h-[420vh]' : 'h-auto'}`}>
      <div className={`${scrub ? 'sticky top-0 min-h-screen' : 'py-16 md:py-24'} flex items-center overflow-hidden`}>
        {/* ambient tech grid */}
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
              Every floor is a decision, a system, a hire, a hard-won lesson. Scroll and watch a
              business rise piece by piece, from an empty foundation to the headquarters.
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

          {/* Right: the scroll-scrubbed construction film */}
          <div className="lg:col-span-7 relative">
            {/* Panel grows taller on desktop to sit closer to the left column's
                height; the video object-covers so the tower stays centered and
                only the empty warm side-background crops. */}
            <div className="relative rounded-[1.5rem] overflow-hidden border border-line glow-warm aspect-video sm:aspect-[4/3] lg:aspect-square">
              {reduce ? (
                // Reduced motion: no scrub, so just show the finished HQ.
                <img
                  src="/building-poster.jpg"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/building-film.mp4"
                  // Poster is the FIRST frame (the empty site), so what shows
                  // before the scrub kicks in matches where the build starts —
                  // never flash the finished tower and then "restart".
                  poster="/building-start.jpg"
                  muted
                  playsInline
                  preload="auto"
                  // Touch devices can't scroll-scrub, so the film loops in view.
                  autoPlay={isTouch}
                  loop={isTouch}
                  aria-hidden="true"
                />
              )}
              {/* Edge vignette so the warm-dark film melts into the navy canvas */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(120% 100% at 50% 40%, transparent 55%, rgba(11,17,32,0.55) 100%)',
                }}
              />
              {/* Copper scrub line at the bottom that fills with build progress */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-white/5">
                <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${Math.min(100, stage < 5 ? (val / 10_000_000) * 100 : 100)}%` }} />
              </div>
              {!ready && !reduce && (
                <div aria-hidden="true" className="absolute bottom-3 left-4 mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  Loading site…
                </div>
              )}
            </div>

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
