import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/theme-provider";
import SplashWrapper from "./components/SplashWrapper";
import { Analytics } from "@vercel/analytics/next";

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Úvodní zpráva při načtení
                console.log('%cPatrik Dinh', 'color: #4ade80; font-size: 16px; font-weight: bold;');
                console.log('%cFull-stack & AI Developer', 'color: #d1d5db; font-size: 12px;');
                console.log('%cBuilding useful products with AI & TypeScript', 'color: #d1d5db; font-size: 12px;');
                console.log('');
                console.log('%c📧 me@patrikdinh.com', 'color: #d1d5db; font-size: 12px;');
                console.log('%c🔗 linkedin.com/in/dinhpatrik', 'color: #d1d5db; font-size: 12px;');
                console.log('%c🔗 github.com/iamthepk', 'color: #d1d5db; font-size: 12px;');
                console.log('');
                console.log('%cCurious? Try typing info() in the console', 'color: #4ade80; font-size: 12px;');
                console.log('%cinfo()', 'color: #22d3ee; font-size: 12px; font-weight: bold;');
                
                // Funkce info() se spustí až když ji uživatel zavolá
                window.info = function() {
                  const info = {
                    'Framework': 'Next.js 16 (App Router)',
                    'Language': 'TypeScript',
                    'Styling': 'Tailwind CSS',
                    'Focus': 'Full-stack & AI Development',
                    'Author': 'Patrik Dinh',
                    'Location': 'Prague, Czech Republic'
                  };
                  
                  console.table(info);
                  
                  console.log('%cLooking for a developer?', 'color: #4ade80; font-size: 14px; font-weight: bold;');
                  console.log('%c• Experience with modern AI models (GPT, Gemini, Claude)', 'color: #d1d5db; font-size: 12px;');
                  console.log('%c• Next.js, React, TypeScript - daily practice', 'color: #d1d5db; font-size: 12px;');
                  console.log('%c• Clean, maintainable code + attention to detail', 'color: #d1d5db; font-size: 12px;');
                  console.log('%c• Solving complex problems', 'color: #d1d5db; font-size: 12px;');
                  
                  console.log('%cContact:', 'color: #4ade80; font-size: 14px; font-weight: bold;');
                  console.log('%cEmail: me@patrikdinh.com', 'color: #d1d5db; font-size: 12px;');
                  console.log('%cLinkedIn: linkedin.com/in/dinhpatrik', 'color: #d1d5db; font-size: 12px;');
                  console.log('%cGitHub: github.com/iamthepk', 'color: #d1d5db; font-size: 12px;');
                  
                  return undefined;
                };
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <SplashWrapper>{children}</SplashWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
