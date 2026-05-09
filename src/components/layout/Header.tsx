"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

interface HeaderProps {
  locale: string;
  navLabels: Record<string, string>;
  commonLabels: Record<string, string>;
}

export function Header({ locale, navLabels, commonLabels }: HeaderProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = (k: string) => (commonLabels as Record<string, string>)[k] ?? k;
  const tn = (k: string) => (navLabels as Record<string, string>)[k] ?? k;

  const NAV_ITEMS = [
    { label: tn("reviews"), href: "/f/reviews" },
    { label: tn("discussion"), href: "/f/discussion" },
    { label: tn("troubleshooting"), href: "/f/troubleshooting" },
    { label: tn("brandForums"), href: "/f/brand-forums" },
    { label: tn("deals"), href: "/f/deals" },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 md:px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0" onClick={() => setMobileOpen(false)}>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <span className="hidden sm:inline">RoboVac<span className="text-primary">Forum</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <LanguageSwitcher currentLocale={locale as "vi" | "en"} />

          {user ? (
            <>
              <Link href="/post/new" className="hidden sm:inline">
                <Button variant="default" size="sm" className="h-8 text-xs">
                  <svg className="size-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {t("postNow")}
                </Button>
              </Link>
              <Link href={`/u/${user.id}`}>
                <Avatar className="h-8 w-8 ring-2 ring-muted">
                  <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <button onClick={() => signOut({ redirectTo: "/" })} className="hidden sm:block text-xs text-muted-foreground hover:text-foreground">
                {t("signOut")}
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hidden sm:inline">
                <Button variant="ghost" size="sm" className="h-8 text-xs">{t("login")}</Button>
              </Link>
              <Link href="/auth/register" className="hidden sm:inline">
                <Button variant="default" size="sm" className="h-8 text-xs">{t("register")}</Button>
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-md hover:bg-muted transition-colors"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-card">
          <nav className="px-3 py-2 space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2" />
            {user ? (
              <>
                <Link href="/post/new" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-primary rounded-lg hover:bg-muted">
                  ✏️ {t("postNow")}
                </Link>
                <button onClick={() => { signOut({ redirectTo: "/" }); setMobileOpen(false); }} className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-muted text-muted-foreground">
                  {t("signOut")}
                </button>
              </>
            ) : (
              <div className="flex gap-2 px-3 pt-1">
                <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full h-9 text-sm">{t("login")}</Button>
                </Link>
                <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="default" size="sm" className="w-full h-9 text-sm">{t("register")}</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
