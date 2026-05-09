"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Message {
  id: string;
  user: string;
  text: string;
  time: string;
}

export function ChatBox() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("chat_messages");
    if (stored) setMessages(JSON.parse(stored).slice(-50));
  }, []);

  // Listen for new messages from other tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "chat_messages" && e.newValue) {
        setMessages(JSON.parse(e.newValue).slice(-50));
        if (!isOpen) setUnread((c) => c + 1);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!input.trim() || !session?.user?.name) return;
    const msg: Message = {
      id: Date.now().toString(),
      user: session.user.name ?? "Anon",
      text: input.trim(),
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [...messages, msg];
    setMessages(updated);
    localStorage.setItem("chat_messages", JSON.stringify(updated.slice(-100)));
    setInput("");
    if (!isOpen) setUnread((c) => c + 1);
  }

  return (
    <>
      {/* Chat bubble — always visible */}
      <button
        onClick={() => { setIsOpen(!isOpen); setUnread(0); }}
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:scale-110 transition-all flex items-center justify-center animate-pulse"
        title="Chat chung"
      >
        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-destructive text-[10px] font-bold text-white flex items-center justify-center px-1">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] w-80 h-[420px] bg-card rounded-xl border shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-3 border-b bg-muted/30">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Chat chung
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{messages.length} tin nhắn</span>
              <button onClick={() => setIsOpen(false)} className="hover:text-foreground">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-muted/10">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto size-10 text-muted-foreground/30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm text-muted-foreground">Chưa có tin nhắn nào</p>
                <p className="text-xs text-muted-foreground mt-1">Hãy là người đầu tiên chat!</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`text-sm ${msg.user === (session?.user?.name ?? "") ? "text-right" : ""}`}>
                <span className="font-medium text-[11px] text-muted-foreground">{msg.user}</span>
                <div className={`inline-block max-w-[85%] rounded-2xl px-3 py-1.5 mt-0.5 ${
                  msg.user === (session?.user?.name ?? "")
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border rounded-bl-md"
                }`}>
                  {msg.text}
                </div>
                <span className="block text-[10px] text-muted-foreground mt-0.5">{msg.time}</span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="p-3 border-t bg-card">
            {session?.user ? (
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-1.5">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="h-9 text-sm rounded-full"
                  maxLength={500}
                />
                <Button type="submit" size="sm" className="h-9 px-3 rounded-full shrink-0">
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <Link href="/auth/login" className="text-xs text-primary hover:underline font-medium">
                  Đăng nhập
                </Link>
                <span className="text-xs text-muted-foreground"> để tham gia chat</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
