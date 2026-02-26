"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Tilt({
  children,
  className = "",
  max = 10, // max rotation degrees
  perspective = 900,
}) {
  const ref = useRef(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const sx = useSpring(rx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(ry, { stiffness: 220, damping: 18, mass: 0.6 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();

    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1

    // center at 0,0 then scale
    const rotY = (px - 0.5) * (max * 2); // left/right
    const rotX = -(py - 0.5) * (max * 2); // up/down (invert)

    rx.set(rotX);
    ry.set(rotY);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective }}
      className={className}
    >
      <motion.div
        style={{
          rotateX: sx,
          rotateY: sy,
          transformStyle: "preserve-3d",
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}