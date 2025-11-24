import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/theme-provider";
import SplashWrapper from "./components/SplashWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patrik Dinh - Full-stack & AI Developer",
  description:
    "Building useful products with AI & TypeScript. Full-stack & AI developer focused on practical automation and intelligent systems.",
  icons: {
    icon: [
      { url: "/favicon-dark.svg", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon-light.svg", media: "(prefers-color-scheme: light)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                  
                  // Update favicon based on theme
                  const updateFavicon = () => {
                    const isDark = document.documentElement.classList.contains('dark');
                    // Remove all existing favicon links
                    document.querySelectorAll("link[rel*='icon']").forEach(link => link.remove());
                    
                    // Create new favicon link
                    const link = document.createElement('link');
                    link.type = 'image/svg+xml';
                    link.rel = 'icon';
                    link.href = isDark ? '/favicon-dark.svg' : '/favicon-light.svg';
                    document.getElementsByTagName('head')[0].appendChild(link);
                  };
                  
                  updateFavicon();
                  
                  // Watch for theme changes
                  const observer = new MutationObserver(updateFavicon);
                  observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['class']
                  });
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <SplashWrapper>{children}</SplashWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
