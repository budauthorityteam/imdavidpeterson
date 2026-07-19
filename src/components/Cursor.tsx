import { useEffect } from 'react';

/**
 * Bespoke cursor: an instant ember dot at the pointer plus a larger ring that
 * lags behind on a spring. Over interactive elements the ring grows and fills.
 * Only mounts on fine-pointer devices; leaves touch and reduced-motion alone.
 */
export default function Cursor() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine) return;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.documentElement.classList.add('has-custom-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let visible = false;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const over = (e: Event) => {
      const t = (e.target as HTMLElement)?.closest?.(
        'a, button, input, textarea, select, [data-cursor]',
      );
      ring.classList.toggle('is-active', !!t);
    };
    const leaveWin = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      visible = false;
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    window.addEventListener('pointerout', (e) => {
      if (!(e as PointerEvent).relatedTarget) leaveWin();
    });
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      dot.remove();
      ring.remove();
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return null;
}
