"use client";

import { useEffect, useMemo, useState } from "react";

export default function GalleryClient({ category, items }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const title = useMemo(() => (category || "").replace(/-/g, " "), [category]);

  function openAt(i) {
    setActive(i);
    setOpen(true);
  }
  function close() {
    setOpen(false);
  }
  function prev() {
    setActive((i) => (i - 1 + items.length) % items.length);
  }
  function next() {
    setActive((i) => (i + 1) % items.length);
  }

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, items.length]);

  const current = items[active];

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <a href="/" className="text-sm text-gray-400 hover:text-white">
              ← Back to Home
            </a>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold capitalize">
              {title}
            </h1>
            <p className="mt-2 text-gray-400 text-sm">
              Click any item to view fullscreen. Use ← → keys. Esc to close.
            </p>
          </div>

          <div className="hidden sm:block text-sm text-gray-400">
            {items.length} items
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <button
              key={it.src}
              onClick={() => openAt(i)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
              aria-label={`Open ${it.file}`}
            >
              {it.type === "video" ? (
                <video
                  src={it.src}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-64 w-full object-cover opacity-90 group-hover:opacity-100 transition"
                />
              ) : (
                <img
                  src={it.src}
                  alt={it.file}
                  className="h-64 w-full object-cover opacity-90 group-hover:opacity-100 transition"
                  loading="lazy"
                />
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-70" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-xs text-gray-200/80 truncate">{it.file}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && current ? (
        <div
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-xl"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 flex items-center justify-center px-4 py-6">
            <div className="relative w-full max-w-6xl">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="text-sm text-gray-200/80 truncate">{current.file}</div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                  >
                    ←
                  </button>
                  <button
                    onClick={next}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                  >
                    →
                  </button>
                  <button
                    onClick={close}
                    className="rounded-xl bg-orange-500 px-3 py-2 text-sm font-semibold text-black hover:opacity-90"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                {current.type === "video" ? (
                  <video
                    src={current.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[75vh] w-full object-contain bg-black"
                  />
                ) : (
                  <img
                    src={current.src}
                    alt={current.file}
                    className="max-h-[75vh] w-full object-contain bg-black"
                  />
                )}
              </div>

              <div className="mt-3 text-xs text-gray-400">
                Tip: Use keyboard ← → to navigate • Esc to close
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}