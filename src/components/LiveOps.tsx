import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

/**
 * "Live operations" panel: a stylized, always-rendering view of an agent-driven
 * SEO-intelligence system doing real work. Pure DOM + CSS + motion (no WebGPU),
 * so it renders on every device instead of an empty canvas. It demonstrates the
 * kind of software David actually builds: specialized agents, geo-grid scanning,
 * rank movement, and verified findings, streaming in real time.
 */

type Agent = { key: string; role: string; hue: string };

const AGENTS: Agent[] = [
  { key: 'PF', role: 'Performance', hue: '#E08A4F' },
  { key: 'LC', role: 'Local', hue: '#38D6E6' },
  { key: 'TC', role: 'Technical', hue: '#E08A4F' },
  { key: 'CP', role: 'Competitive', hue: '#38D6E6' },
  { key: 'DR', role: 'Director', hue: '#E08A4F' },
  { key: 'QA', role: 'Quality', hue: '#38D6E6' },
];

// Authentic-flavored activity lines (the work, not internal codenames).
const FEED: { agent: string; text: string; tag?: string }[] = [
  { agent: 'Local', text: 'scanned 49 grid points · Providence, RI', tag: 'geo' },
  { agent: 'Competitive', text: 'flagged 3 new rivals entering the pack', tag: 'intel' },
  { agent: 'Performance', text: 'organic sessions +18% vs prior 28 days', tag: 'up' },
  { agent: 'Technical', text: '12 pages re-crawled · 2 issues queued', tag: 'fix' },
  { agent: 'Director', text: 'dispatched 4 analysts · 2m runtime', tag: 'run' },
  { agent: 'Quality', text: 'verified 6 findings · 1 refuted', tag: 'qa' },
  { agent: 'Local', text: '“dispensary near me” ↑ 4 → rank #2', tag: 'up' },
  { agent: 'Competitive', text: 'share of local pack: 41% → 47%', tag: 'up' },
  { agent: 'Technical', text: 'schema repaired on 8 templates', tag: 'fix' },
  { agent: 'Performance', text: 'non-brand clicks +2,140 this cycle', tag: 'up' },
];

function useTicker(target: number, active: boolean, step: number) {
  const [n, setN] = useState(active ? 0 : target);
  useEffect(() => {
    if (!active) { setN(target); return; }
    let raf = 0;
    const startAt = { v: 0 };
    const tick = () => {
      startAt.v = Math.min(target, startAt.v + step);
      setN(Math.round(startAt.v));
      if (startAt.v < target) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, step]);
  return n;
}

export default function LiveOps() {
  const reduce = useReducedMotion();
  const active = !reduce;
  const [rows, setRows] = useState<number[]>(() => [0, 1, 2, 3, 4]);
  const cursor = useRef(5);

  // Stream new feed rows in
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setRows((prev) => {
        const next = [...prev, cursor.current % FEED.length];
        cursor.current += 1;
        return next.slice(-5);
      });
    }, 2200);
    return () => clearInterval(id);
  }, [active]);

  const clients = useTicker(32, active, 0.7);
  const grid = useTicker(41800, active, 900);
  const findings = useTicker(1264, active, 27);

  // A small deterministic geo-grid (no Math.random for SSR/headless stability)
  const cells = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const x = i % 6;
        const y = Math.floor(i / 6);
        // radial-ish strength, strongest near center
        const d = Math.hypot(x - 2.5, y - 2.5) / 3.8;
        return Math.max(0, 1 - d) ** 1.3;
      }),
    [],
  );

  return (
    <div className="relative w-full overflow-hidden rounded-[1.6rem] bg-[#080C18] text-ink border border-white/10">
      {/* top status bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink">
            Agent Operations
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-[#3ECF8E]"
            animate={active ? { opacity: [1, 0.35, 1] } : {}}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1.2fr_0.9fr]">
        {/* Agents */}
        <div className="p-5 md:border-r border-white/10 space-y-2.5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint mb-1">Agents online</div>
          {AGENTS.map((a, i) => (
            <div key={a.key} className="flex items-center gap-3">
              <span
                className="grid place-items-center w-8 h-8 rounded-lg text-[11px] font-bold shrink-0"
                style={{ background: `${a.hue}22`, color: a.hue }}
              >
                {a.key}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium text-ink leading-tight">{a.role}</div>
                <div className="h-1 mt-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ background: a.hue }}
                    initial={{ width: '20%' }}
                    animate={active ? { width: ['28%', '92%', '55%', '78%'] } : { width: '70%' }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  />
                </div>
              </div>
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: a.hue, boxShadow: `0 0 8px ${a.hue}` }}
              />
            </div>
          ))}
        </div>

        {/* Streaming feed */}
        <div className="p-5 md:border-r border-white/10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint mb-3">Activity</div>
          <div className="space-y-2 min-h-[220px]">
            <AnimatePresence initial={false} mode="popLayout">
              {rows.map((idx, pos) => {
                const item = FEED[idx];
                return (
                  <motion.div
                    key={`${idx}-${pos}-${cursor.current}`}
                    layout
                    initial={active ? { opacity: 0, y: -8 } : false}
                    animate={{ opacity: pos === 0 ? 0.4 : 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-2.5 text-[12.5px] leading-snug"
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: item.tag === 'up' ? '#3ECF8E' : '#E08A4F' }}
                    />
                    <span className="text-ink-faint shrink-0 font-medium">{item.agent}</span>
                    <span className="text-ink">{item.text}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Geo grid + metrics */}
        <div className="p-5 space-y-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint mb-2">Geo-grid</div>
            <div className="grid grid-cols-6 gap-1">
              {cells.map((v, i) => (
                <motion.span
                  key={i}
                  className="aspect-square rounded-[3px]"
                  style={{ background: '#E08A4F' }}
                  initial={{ opacity: 0.12 + v * 0.7 }}
                  animate={
                    active
                      ? { opacity: [0.12 + v * 0.7, 0.2 + v * 0.8, 0.12 + v * 0.7] }
                      : { opacity: 0.12 + v * 0.7 }
                  }
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: (i % 6) * 0.12 + Math.floor(i / 6) * 0.1 }}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Metric value={`${clients}`} label="Clients monitored" />
            <Metric value={grid.toLocaleString()} label="Grid scans / mo" />
            <Metric value={findings.toLocaleString()} label="Findings shipped" />
            <Metric value="7" label="Agents in the loop" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display font-bold text-2xl tracking-tight tabular-nums text-ink">{value}</div>
      <div className="text-[10.5px] text-ink-faint leading-tight mt-0.5">{label}</div>
    </div>
  );
}
