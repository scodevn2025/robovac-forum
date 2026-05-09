import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { threadId, content } = body;

    if (!threadId || !content) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Count existing posts for floor number
    const count = await prisma.post.count({ where: { threadId } });

    const post = await prisma.post.create({
      data: {
        content,
        threadId,
        authorId: session.user.id,
        floorNum: count + 1,
      },
    });

    // Update thread reply count and last post
    await prisma.thread.update({
      where: { id: threadId },
      data: {
        replyCount: { increment: 1 },
        lastPostAt: new Date(),
        lastPostById: session.user.id,
      },
    });

    // Update user post count
    await prisma.user.update({
      where: { id: session.user.id },
      data: { postCount: { increment: 1 } },
    });

    // Update category post count
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      select: { categoryId: true, authorId: true },
    });

    if (thread) {
      await prisma.category.update({
        where: { id: thread.categoryId },
        data: { postCount: { increment: 1 } },
      });

      // Notify thread author
      if (thread.authorId !== session.user.id) {
        await prisma.notification.create({
          data: {
            userId: thread.authorId,
            actorId: session.user.id,
            type: "REPLY",
            threadId,
            postId: post.id,
          },
        });
      }
    }

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json({ message: "Failed to create post" }, { status: 500 });
  }
}
