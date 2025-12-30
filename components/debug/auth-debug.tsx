"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { getRedirectPath } from "@/lib/auth"
import { usePathname } from "next/navigation"

export function AuthDebug() {
  const { user, isAuthenticated, isInitialized, isLoading } = useAuth()
  const pathname = usePathname()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <div>Path: {pathname}</div>
        <div>Initialized: {isInitialized ? '✅' : '❌'}</div>
        <div>Loading: {isLoading ? '🔄' : '✅'}</div>
        <div>Authenticated: {isAuthenticated ? '✅' : '❌'}</div>
        <div>User: {user ? '✅' : '❌'}</div>
        {user && (
          <>
            <div>Role: {user.role}</div>
            <div>Partner Role: {user.partnerRole}</div>
            <div>Redirect Path: {getRedirectPath(user)}</div>
          </>
        )}
        <button 
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
          className="mt-2 px-2 py-1 bg-red-600 text-white rounded text-xs"
        >
          Clear & Reload
        </button>
      </div>
    </div>
  )
}