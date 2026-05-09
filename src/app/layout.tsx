import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "@/providers/session-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getLocale } from "@/lib/i18n/locale";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Diễn đàn robot hút bụi — đánh giá, so sánh, săn deal, sửa lỗi. Cộng đồng tất cả thương hiệu.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={cn(geistSans.variable, geistMono.variable)}>
      <body className="min-h-screen flex flex-col antialiased">
        <SessionProvider>
          <TooltipProvider>
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
          </TooltipProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
