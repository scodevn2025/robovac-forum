import type { Locale } from "@/lib/i18n/config";

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  vi: () => import("@/lib/i18n/dictionaries/vi.json").then((m) => m.default),
  en: () => import("@/lib/i18n/dictionaries/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  const dict = await dictionaries[locale]();
  return dict as unknown as Record<string, Record<string, string>>;
}

export function getT(
  dict: Record<string, Record<string, string>>,
  section: string,
  key: string
): string {
  return dict[section]?.[key] ?? `${section}.${key}`;
}
