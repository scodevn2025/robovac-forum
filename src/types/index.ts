import type { Role, GeoFlag, ThreadStatus } from "@/generated/prisma/client";

export type { Role, GeoFlag, ThreadStatus };

export interface ThreadWithRelations {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  categoryId: string;
  authorId: string;
  prefix: string | null;
  isSticky: boolean;
  isDigest: boolean;
  heatScore: number;
  viewCount: number;
  likeCount: number;
  favCount: number;
  replyCount: number;
  geoFlag: GeoFlag | null;
  featureImage: string | null;
  status: ThreadStatus;
  isPoll: boolean;
  isReward: boolean;
  modelTypeId: string | null;
  lastPostAt: Date | null;
  lastPostById: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    username: string;
    image: string | null;
    avatarUrl: string | null;
    geoFlag: GeoFlag;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  lastPoster?: {
    id: string;
    username: string;
  } | null;
}

export interface PostWithAuthor {
  id: string;
  content: string;
  threadId: string;
  authorId: string;
  parentId: string | null;
  likeCount: number;
  geoFlag: GeoFlag | null;
  floorNum: number | null;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    username: string;
    image: string | null;
    avatarUrl: string | null;
    geoFlag: GeoFlag;
    postCount: number;
    createdAt: Date;
  };
}
