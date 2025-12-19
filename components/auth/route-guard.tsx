"use client"
import { useAuth } from "@/components/providers/auth-provider"
import { UserRole } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RouteGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
}

export function RouteGuard({ children, allowedRoles, redirectTo = "/login" }: RouteGuardProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo)
      return
    }

    if (user && !allowedRoles.includes(user.role)) {
      // Redirect to their appropriate dashboard
      const userRedirect = user.role === 'admin' ? '/dashboard' 
        : user.role === 'agent' ? '/agent-dashboard' 
        : '/inspector-dashboard'
      router.push(userRedirect)
      return
    }
  }, [isAuthenticated, user, allowedRoles, router, redirectTo])

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}