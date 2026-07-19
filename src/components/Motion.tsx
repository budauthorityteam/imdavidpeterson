import React, { useEffect, useRef, useState } from 'react';
import { User } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';

/* Photo slot: renders the image, or a labeled placeholder until the file is
   dropped into /public. Mirror flips horizontally (for inward gaze). */
export function PhotoFrame({
  src,
  alt,
  className = '',
  imgClassName = '',
  mirror = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  mirror?: boolean;
}) {
  const [err, setErr] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!err ? (
        <img
          src={src}
          alt={alt}
          loading="eager"
          onError={() => setErr(true)}
          className={`w-full h-full object-cover ${mirror ? '-scale-x-100' : ''} ${imgClassName}`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-3 bg-paper-3">
          <span className="w-14 h-14 rounded-full bg-accent-soft flex items-center justify-center">
            <User className="w-7 h-7 text-accent" />
          </span>
          <span className="font-display font-semibold text-ink">Your portrait here</span>
          <span className="text-xs text-ink-faint">
            Drop <span className="text-ink-soft">public{src}</span>
          </span>
        </div>
      )}
    </div>
  );
}

/* Shared scroll-reveal variants ------------------------------------------- */
export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/* A section that staggers its children in as it scrolls into view ---------- */
export function Reveal({
  children,
  className,
  amount = 0.2,
  as = 'div',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
  as?: 'div' | 'section';
  id?: string;
}) {
  const Comp: any = as === 'section' ? motion.section : motion.div;
  return (
    <Comp
      id={id}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/* A single element that fades up on scroll (or as a stagger child) --------- */
export function Item({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'h1' | 'h2' | 'p' | 'span';
  key?: React.Key;
}) {
  const Comp: any = (motion as any)[as];
  return (
    <Comp variants={fadeUp} className={className}>
      {children}
    </Comp>
  );
}

/* Masked line reveal (each line wipes up from behind a clip) --------------- */
export const lineUp = {
  hidden: { y: '115%' },
  visible: { y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

export function MaskLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span variants={lineUp} className={`block ${className || ''}`}>
        {children}
      </motion.span>
    </span>
  );
}

/* 3D tilt + cursor spotlight card ----------------------------------------- */
export function TiltCard({
  children,
  className = '',
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  key?: React.Key;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`spotlight ${className}`}
    >
      <div className="relative z-[1] h-full">{children}</div>
    </motion.div>
  );
}

/* Magnetic wrapper: pulls its child toward the cursor -------------------- */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 15 });
  const y = useSpring(my, { stiffness: 250, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
      style={reduce ? undefined : { x, y }}
      className={`inline-block ${className || ''}`}
    >
      {children}
    </motion.div>
  );
}

/* Rotating word: cycles through a list with a vertical wipe -------------- */
export function RotatingWord({
  words,
  className = '',
  interval = 2100,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval, reduce]);

  return (
    <span className={`relative inline-flex overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          initial={{ y: '0.9em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-0.9em', opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
