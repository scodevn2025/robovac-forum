export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: UserStats) => boolean;
}

export interface UserStats {
  threadCount: number;
  postCount: number;
  likeCount: number;
  accountAgeDays: number;
}

export const BADGES: Badge[] = [
  {
    id: "first-post",
    name: "Bài viết đầu tiên",
    description: "Đã tạo bài viết đầu tiên",
    icon: "📝",
    condition: (s) => s.threadCount >= 1,
  },
  {
    id: "contributor",
    name: "Người đóng góp",
    description: "Đã có 50 bài viết + bình luận",
    icon: "⭐",
    condition: (s) => s.threadCount + s.postCount >= 50,
  },
  {
    id: "expert",
    name: "Chuyên gia",
    description: "Đã có 200 bài viết + bình luận",
    icon: "🏆",
    condition: (s) => s.threadCount + s.postCount >= 200,
  },
  {
    id: "popular",
    name: "Bài viết phổ biến",
    description: "Nhận được 100+ lượt thích",
    icon: "❤️",
    condition: (s) => s.likeCount >= 100,
  },
  {
    id: "veteran",
    name: "Thành viên kỳ cựu",
    description: "Thành viên đã tham gia 1 năm",
    icon: "🎖️",
    condition: (s) => s.accountAgeDays >= 365,
  },
  {
    id: "early-bird",
    name: "Người tiên phong",
    description: "Tham gia trong tháng đầu tiên",
    icon: "🥇",
    condition: (s) => s.accountAgeDays >= 30 && s.threadCount + s.postCount >= 5,
  },
  {
    id: "helper",
    name: "Người hay giúp đỡ",
    description: "Đã trả lời 100+ bình luận",
    icon: "🤝",
    condition: (s) => s.postCount >= 100,
  },
  {
    id: "influencer",
    name: "Người có sức ảnh hưởng",
    description: "Nhận được 500+ lượt thích",
    icon: "🌟",
    condition: (s) => s.likeCount >= 500,
  },
];

export function calculateReputation(stats: UserStats): number {
  let points = 0;
  points += stats.threadCount * 5; // 5 points per thread
  points += stats.postCount * 2; // 2 points per reply
  points += stats.likeCount * 1; // 1 point per like received
  return points;
}

export function getReputationLevel(points: number): { level: number; title: string } {
  if (points >= 5000) return { level: 10, title: "Huyền thoại" };
  if (points >= 2000) return { level: 8, title: "Chuyên gia" };
  if (points >= 1000) return { level: 6, title: "Kỳ cựu" };
  if (points >= 500) return { level: 4, title: "Đóng góp" };
  if (points >= 200) return { level: 3, title: "Tích cực" };
  if (points >= 50) return { level: 2, title: "Mới nổi" };
  return { level: 1, title: "Tân binh" };
}

export function getEarnedBadges(stats: UserStats): Badge[] {
  return BADGES.filter((badge) => badge.condition(stats));
}
