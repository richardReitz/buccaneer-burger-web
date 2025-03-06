import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./lib/cookieServer";
import { api } from "@/services/api";


export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    if (pathname.startsWith("/_next") || pathname === "/") return NextResponse.next()
        const token = await getCookieServer()
        
        if (pathname.startsWith("/dashboard")){
            if (!token) {
                return NextResponse.redirect(new URL("/", req.url))
            }
        }

        const tokenValid = await validateToken(token)

        if (!tokenValid) return NextResponse.redirect(new URL("/", req.url))

    return NextResponse.next()
}

async function validateToken(token: string | null): Promise<boolean> {
    if (!token) return false

    try {
        await api.get("/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return true
    } catch (err) {
        console.error(err)
        return false
    }
}