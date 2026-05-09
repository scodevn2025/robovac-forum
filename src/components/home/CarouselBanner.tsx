"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string | null;
}

interface CarouselBannerProps {
  banners: Banner[];
}

// Beautiful gradient banners for when no images exist
const FALLBACK_BANNERS = [
  {
    gradient: "from-emerald-600 via-green-500 to-teal-400",
    icon: "⭐",
    title: "Top Robot Hút Bụi 2026",
    subtitle: "Đánh giá & so sánh chi tiết từ cộng đồng",
    link: "/f/reviews",
  },
  {
    gradient: "from-blue-600 via-indigo-500 to-purple-400",
    icon: "💰",
    title: "Săn Deal Robot Hút Bụi",
    subtitle: "Cập nhật khuyến mãi mới nhất — giảm đến 40%",
    link: "/f/deals",
  },
  {
    gradient: "from-orange-500 via-red-500 to-rose-400",
    icon: "🔧",
    title: "Sửa Lỗi & Bảo Trì",
    subtitle: "Hướng dẫn tự sửa 90% lỗi tại nhà",
    link: "/f/troubleshooting",
  },
  {
    gradient: "from-violet-600 via-purple-500 to-fuchsia-400",
    icon: "🏆",
    title: "Roborock vs Dreame vs iRobot",
    subtitle: "So sánh chi tiết — đâu là lựa chọn tốt nhất cho bạn?",
    link: "/f/brand-forums",
  },
];

export function CarouselBanner({ banners }: CarouselBannerProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = banners.length > 0 ? banners : [];
  const useFallback = items.length === 0;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % (useFallback ? FALLBACK_BANNERS.length : items.length));
  }, [items.length, useFallback]);

  const prev = useCallback(() => {
    const len = useFallback ? FALLBACK_BANNERS.length : items.length;
    setCurrent((prev) => (prev - 1 + len) % len);
  }, [items.length, useFallback]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const displayItems = useFallback ? FALLBACK_BANNERS : items;

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {displayItems.map((item, i) => {
          if (useFallback && "gradient" in item) {
            return (
              <Link key={i} href={item.link} className="w-full flex-shrink-0">
                <div className={cn("bg-gradient-to-br p-8 md:p-14 text-white min-h-[240px] md:min-h-[300px] flex items-center", item.gradient)}>
                  <div className="max-w-2xl">
                    <span className="text-4xl md:text-5xl mb-4 block">{item.icon}</span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h2>
                    <p className="text-white/80 text-sm md:text-base">{item.subtitle}</p>
                    <span className="inline-block mt-4 bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                      Khám phá ngay →
                    </span>
                  </div>
                </div>
              </Link>
            );
          }
          // Real image banner
          if ("imageUrl" in item && item.imageUrl) {
            return (
              <div key={item.id} className="w-full flex-shrink-0">
                {item.linkUrl ? (
                  <Link href={item.linkUrl}>
                    <div className="aspect-[21/9] bg-muted flex items-center justify-center rounded-2xl overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                ) : (
                  <div className="aspect-[21/9] bg-muted flex items-center justify-center rounded-2xl overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30 transition-all flex items-center justify-center shadow-lg"
        aria-label="Previous"
      >
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30 transition-all flex items-center justify-center shadow-lg"
        aria-label="Next"
      >
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {displayItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === current ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
