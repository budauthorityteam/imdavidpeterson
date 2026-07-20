import { useEffect, useRef } from 'react';
import type { Mesh, MeshStandardMaterial, LineBasicMaterial } from 'three';

/**
 * 3D construction scene. An office tower assembles floor by floor in real
 * perspective: the foundation lays, floors rise and lock into place, their
 * window bands light up copper, copper edges trace the architecture, and a
 * rooftop beacon switches on. The camera slowly orbits for depth. Progress is
 * read from `progressRef` (0..1), driven by the parent's scroll. Three.js is
 * dynamically imported so it code-splits out of the initial bundle.
 */
export default function BuildingScene({
  progressRef,
  reduce,
}: {
  progressRef: { current: number };
  reduce: boolean | null;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      if (disposed) return;

      const COPPER = 0xe08a4f;
      let w = host.clientWidth || 600;
      let h = host.clientHeight || 520;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      host.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);

      scene.add(new THREE.HemisphereLight(0x3a5680, 0x05080f, 0.85));
      const key = new THREE.DirectionalLight(0xdfe8ff, 1.25);
      key.position.set(6, 12, 7);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.near = 1;
      key.shadow.camera.far = 40;
      scene.add(key);
      const copperLight = new THREE.PointLight(COPPER, 0, 20, 2);
      copperLight.position.set(1.4, 4.4, 2);
      scene.add(copperLight);

      // Ground + grid
      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(18, 56),
        new THREE.MeshStandardMaterial({ color: 0x080d18, roughness: 1, metalness: 0 }),
      );
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);
      const grid = new THREE.GridHelper(30, 30, 0x223050, 0x111a2c);
      (grid.material as any).transparent = true;
      (grid.material as any).opacity = 0.45;
      scene.add(grid);

      const group = new THREE.Group();
      scene.add(group);

      const FLOORS = 7;
      const fW = 1.95;
      const fH = 0.56;
      const fD = 1.5;
      const baseH = 0.42;

      type Part = {
        mesh: Mesh;
        mat: MeshStandardMaterial;
        edge?: LineBasicMaterial;
        wins: MeshStandardMaterial[];
        targetY: number;
        place: number;
      };
      const parts: Part[] = [];

      const addBox = (
        wd: number,
        ht: number,
        dp: number,
        y: number,
        place: number,
        opts: { color: number; metalness?: number; roughness?: number; edge?: boolean; windows?: boolean },
      ) => {
        const mat = new THREE.MeshStandardMaterial({
          color: opts.color,
          emissive: COPPER,
          emissiveIntensity: 0,
          metalness: opts.metalness ?? 0.55,
          roughness: opts.roughness ?? 0.45,
          transparent: true,
          opacity: 1,
        });
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(wd, ht, dp), mat);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        let edge: LineBasicMaterial | undefined;
        if (opts.edge) {
          const em = new THREE.LineBasicMaterial({ color: COPPER, transparent: true, opacity: 0 });
          mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), em));
          edge = em;
        }

        const wins: MeshStandardMaterial[] = [];
        if (opts.windows) {
          // lit window bands on the front and right faces
          const bandGeo = new THREE.BoxGeometry(wd * 0.82, ht * 0.42, 0.02);
          const sideGeo = new THREE.BoxGeometry(0.02, ht * 0.42, dp * 0.82);
          const mkWin = (geo: any, px: number, pz: number) => {
            const wm = new THREE.MeshStandardMaterial({
              color: 0x120a04,
              emissive: COPPER,
              emissiveIntensity: 0,
              transparent: true,
              opacity: 0,
            });
            const m = new THREE.Mesh(geo, wm);
            m.position.set(px, 0, pz);
            mesh.add(m);
            wins.push(wm);
          };
          mkWin(bandGeo, 0, dp / 2 + 0.011);
          mkWin(sideGeo, wd / 2 + 0.011, 0);
        }

        group.add(mesh);
        parts.push({ mesh, mat, edge, wins, targetY: y, place });
        return mesh;
      };

      addBox(fW + 0.6, baseH, fD + 0.5, baseH / 2, 0.0, { color: 0x0c1322, metalness: 0.2, roughness: 0.95, edge: true });
      for (let i = 0; i < FLOORS; i++) {
        addBox(fW, fH, fD, baseH + fH / 2 + i * fH, 0.04 + (i / FLOORS) * 0.8, {
          color: 0x121a2e,
          edge: true,
          windows: true,
        });
      }
      const roofY = baseH + FLOORS * fH + 0.12;
      addBox(fW + 0.14, 0.24, fD + 0.14, roofY, 0.9, { color: 0x0e1524, edge: true });

      const beacon = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 20, 20),
        new THREE.MeshStandardMaterial({ color: COPPER, emissive: COPPER, emissiveIntensity: 0, transparent: true, opacity: 1 }),
      );
      beacon.position.set(0, roofY + 0.32, 0);
      group.add(beacon);

      group.position.y = -1.9;

      const clampf = (v: number) => Math.max(0, Math.min(1, v));
      let raf = 0;
      let t = 0;
      const render = () => {
        t += 0.006;
        const p = reduce ? 1 : clampf(progressRef.current);

        parts.forEach((part) => {
          const placed = clampf((p - part.place) * 7);
          part.mesh.position.y = part.targetY + (1 - placed) * 2.6;
          const s = reduce ? 1 : 0.7 + placed * 0.3;
          part.mesh.scale.set(s, s, s);
          part.mat.opacity = reduce ? 1 : 0.04 + placed * 0.96;
          part.mat.emissiveIntensity = placed * 0.05;
          if (part.edge) part.edge.opacity = placed * 0.7;
          part.wins.forEach((wm) => {
            wm.opacity = placed;
            wm.emissiveIntensity = placed * (0.65 + Math.sin(t * 2 + part.targetY) * 0.12);
          });
        });

        const topOut = clampf((p - 0.9) * 10);
        (beacon.material as MeshStandardMaterial).emissiveIntensity = topOut * 2.4;
        beacon.scale.setScalar(0.5 + topOut * (1 + Math.sin(t * 6) * 0.14));
        copperLight.intensity = topOut * 1.6 + p * 0.5;

        const az = reduce ? -0.62 : -0.62 + Math.sin(t * 0.5) * 0.45;
        const radius = 6.8;
        camera.position.set(Math.sin(az) * radius, 3.0, Math.cos(az) * radius);
        camera.lookAt(0, 1.15, 0);

        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };
      raf = requestAnimationFrame(render);

      const onResize = () => {
        w = host.clientWidth || w;
        h = host.clientHeight || h;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(host);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        renderer.dispose();
        scene.traverse((o: any) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            if (Array.isArray(o.material)) o.material.forEach((m: any) => m.dispose());
            else o.material.dispose();
          }
        });
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [progressRef, reduce]);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
