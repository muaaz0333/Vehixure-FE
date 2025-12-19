import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define role-based route access with more granular permissions
const roleRoutes = {
  admin: {
    routes: [
      '/dashboard',
      '/agents',
      '/inspectors', 
      '/agents-inspectors',
      '/stats',
      '/warranties',
      '/inspections',
      '/account'
    ],
    permissions: ['read', 'write', 'delete', 'admin'] as const
  },
  agent: {
    routes: [
      '/agent-dashboard',
      '/agent',
      '/warranties',
      '/activate-warranty',
      '/account'
    ],
    permissions: ['read', 'write'] as const
  },
  inspector: {
    routes: [
      '/inspector-dashboard',
      '/inspector',
      '/inspections',
      '/account'
    ],
    permissions: ['read', 'write'] as const
  }
} as const

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/activate-warranty',
]

// Enhanced user extraction with multiple auth methods
function getUserFromRequest(request: NextRequest) {
  // Try multiple auth methods
  
  // 1. Check Authorization header (JWT)
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    try {
      const token = authHeader.substring(7)
      // In a real app, you'd verify the JWT here
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.user
    } catch {
      // Invalid JWT, continue to other methods
    }
  }
  
  // 2. Check user cookie
  const userCookie = request.cookies.get('user')?.value
  if (userCookie) {
    try {
      return JSON.parse(decodeURIComponent(userCookie))
    } catch {
      // Invalid cookie, continue
    }
  }
  
  // 3. Check session cookie
  const sessionCookie = request.cookies.get('session')?.value
  if (sessionCookie) {
    try {
      // In a real app, you'd validate session with your session store
      const sessionData = JSON.parse(sessionCookie)
      return sessionData.user
    } catch {
      // Invalid session
    }
  }
  
  return null
}

// Check if user has permission for specific action
function hasPermission(userRole: string, action: string): boolean {
  const roleConfig = roleRoutes[userRole as keyof typeof roleRoutes]
  return roleConfig?.permissions.some(permission => permission === action) || false
}

// Enhanced route matching with wildcard support
function matchesRoute(pathname: string, allowedRoutes: readonly string[]): boolean {
  return allowedRoutes.some(route => {
    // Exact match
    if (pathname === route) return true
    
    // Prefix match (for nested routes)
    if (pathname.startsWith(route + '/')) return true
    
    // Wildcard support
    if (route.includes('*')) {
      const pattern = route.replace(/\*/g, '.*')
      const regex = new RegExp(`^${pattern}$`)
      return regex.test(pathname)
    }
    
    return false
  })
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip static files and images early
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/images/') ||
    pathname.includes('.') && /\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|woff|woff2|ttf|eot)$/i.test(pathname)
  ) {
    return NextResponse.next()
  }
  
  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Handle API routes with enhanced security
  if (pathname.startsWith('/api/')) {
    return handleApiRoute(request)
  }

  // Get user from request
  const user = getUserFromRequest(request)
  
  // If no user and trying to access protected route, redirect to login
  if (!user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Check if user has access to the requested route
  const userRole = user.role as keyof typeof roleRoutes
  const roleConfig = roleRoutes[userRole]
  
  if (!roleConfig) {
    console.warn(`Unknown role: ${userRole}`)
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Check route access
  const hasRouteAccess = matchesRoute(pathname, roleConfig.routes)
  
  if (!hasRouteAccess) {
    // Log unauthorized access attempt
    console.warn(`Unauthorized access attempt: ${user.username} (${userRole}) -> ${pathname}`)
    
    // Redirect to user's default dashboard based on role
    const defaultRoutes = {
      admin: '/dashboard',
      agent: '/agent-dashboard',
      inspector: '/inspector-dashboard'
    }
    
    const redirectUrl = new URL(defaultRoutes[userRole] || '/login', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Add user context to headers for downstream consumption
  const response = NextResponse.next()
  response.headers.set('x-user-id', user.id)
  response.headers.set('x-user-role', user.role)
  response.headers.set('x-user-permissions', JSON.stringify(roleConfig.permissions))
  
  return response
}

// Enhanced API route handler with role-based access control
function handleApiRoute(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method
  
  // Get user for API requests
  const user = getUserFromRequest(request)
  
  // Some API routes might be public (like login)
  const publicApiRoutes = ['/api/auth/login', '/api/health']
  if (publicApiRoutes.includes(pathname)) {
    return NextResponse.next()
  }
  
  // Require authentication for protected API routes
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Authentication required' },
      { status: 401 }
    )
  }
  
  // Check method-based permissions
  const requiredPermission = getRequiredPermission(method)
  if (requiredPermission && !hasPermission(user.role, requiredPermission)) {
    return NextResponse.json(
      { error: 'Forbidden', message: `Insufficient permissions for ${method} operation` },
      { status: 403 }
    )
  }
  
  // Add user context to API request headers
  const response = NextResponse.next()
  response.headers.set('x-user-id', user.id)
  response.headers.set('x-user-role', user.role)
  
  return response
}

// Map HTTP methods to required permissions
function getRequiredPermission(method: string): string | null {
  const methodPermissions: Record<string, string> = {
    'GET': 'read',
    'POST': 'write',
    'PUT': 'write',
    'PATCH': 'write',
    'DELETE': 'delete'
  }
  
  return methodPermissions[method] || null
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (image files)
     * - api (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
}