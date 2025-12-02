import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from './lib/session';

const protectedStudentRoutes = ['/app', '/app/books', '/app/my-reservations', '/app/profile', '/app/fine-payments', '/app/my-borrowed-books'];
const protectedLibrarianRoutes = ['/librarian', '/librarian/inventory', '/librarian/borrow-return', '/librarian/fines', '/librarian/profile'];
const protectedAdminRoutes = ['/admin', '/admin/users', '/admin/books', '/admin/reports', '/admin/settings'];
const publicRoutes = ['/login', '/register', '/librarian/login', '/admin/login', '/'];

export async function middleware(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  const { pathname } = request.nextUrl;

  const isProtectedRoute = (routes: string[]) => routes.some(route => pathname.startsWith(route));

  if (!session && (isProtectedRoute(protectedStudentRoutes) || isProtectedRoute(protectedLibrarianRoutes) || isProtectedRoute(protectedAdminRoutes))) {
    let loginUrl = '/login';
    if (isProtectedRoute(protectedLibrarianRoutes)) loginUrl = '/librarian/login';
    if (isProtectedRoute(protectedAdminRoutes)) loginUrl = '/admin/login';
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  if (session) {
    const { userRole } = session;
    if (pathname.startsWith('/app') && userRole !== 'student') {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname.startsWith('/librarian') && userRole !== 'librarian') {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname.startsWith('/admin') && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect logged-in users from login pages
    if ((pathname === '/login' && userRole === 'student') || (pathname === '/librarian/login' && userRole === 'librarian') || (pathname === '/admin/login' && userRole === 'admin')) {
       let homeUrl = '/';
        switch (userRole) {
            case 'student': homeUrl = '/app'; break;
            case 'librarian': homeUrl = '/librarian'; break;
            case 'admin': homeUrl = '/admin'; break;
        }
       return NextResponse.redirect(new URL(homeUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
