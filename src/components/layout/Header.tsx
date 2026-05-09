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
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
          <img src="/logo.svg" alt="RoboVac Forum" className="h-8 w-auto" />
          <span className="hidden lg:inline text-primary">RoboVac Forum</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
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
                <Button variant="default" size="sm">{t("postNow")}</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full cursor-pointer hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
                    <AvatarFallback>
                      {user.name?.charAt(0).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/u/${user.id}`} className="w-full">{t("profile")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/post/new" className="w-full">{t("createThread")}</Link>
                  </DropdownMenuItem>
                  {user.role === "ADMIN" && (
                    <DropdownMenuItem>
                      <Link href="/admin" className="w-full">{t("adminPanel")}</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
                    <DropdownMenuItem>
                      <button type="submit" className="w-full text-left cursor-pointer">
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
                <Button variant="ghost" size="sm">{t("login")}</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="default" size="sm">{t("register")}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
