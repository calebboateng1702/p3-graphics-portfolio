"use client";

import { useEffect, useRef, useState } from "react";

export default function MouseGlow({ children, className = "" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        setPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
      });
    };

    el.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(249,115,22,0.16), transparent 55%)`,
      }}
    >
      {children}
    </div>
  );
}