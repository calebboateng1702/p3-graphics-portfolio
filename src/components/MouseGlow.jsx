"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const updateGlow = (clientX, clientY) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;

        el.style.setProperty("--glow-x", `${Math.max(0, Math.min(100, x))}%`);
        el.style.setProperty("--glow-y", `${Math.max(0, Math.min(100, y))}%`);
      });
    };

    const onMove = (e) => updateGlow(e.clientX, e.clientY);

    const onLeave = () => {
      el.style.setProperty("--glow-x", "50%");
      el.style.setProperty("--glow-y", "50%");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(249,115,22,0.14), transparent 55%)",
      }}
    >
      {children}
    </div>
  );
}