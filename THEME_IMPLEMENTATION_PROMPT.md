# Implementace Theme - Hidden přenos (postMessage + sessionStorage)

Potřebuji implementovat logiku pro přijímání theme přes `postMessage` API (skrytě, bez URL parametru) nebo z `sessionStorage` jako fallback. Theme má prioritu: postMessage/sessionStorage > localStorage.

## 1. Upravit ThemeProvider (nebo podobný soubor)

V souboru, kde máš theme provider (např. `theme-provider.tsx`, `ThemeContext.tsx`, atd.), uprav inicializaci theme:

**PŘED:**
```typescript
const [theme, setTheme] = useState<Theme>(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored || "dark";
  }
  return "dark";
});
```

**PO:**
```typescript
const [theme, setTheme] = useState<Theme>(() => {
  if (typeof window !== "undefined") {
    // Nejprve zkontroluj sessionStorage (pro hidden přenos z parent okna)
    const sessionTheme = sessionStorage.getItem("theme") as Theme | null;
    if (sessionTheme === "dark" || sessionTheme === "light") {
      // Aktualizuj localStorage podle sessionStorage
      localStorage.setItem("theme", sessionTheme);
      // Vyčisti sessionStorage po použití
      sessionStorage.removeItem("theme");
      return sessionTheme;
    }
    
    // Fallback: zkontroluj URL parametr (pro přímé odkazy)
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get("theme") as Theme | null;
    if (urlTheme === "dark" || urlTheme === "light") {
      localStorage.setItem("theme", urlTheme);
      return urlTheme;
    }
    
    // Pokud není ani sessionStorage ani URL parametr, použij localStorage
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored || "dark";
  }
  return "dark";
});
```

## 2. Přidat listener pro postMessage

V ThemeProvider (nebo v root komponentě) přidej listener pro přijímání theme přes postMessage:

```typescript
useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    // Bezpečnost: zkontroluj origin (uprav podle své domény)
    // if (event.origin !== "https://patrikdinh.com") return;
    
    if (event.data?.type === "THEME_SYNC" && event.data?.theme) {
      const receivedTheme = event.data.theme as Theme;
      if (receivedTheme === "dark" || receivedTheme === "light") {
        setTheme(receivedTheme);
        localStorage.setItem("theme", receivedTheme);
        // Ulož také do sessionStorage pro případ reloadu
        sessionStorage.setItem("theme", receivedTheme);
      }
    }
  };

  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, []);
```

## 3. Upravit script v layout.tsx (nebo root layout)

V souboru `layout.tsx` (nebo `_document.tsx`, `_app.tsx` podle frameworku), v `<head>` sekci uprav script, který nastavuje theme před načtením Reactu:

**PŘED:**
```javascript
const theme = localStorage.getItem('theme');
if (theme === 'light') {
  document.documentElement.classList.remove('dark');
} else {
  document.documentElement.classList.add('dark');
}
```

**PO:**
```javascript
// Nejprve zkontroluj sessionStorage (pro hidden přenos)
let theme = sessionStorage.getItem('theme');

// Pokud není v sessionStorage, zkontroluj URL parametr
if (!theme || (theme !== 'dark' && theme !== 'light')) {
  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get('theme');
  if (urlTheme === 'dark' || urlTheme === 'light') {
    theme = urlTheme;
    localStorage.setItem('theme', theme);
  } else {
    theme = localStorage.getItem('theme');
  }
} else {
  // Pokud je v sessionStorage, aktualizuj localStorage
  localStorage.setItem('theme', theme);
  // Vyčisti sessionStorage po použití
  sessionStorage.removeItem('theme');
}

if (theme === 'light') {
  document.documentElement.classList.remove('dark');
} else {
  document.documentElement.classList.add('dark');
}
```

## 4. Přidat sledování změn URL parametrů (volitelné, ale doporučené)

Do ThemeProvider přidej `useEffect`, který sleduje změny URL parametrů:

```typescript
useEffect(() => {
  const checkUrlTheme = () => {
    if (typeof window === "undefined") return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get("theme") as Theme | null;
    
    if (urlTheme === "dark" || urlTheme === "light") {
      if (urlTheme !== theme) {
        setTheme(urlTheme);
        localStorage.setItem("theme", urlTheme);
      }
    }
  };

  // Zkontroluj při načtení
  checkUrlTheme();

  // Sleduj změny URL (např. při použití browser back/forward)
  window.addEventListener("popstate", checkUrlTheme);
  
  // Sleduj změny při navigaci v Next.js (pro případ, že by se URL změnilo bez reloadu)
  const interval = setInterval(checkUrlTheme, 100);

  return () => {
    window.removeEventListener("popstate", checkUrlTheme);
    clearInterval(interval);
  };
}, [theme]);
```

## Shrnutí

Hlavní změny:
1. **postMessage API**: Theme se posílá skrytě přes `postMessage` z parent okna (bez viditelného URL parametru)
2. **sessionStorage fallback**: Pokud postMessage selže, použije se `sessionStorage` jako fallback
3. **URL parametr fallback**: Pro přímé odkazy stále funguje `?theme=dark` nebo `?theme=light` v URL
4. **Priorita**: sessionStorage/postMessage > URL parametr > localStorage

**Výhody hidden přenosu:**
- ✅ Čistá URL bez `?theme=dark`
- ✅ Funguje i když jsou projekty na různých doménách (pokud je povolen postMessage)
- ✅ sessionStorage jako spolehlivý fallback

