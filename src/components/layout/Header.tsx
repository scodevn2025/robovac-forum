import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

interface HeaderProps {
  locale: Locale;
}

export async function Header({ locale }: HeaderProps) {
  const session = await auth();
  const user = session?.user;
  const dict = await getDictionary(locale);
  const t = (key: string) => dict.common?.[key] ?? key;
  const tn = (key: string) => dict.nav?.[key] ?? key;

  const NAV_ITEMS = [
    { label: tn("reviews"), href: "/f/reviews" },
    { label: tn("discussion"), href: "/f/discussion" },
    { label: tn("troubleshooting"), href: "/f/troubleshooting" },
    { label: tn("brandForums"), href: "/f/brand-forums" },
    { label: tn("deals"), href: "/f/deals" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg shrink-0">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <span className="hidden lg:inline text-foreground">
            RoboVac<span className="text-primary">Forum</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher currentLocale={locale} />

          {user ? (
            <>
              <Link href="/post/new">
                <Button variant="default" size="sm" className="h-8 text-xs">
                  <svg className="size-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {t("postNow")}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full cursor-pointer hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8 ring-2 ring-muted">
                    <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
                    <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                      {user.name?.charAt(0).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 mt-1">
                  <DropdownMenuLabel className="text-xs text-muted-foreground">{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/u/${user.id}`} className="w-full text-sm">{t("profile")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/post/new" className="w-full text-sm">{t("createThread")}</Link>
                  </DropdownMenuItem>
                  {user.role === "ADMIN" && (
                    <DropdownMenuItem>
                      <Link href="/admin" className="w-full text-sm">{t("adminPanel")}</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
                    <DropdownMenuItem>
                      <button type="submit" className="w-full text-left text-sm cursor-pointer">
                        {t("signOut")}
                      </button>
                    </DropdownMenuItem>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="h-8 text-xs">{t("login")}</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="default" size="sm" className="h-8 text-xs">{t("register")}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
