import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ message: "No file" }, { status: 400 });

    // Validate type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ message: "Chỉ chấp nhận JPG, PNG, GIF, WebP" }, { status: 400 });
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ message: "File tối đa 5MB" }, { status: 400 });
    }

    // Convert to base64 for simplicity (in production use S3/Vercel Blob)
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({
      url: dataUrl,
      name: file.name,
      size: file.size,
      type: file.type,
    });
  } catch {
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
