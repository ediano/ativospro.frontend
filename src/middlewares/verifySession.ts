"use server";

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/services/CookiesToken";
import { verifySession } from "@/libs/verifySession";
import { i18n } from "@/configs/i18n-config";

let isAuthenticatedIn = false;

const publicRoutes = ["/signup", "/login"];

function getPublicRoutesByLocale(locale: string) {
  return publicRoutes.map((path) => `/${locale}${path}`);
}

function getLocale(req: NextRequest) {
  const NEXT_LOCALE = "NEXT_LOCALE";
  const locale = req.cookies.get(NEXT_LOCALE)?.value || i18n.defaultLocale;
  return locale;
}

function getUrlByLocale(req: NextRequest, pathname?: string) {
  const locale = getLocale(req);
  return new URL(`/${locale}${pathname || req.nextUrl.pathname}${req.nextUrl.search}`, req.url);
}

function redirectWithoutToken(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (!publicRoutes.includes(pathname)) {
    const url = getUrlByLocale(req, "/login");
    return NextResponse.redirect(url);
  }

  const url = getUrlByLocale(req);
  return NextResponse.redirect(url);
}

function redirectWithToken(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (!pathname.includes("dashboard")) {
    const url = getUrlByLocale(req, "/dashboard");
    return NextResponse.redirect(url);
  }

  const url = getUrlByLocale(req);
  return NextResponse.redirect(url);
}

export async function middlewareVerifySession(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const accessToken = await getToken();
  const locale = getLocale(req);

  try {
    isAuthenticatedIn = !!accessToken && !isAuthenticatedIn && (await verifySession());

    const isPublicRoutes = getPublicRoutesByLocale(locale);

    if (!accessToken && !isAuthenticatedIn && !isPublicRoutes) {
      return redirectWithoutToken(req);
    }

    if (!!accessToken && isAuthenticatedIn && isPublicRoutes) {
      return redirectWithToken(req);
    }

    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.next();
    response.cookies.delete("token");

    const locale = getLocale(req);
    if (pathname !== "/" || pathname !== `/${locale}`) {
      const url = getUrlByLocale(req, "/login");
      return NextResponse.redirect(url, response);
    }

    const url = getUrlByLocale(req, "/");
    return NextResponse.redirect(url, response);
  }
}
