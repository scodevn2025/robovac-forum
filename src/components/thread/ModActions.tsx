"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ModActionsProps {
  threadId: string;
  isSticky: boolean;
  isDigest: boolean;
  isLocked: boolean;
  userRole?: string;
}

export function ModActions({ threadId, isSticky, isDigest, isLocked, userRole }: ModActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  if (!userRole || (userRole !== "ADMIN" && userRole !== "MODERATOR")) return null;

  async function action(type: string, value: boolean) {
    setLoading(type);
    try {
      const body: Record<string, boolean> = {};
      if (type === "sticky") body.sticky = value;
      if (type === "digest") body.digest = value;
      if (type === "lock") body.locked = value;

      await fetch(`/api/threads/${threadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      <Button
        size="sm" variant="outline"
        className="h-7 text-xs"
        disabled={!!loading}
        onClick={() => action("sticky", !isSticky)}
      >
        {loading === "sticky" ? "..." : isSticky ? "Bỏ ghim" : "Ghim"}
      </Button>
      <Button
        size="sm" variant="outline"
        className="h-7 text-xs"
        disabled={!!loading}
        onClick={() => action("digest", !isDigest)}
      >
        {loading === "digest" ? "..." : isDigest ? "Bỏ tiêu điểm" : "Tiêu điểm"}
      </Button>
      <Button
        size="sm" variant={isLocked ? "destructive" : "outline"}
        className="h-7 text-xs"
        disabled={!!loading}
        onClick={() => action("lock", !isLocked)}
      >
        {loading === "lock" ? "..." : isLocked ? "Mở khóa" : "Khóa"}
      </Button>
    </div>
  );
}
