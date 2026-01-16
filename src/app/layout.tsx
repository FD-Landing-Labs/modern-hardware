import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { data } from "@/data";
import FloatingBadge from "@/components/FloatingBadge";
import { LenisProvider } from "@/components/providers/lenis-provider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: data.site.seo.title,
  description: data.site.seo.description,
  keywords: data.site.seo.keywords,
  openGraph: {
    title: data.site.seo.title,
    description: data.site.seo.description,
    images: [data.site.seo.ogImage || ""],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} font-sans antialiased`}
        style={{
          "--font-heading": "var(--font-dm-sans)",
          "--font-body": "var(--font-dm-sans)",
        } as React.CSSProperties}
      >
        <LenisProvider>
          {children}
          <FloatingBadge />
        </LenisProvider>
      </body>
    </html>
  );
}
