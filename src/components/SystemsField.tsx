import { useEffect, useRef } from 'react';

/**
 * "Agent systems" visual. Prefers a WebGPU (three/tsl) GPU particle field that
 * drifts through a flow field; falls back to a lightweight 2D canvas network
 * wherever WebGPU is unavailable or reduced motion is requested. three is
 * dynamically imported so it is code-split out of the initial bundle.
 */
export default function SystemsField() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cleanup = () => {};
    let cancelled = false;

    const hasWebGPU = typeof navigator !== 'undefined' && 'gpu' in navigator;

    const start = async () => {
      if (hasWebGPU && !reduced) {
        try {
          cleanup = await startWebGPU(host);
          return;
        } catch {
          /* fall through to 2D */
        }
      }
      if (!cancelled) cleanup = start2D(host, reduced);
    };
    start();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}

/* ----------------------------- WebGPU path ----------------------------- */
async function startWebGPU(host: HTMLElement): Promise<() => void> {
  // Confirm a real GPU adapter exists before paying for three/webgpu.
  const adapter = await (navigator as any).gpu.requestAdapter().catch(() => null);
  if (!adapter) throw new Error('no-webgpu-adapter');

  // @ts-ignore - three/webgpu has no bundled types
  const THREE: any = await import('three/webgpu');
  // @ts-ignore - three/tsl has no bundled types
  const TSL: any = await import('three/tsl');
  const { vec2, vec3, color, time, positionLocal, uv, mix, smoothstep } = TSL;

  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  host.appendChild(canvas);

  const rect = host.getBoundingClientRect();
  let w = Math.max(1, rect.width);
  let h = Math.max(1, rect.height);

  const renderer = new THREE.WebGPURenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(w, h, false);
  // Fall back if init hangs (some environments expose navigator.gpu but never render).
  await Promise.race([
    renderer.init(),
    new Promise((_, reject) => setTimeout(() => reject(new Error('webgpu-init-timeout')), 4000)),
  ]);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(58, w / h, 0.1, 100);
  camera.position.set(0, 0, 6.4);

  // Particle cloud
  const N = 2800;
  const arr = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 9;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 4.4;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));

  const mat = new THREE.PointsNodeMaterial();
  const t = time.mul(0.16);
  const p = positionLocal;
  const flow = vec3(
    p.y.mul(0.7).add(t).sin(),
    p.z.mul(0.7).add(t.mul(1.2)).sin(),
    p.x.mul(0.7).add(t.mul(0.9)).sin(),
  ).mul(0.32);
  mat.positionNode = p.add(flow);
  mat.colorNode = mix(color(0xb66340), color(0xf3e9dc), p.y.mul(0.22).add(0.55));
  const d = uv().sub(vec2(0.5)).length();
  mat.opacityNode = smoothstep(0.5, 0.12, d).mul(0.9);
  mat.transparent = true;
  mat.depthWrite = false;
  mat.blending = THREE.AdditiveBlending;
  mat.size = 7;
  mat.sizeAttenuation = true;

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // Mouse parallax
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  window.addEventListener('pointermove', onMove);

  const ro = new ResizeObserver(() => {
    const r = host.getBoundingClientRect();
    w = Math.max(1, r.width);
    h = Math.max(1, r.height);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  ro.observe(host);

  let raf = 0;
  const loop = () => {
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;
    points.rotation.y += 0.0009;
    points.rotation.x = mouse.y * 0.18;
    camera.position.x = mouse.x * 0.7;
    camera.position.y = mouse.y * -0.4;
    camera.lookAt(0, 0, 0);
    renderer.renderAsync(scene, camera);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onMove);
    ro.disconnect();
    geo.dispose();
    mat.dispose();
    renderer.dispose();
    canvas.remove();
  };
}

/* ----------------------------- 2D fallback ----------------------------- */
function start2D(host: HTMLElement, reduced: boolean): () => void {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  host.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => canvas.remove();

  let w = 0;
  let h = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  const CLAY = '182, 99, 64';
  const CREAM = '243, 233, 220';
  const mouse = { x: -9999, y: -9999 };

  type Node = { x: number; y: number; vx: number; vy: number; r: number };
  let nodes: Node[] = [];

  const resize = () => {
    const r = host.getBoundingClientRect();
    w = Math.max(1, r.width);
    h = Math.max(1, r.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(90, Math.max(36, Math.round((w * h) / 12000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.9,
    }));
  };

  const LINK = 132;
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of nodes) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const md = Math.hypot(mouse.x - p.x, mouse.y - p.y);
      if (md < 150) {
        p.x += ((mouse.x - p.x) / md) * 0.4;
        p.y += ((mouse.y - p.y) / md) * 0.4;
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dd = Math.hypot(a.x - b.x, a.y - b.y);
        if (dd < LINK) {
          ctx.strokeStyle = `rgba(${CLAY}, ${(1 - dd / LINK) * 0.28})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for (const p of nodes) {
      const near = Math.hypot(mouse.x - p.x, mouse.y - p.y) < 150;
      ctx.fillStyle = near ? `rgba(${CLAY}, 0.95)` : `rgba(${CREAM}, 0.7)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };

  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  };
  const onLeave = () => {
    mouse.x = -9999;
    mouse.y = -9999;
  };

  let raf = 0;
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerout', onLeave);
  if (reduced) draw();
  else raf = requestAnimationFrame(draw);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerout', onLeave);
    canvas.remove();
  };
}
