import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes and their allowed roles
const protectedRoutes: Record<string, string[]> = {
  '/dashboard': ['ERPS_ADMIN'],
  '/agent-dashboard': ['PARTNER_USER'],
  '/inspector-dashboard': ['PARTNER_USER'],
  '/warranties': ['ERPS_ADMIN', 'PARTNER_USER'],
  '/inspections': ['ERPS_ADMIN', 'PARTNER_USER'],
  '/agents': ['ERPS_ADMIN'],
  '/inspectors': ['ERPS_ADMIN'],
  '/agents-inspectors': ['ERPS_ADMIN'],
  '/account': ['ERPS_ADMIN', 'PARTNER_USER'],
  '/stats': ['ERPS_ADMIN'],
  '/agent': ['PARTNER_USER'],
  '/inspector': ['PARTNER_USER'],
  // '/activate-warranty': ['PARTNER_USER', 'ERPS_ADMIN'],
}

// Public routes - no auth required (handled implicitly by not being in protectedRoutes)

// Get redirect path based on user role
function getRoleRedirect(role: string, partnerRole?: string): string {
  if (role === 'ERPS_ADMIN') {
    return '/dashboard'
  }
  if (role === 'PARTNER_USER') {
    if (partnerRole === 'ACCOUNT_INSTALLER') {
      return '/inspector-dashboard'
    }
    return '/agent-dashboard'
  }
  return '/login'
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files like .ico, .png, etc.
  ) {
    return NextResponse.next()
  }

  // Get auth data from cookies
  const token = request.cookies.get('authToken')?.value
  const userRole = request.cookies.get('userRole')?.value
  const partnerRole = request.cookies.get('partnerRole')?.value

  const isAuthenticated = !!token && !!userRole
  
  // Find if current path matches any protected route
  const matchedProtectedRoute = Object.keys(protectedRoutes).find(route =>
    pathname === route || pathname.startsWith(route + '/')
  )
  const isProtectedRoute = !!matchedProtectedRoute

  // Not authenticated trying to access protected route -> redirect to login
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Authenticated user on login page -> redirect to their dashboard
  if (isAuthenticated && pathname === '/login') {
    const redirectPath = getRoleRedirect(userRole, partnerRole)
    return NextResponse.redirect(new URL(redirectPath, request.url))
  }

  // Role-based access control for protected routes
  if (isAuthenticated && matchedProtectedRoute) {
    const allowedRoles = protectedRoutes[matchedProtectedRoute]
    
    if (!allowedRoles.includes(userRole)) {
      // User doesn't have permission - redirect to their dashboard
      const redirectPath = getRoleRedirect(userRole, partnerRole)
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
}
