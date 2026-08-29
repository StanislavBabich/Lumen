"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_FRAME_COUNT, HERO_POSTER_SRC, heroFrameSrc } from "@/lib/site";

const LERP = 0.22;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return clamp01(window.scrollY / max);
}

function frameIndex(progress: number, count: number) {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.floor(progress * (count - 1)));
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  destWidth: number,
  destHeight: number,
) {
  const scale = Math.max(destWidth / sourceWidth, destHeight / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  ctx.drawImage(
    source,
    (destWidth - drawWidth) / 2,
    (destHeight - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
}

export function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frames: (HTMLImageElement | undefined)[] = Array.from({ length: HERO_FRAME_COUNT });
    let loaded = 0;
    let cancelled = false;
    let raf = 0;
    let smoothed = reduceMotion ? 0 : scrollProgress();
    let lastIndex = -1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      lastIndex = -1;
    };

    const nearestFrame = (index: number) => {
      const exact = frames[index];
      if (exact?.complete && exact.naturalWidth > 0) return exact;

      for (let offset = 1; offset < HERO_FRAME_COUNT; offset += 1) {
        const before = frames[index - offset];
        if (before?.complete && before.naturalWidth > 0) return before;
        const after = frames[index + offset];
        if (after?.complete && after.naturalWidth > 0) return after;
      }
      return undefined;
    };

    const paint = (index: number) => {
      const image = nearestFrame(index);
      const ctx = canvas.getContext("2d");
      if (!image || !ctx) return;
      if (index === lastIndex && lastIndex !== -1) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      drawCover(
        ctx,
        image,
        image.naturalWidth,
        image.naturalHeight,
        window.innerWidth,
        window.innerHeight,
      );
      lastIndex = index;
    };

    const tick = () => {
      if (cancelled) return;
      const target = reduceMotion ? 0 : scrollProgress();
      smoothed += (target - smoothed) * LERP;
      paint(frameIndex(smoothed, HERO_FRAME_COUNT));
      raf = requestAnimationFrame(tick);
    };

    const onFrameLoaded = () => {
      if (cancelled) return;
      loaded += 1;
      if (loaded === 1) setReady(true);
      lastIndex = -1;
    };

    for (let index = 0; index < HERO_FRAME_COUNT; index += 1) {
      const image = new Image();
      image.decoding = "async";
      image.src = heroFrameSrc(index);
      image.onload = onFrameLoaded;
      image.onerror = onFrameLoaded;
      frames[index] = image;
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
      <img
        src={HERO_POSTER_SRC}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      <canvas
        ref={canvasRef}
        className={`scroll-video-canvas absolute inset-0 h-full w-full transition-opacity duration-300 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
