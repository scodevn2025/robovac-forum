import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, type Locale, LOCALES } from "@/lib/i18n/config";

export async function getLocale(): Promise<Locale> {
  // Priority: cookie > Accept-Language header > default
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value;
  if (localeCookie && LOCALES.includes(localeCookie as Locale)) {
    return localeCookie as Locale;
  }

  // Try to detect from Accept-Language header
  const headersList = await headers();
  const acceptLang = headersList.get("accept-language");
  if (acceptLang) {
    const preferred = acceptLang.split(",")[0]?.split("-")[0];
    if (preferred === "vi") return "vi";
    if (preferred === "en") return "en";
  }

  return DEFAULT_LOCALE;
}
