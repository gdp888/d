import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CF 'Achievement-Children' — Charitable Foundation",
  description:
    "We believe that every child deserves a happy and healthy childhood! The Achievement-Children Charitable Foundation helps children with disabilities.",
  keywords: [
    "charity",
    "children",
    "cerebral palsy",
    "rehabilitation",
    "help for children",
    "Achievement-Children",
    "charitable foundation",
  ],
  authors: [{ name: "CF 'Achievement-Children'" }],
  icons: {
    icon: "https://vk.com/images/icons/favicons/fav_logo.ico?8",
  },
  openGraph: {
    title: "CF 'Achievement-Children' — Charitable Foundation",
    description:
      "We believe that every child deserves a happy and healthy childhood!",
    url: "https://vk.com/dostigenie_deti",
    siteName: "CF 'Achievement-Children'",
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = (await params).locale;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
