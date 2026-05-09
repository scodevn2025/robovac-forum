"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageUploaded: (url: string, name: string) => void;
}

export function ImageUploader({ onImageUploaded }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File tối đa 5MB");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        onImageUploaded(data.url, data.name);
        setPreview(data.url);
        setTimeout(() => setPreview(null), 2000);
      } else {
        const err = await res.json();
        alert(err.message ?? "Upload failed");
      }
    } catch {
      alert("Lỗi kết nối");
    } finally {
      setUploading(false);
      setIsDragOver(false);
    }
  }, [onImageUploaded]);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handlePaste(e: React.ClipboardEvent) {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) handleFile(file);
        break;
      }
    }
  }

  return (
    <div className="space-y-2" onPaste={handlePaste}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
          isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        {uploading ? (
          <p className="text-sm text-muted-foreground">Đang tải lên...</p>
        ) : (
          <>
            <svg className="mx-auto size-8 text-muted-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium">Kéo thả ảnh vào đây hoặc click để chọn</p>
            <p className="text-xs text-muted-foreground mt-1">JPG, PNG, GIF, WebP — tối đa 5MB. Có thể Ctrl+V dán ảnh.</p>
          </>
        )}
      </div>

      {preview && (
        <div className="relative rounded-lg overflow-hidden border">
          <img src={preview} alt="Preview" className="max-h-48 mx-auto" />
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
            ✓ Đã tải lên
          </div>
        </div>
      )}
    </div>
  );
}
