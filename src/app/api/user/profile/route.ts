import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { bio, signature, avatarUrl, geoFlag } = body;

    const data: Record<string, string> = {};
    if (bio !== undefined) data.bio = String(bio).slice(0, 500);
    if (signature !== undefined) data.signature = String(signature).slice(0, 250);
    if (avatarUrl !== undefined) data.avatarUrl = avatarUrl;
    if (geoFlag !== undefined) data.geoFlag = geoFlag;

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data,
      select: {
        id: true, username: true, email: true, image: true,
        avatarUrl: true, bio: true, role: true, geoFlag: true,
        postCount: true, threadCount: true, likeCount: true, createdAt: true,
      },
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
