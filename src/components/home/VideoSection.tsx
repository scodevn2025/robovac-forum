"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface VideoSectionProps {
  locale: string;
}

const VIDEOS = [
  {
    ytId: "8l6VH8P9Z5Y",
    title: "Roborock S8 MaxV Ultra Review Sau 6 Tháng",
    channel: "Vacuum Wars",
    views: "256K",
    duration: "18:24",
  },
  {
    ytId: "KjYx3Hq9W2M",
    title: "Dreame X40 Ultra — Đánh Giá Chi Tiết Từ A-Z",
    channel: "Jamie Andrews",
    views: "189K",
    duration: "22:15",
  },
  {
    ytId: "NpR7vL4F8T3",
    title: "Robot Hút Bụi 5 Triệu vs 30 Triệu: Khác Biệt Thế Nào?",
    channel: "Linus Tech Tips",
    views: "445K",
    duration: "14:50",
  },
  {
    ytId: "QmW5xY2zA6B",
    title: "Top 5 Robot Hút Bụi Tốt Nhất Cho Nhà Có Thú Cưng",
    channel: "Tech Spurt",
    views: "178K",
    duration: "12:38",
  },
  {
    ytId: "RtY8uI3oP1L",
    title: "Setup Robot Hút Bụi Cho Nhà 3 Tầng — Mẹo Hay",
    channel: "Smart Home Solver",
    views: "92K",
    duration: "8:55",
  },
  {
    ytId: "SwE2dR6fT9G",
    title: "Roborock Q Revo — Review Sau 1 Năm: Có Đáng Mua?",
    channel: "The Hook Up",
    views: "134K",
    duration: "16:42",
  },
];

export function VideoSection({ locale }: VideoSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isVi = locale === "vi";

  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  }

  return (
    <section className="mt-8">
      <div className="bg-card rounded-2xl border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-6 pt-5 md:pt-6 pb-2">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center">
                <svg className="size-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </span>
              {isVi ? "Video Review Robot Hút Bụi" : "Robot Vacuum Video Reviews"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 ml-10">
              {isVi ? "Review thực tế từ các kênh YouTube hàng đầu" : "Real reviews from top YouTube channels"}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-8 w-8 rounded-full border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-8 w-8 rounded-full border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto px-5 md:px-6 pb-6 pt-3 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {VIDEOS.map((video, i) => (
            <a
              key={i}
              href={`https://youtube.com/watch?v=${video.ytId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 w-[280px] md:w-[320px] snap-start"
            >
              {/* Thumbnail */}
              <div className="relative rounded-xl overflow-hidden aspect-video bg-muted mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                <img
                  src={`https://img.youtube.com/vi/${video.ytId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-black/60 flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 transition-all">
                    <svg className="size-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Duration badge */}
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                  {video.duration}
                </span>
              </div>

              {/* Info */}
              <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                {video.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {video.channel} · {video.views} lượt xem
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
