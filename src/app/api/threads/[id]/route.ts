import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  try {
    const thread = await prisma.thread.findUnique({ where: { id } });
    if (!thread) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const isMod = session.user.role === "ADMIN" || session.user.role === "MODERATOR";
    const isOwner = thread.authorId === session.user.id;

    // Lock/unlock - mod only
    if (body.locked !== undefined) {
      if (!isMod) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      const updated = await prisma.thread.update({
        where: { id },
        data: { status: body.locked ? "LOCKED" : "ACTIVE" },
      });
      return NextResponse.json(updated);
    }

    // Toggle sticky/digest - mod only
    if (body.sticky !== undefined || body.digest !== undefined) {
      if (!isMod) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      const updated = await prisma.thread.update({
        where: { id },
        data: {
          ...(body.sticky !== undefined ? { isSticky: body.sticky } : {}),
          ...(body.digest !== undefined ? { isDigest: body.digest } : {}),
        },
      });
      return NextResponse.json(updated);
    }

    // Edit content - owner or mod
    if (body.title || body.content) {
      if (!isOwner && !isMod) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      const updated = await prisma.thread.update({
        where: { id },
        data: {
          ...(body.title ? { title: body.title } : {}),
          ...(body.content ? { content: body.content } : {}),
          ...(body.excerpt !== undefined ? { excerpt: body.excerpt } : {}),
        },
      });
      return NextResponse.json(updated);
    }

    return NextResponse.json({ message: "No changes" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const thread = await prisma.thread.findUnique({ where: { id } });
    if (!thread) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const isMod = session.user.role === "ADMIN" || session.user.role === "MODERATOR";
    const isOwner = thread.authorId === session.user.id;
    if (!isOwner && !isMod) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    await prisma.thread.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
