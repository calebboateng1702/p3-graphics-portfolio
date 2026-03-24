"use client";

import { useEffect, useRef } from "react";

export default function HeroMedia({ videoSrc, posterSrc, imageSrc, alt }) {
  const mediaRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const media = mediaRef.current;

    if (!video || !media || !videoSrc) return;

    const reducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!video) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          try {
            await video.play();
          } catch {
            // autoplay may be blocked in some environments
          }
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.6, 1] }
    );

    observer.observe(media);

    return () => observer.disconnect();
  }, [videoSrc]);

  if (!videoSrc && !imageSrc) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center bg-white/5 text-sm text-white/40">
        No media available
      </div>
    );
  }

  if (!videoSrc) {
    return (
      <div ref={mediaRef} className="aspect-[16/10] w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div ref={mediaRef} className="aspect-[16/10] w-full overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc || imageSrc}
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
    </div>
  );
}