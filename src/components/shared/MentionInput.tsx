"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MentionInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

// Simulated user list for @mention autocomplete
const MOCK_USERS = [
  { username: "admin", avatar: "A" },
  { username: "vac_fan", avatar: "V" },
  { username: "roboter_de", avatar: "R" },
  { username: "aspirapolvere_it", avatar: "A" },
];

export function MentionInput({ value, onChange, placeholder, rows = 4, className }: MentionInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredUsers = MOCK_USERS.filter((u) =>
    u.username.toLowerCase().includes(mentionQuery.toLowerCase()),
  );

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = e.target.value;
    onChange(newValue);

    // Check for @mention trigger
    const cursorPos = e.target.selectionStart ?? 0;
    const textBeforeCursor = newValue.slice(0, cursorPos);
    const atMatch = textBeforeCursor.match(/@(\w*)$/);

    if (atMatch) {
      setMentionQuery(atMatch[1]);
      setShowSuggestions(true);
      setSelectedIndex(0);
    } else {
      setShowSuggestions(false);
    }
  }

  function insertMention(username: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = value.slice(0, cursorPos);
    const textAfterCursor = value.slice(cursorPos);
    const atPos = textBeforeCursor.lastIndexOf("@");

    const newValue = textBeforeCursor.slice(0, atPos) + `@${username} ` + textAfterCursor;
    onChange(newValue);
    setShowSuggestions(false);

    // Refocus and move cursor after mention
    setTimeout(() => {
      textarea.focus();
      const newPos = atPos + username.length + 2;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || filteredUsers.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % filteredUsers.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filteredUsers.length) % filteredUsers.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      insertMention(filteredUsers[selectedIndex].username);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />

      {/* Mention suggestions */}
      {showSuggestions && filteredUsers.length > 0 && (
        <div className="absolute bottom-full left-0 mb-1 w-56 bg-card rounded-lg border shadow-lg z-50 overflow-hidden">
          {filteredUsers.map((user, i) => (
            <button
              key={user.username}
              type="button"
              onClick={() => insertMention(user.username)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted transition-colors",
                i === selectedIndex && "bg-muted",
              )}
            >
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {user.avatar}
              </div>
              <span>@{user.username}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
