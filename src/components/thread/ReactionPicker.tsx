"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const REACTIONS = [
  { type: "like", emoji: "👍", label: "Thích" },
  { type: "love", emoji: "❤️", label: "Yêu thích" },
  { type: "haha", emoji: "😂", label: "Haha" },
  { type: "wow", emoji: "😮", label: "Wow" },
  { type: "sad", emoji: "😢", label: "Buồn" },
  { type: "angry", emoji: "😡", label: "Phẫn nộ" },
] as const;

interface ReactionPickerProps {
  threadId: string;
  onReact?: (type: string) => void;
}

export function ReactionPicker({ threadId, onReact }: ReactionPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  function handleReaction(type: string) {
    setSelectedReaction(type);
    setIsOpen(false);
    onReact?.(type);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className={cn(
          "flex items-center gap-1 text-sm transition-colors px-2 py-1 rounded-full",
          selectedReaction ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted",
        )}
      >
        {selectedReaction ? (
          <span>{REACTIONS.find((r) => r.type === selectedReaction)?.emoji}</span>
        ) : (
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        )}
        <span>{selectedReaction ? REACTIONS.find((r) => r.type === selectedReaction)?.label : "Thích"}</span>
      </button>

      {/* Reaction popup */}
      {isOpen && (
        <div
          className="absolute bottom-full left-0 mb-2 bg-card rounded-xl border shadow-lg p-2 flex gap-1 z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          {REACTIONS.map((r) => (
            <button
              key={r.type}
              onClick={() => handleReaction(r.type)}
              className={cn(
                "text-xl p-1.5 rounded-lg hover:bg-muted transition-all hover:scale-125",
                selectedReaction === r.type && "bg-primary/10 scale-110",
              )}
              title={r.label}
            >
              {r.emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
