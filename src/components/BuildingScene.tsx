import { useEffect, useRef } from 'react';

/**
 * LEGO-style construction scene. ~430 individual bricks (with studs) start
 * scattered in the air and fly into place as you scroll, assembling an office
 * tower from the foundation up — a visceral picture of how much it takes to
 * build a business. Window bricks glow copper. Instanced rendering keeps
 * hundreds of bricks smooth; Three.js is dynamically imported (code-split).
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
      const { mergeGeometries } = await import('three/examples/jsm/utils/BufferGeometryUtils.js');
      if (disposed) return;

      const COPPER = new THREE.Color(0xe08a4f);
      const DARK = new THREE.Color(0x33405c);
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
      const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);

      scene.add(new THREE.HemisphereLight(0x50709e, 0x0a1020, 1.15));
      const fill = new THREE.DirectionalLight(0x9fc0ff, 0.6);
      fill.position.set(-6, 4, 6);
      scene.add(fill);
      const key = new THREE.DirectionalLight(0xeaf1ff, 1.6);
      key.position.set(7, 13, 8);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.near = 1;
      key.shadow.camera.far = 44;
      (key.shadow.camera as any).left = -8;
      (key.shadow.camera as any).right = 8;
      (key.shadow.camera as any).top = 8;
      (key.shadow.camera as any).bottom = -8;
      scene.add(key);
      const copperLight = new THREE.PointLight(0xe08a4f, 0, 22, 2);
      copperLight.position.set(1.5, 5, 2.4);
      scene.add(copperLight);

      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(20, 60),
        new THREE.MeshStandardMaterial({ color: 0x070c16, roughness: 1, metalness: 0 }),
      );
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);
      const grid = new THREE.GridHelper(34, 34, 0x223050, 0x0f1826);
      (grid.material as any).transparent = true;
      (grid.material as any).opacity = 0.4;
      scene.add(grid);

      // ---- LEGO brick geometry: body + 2x2 studs, merged ----
      const BW = 0.5, BH = 0.32, BD = 0.5;
      const body = new THREE.BoxGeometry(BW * 0.96, BH, BD * 0.96);
      const geos = [body];
      const studR = 0.085, studH = 0.1;
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        const stud = new THREE.CylinderGeometry(studR, studR, studH, 12);
        stud.translate(sx * BW * 0.24, BH / 2 + studH / 2, sz * BD * 0.24);
        geos.push(stud);
      }
      const brickGeo = mergeGeometries(geos, false)!;

      // ---- generate brick placements (shell + solid foundation + roof) ----
      const COLS = 6, DEP = 5, ROWS = 20;
      const width = COLS * BW, depth = DEP * BD;
      type B = { tx: number; ty: number; tz: number; sx: number; sy: number; sz: number; rot: number; order: number };
      const wall: B[] = [];
      const win: B[] = [];
      const rnd = (a: number, b: number) => a + Math.random() * (b - a);
      for (let row = 0; row < ROWS; row++) {
        for (let x = 0; x < COLS; x++) {
          for (let z = 0; z < DEP; z++) {
            const perimeter = x === 0 || x === COLS - 1 || z === 0 || z === DEP - 1;
            const foundation = row < 2;
            const roof = row === ROWS - 1;
            if (!perimeter && !foundation && !roof) continue; // hollow shell
            const tx = x * BW - width / 2 + BW / 2;
            const ty = row * BH + BH / 2;
            const tz = z * BD - depth / 2 + BD / 2;
            const b: B = {
              tx, ty, tz,
              sx: tx + rnd(-4.5, 4.5),
              sy: ty + rnd(2.5, 7),
              sz: tz + rnd(-4.5, 4.5),
              rot: rnd(-Math.PI, Math.PI),
              order: row + Math.random() * 0.85, // bottom-up with jitter
            };
            const corner = (x === 0 || x === COLS - 1) && (z === 0 || z === DEP - 1);
            const isWindow = perimeter && !corner && !foundation && !roof && row % 2 === 0;
            (isWindow ? win : wall).push(b);
          }
        }
      }
      // global build order -> place threshold
      const all = [...wall, ...win].sort((a, b) => a.order - b.order);
      all.forEach((b, i) => (b.order = i / all.length));
      const TOTAL = all.length;

      const mkInstanced = (arr: B[], color: any, emissive: number) => {
        const mat = new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: emissive ? 0.55 : 0, metalness: 0.4, roughness: 0.5 });
        const im = new THREE.InstancedMesh(brickGeo, mat, arr.length);
        im.castShadow = true;
        im.receiveShadow = true;
        scene.add(im);
        return im;
      };
      const wallMesh = mkInstanced(wall, DARK, 0);
      const winMesh = mkInstanced(win, COPPER, 0xe08a4f);

      const group = new THREE.Group();
      group.position.y = 0.02; // sit the building ON the ground, not below it
      scene.add(group);
      // note: instanced meshes are in scene; apply group offset manually via y shift
      const yOff = group.position.y;

      const dummy = new THREE.Object3D();
      const clampf = (v: number) => Math.max(0, Math.min(1, v));
      const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

      const updateMesh = (im: any, arr: B[], p: number) => {
        for (let i = 0; i < arr.length; i++) {
          const b = arr[i];
          const placed = reduce ? 1 : clampf((p - b.order) * 9);
          const e = easeOut(placed);
          dummy.position.set(
            b.sx + (b.tx - b.sx) * e,
            (b.sy + (b.ty - b.sy) * e) + yOff,
            b.sz + (b.tz - b.sz) * e,
          );
          const s = reduce ? 1 : 0.001 + placed * 0.999;
          dummy.scale.set(s, s, s);
          const r = (1 - e) * b.rot;
          dummy.rotation.set(r * 0.6, r, r * 0.4);
          dummy.updateMatrix();
          im.setMatrixAt(i, dummy.matrix);
        }
        im.instanceMatrix.needsUpdate = true;
      };

      let raf = 0;
      let t = 0;
      const render = () => {
        t += 0.006;
        const p = reduce ? 1 : clampf(progressRef.current);
        updateMesh(wallMesh, wall, p);
        updateMesh(winMesh, win, p);

        copperLight.intensity = clampf((p - 0.4) * 2) * 2.2;

        const narrow = w < 620;
        const az = reduce ? -0.6 : -0.6 + Math.sin(t * 0.42) * 0.4;
        const radius = narrow ? 13 : 11.5;
        camera.position.set(Math.sin(az) * radius, narrow ? 4.8 : 4.2, Math.cos(az) * radius);
        camera.lookAt(0, 3.0, 0);

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

      // expose total for the counter
      (host as any).__brickTotal = TOTAL;

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        renderer.dispose();
        brickGeo.dispose();
        scene.traverse((o: any) => {
          if (o.geometry && o.geometry !== brickGeo) o.geometry.dispose();
          if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m: any) => m.dispose());
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
