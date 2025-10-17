// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/_next", "/favicon.ico", "/api"]; // /api queda público

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir paths públicos y assets
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    // Si intenta ir a /login estando logueado, lo mandamos a /dashboard
    if (pathname === "/login") {
      const isAuth = req.cookies.get("tn_auth")?.value === "1";
      if (isAuth) {
        const url = req.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    }
    return NextResponse.next();
  }

  // Proteger todo lo demás (p. ej., /dashboard)
  const isAuth = req.cookies.get("tn_auth")?.value === "1";
  if (!isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname); // para volver después
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protege todo excepto lo público definido arriba
    "/((?!_next|favicon.ico|api|login).*)",
    "/login",
  ],
};
