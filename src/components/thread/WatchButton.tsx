"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

interface WatchButtonProps {
  threadId: string;
  initialWatching?: boolean;
}

export function WatchButton({ threadId, initialWatching = false }: WatchButtonProps) {
  const { data: session } = useSession();
  const [watching, setWatching] = useState(initialWatching);
  const [loading, setLoading] = useState(false);

  if (!session?.user) return null;

  async function toggle() {
    setLoading(true);
    // Optimistic update
    setWatching(!watching);

    try {
      await fetch("/api/threads/watch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, watch: !watching }),
      });
    } catch {
      // Revert
      setWatching(watching);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={cn(
        "flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors",
        watching
          ? "bg-primary/10 border-primary/30 text-primary"
          : "text-muted-foreground hover:text-foreground hover:border-primary/30",
      )}
    >
      <svg className="size-3.5" fill={watching ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      {watching ? "Đang theo dõi" : "Theo dõi"}
    </button>
  );
}
