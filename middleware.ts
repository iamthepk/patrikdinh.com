import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Seznam EU zemí (včetně EEA zemí: IS, LI, NO, CH)
const EU_COUNTRIES = new Set([
  "AT", // Rakousko
  "BE", // Belgie
  "BG", // Bulharsko
  "HR", // Chorvatsko
  "CY", // Kypr
  "CZ", // Česká republika
  "DK", // Dánsko
  "EE", // Estonsko
  "FI", // Finsko
  "FR", // Francie
  "DE", // Německo
  "GR", // Řecko
  "HU", // Maďarsko
  "IE", // Irsko
  "IT", // Itálie
  "LV", // Lotyšsko
  "LT", // Litva
  "LU", // Lucembursko
  "MT", // Malta
  "NL", // Nizozemsko
  "PL", // Polsko
  "PT", // Portugalsko
  "RO", // Rumunsko
  "SK", // Slovensko
  "SI", // Slovinsko
  "ES", // Španělsko
  "SE", // Švédsko
  "IS", // Island (EEA)
  "LI", // Lichtenštejnsko (EEA)
  "NO", // Norsko (EEA)
  "CH", // Švýcarsko (EFTA)
]);

export function middleware(request: NextRequest) {
  // Vyloučit statické assety a systémové soubory
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/i)
  ) {
    return NextResponse.next();
  }

  // Získat zemi z Vercel geo detekce
  // Na Vercelu je dostupný header x-vercel-ip-country
  const country = request.headers.get("x-vercel-ip-country") || null;

  // Určit, zda je návštěvník z EU
  const isEU = country ? EU_COUNTRIES.has(country) : false;

  // Vytvořit response
  const response = NextResponse.next();

  // Nastavit cookie si_eu
  // maxAge: 30 dní = 30 * 24 * 60 * 60 = 2,592,000 sekund
  response.cookies.set("si_eu", isEU ? "1" : "0", {
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dní
  });

  return response;
}

// Konfigurace middleware - spustit pouze pro relevantní cesty
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

