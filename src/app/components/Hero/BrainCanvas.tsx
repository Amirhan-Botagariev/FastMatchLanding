"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ParticleTextAI from "./ParticleTextAI";

export default function BrainCanvas() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mm = window.matchMedia("(max-width: 768px)");
    const upd = () => setAutoRotate(!mq.matches);
    const updMobile = () => setMobile(mm.matches);
    upd(); updMobile();
    mq.addEventListener("change", upd);
    mm.addEventListener("change", updMobile);
    const px = window.devicePixelRatio || 1;
    setDpr(px > 2 ? [1, 1.5] : [1, 2]);
    return () => {
      mq.removeEventListener("change", upd);
      mm.removeEventListener("change", updMobile);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, mobile ? 3.2 : 2.8], fov: mobile ? 58 : 50 }}
        dpr={dpr}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 4, 4]} intensity={0.7} color={"#38B6FF"} />
        <directionalLight position={[-4, -2, 2]} intensity={0.35} />

        {/* чуть выше на мобиле */}
        <group position={[mobile ? 0 : 0.25, mobile ? 0.12 : -0.05, 0]}>
          <ParticleTextAI
            text="AI"
            size={mobile ? 3.6 : 3.2}   // БОЛЬШЕ НА МОБИЛЕ
            step={mobile ? 5 : 3}       // плотность чуть меньше, чтобы не «сыпалось»
            depth={0.1}
            particleSize={mobile ? 0.02 : 0.016} // сами частицы крупнее
            opacity={0.95}                       // ярче
          />
        </group>

        <OrbitControls enableZoom={false} autoRotate={autoRotate} autoRotateSpeed={0.45} />
      </Canvas>
    </div>
  )
}