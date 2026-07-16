import { useEffect, useRef, useState } from 'react';

/**
 * Animates the numeric part of a metric string (e.g. "$30M+", "350+", "300%+")
 * counting up from zero the first time it scrolls into view. Non-numeric values
 * (e.g. "Hong Kong") render as-is. Respects prefers-reduced-motion.
 */
export default function CountUp({
  value,
  className,
  duration = 1400,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const match = value.match(/^(\D*)([\d,]*\.?\d+)(.*)$/s);
  const [display, setDisplay] = useState<string>(
    match ? `${match[1]}0${match[3]}` : value,
  );

  useEffect(() => {
    if (!match) {
      setDisplay(value);
      return;
    }
    const prefix = match[1];
    const rawNum = match[2];
    const suffix = match[3];
    const target = parseFloat(rawNum.replace(/,/g, ''));
    const decimals = rawNum.includes('.') ? rawNum.split('.')[1].length : 0;
    const useGroup = rawNum.includes(',');

    const fmt = (n: number) => {
      const s = n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: useGroup,
      });
      return `${prefix}${s}${suffix}`;
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (!el || reduced) {
      setDisplay(fmt(target));
      return;
    }

    let raf = 0;
    let started = false;
    const run = () => {
      let startTs = 0;
      const step = (ts: number) => {
        if (!startTs) startTs = ts;
        const t = Math.min(1, (ts - startTs) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setDisplay(fmt(target * eased));
        if (t < 1) raf = requestAnimationFrame(step);
        else setDisplay(fmt(target));
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
