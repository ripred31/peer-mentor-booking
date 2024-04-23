import { NextResponse } from "next/server";

export function middleware(req) {

    const isSignedIn = true;

    if(isSignedIn) {

    } else {
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }
} 