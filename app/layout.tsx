import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/theme-provider";
import SplashWrapper from "./components/SplashWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      { url: "/favicon-dark.svg", type: "image/svg+xml" }, // Fallback
    ],
    shortcut: [{ url: "/favicon-dark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon-dark.svg", type: "image/svg+xml" }],
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
        {/* Favicon links - explicitně přidáno pro lepší kompatibilitu */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon-dark.svg"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon-light.svg"
          media="(prefers-color-scheme: light)"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon-dark.svg" />
        <link
          rel="shortcut icon"
          type="image/svg+xml"
          href="/favicon-dark.svg"
        />
        <link rel="apple-touch-icon" href="/favicon-dark.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Nejprve zkontroluj URL parametr
                  const urlParams = new URLSearchParams(window.location.search);
                  const urlTheme = urlParams.get('theme');
                  
                  let theme;
                  if (urlTheme === 'dark' || urlTheme === 'light') {
                    theme = urlTheme;
                    // Aktualizuj localStorage podle URL parametru
                    localStorage.setItem('theme', theme);
                  } else {
                    theme = localStorage.getItem('theme');
                  }
                  
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
                    
                    // Also add shortcut and apple touch icon
                    const shortcut = document.createElement('link');
                    shortcut.rel = 'shortcut icon';
                    shortcut.type = 'image/svg+xml';
                    shortcut.href = isDark ? '/favicon-dark.svg' : '/favicon-light.svg';
                    document.getElementsByTagName('head')[0].appendChild(shortcut);
                    
                    const apple = document.createElement('link');
                    apple.rel = 'apple-touch-icon';
                    apple.href = isDark ? '/favicon-dark.svg' : '/favicon-light.svg';
                    document.getElementsByTagName('head')[0].appendChild(apple);
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
                // Detekce dark/light módu konzole
                const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const textColor = isDarkMode ? '#d1d5db' : '#111827';
                const accentColor = '#4ade80';
                const highlightColor = isDarkMode ? '#22d3ee' : '#0891b2';
                
                // Úvodní zpráva při načtení
                console.log('%cPatrik Dinh', 'color: ' + accentColor + '; font-size: 16px; font-weight: bold;');
                console.log('%cFull-stack & AI Developer', 'color: ' + textColor + '; font-size: 12px;');
                console.log('%cBuilding useful products with AI & TypeScript', 'color: ' + textColor + '; font-size: 12px;');
                console.log('');
                console.log('%c📧 me@patrikdinh.com', 'color: ' + textColor + '; font-size: 12px;');
                console.log('%c🔗 linkedin.com/in/dinhpatrik', 'color: ' + textColor + '; font-size: 12px;');
                console.log('%c🔗 github.com/iamthepk', 'color: ' + textColor + '; font-size: 12px;');
                console.log('');
                console.log('%cCurious? Try typing info() in the console', 'color: ' + accentColor + '; font-size: 12px;');
                console.log('%cinfo()', 'color: ' + highlightColor + '; font-size: 12px; font-weight: bold;');
                
                // Funkce info() se spustí až když ji uživatel zavolá
                window.info = function() {
                  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const txtColor = isDark ? '#d1d5db' : '#111827';
                  const accColor = '#4ade80';
                  
                  const info = {
                    'Framework': 'Next.js 16 (App Router)',
                    'Language': 'TypeScript',
                    'Styling': 'Tailwind CSS',
                    'Focus': 'Full-stack & AI Development',
                    'Author': 'Patrik Dinh',
                    'Location': 'Prague, Czech Republic'
                  };
                  
                  console.table(info);
                  
                  console.log('%cLooking for a developer?', 'color: ' + accColor + '; font-size: 14px; font-weight: bold;');
                  console.log('%c• Experience with modern AI models (GPT, Gemini, Claude)', 'color: ' + txtColor + '; font-size: 12px;');
                  console.log('%c• Next.js, React, TypeScript - daily practice', 'color: ' + txtColor + '; font-size: 12px;');
                  console.log('%c• Clean, maintainable code + attention to detail', 'color: ' + txtColor + '; font-size: 12px;');
                  console.log('%c• Solving complex problems', 'color: ' + txtColor + '; font-size: 12px;');
                  
                  console.log('%cContact:', 'color: ' + accColor + '; font-size: 14px; font-weight: bold;');
                  console.log('%cEmail: me@patrikdinh.com', 'color: ' + txtColor + '; font-size: 12px;');
                  console.log('%cLinkedIn: linkedin.com/in/dinhpatrik', 'color: ' + txtColor + '; font-size: 12px;');
                  console.log('%cGitHub: github.com/iamthepk', 'color: ' + txtColor + '; font-size: 12px;');
                  
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
        <SpeedInsights />
      </body>
    </html>
  );
}
