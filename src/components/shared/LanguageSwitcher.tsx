"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { localeNames, localeFlags } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();

  function switchLocale(locale: Locale) {
    document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1">
      {(["vi", "en"] as Locale[]).map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={cn(
            "px-2 py-1 text-xs rounded transition-colors",
            currentLocale === locale
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          title={localeNames[locale]}
        >
          {localeFlags[locale]} {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
