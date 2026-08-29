"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO_SRC } from "@/lib/site";

const LERP = 0.01;
const MAX_FRAMES = 90;
const MIN_FRAMES = 24;
const EXTRACT_FPS = 12;
const MAX_FRAME_WIDTH = 1280;
const SEEK_DELTA = 0.04;
const DURATION_PAD = 0.05;
const EXTRACT_YIELD_MS = 300;

function devicePixelRatio() {
  return Math.min(window.devicePixelRatio || 1, 2);
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return clamp01(window.scrollY / max);
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasFrame, setHasFrame] = useState(false);
  const [cacheReady, setCacheReady] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let cancelled = false;
    let raf = 0;
    let smoothed = 0;
    let lastSeek = -1;
    let lastCacheIndex = -1;
    let frames: ImageBitmap[] = [];
    let framesReady = false;

    const prepareContext = (ctx: CanvasRenderingContext2D) => {
      const dpr = devicePixelRatio();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
    };

    const resize = () => {
      const dpr = devicePixelRatio();
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      lastCacheIndex = -1;
    };

    const drawVideoFrame = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx || video.videoWidth === 0) return;
      prepareContext(ctx);
      drawCover(
        ctx,
        video,
        video.videoWidth,
        video.videoHeight,
        window.innerWidth,
        window.innerHeight,
      );
    };

    const drawCached = (progress: number) => {
      if (frames.length === 0) return;
      const index = Math.min(
        frames.length - 1,
        Math.floor(progress * (frames.length - 1)),
      );
      if (index === lastCacheIndex) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const bitmap = frames[index];
      prepareContext(ctx);
      drawCover(ctx, bitmap, bitmap.width, bitmap.height, window.innerWidth, window.innerHeight);
      lastCacheIndex = index;
    };

    const tick = () => {
      if (cancelled) return;
      const target = scrollProgress();
      smoothed += (target - smoothed) * LERP;

      if (framesReady) {
        drawCached(smoothed);
      } else if (video.duration && !Number.isNaN(video.duration)) {
        const time = smoothed * Math.max(0, video.duration - DURATION_PAD);
        if (Math.abs(time - lastSeek) > SEEK_DELTA) {
          lastSeek = time;
          try {
            video.currentTime = time;
          } catch {
            /* ignore seek abort */
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const onFrameReady = () => {
      if (cancelled) return;
      setHasFrame(true);
    };

    const extractFrames = async () => {
      await new Promise((resolve) => setTimeout(resolve, EXTRACT_YIELD_MS));
      if (cancelled) return;

      const offscreen = document.createElement("video");
      offscreen.muted = true;
      offscreen.playsInline = true;
      offscreen.preload = "auto";
      offscreen.crossOrigin = "anonymous";
      offscreen.src = HERO_VIDEO_SRC;

      const loaded = await new Promise<boolean>((resolve) => {
        offscreen.addEventListener("loadeddata", () => resolve(true), { once: true });
        offscreen.addEventListener("error", () => resolve(false), { once: true });
      });

      if (!loaded || cancelled || !offscreen.duration) return;

      const count = Math.min(
        MAX_FRAMES,
        Math.max(MIN_FRAMES, Math.round(offscreen.duration * EXTRACT_FPS)),
      );
      const scale = Math.min(1, MAX_FRAME_WIDTH / (offscreen.videoWidth || MAX_FRAME_WIDTH));
      const width = Math.round((offscreen.videoWidth || MAX_FRAME_WIDTH) * scale);
      const height = Math.round((offscreen.videoHeight || 720) * scale);

      const seekTo = (time: number) =>
        new Promise<void>((resolve, reject) => {
          const onSeeked = () => {
            offscreen.removeEventListener("seeked", onSeeked);
            offscreen.removeEventListener("error", onError);
            resolve();
          };
          const onError = () => {
            offscreen.removeEventListener("seeked", onSeeked);
            offscreen.removeEventListener("error", onError);
            reject(new Error("seek failed"));
          };
          offscreen.addEventListener("seeked", onSeeked);
          offscreen.addEventListener("error", onError);
          offscreen.currentTime = time;
        });

      const extracted: ImageBitmap[] = [];

      try {
        for (let index = 0; index < count; index += 1) {
          if (cancelled) return;
          const time =
            (index / Math.max(1, count - 1)) * Math.max(0, offscreen.duration - DURATION_PAD);
          await seekTo(time);
          extracted.push(
            await createImageBitmap(offscreen, {
              resizeWidth: width,
              resizeHeight: height,
            }),
          );
        }

        frames = extracted;
        framesReady = true;
        lastCacheIndex = -1;
        setCacheReady(true);
      } catch {
        extracted.forEach((frame) => frame.close());
      } finally {
        offscreen.removeAttribute("src");
        offscreen.load();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    video.addEventListener("loadeddata", onFrameReady);
    video.addEventListener("seeked", drawVideoFrame);

    if (video.readyState >= 2) {
      onFrameReady();
      void extractFrames();
    } else {
      video.addEventListener("loadeddata", () => void extractFrames(), { once: true });
    }

    video.pause();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      video.removeEventListener("loadeddata", onFrameReady);
      video.removeEventListener("seeked", drawVideoFrame);
      frames.forEach((frame) => frame.close());
    };
  }, []);

  const posterHidden = hasFrame || cacheReady;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
      {!posterFailed ? (
        <img
          src="/hero-poster.jpg"
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            posterHidden ? "opacity-0" : "opacity-100"
          }`}
          onError={() => setPosterFailed(true)}
        />
      ) : null}
      <video
        ref={videoRef}
        src={HERO_VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          hasFrame && !cacheReady ? "opacity-100" : "opacity-0"
        }`}
      />
      <canvas
        ref={canvasRef}
        className={`scroll-video-canvas absolute inset-0 h-full w-full transition-opacity duration-500 ${
          cacheReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
