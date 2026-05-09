import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "@/providers/session-provider";
import { ToastProvider } from "@/components/shared/Toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { ChatBox } from "@/components/shared/ChatBox";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { NotificationDropdown } from "@/components/shared/NotificationDropdown";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: "Diễn đàn robot hút bụi — đánh giá, so sánh, săn deal, sửa lỗi. Cộng đồng tất cả thương hiệu.",
  manifest: "/manifest.json",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#15a34a",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} className={cn(geistSans.variable, geistMono.variable)} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <SessionProvider>
          <ToastProvider>
            <TooltipProvider>
              <Header locale={locale} navLabels={dict.nav as Record<string, string>} commonLabels={dict.common as Record<string, string>} />
              <div className="fixed top-3 right-4 z-[60] flex items-center gap-1">
                <NotificationDropdown />
                <ThemeToggle />
              </div>
              <main className="flex-1">{children}</main>
              <Footer locale={locale} />
              <ChatBox />
            </TooltipProvider>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
