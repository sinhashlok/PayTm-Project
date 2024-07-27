import NextAuth from "next-auth";

import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const path = nextUrl.pathname;
  if (
    isLoggedIn &&
    (path === "/" || path === "/auth/login" || path === "/auth/register")
  ) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  if (
    !isLoggedIn &&
    (path === "/dashboard" || path === "/transfer" || path === "/transactions")
  ) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
