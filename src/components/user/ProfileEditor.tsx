"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/editor/ImageUploader";

interface ProfileEditorProps {
  user: {
    id: string;
    username: string;
    bio: string | null;
    avatarUrl: string | null;
    geoFlag: string | null;
  };
}

export function ProfileEditor({ user }: ProfileEditorProps) {
  const router = useRouter();
  const [bio, setBio] = useState(user.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl ?? "");
  const [geoFlag, setGeoFlag] = useState(user.geoFlag ?? "GLOBAL");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio, avatarUrl, geoFlag }),
      });

      if (res.ok) {
        setMessage("✅ Đã lưu thay đổi!");
        router.refresh();
      } else {
        const data = await res.json();
        setMessage(`❌ ${data.message}`);
      }
    } catch {
      setMessage("❌ Lỗi kết nối");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">Chỉnh sửa hồ sơ</h2>

      {message && (
        <div className={`rounded-md p-3 text-sm ${message.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-destructive/10 text-destructive"}`}>
          {message}
        </div>
      )}

      {/* Avatar */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Ảnh đại diện</label>
        {avatarUrl && (
          <div className="mb-2">
            <img src={avatarUrl} alt="Avatar" className="h-20 w-20 rounded-full object-cover border-2 border-border" />
          </div>
        )}
        <ImageUploader
          onImageUploaded={(url) => setAvatarUrl(url)}
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Giới thiệu ({bio.length}/500)</label>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Viết vài dòng giới thiệu về bạn..."
          rows={3}
          maxLength={500}
        />
      </div>

      {/* Region */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Khu vực</label>
        <select
          value={geoFlag}
          onChange={(e) => setGeoFlag(e.target.value)}
          className="flex h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 py-1 text-sm"
        >
          <option value="GLOBAL">🌍 Toàn cầu</option>
          <option value="GB">🇬🇧 United Kingdom</option>
          <option value="DE">🇩🇪 Deutschland</option>
          <option value="FR">🇫🇷 France</option>
          <option value="IT">🇮🇹 Italia</option>
        </select>
      </div>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </div>
    </div>
  );
}
