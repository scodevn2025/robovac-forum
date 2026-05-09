"use client";

import { useState, useRef } from "react";

interface VideoSectionProps {
  locale: string;
}

// Local MP4 videos from ERP
const LOCAL_VIDEOS = [
  {
    src: "/videos/mova-mobius-60.mp4",
    poster: "/banners/slide-mova.jpg",
    title: "MOVA MOBIUS 60 — Robot hút bụi thông minh",
    desc: "Công nghệ LiDAR + AI — làm sạch mọi ngóc ngách",
  },
  {
    src: "/videos/mova-z60-roller.mp4",
    poster: "/banners/slide-roborock.jpg",
    title: "MOVA Z60 Roller — Chổi roller cải tiến",
    desc: "Công nghệ chổi roller — sạch gấp đôi, bền gấp 3",
  },
];

export function VideoSection({ locale }: VideoSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState<number | null>(null);
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
    el.scrollBy({ left: dir === "left" ? -el.clientWidth * 0.8 : el.clientWidth * 0.8, behavior: "smooth" });
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

        {/* Video grid */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto px-5 md:px-6 pb-6 pt-3 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {LOCAL_VIDEOS.map((video, i) => (
            <div key={i} className="flex-shrink-0 w-[300px] md:w-[360px] snap-start">
              <div className="relative rounded-xl overflow-hidden bg-black shadow-md group">
                {playing === i ? (
                  <video
                    autoPlay
                    controls
                    className="w-full h-[200px] md:h-[250px] object-cover"
                    poster={video.poster}
                    onEnded={() => setPlaying(null)}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                ) : (
                  <div className="relative h-[200px] md:h-[250px] cursor-pointer" onClick={() => setPlaying(i)}>
                    <img
                      src={video.poster}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                      <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-red-500 group-hover:scale-110 transition-all shadow-xl">
                        <svg className="size-8 text-black group-hover:text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Duration badge */}
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-medium">
                      ▶ Video
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-sm font-semibold mt-2">{video.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{video.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
