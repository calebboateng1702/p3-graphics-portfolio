"use client";

import { useEffect, useRef } from "react";

export default function HeroMedia({ videoSrc, posterSrc, imageSrc, alt }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const reducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) return;

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!video) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          try {
            await video.play();
          } catch {}
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.6, 1] }
    );

    io.observe(video);
    return () => io.disconnect();
  }, [videoSrc]);

  if (!videoSrc) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        className="h-[320px] md:h-[460px] w-full object-cover"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      poster={posterSrc || imageSrc}
      loop
      muted
      playsInline
      preload="metadata"
      className="h-[320px] md:h-[460px] w-full object-cover"
    />
  );
}