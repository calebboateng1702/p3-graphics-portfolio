"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** ---------------------------
 * Controlled autoplay (visible + hover)
 * --------------------------- */
function useInView(ref, rootMargin = "0px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin]);

  return inView;
}

function Media({ item }) {
  // If motion item has videoThumb, show video preview (controlled)
  const vidRef = useRef(null);
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, "200px");

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    // pause by default unless user hovers
    v.pause();
  }, []);

  const onEnter = () => {
    const v = vidRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
  };

  const onLeave = () => {
    const v = vidRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[4/3] w-full overflow-hidden"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {item.videoThumb ? (
        <video
          ref={vidRef}
          src={item.videoThumb}
          muted
          playsInline
          loop
          preload="metadata"
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={item.thumb}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      )}

      {/* premium overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    </div>
  );
}

function FilterBar({ value, onChange, filters }) {
  return (
    <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
      {filters.map((f) => {
        const active = value === f;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={
              "rounded-full px-4 py-2 text-sm border transition " +
              (active
                ? "border-orange-500/40 bg-orange-500/10 text-white"
                : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10")
            }
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}

function Lightbox({ active, onClose, onPrev, onNext, hasNav }) {
  // ESC close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (!hasNav) return;
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext, hasNav]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mx-auto mt-10 w-[92%] max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950"
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <div className="text-sm text-gray-400">{active.category}</div>
                <div className="text-xl font-semibold">{active.title}</div>
              </div>

              <div className="flex items-center gap-2">
                {hasNav ? (
                  <>
                    <button
                      onClick={onPrev}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                    >
                      Prev
                    </button>
                    <button
                      onClick={onNext}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                    >
                      Next
                    </button>
                  </>
                ) : null}

                <button
                  onClick={onClose}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                {/* If fullVideo exists, show video; else image */}
                {active.fullVideo ? (
                  <video
                    src={active.fullVideo}
                    controls
                    playsInline
                    className="w-full"
                  />
                ) : (
                  <img
                    src={active.full || active.thumb}
                    alt={active.title}
                    className="w-full object-cover"
                  />
                )}
              </div>

              {active.description ? (
                <p className="mt-4 text-gray-300 leading-relaxed">
                  {active.description}
                </p>
              ) : null}

              {active.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function Gallery({ title, subtitle, items }) {
  const filters = useMemo(() => {
    const cats = Array.from(new Set(items.map((i) => i.category))).sort();
    return ["All", ...cats];
  }, [items]);

  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((i) => i.category === filter);
  }, [items, filter]);

  const activeIndex = active
    ? filtered.findIndex((x) => x.id === active.id)
    : -1;

  const onPrev = () => {
    if (activeIndex <= 0) return;
    setActive(filtered[activeIndex - 1]);
  };
  const onNext = () => {
    if (activeIndex < 0 || activeIndex >= filtered.length - 1) return;
    setActive(filtered[activeIndex + 1]);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-28 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-12">
          <FilterBar value={filter} onChange={setFilter} filters={filters} />
        </div>

        {/* premium grid */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActive(item)}
              whileHover={{ y: -6 }}
              className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
            >
              <Media item={item} />

              <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="text-sm text-gray-300/90">{item.category}</div>
                <div className="mt-1 text-lg font-semibold">{item.title}</div>
                {item.tags?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        active={active}
        onClose={() => setActive(null)}
        onPrev={onPrev}
        onNext={onNext}
        hasNav={filtered.length > 1}
      />
    </main>
  );
}