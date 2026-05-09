"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  // Load recent messages
  useEffect(() => {
    const stored = localStorage.getItem("chat_messages");
    if (stored) setMessages(JSON.parse(stored).slice(-50));
  }, []);

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

  if (!session?.user) return null;

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setUnread(0); }}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center"
      >
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-[10px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 h-96 bg-card rounded-xl border shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-semibold text-sm">Chat chung</h3>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.length === 0 && (
              <p className="text-center text-xs text-muted-foreground py-8">Chưa có tin nhắn. Bắt đầu chat!</p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`text-sm ${msg.user === session.user?.name ? "text-right" : ""}`}>
                <span className="font-medium text-xs text-muted-foreground">{msg.user}</span>
                <div className={`inline-block max-w-[85%] rounded-lg px-2.5 py-1 mt-0.5 ${
                  msg.user === session.user?.name ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                  {msg.text}
                </div>
                <span className="block text-[10px] text-muted-foreground mt-0.5">{msg.time}</span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="flex gap-1.5 p-3 border-t"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="h-8 text-sm"
              maxLength={500}
            />
            <Button type="submit" size="sm" className="h-8 text-xs shrink-0">Gửi</Button>
          </form>
        </div>
      )}
    </>
  );
}
