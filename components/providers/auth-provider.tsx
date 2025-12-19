"use client"
import { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to get stored user
function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  
  // Check localStorage first
  let storedUser = localStorage.getItem('user')
  
  // If not in localStorage, check cookies
  if (!storedUser) {
    const cookies = document.cookie.split(';')
    const userCookie = cookies.find(c => c.trim().startsWith('user='))
    if (userCookie) {
      storedUser = decodeURIComponent(userCookie.split('=')[1])
    }
  }
  
  if (storedUser) {
    try {
      return JSON.parse(storedUser)
    } catch (error) {
      console.error('Failed to parse stored user:', error)
      // Clear invalid data
      localStorage.removeItem('user')
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }
  
  return null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStoredUser())

  const login = (user: User) => {
    setUser(user)
    const userJson = JSON.stringify(user)
    localStorage.setItem('user', userJson)
    
    // Also set cookie for middleware access (URL encode to handle special characters)
    document.cookie = `user=${encodeURIComponent(userJson)}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    
    // Clear cookie
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}