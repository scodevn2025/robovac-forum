import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { THREADS_PER_PAGE, POSTS_PER_PAGE } from "@/lib/constants";

export type ThreadFilters = {
  tab?: "featured" | "new" | "hot";
  categoryId?: string;
  page?: number;
  limit?: number;
  sort?: "default" | "dateline" | "replies" | "views" | "lastpost" | "heats";
  timeFilter?: "all" | "1d" | "1w" | "1m" | "3m";
  typeFilter?: "all" | "poll" | "reward";
  modelTag?: string;
};

export async function getThreads(filters: ThreadFilters = {}) {
  const {
    tab = "featured",
    categoryId,
    page = 1,
    limit = THREADS_PER_PAGE,
    sort = "lastpost",
    timeFilter = "all",
    typeFilter = "all",
    modelTag,
  } = filters;

  const where: Prisma.ThreadWhereInput = {
    status: "ACTIVE",
  };

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (modelTag) {
    where.modelTypeId = modelTag;
  }

  if (typeFilter === "poll") {
    where.isPoll = true;
  } else if (typeFilter === "reward") {
    where.isReward = true;
  }

  if (timeFilter !== "all") {
    const now = new Date();
    const timeMap: Record<string, Date> = {
      "1d": new Date(now.getTime() - 24 * 60 * 60 * 1000),
      "2d": new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      "1w": new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      "1m": new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      "3m": new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
    };
    if (timeMap[timeFilter]) {
      where.createdAt = { gte: timeMap[timeFilter] };
    }
  }

  const orderBy: Prisma.ThreadOrderByWithRelationInput[] = [];

  if (tab === "featured") {
    orderBy.push({ isSticky: "desc" }, { isDigest: "desc" }, { heatScore: "desc" });
  } else if (tab === "hot") {
    orderBy.push({ heatScore: "desc" }, { lastPostAt: "desc" });
  } else {
    orderBy.push({ createdAt: "desc" });
  }

  switch (sort) {
    case "dateline":
      orderBy.push({ createdAt: "desc" });
      break;
    case "replies":
      orderBy.push({ replyCount: "desc" });
      break;
    case "views":
      orderBy.push({ viewCount: "desc" });
      break;
    case "lastpost":
      orderBy.push({ lastPostAt: "desc" });
      break;
    case "heats":
      orderBy.push({ heatScore: "desc" });
      break;
  }

  const [threads, total] = await Promise.all([
    prisma.thread.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
            avatarUrl: true,
            geoFlag: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    }),
    prisma.thread.count({ where }),
  ]);

  return { threads, total, page, totalPages: Math.ceil(total / limit) };
}

export async function getThreadById(id: string) {
  return prisma.thread.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          image: true,
          avatarUrl: true,
          geoFlag: true,
          postCount: true,
          createdAt: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}

export async function getHotThreads(limit = 3) {
  return prisma.thread.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: {
      heatScore: "desc",
    },
    take: limit,
    select: {
      id: true,
      title: true,
      featureImage: true,
      heatScore: true,
    },
  });
}

export async function getThreadsByCategory(categoryId: string, page = 1, limit = THREADS_PER_PAGE) {
  return getThreads({ categoryId, page, limit, sort: "lastpost" });
}

export async function incrementViewCount(id: string) {
  return prisma.thread.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });
}

export async function getPostsByThreadId(threadId: string, page = 1, limit = POSTS_PER_PAGE, order: "asc" | "desc" = "asc") {
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { threadId },
      orderBy: { createdAt: order },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
            avatarUrl: true,
            geoFlag: true,
            postCount: true,
            createdAt: true,
          },
        },
      },
    }),
    prisma.post.count({ where: { threadId } }),
  ]);

  return { posts, total, page, totalPages: Math.ceil(total / limit) };
}
