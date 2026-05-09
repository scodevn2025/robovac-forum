import { prisma } from "@/lib/prisma";

export async function getActiveBanners() {
  return prisma.banner.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: 4,
  });
}
