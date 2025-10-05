"use client";

import { useEffect, useMemo, useState } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  text?: string;
  size?: number;
  step?: number;
  depth?: number;
  /** размер точки в world units */
  particleSize?: number;
  /** непрозрачность 0..1 */
  opacity?: number;
  /** цвет точек */
  colorHex?: string;
};

export default function ParticleTextAI({
  text = "AI",
  size = 1.8,
  step = 4,
  depth = 0.06,
  particleSize = 0.016,
  opacity = 0.9,
  colorHex = "#7EC6FF", // чуть светлее, чем #38B6FF
}: Props) {
  const [fontsReady, setFontsReady] = useState(false);
  useEffect(() => {
    let mounted = true;
    document.fonts?.ready?.then(() => mounted && setFontsReady(true));
    return () => { mounted = false; };
  }, []);

  const positions = useMemo(() => {
    if (!fontsReady) return new Float32Array();
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d", { willReadFrequently: true })!;
    const W = 800, H = 400;
    c.width = W; c.height = H;

    ctx.clearRect(0, 0, W, H);
    ctx.font = `bold ${Math.floor(H * 0.72)}px Montserrat, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, W / 2, H / 2);

    const img = ctx.getImageData(0, 0, W, H).data;
    const pts: number[] = [];
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const i = (y * W + x) * 4;
        const alpha = img[i + 3];
        if (alpha > 200) {
          const nx = x / W - 0.5;
          const ny = 0.5 - y / H;
          const jx = (Math.random() - 0.5) * 0.002;
          const jy = (Math.random() - 0.5) * 0.002;
          const X = (nx + jx) * size * 2.2;
          const Y = (ny + jy) * size;
          const Z = (Math.random() - 0.5) * depth;
          pts.push(X, Y, Z);
        }
      }
    }
    return new Float32Array(pts);
  }, [text, size, step, depth, fontsReady]);

  const color = useMemo(() => new THREE.Color(colorHex), [colorHex]);

  return (
    <group>
      <Points positions={positions} frustumCulled>
        <PointMaterial
          transparent
          size={particleSize}
          sizeAttenuation
          depthWrite={false}
          color={color}
          opacity={opacity}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}