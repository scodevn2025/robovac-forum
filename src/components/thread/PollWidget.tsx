"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollWidgetProps {
  pollId: string;
  question?: string;
  options: PollOption[];
  totalVotes: number;
  threadId: string;
  isExpired: boolean;
}

export function PollWidget({ pollId, question, options: initialOptions, totalVotes: initialTotal, threadId, isExpired }: PollWidgetProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [options, setOptions] = useState(initialOptions);
  const [totalVotes, setTotalVotes] = useState(initialTotal);
  const [selected, setSelected] = useState<string | null>(null);
  const [voting, setVoting] = useState(false);

  async function vote(optionId: string) {
    if (!session?.user) {
      alert("Vui lòng đăng nhập để bình chọn");
      return;
    }
    if (isExpired || selected) return;

    setVoting(true);
    // Optimistic update
    setSelected(optionId);
    setOptions((prev) => prev.map((o) => (o.id === optionId ? { ...o, votes: o.votes + 1 } : o)));
    setTotalVotes((c) => c + 1);

    try {
      await fetch(`/api/polls/${pollId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId }),
      });
      router.refresh();
    } catch {
      // Revert on error
      setSelected(null);
      setOptions(initialOptions);
      setTotalVotes(initialTotal);
    } finally {
      setVoting(false);
    }
  }

  const maxVotes = Math.max(...options.map((o) => o.votes), 1);

  return (
    <div className={cn("rounded-xl border p-5", isExpired && "opacity-70")}>
      <div className="flex items-center gap-2 mb-3">
        <svg className="size-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className="font-semibold text-sm">
          {question ?? "Bình chọn"} {isExpired && "(đã kết thúc)"}
        </span>
      </div>

      <div className="space-y-2">
        {options.map((opt) => {
          const pct = totalVotes > 0 ? Math.round((opt.votes / maxVotes) * 100) : 0;
          const votePct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;

          return (
            <button
              key={opt.id}
              onClick={() => vote(opt.id)}
              disabled={voting || !!selected || isExpired}
              className={cn(
                "w-full text-left rounded-lg border p-2.5 transition-all relative overflow-hidden",
                selected && opt.id === selected && "border-primary bg-primary/5",
                !selected && !isExpired && "hover:border-primary/50 hover:bg-muted/30 cursor-pointer",
                (selected || isExpired) && "cursor-default",
              )}
            >
              {(selected || isExpired) && (
                <div
                  className="absolute inset-0 bg-primary/10 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              )}
              <div className="relative flex items-center justify-between">
                <span className="text-sm font-medium">{opt.text}</span>
                {(selected || isExpired) && (
                  <span className="text-xs text-muted-foreground ml-2 shrink-0">
                    {opt.votes} phiếu ({votePct}%)
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        Tổng: {totalVotes} phiếu
        {isExpired && " • Đã kết thúc"}
      </p>
    </div>
  );
}
