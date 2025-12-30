"use client"

import { useAuth } from '@/components/providers/auth-provider'

// Simple component to test authentication flow
export function AuthTest() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-3">Authentication Test</h3>
      
      {isAuthenticated ? (
        <div className="space-y-2">
          <p className="text-green-600">✅ Authenticated as: {user?.fullName} ({user?.role})</p>
          <button
            onClick={logout}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-red-600">❌ Not authenticated</p>
          <p className="text-sm text-gray-500">Please use the login page to authenticate.</p>
        </div>
      )}
    </div>
  )
}
