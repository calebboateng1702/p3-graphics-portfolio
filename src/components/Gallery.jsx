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
  const vidRef = useRef(null);
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, "200px");

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    v.pause();
  }, []);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;

    if (!inView) {
      v.pause();
      v.currentTime = 0;
    }
  }, [inView]);

  const onEnter = () => {
    const v = vidRef.current;
    if (!v || !inView) return;
    v.play().catch(() => {});
  };

  const onLeave = () => {
    const v = vidRef.current;
    if (!v) return;
    v.pause();
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
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <img
          src={item.thumb}
          alt={item.title}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
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
            type="button"
            onClick={() => onChange(f)}
            className={
              "rounded-full border px-4 py-2 text-sm transition-all duration-200 hover:-translate-y-[1px] " +
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

function Lightbox({ active, activeIndex, total, onClose, onPrev, onNext, hasNav }) {
  useEffect(() => {
    if (!active) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (!hasNav) return;
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, onClose, onPrev, onNext, hasNav]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mx-auto mt-6 w-[94%] max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 md:mt-10"
            initial={{ y: 18, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm text-gray-400">{active.category}</div>
                <div className="text-xl font-semibold">{active.title}</div>
                <div className="mt-1 text-xs text-white/45">
                  {activeIndex + 1} / {total}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {hasNav ? (
                  <>
                    <button
                      type="button"
                      onClick={onPrev}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:bg-white/10"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:bg-white/10"
                    >
                      Next
                    </button>
                  </>
                ) : null}

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl bg-orange-500 px-3 py-2 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                {active.fullVideo ? (
                  <video
                    src={active.fullVideo}
                    controls
                    playsInline
                    className="max-h-[78vh] w-full object-contain bg-black"
                  />
                ) : (
                  <img
                    src={active.full || active.thumb}
                    alt={active.title}
                    className="max-h-[78vh] w-full object-contain bg-black"
                  />
                )}
              </div>

              {active.description ? (
                <p className="mt-4 leading-8 text-gray-300">{active.description}</p>
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

export default function Gallery({ title, subtitle, items = [] }) {
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

  const activeIndex = active ? filtered.findIndex((x) => x.id === active.id) : -1;

  const onPrev = () => {
    if (!filtered.length) return;
    const prevIndex = activeIndex <= 0 ? filtered.length - 1 : activeIndex - 1;
    setActive(filtered[prevIndex]);
  };

  const onNext = () => {
    if (!filtered.length) return;
    const nextIndex = activeIndex >= filtered.length - 1 ? 0 : activeIndex + 1;
    setActive(filtered[nextIndex]);
  };

  return (
    <main className="min-h-screen bg-black px-6 pb-20 pt-28 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.22em] text-white/40">
            Curated Gallery
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-3 max-w-2xl text-gray-400">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-12">
          <FilterBar value={filter} onChange={setFilter} filters={filters} />
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              whileHover={{ y: -6 }}
              className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-left backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <Media item={item} />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-sm text-white/70">{item.category}</div>
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
        activeIndex={activeIndex}
        total={filtered.length}
        onClose={() => setActive(null)}
        onPrev={onPrev}
        onNext={onNext}
        hasNav={filtered.length > 1}
      />
    </main>
  );
}