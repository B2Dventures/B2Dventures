import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define route matchers for role-based access control
const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/admin(.*)']);
const isBusinessRoute = createRouteMatcher(['/business/(.*)']);

// Middleware to handle access and redirection
export default clerkMiddleware(async (auth, req) => {

    // Redirect admin users to /admin after login
    if (req.nextUrl.pathname === '/' && auth().sessionClaims?.metadata?.role === 'admin') {
        const url = new URL('/admin', req.url);
        return NextResponse.redirect(url);
    }

    // Protect /business routes
    if (isBusinessRoute(req) && auth().sessionClaims?.metadata?.role !== 'business') {
        const url = new URL('/', req.url);
        return NextResponse.redirect(url);
    }

    // Protect /admin routes
    if (isAdminRoute(req) && auth().sessionClaims?.metadata?.role !== 'admin') {
        const url = new URL('/', req.url);
        return NextResponse.redirect(url);
    }

    // Allow access if no conditions are met
    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
