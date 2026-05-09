import { prisma } from "@/lib/prisma";

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      image: true,
      avatarUrl: true,
      bio: true,
      role: true,
      geoFlag: true,
      postCount: true,
      threadCount: true,
      likeCount: true,
      createdAt: true,
    },
  });
}

export async function getUserThreads(userId: string, page = 1, limit = 20) {
  const [threads, total] = await Promise.all([
    prisma.thread.findMany({
      where: { authorId: userId, status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.thread.count({ where: { authorId: userId, status: "ACTIVE" } }),
  ]);

  return { threads, total, page, totalPages: Math.ceil(total / limit) };
}

export async function getUserPosts(userId: string, page = 1, limit = 20) {
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        thread: { select: { id: true, title: true } },
      },
    }),
    prisma.post.count({ where: { authorId: userId } }),
  ]);

  return { posts, total, page, totalPages: Math.ceil(total / limit) };
}
