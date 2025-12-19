"use client"

import { useAuth } from '@/components/providers/auth-provider'
import { authenticateUser } from '@/lib/auth'

// Simple component to test authentication flow
export function AuthTest() {
  const { user, login, logout, isAuthenticated } = useAuth()

  const handleQuickLogin = (role: 'admin' | 'agent' | 'inspector') => {
    const credentials = {
      admin: { username: 'admin', password: 'admin123' },
      agent: { username: 'agent', password: 'agent123' },
      inspector: { username: 'inspector', password: 'inspector123' }
    }

    const user = authenticateUser(credentials[role].username, credentials[role].password)
    if (user) {
      login(user)
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-3">Authentication Test</h3>
      
      {isAuthenticated ? (
        <div className="space-y-2">
          <p className="text-green-600">✅ Authenticated as: {user?.name} ({user?.role})</p>
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
          <div className="flex gap-2">
            <button
              onClick={() => handleQuickLogin('admin')}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Login as Admin
            </button>
            <button
              onClick={() => handleQuickLogin('agent')}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            >
              Login as Agent
            </button>
            <button
              onClick={() => handleQuickLogin('inspector')}
              className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
            >
              Login as Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  )
}