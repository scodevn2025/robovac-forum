"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const REPORT_REASONS = [
  "Spam / Quảng cáo",
  "Nội dung không phù hợp",
  "Quấy rối / Công kích cá nhân",
  "Thông tin sai lệch",
  "Vi phạm bản quyền",
  "Khác",
];

interface ReportModalProps {
  targetId: string;
  targetType: "thread" | "post";
}

export function ReportModal({ targetId, targetType }: ReportModalProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [detail, setDetail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!session?.user) return null;

  async function submit() {
    if (!reason) return;
    setLoading(true);
    try {
      await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId, targetType, reason, detail }),
      });
      setSubmitted(true);
    } catch {} finally { setLoading(false); }
  }

  if (submitted) {
    return (
      <button className="text-xs text-muted-foreground hover:text-green-500 transition-colors">
        ✅ Đã gửi báo cáo
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-muted-foreground hover:text-destructive transition-colors"
        title="Báo cáo vi phạm"
      >
        🚩 Báo cáo
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setIsOpen(false)}>
          <div className="bg-card rounded-xl border shadow-xl w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold mb-4">Báo cáo {targetType === "thread" ? "bài viết" : "bình luận"}</h3>

            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium">Lý do</label>
              <div className="space-y-1">
                {REPORT_REASONS.map((r) => (
                  <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="reason"
                      value={r}
                      checked={reason === r}
                      onChange={(e) => setReason(e.target.value)}
                      className="text-primary"
                    />
                    {r}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium">Chi tiết (tùy chọn)</label>
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                rows={3}
                placeholder="Mô tả thêm về vi phạm..."
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Hủy</Button>
              <Button size="sm" onClick={submit} disabled={!reason || loading}>
                {loading ? "Đang gửi..." : "Gửi báo cáo"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
