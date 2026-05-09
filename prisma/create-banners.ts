import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  await prisma.banner.deleteMany({});

  const banners = [
    { title: "Roborock S8 MaxV Ultra", imageUrl: "/banners/slide-roborock.jpg", linkUrl: "/f/roborock", sortOrder: 0 },
    { title: "Dreame X40 Ultra", imageUrl: "/banners/slide-dreame.png", linkUrl: "/f/dreame", sortOrder: 1 },
    { title: "MOVA V50 Ultra", imageUrl: "/banners/slide-mova.jpg", linkUrl: "/f/brand-forums", sortOrder: 2 },
    { title: "Khuyến mãi tháng 5", imageUrl: "/banners/slide-sale.png", linkUrl: "/f/deals", sortOrder: 3 },
  ];

  for (const b of banners) {
    await prisma.banner.create({ data: { ...b, isActive: true } });
    console.log("✓", b.title);
  }
  console.log("\nDone! 4 real banners created with product images.");
  await prisma.$disconnect();
}
main();
