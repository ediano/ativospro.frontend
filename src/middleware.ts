import { type NextRequest, type MiddlewareConfig } from "next/server";

import { middlewareVerifySession } from "./middlewares/verifySession";

export async function middleware(req: NextRequest) {
  return middlewareVerifySession(req);
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
