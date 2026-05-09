"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SlideItem {
  type: "video" | "image";
  src: string;
  title: string;
  subtitle: string;
  link: string;
  linkText: string;
}

const SLIDES: SlideItem[] = [
  {
    type: "video",
    src: "/videos/mova-mobius-60.mp4",
    title: "Robot Hút Bụi Thông Minh",
    subtitle: "Công nghệ LiDAR + AI — làm sạch mọi ngóc ngách",
    link: "/f/reviews",
    linkText: "Khám phá ngay",
  },
  {
    type: "image",
    src: "/banners/slide-roborock.jpg",
    title: "Roborock S8 MaxV Ultra",
    subtitle: "Flagship mới nhất — lực hút 10.000Pa, AI né vật cản",
    link: "/f/roborock",
    linkText: "Xem đánh giá",
  },
  {
    type: "video",
    src: "/videos/mova-z60-roller.mp4",
    title: "MOVA Z60 Roller",
    subtitle: "Công nghệ chổi roller — sạch gấp đôi, bền gấp 3",
    link: "/f/brand-forums",
    linkText: "Tìm hiểu thêm",
  },
  {
    type: "image",
    src: "/banners/slide-dreame.png",
    title: "Dreame X40 Ultra",
    subtitle: "Lau nhà nước nóng 60°C — sạch bóng mọi vết bẩn",
    link: "/f/dreame",
    linkText: "Xem chi tiết",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const next = useCallback(() => {
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, []);

  const prev = useCallback(() => {
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const slide = SLIDES[current];

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides container */}
      <div className="relative h-[280px] md:h-[400px] lg:h-[460px]">
        {/* Background */}
        <div className={cn("absolute inset-0 transition-opacity duration-700", isTransitioning ? "opacity-50" : "opacity-100")}>
          {slide.type === "video" ? (
            <video
              key={slide.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={slide.src} type="video/mp4" />
            </video>
          ) : (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Text content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 lg:px-16 max-w-2xl">
          <h1 className={cn(
            "text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 transition-all duration-700",
            isTransitioning ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
          )}>
            {slide.title}
          </h1>
          <p className={cn(
            "text-sm md:text-lg text-white/80 mb-6 max-w-md transition-all duration-700 delay-75",
            isTransitioning ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
          )}>
            {slide.subtitle}
          </p>
          <Link
            href={slide.link}
            className={cn(
              "inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-all w-fit duration-700 delay-150",
              isTransitioning ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
            )}
          >
            {slide.linkText}
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-all flex items-center justify-center z-20"
      >
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-all flex items-center justify-center z-20"
      >
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots + slide info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => { setIsTransitioning(true); setCurrent(i); setTimeout(() => setIsTransitioning(false), 700); }}
            className={cn(
              "transition-all duration-300 rounded-full",
              i === current
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-4 right-6 text-white/60 text-xs z-20">
        {current + 1} / {SLIDES.length}
      </div>
    </div>
  );
}
