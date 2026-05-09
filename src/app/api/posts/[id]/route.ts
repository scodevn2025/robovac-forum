import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const isMod = session.user.role === "ADMIN" || session.user.role === "MODERATOR";
    const isOwner = post.authorId === session.user.id;

    // Only owner can edit (within 30 min), mod can always edit
    if (!isOwner && !isMod) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    if (isOwner && !isMod) {
      const ageMinutes = (Date.now() - post.createdAt.getTime()) / 60000;
      if (ageMinutes > 30) {
        return NextResponse.json({ message: "Thời gian chỉnh sửa đã hết (30 phút)" }, { status: 403 });
      }
    }

    if (!body.content) return NextResponse.json({ message: "Content required" }, { status: 400 });

    const updated = await prisma.post.update({
      where: { id },
      data: { content: body.content, updatedAt: new Date() },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const isMod = session.user.role === "ADMIN" || session.user.role === "MODERATOR";
    const isOwner = post.authorId === session.user.id;
    if (!isOwner && !isMod) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
