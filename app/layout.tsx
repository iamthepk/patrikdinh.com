import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/theme-provider";
import SplashWrapper from "./components/SplashWrapper";
import ConsoleInfo from "./components/ConsoleInfo";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  APPLE_TOUCH_ICON_ID,
  FAVICON_ID,
  SHORTCUT_ICON_ID,
} from "./lib/theme";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const siteUrl = "https://patrikdinh.com";
const siteTitle = "Patrik Dinh - Full-stack & AI Developer";
const siteDescription =
  "Building production-ready systems with AI & TypeScript. Full-stack developer focused on practical automation, internal tools and intelligent systems used in real daily operation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "Patrik Dinh",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Patrik Dinh portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@iamthepk",
    images: ["/twitter-image"],
  },
};

const isProduction = process.env.NODE_ENV === "production";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link id={FAVICON_ID} rel="icon" type="image/svg+xml" href="/favicon-dark.svg" />
        <link
          id={SHORTCUT_ICON_ID}
          rel="shortcut icon"
          type="image/svg+xml"
          href="/favicon-dark.svg"
        />
        <link id={APPLE_TOUCH_ICON_ID} rel="apple-touch-icon" href="/favicon-dark.svg" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <SplashWrapper>{children}</SplashWrapper>
        </ThemeProvider>
        <ConsoleInfo />
        {isProduction && <Analytics />}
        {isProduction && <SpeedInsights />}
      </body>
    </html>
  );
}
