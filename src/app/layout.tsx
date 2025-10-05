import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FastMatch — автоматизация найма",
  description: "Больше интервью, быстрее оффер, никакой рутины.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "FastMatch — автоматизация найма",
    description: "Больше интервью, быстрее оффер, никакой рутины.",
    url: "https://example.com",
    siteName: "FastMatch",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-background text-foreground font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}