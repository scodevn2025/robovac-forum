import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { threadSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = threadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { title, content, categoryId, prefix, geoFlag } = parsed.data;

    const thread = await prisma.thread.create({
      data: {
        title,
        content,
        excerpt: content.length > 200 ? content.slice(0, 200) + "..." : content,
        categoryId,
        authorId: session.user.id,
        prefix,
        geoFlag: geoFlag ?? "GLOBAL",
        lastPostAt: new Date(),
        lastPostById: session.user.id,
      },
    });

    // Update category counts
    await prisma.category.update({
      where: { id: categoryId },
      data: {
        threadCount: { increment: 1 },
        postCount: { increment: 1 },
      },
    });

    // Update user thread count
    await prisma.user.update({
      where: { id: session.user.id },
      data: { threadCount: { increment: 1 } },
    });

    return NextResponse.json(thread, { status: 201 });
  } catch (error) {
    console.error("Create thread error:", error);
    return NextResponse.json(
      { message: "Failed to create thread" },
      { status: 500 }
    );
  }
}
