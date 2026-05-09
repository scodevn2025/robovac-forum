import { format, formatDistanceToNow, formatRelative, type Locale } from "date-fns";
import { enUS, de, fr, it } from "date-fns/locale";

const locales: Record<string, Locale> = {
  en: enUS,
  de,
  fr,
  it,
};

export function formatDate(date: Date | string, locale = "en") {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "yyyy-MM-dd", { locale: locales[locale] });
}

export function formatDateTime(date: Date | string, locale = "en") {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "PPpp", { locale: locales[locale] });
}

export function timeAgo(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function relativeDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatRelative(d, new Date());
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export function calculateHeatScore(params: {
  likeCount: number;
  replyCount: number;
  viewCount: number;
  favCount: number;
  createdAt: Date;
}): number {
  const { likeCount, replyCount, viewCount, favCount, createdAt } = params;
  const ageInHours =
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);

  const interactionScore =
    likeCount * 2 + replyCount * 5 + viewCount * 0.1 + favCount * 3;
  const timeDecay = Math.log(ageInHours + 2);

  return Math.round(interactionScore / timeDecay);
}
