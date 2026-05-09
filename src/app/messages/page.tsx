import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function MessagesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  // For demo, show message UI even without DB data
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tin nhắn</h1>

      <div className="bg-card rounded-xl border">
        <div className="p-8 text-center text-muted-foreground">
          <svg className="mx-auto size-12 mb-3 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-lg font-medium">Hệ thống tin nhắn riêng</p>
          <p className="text-sm mt-1">Chọn một người dùng từ trang hồ sơ để bắt đầu trò chuyện.</p>
          <p className="text-xs mt-4 text-muted-foreground">Tính năng đang được phát triển — sẽ sớm ra mắt!</p>
        </div>
      </div>
    </div>
  );
}
