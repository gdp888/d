import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "БФ «Достижение-Дети» — Благотворительный фонд",
  description:
    "Мы верим, что каждый ребёнок заслуживает счастливого и здорового детства! Благотворительный фонд «Достижение-Дети» помогает детям с ограниченными возможностями здоровья.",
  keywords: [
    "благотворительность",
    "дети",
    "ДЦП",
    "реабилитация",
    "помощь детям",
    "Достижение-Дети",
    "благотворительный фонд",
  ],
  authors: [{ name: "БФ «Достижение-Дети»" }],
  icons: {
    icon: "https://vk.com/images/icons/favicons/fav_logo.ico?8",
  },
  openGraph: {
    title: "БФ «Достижение-Дети» — Благотворительный фонд",
    description:
      "Мы верим, что каждый ребёнок заслуживает счастливого и здорового детства!",
    url: "https://vk.com/dostigenie_deti",
    siteName: "БФ «Достижение-Дети»",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
