import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);
  const category = searchParams.get("category");

  try {
    const where: Record<string, unknown> = { status: "ACTIVE" };
    if (category) {
      const cat = await prisma.category.findUnique({ where: { slug: category } });
      if (cat) where.categoryId = cat.id;
    }

    const [threads, total] = await Promise.all([
      prisma.thread.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true, title: true, excerpt: true, createdAt: true,
          viewCount: true, likeCount: true, replyCount: true,
          author: { select: { id: true, username: true } },
          category: { select: { id: true, name: true, slug: true } },
        },
      }),
      prisma.thread.count({ where }),
    ]);

    return NextResponse.json({
      data: threads,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
