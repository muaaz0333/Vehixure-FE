"use client"
import { useAuth } from "@/components/providers/auth-provider"
import { getRedirectPath } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthRedirectProps {
  children: React.ReactNode
}

export function AuthRedirect({ children }: AuthRedirectProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = getRedirectPath(user.role)
      router.push(redirectPath)
    }
  }, [isAuthenticated, user, router])

  // If user is authenticated, show loading while redirecting
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}