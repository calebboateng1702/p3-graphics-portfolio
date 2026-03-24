"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

export default function Tilt({
  children,
  className = "",
  max = 10,
  perspective = 900,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const sx = useSpring(rx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(ry, { stiffness: 220, damping: 18, mass: 0.6 });

  const onMove = (e) => {
    if (reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotY = (px - 0.5) * (max * 2);
    const rotX = -(py - 0.5) * (max * 2);

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
        style={
          reduceMotion
            ? undefined
            : {
                rotateX: sx,
                rotateY: sy,
                transformStyle: "preserve-3d",
              }
        }
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}