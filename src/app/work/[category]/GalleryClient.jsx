"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function GalleryClient({ category, items = [] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const title = useMemo(() => {
    return (category || "").replace(/-/g, " ");
  }, [category]);

  function openAt(index) {
    setActive(index);
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

  if (!items.length) {
    return (
      <div className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="text-sm text-gray-400 transition hover:text-white">
            ← Back to Home
          </Link>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h1 className="text-3xl font-bold capitalize text-white">{title || "Gallery"}</h1>
            <p className="mt-3 text-gray-400">No items available yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <Link href="/" className="text-sm text-gray-400 transition hover:text-white">
              ← Back to Home
            </Link>

            <p className="mt-6 text-sm uppercase tracking-[0.22em] text-white/40">
              Gallery
            </p>

            <h1 className="mt-3 text-4xl font-bold capitalize tracking-tight md:text-5xl">
              {title}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400 md:text-base">
              A curated selection of {title} work. Open any item to view it fullscreen
              and move through the collection with your keyboard.
            </p>
          </div>

          <div className="text-sm text-gray-400">
            {items.length} {items.length === 1 ? "item" : "items"}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <button
              key={it.src}
              type="button"
              onClick={() => openAt(i)}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left transition duration-300 hover:-translate-y-1 hover:border-white/20"
              aria-label={`Open ${it.title || it.file || `item ${i + 1}`}`}
            >
              <div className="relative">
                {it.type === "video" ? (
                  <video
                    src={it.src}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="h-72 w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                  />
                ) : (
                  <img
                    src={it.src}
                    alt={it.title || it.file}
                    className="h-72 w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                    loading="lazy"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-4">
                  <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                    {it.type === "video" ? "Motion" : "Design"}
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/60 backdrop-blur-md">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="truncate text-sm font-medium text-white">
                    {it.title || it.file}
                  </div>
                  <div className="mt-1 text-xs text-white/55">Click to view fullscreen</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && current ? (
        <div
          className="fixed inset-0 z-[999] bg-black/88 backdrop-blur-xl"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 flex items-center justify-center px-4 py-6 md:px-8">
            <div className="w-full max-w-7xl">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="truncate text-sm font-medium text-white/85">
                    {current.title || current.file}
                  </div>
                  <div className="mt-1 text-xs text-white/45">
                    {active + 1} of {items.length}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    Next →
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black">
                {current.type === "video" ? (
                  <video
                    src={current.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[78vh] w-full object-contain bg-black"
                  />
                ) : (
                  <img
                    src={current.src}
                    alt={current.title || current.file}
                    className="max-h-[78vh] w-full object-contain bg-black"
                  />
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-gray-400">
                  Tip: Use keyboard ← → to navigate and Esc to close
                </div>

                <div className="flex gap-2 overflow-x-auto">
                  {items.map((item, i) => (
                    <button
                      key={`${item.src}-thumb`}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`h-14 w-14 overflow-hidden rounded-xl border transition ${
                        i === active
                          ? "border-orange-500"
                          : "border-white/10 opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`Go to item ${i + 1}`}
                    >
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          muted
                          playsInline
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={item.title || item.file}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}