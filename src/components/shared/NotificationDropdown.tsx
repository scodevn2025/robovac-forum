"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: string;
  content: string | null;
  threadId: string | null;
  isRead: boolean;
  createdAt: string;
  actor?: { username: string } | null;
}

export function NotificationDropdown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session?.user) return;
    // Poll for notifications every 30s
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function fetchNotifications() {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifs(data.notifications ?? []);
        setUnread(data.unread ?? 0);
      }
    } catch {}
  }

  async function markRead(id?: string) {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id ? { id } : { all: true }),
      });
      fetchNotifications();
    } catch {}
  }

  if (!session?.user) return null;

  const typeIcons: Record<string, string> = {
    LIKE: "❤️", REPLY: "💬", MENTION: "@", SYSTEM: "📢", DIGEST: "⭐", STICKY: "📌",
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
      >
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] rounded-full bg-destructive text-[10px] font-bold text-white flex items-center justify-center px-1">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-card rounded-xl border shadow-xl z-50 max-h-96 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-semibold text-sm">Thông báo</h3>
            {unread > 0 && (
              <button onClick={() => markRead()} className="text-xs text-primary hover:underline">
                Đánh dấu đã đọc
              </button>
            )}
          </div>

          <div className="overflow-y-auto flex-1">
            {notifs.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">Chưa có thông báo</p>
            ) : (
              notifs.slice(0, 20).map((n) => (
                <Link
                  key={n.id}
                  href={n.threadId ? `/t/${n.threadId}` : "#"}
                  onClick={() => { markRead(n.id); setIsOpen(false); }}
                  className={cn(
                    "flex items-start gap-3 px-3 py-2.5 border-b last:border-0 hover:bg-muted/50 transition-colors",
                    !n.isRead && "bg-primary/5",
                  )}
                >
                  <span className="text-lg shrink-0">{typeIcons[n.type] ?? "📌"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm line-clamp-2">
                      {n.actor && <span className="font-medium">{n.actor.username}</span>}
                      {n.content && <span className="text-muted-foreground"> {n.content}</span>}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(n.createdAt).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" })}
                    </p>
                  </div>
                  {!n.isRead && <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
