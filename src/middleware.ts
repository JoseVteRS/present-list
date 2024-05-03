import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { NextResponse } from "next/server";

import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes, protectedRoutes } from "@/routes"


const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req

    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)


    // Is API Route
    if (isApiAuthRoute) return undefined


    //Is API Route. First check is authenticated
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
            )
        }
        return undefined
    }

    // Protected Routes, If not authenticated redirect to /auth/login
    if (!isLoggedIn && isProtectedRoute) {
        let callbackUrl = nextUrl.pathname
        if (nextUrl.search) {
            callbackUrl += nextUrl.search
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl)
        return NextResponse.redirect(
            new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        )
    }





})

// Optionally, don't invoke Middleware on some paths
// "/((?!api|_next/static|_next/image|favicon.ico).*)"
export const config = {
    matcher: [
        "/((?!api/|_next/|images/|docs/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
    ],
}