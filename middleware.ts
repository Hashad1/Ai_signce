import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    // Skip middleware for static files and images
    if (request.nextUrl.pathname.startsWith('/_next') || 
        request.nextUrl.pathname.startsWith('/static') ||
        request.nextUrl.pathname.startsWith('/images')) {
      return NextResponse.next();
    }

    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req: request, res });

    // Add cache control headers
    res.headers.set('Cache-Control', 's-maxage=1, stale-while-revalidate=59');

    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession();

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

// Specify which routes to run the middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
