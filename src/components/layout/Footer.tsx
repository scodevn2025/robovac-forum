import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

interface FooterProps {
  locale: Locale;
}

export async function Footer({ locale }: FooterProps) {
  const dict = await getDictionary(locale);
  const tf = (key: string) => dict.footer?.[key] ?? key;
  const tn = (key: string) => dict.nav?.[key] ?? key;

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <span className="font-bold">RoboVac<span className="text-primary">Forum</span></span>
            </div>
            <p className="text-sm text-muted-foreground">{tf("description")}</p>
            <div className="flex gap-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3">{tf("quickLinks")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/f/reviews" className="hover:text-primary transition-colors">{tn("reviews")}</Link></li>
              <li><Link href="/f/discussion" className="hover:text-primary transition-colors">{tn("discussion")}</Link></li>
              <li><Link href="/f/troubleshooting" className="hover:text-primary transition-colors">{tn("troubleshooting")}</Link></li>
              <li><Link href="/f/deals" className="hover:text-primary transition-colors">{tn("deals")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">&nbsp;</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/f/guides" className="hover:text-primary transition-colors">{tn("guides")}</Link></li>
              <li><Link href="/f/showcase" className="hover:text-primary transition-colors">{tn("showcase")}</Link></li>
              <li><Link href="/f/news" className="hover:text-primary transition-colors">{tn("news")}</Link></li>
              <li><Link href="/f/brand-forums" className="hover:text-primary transition-colors">{tn("brandForums")}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-3">{tf("legal")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">{tf("privacy")}</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">{tf("terms")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RoboVac Forum — {tf("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
