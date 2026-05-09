import { PrismaClient, Role, GeoFlag } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding RoboVac Forum database...");

  // Create admin user
  const adminHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@robovac-forum.com" },
    update: {},
    create: {
      username: "admin",
      email: "admin@robovac-forum.com",
      passwordHash: adminHash,
      role: Role.ADMIN,
      geoFlag: GeoFlag.GLOBAL,
      bio: "RoboVac Forum Administrator",
    },
  });

  const userHash = await bcrypt.hash("password123", 10);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@robovac-forum.com" },
    update: {},
    create: {
      username: "vac_fan",
      email: "demo@robovac-forum.com",
      passwordHash: userHash,
      role: Role.USER,
      geoFlag: GeoFlag.GB,
      bio: "Robot vacuum enthusiast. Currently owning 3 bots!",
    },
  });

  const germanUser = await prisma.user.upsert({
    where: { email: "german@robovac-forum.com" },
    update: {},
    create: {
      username: "roboter_de",
      email: "german@robovac-forum.com",
      passwordHash: userHash,
      role: Role.USER,
      geoFlag: GeoFlag.DE,
      bio: "Tech reviewer from Berlin",
    },
  });

  const italianUser = await prisma.user.upsert({
    where: { email: "italian@robovac-forum.com" },
    update: {},
    create: {
      username: "aspirapolvere_it",
      email: "italian@robovac-forum.com",
      passwordHash: userHash,
      role: Role.MODERATOR,
      geoFlag: GeoFlag.IT,
      bio: "Robot vacuum modding expert",
    },
  });

  // Categories
  const reviews = await prisma.category.upsert({
    where: { slug: "reviews" },
    update: {},
    create: {
      name: "Reviews",
      slug: "reviews",
      description: "In-depth reviews of robot vacuums from all brands",
      sortOrder: 1,
      icon: "star",
    },
  });

  const discussion = await prisma.category.upsert({
    where: { slug: "discussion" },
    update: {},
    create: {
      name: "Discussion",
      slug: "discussion",
      description: "General discussion about robot vacuums",
      sortOrder: 2,
      icon: "message-circle",
    },
  });

  const troubleshooting = await prisma.category.upsert({
    where: { slug: "troubleshooting" },
    update: {},
    create: {
      name: "Troubleshooting",
      slug: "troubleshooting",
      description: "Get help with your robot vacuum issues",
      sortOrder: 3,
      icon: "wrench",
    },
  });

  const deals = await prisma.category.upsert({
    where: { slug: "deals" },
    update: {},
    create: {
      name: "Deals & Discounts",
      slug: "deals",
      description: "Share and find the best deals on robot vacuums",
      sortOrder: 4,
      icon: "tag",
    },
  });

  const guides = await prisma.category.upsert({
    where: { slug: "guides" },
    update: {},
    create: {
      name: "Guides & How-To",
      slug: "guides",
      description: "Setup guides, maintenance tutorials, and optimization tips",
      sortOrder: 5,
      icon: "book-open",
    },
  });

  const showcase = await prisma.category.upsert({
    where: { slug: "showcase" },
    update: {},
    create: {
      name: "Showcase",
      slug: "showcase",
      description: "Show off your setup and results",
      sortOrder: 6,
      icon: "camera",
    },
  });

  const news = await prisma.category.upsert({
    where: { slug: "news" },
    update: {},
    create: {
      name: "News & Rumors",
      slug: "news",
      description: "Latest news and product announcements",
      sortOrder: 7,
      icon: "newspaper",
    },
  });

  const brandForums = await prisma.category.upsert({
    where: { slug: "brand-forums" },
    update: {},
    create: {
      name: "Brand Forums",
      slug: "brand-forums",
      description: "Brand-specific discussions",
      sortOrder: 8,
      icon: "building",
    },
  });

  // Brand sub-forums
  const roborockForum = await prisma.category.upsert({
    where: { slug: "roborock" },
    update: {},
    create: {
      name: "Roborock",
      slug: "roborock",
      description: "Roborock robot vacuum discussions",
      parentId: brandForums.id,
      sortOrder: 1,
      modelTags: ["S8 MaxV Ultra", "S8 Pro Ultra", "Q Revo", "Q8 Max", "Q5 Pro", "S7 MaxV"],
    },
  });

  const dreameForum = await prisma.category.upsert({
    where: { slug: "dreame" },
    update: {},
    create: {
      name: "Dreame",
      slug: "dreame",
      description: "Dreame robot vacuum discussions",
      parentId: brandForums.id,
      sortOrder: 2,
      modelTags: ["X40 Ultra", "L20 Ultra", "L10s Ultra", "D10s Pro", "F9 Pro"],
    },
  });

  const irobotForum = await prisma.category.upsert({
    where: { slug: "irobot" },
    update: {},
    create: {
      name: "iRobot / Roomba",
      slug: "irobot",
      description: "iRobot Roomba discussions",
      parentId: brandForums.id,
      sortOrder: 3,
      modelTags: ["Roomba j9+", "Roomba Combo j7+", "Roomba s9+", "Roomba i5+", "Roomba 694"],
    },
  });

  const ecovacsForum = await prisma.category.upsert({
    where: { slug: "ecovacs" },
    update: {},
    create: {
      name: "Ecovacs / Deebot",
      slug: "ecovacs",
      description: "Ecovacs Deebot discussions",
      parentId: brandForums.id,
      sortOrder: 4,
      modelTags: ["Deebot X2 Omni", "Deebot T30 Omni", "Deebot N20 Pro", "Deebot T20"],
    },
  });

  // Sample threads
  const thread1 = await prisma.thread.create({
    data: {
      title: "Roborock S8 MaxV Ultra vs Dreame X40 Ultra — Which is the King of 2025?",
      content: JSON.stringify({
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: "After testing both flagships for 2 weeks each, here's my detailed comparison. The Roborock S8 MaxV Ultra excels in obstacle avoidance, while the Dreame X40 Ultra has better mopping with its dual spinning mops." }] },
        ],
      }),
      excerpt: "After testing both flagships for 2 weeks each, here's my detailed comparison.",
      categoryId: reviews.id,
      authorId: germanUser.id,
      prefix: "Comparison",
      isDigest: true,
      heatScore: 98,
      viewCount: 3200,
      likeCount: 87,
      favCount: 34,
      replyCount: 56,
      geoFlag: GeoFlag.DE,
      lastPostAt: new Date(),
      lastPostById: admin.id,
    },
  });

  const thread2 = await prisma.thread.create({
    data: {
      title: "Roomba j9+ Review: Is iRobot Still Relevant in 2026?",
      content: JSON.stringify({
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: "iRobot's latest flagship faces fierce competition. The j9+ brings PrecisionVision navigation and a retractable mop — but is it enough? Here's the honest truth." }] },
        ],
      }),
      excerpt: "iRobot's latest flagship faces fierce competition. Is the j9+ worth it?",
      categoryId: reviews.id,
      authorId: demoUser.id,
      prefix: "Review",
      heatScore: 72,
      viewCount: 1850,
      likeCount: 34,
      favCount: 12,
      replyCount: 28,
      geoFlag: GeoFlag.GB,
      lastPostAt: new Date(Date.now() - 3600000),
      lastPostById: italianUser.id,
    },
  });

  const thread3 = await prisma.thread.create({
    data: {
      title: "HELP: Deebot X2 Omni Error 105 — LiDAR Sensor Not Spinning",
      content: JSON.stringify({
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: "My 8-month-old Deebot X2 Omni suddenly started showing Error 105. The LiDAR turret isn't spinning at all. Anyone else experienced this?" }] },
        ],
      }),
      excerpt: "My 8-month-old Deebot X2 Omni suddenly started showing Error 105.",
      categoryId: troubleshooting.id,
      authorId: italianUser.id,
      prefix: "Troubleshooting",
      heatScore: 55,
      viewCount: 420,
      likeCount: 8,
      favCount: 5,
      replyCount: 12,
      geoFlag: GeoFlag.IT,
      lastPostAt: new Date(Date.now() - 7200000),
      lastPostById: germanUser.id,
    },
  });

  const thread4 = await prisma.thread.create({
    data: {
      title: "Best Robot Vacuum Deals — Amazon Spring Sale 2026 Megathread",
      content: JSON.stringify({
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: "Amazon Spring Sale is live! Roborock Q Revo at $699, Dreame L10s Ultra at $549, Roomba Combo j7+ at $599!" }] },
        ],
      }),
      excerpt: "Amazon Spring Sale is live! Post the best robot vacuum deals you find here.",
      categoryId: deals.id,
      authorId: demoUser.id,
      prefix: "Deal Alert",
      isSticky: true,
      heatScore: 91,
      viewCount: 4800,
      likeCount: 65,
      favCount: 42,
      replyCount: 89,
      geoFlag: GeoFlag.GLOBAL,
      lastPostAt: new Date(Date.now() - 900000),
      lastPostById: admin.id,
    },
  });

  // Sample replies
  await prisma.post.createMany({
    data: [
      {
        content: JSON.stringify({ type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Great comparison! The X40 Ultra's edge mopping is significantly better. For pure cleaning performance, Dreame wins." }] }] }),
        threadId: thread1.id,
        authorId: italianUser.id,
        geoFlag: GeoFlag.IT,
        floorNum: 1,
      },
      {
        content: JSON.stringify({ type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Don't forget the self-cleaning dock — X40 Ultra uses hot water (60°C) versus cold water on the S8 MaxV. Big difference for kitchens." }] }] }),
        threadId: thread1.id,
        authorId: demoUser.id,
        geoFlag: GeoFlag.GB,
        floorNum: 2,
      },
      {
        content: JSON.stringify({ type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "I fixed this same issue! Remove the top cover (4 screws) and check the LiDAR belt. Mine had slipped off the pulley. Works perfectly now." }] }] }),
        threadId: thread3.id,
        authorId: germanUser.id,
        geoFlag: GeoFlag.DE,
        floorNum: 1,
      },
    ],
  });

  // Banners
  await prisma.banner.createMany({
    data: [
      { title: "Roborock vs Dreame Comparison", imageUrl: "/banners/comparison-banner.jpg", linkUrl: `/t/${thread1.id}`, sortOrder: 0, isActive: true },
      { title: "Amazon Spring Sale Deals", imageUrl: "/banners/deals-banner.jpg", linkUrl: `/t/${thread4.id}`, sortOrder: 1, isActive: true },
      { title: "Beginner's Guide", imageUrl: "/banners/guide-banner.jpg", linkUrl: "/f/guides", sortOrder: 2, isActive: true },
      { title: "Join the Community", imageUrl: "/banners/community-banner.jpg", linkUrl: "/f/discussion", sortOrder: 3, isActive: true },
    ],
  });

  console.log("RoboVac Forum seed completed successfully!");
  console.log("Admin: admin@robovac-forum.com / admin123");
  console.log("Demo:  demo@robovac-forum.com / password123");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
