"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { User } from '@/lib/auth'
import { erpsApi } from '@/lib/api/client'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to get stored user
function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  
  try {
    const storedUser = localStorage.getItem('user')
    if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
      const parsed = JSON.parse(storedUser)
      // Validate that the parsed user has required properties
      if (parsed && typeof parsed === 'object' && parsed.id && parsed.email) {
        return parsed
      }
    }
  } catch (error) {
    console.error('Failed to parse stored user:', error)
    // Clear invalid data
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
  }
  
  return null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize with stored user immediately to prevent flash
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      return getStoredUser()
    }
    return null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize auth state on client side only
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = getStoredUser()
      const token = localStorage.getItem('authToken')
      
      // If we already have a stored user, set it and mark as initialized
      if (storedUser) {
        setUser(storedUser)
        setIsInitialized(true)
        return
      }
      
      // If we have a token but no user, try to fetch user from API
      if (token) {
        setIsLoading(true)
        try {
          const response = await erpsApi.auth.getCurrentUser()
          
          if (response.success && response.data) {
            const userData = response.data as User
            if (userData && userData.id && userData.email) {
              const user: User = {
                id: userData.id,
                email: userData.email,
                fullName: userData.fullName || '',
                role: userData.role,
                partnerRole: userData.partnerRole,
                partnerAccountId: userData.partnerAccountId,
                mobileNumber: userData.mobileNumber,
                isAccreditedInstaller: userData.isAccreditedInstaller || false,
                isAuthorisedInspector: userData.isAuthorisedInspector || false,
                installerCertificationNumber: userData.installerCertificationNumber,
                inspectorCertificationNumber: userData.inspectorCertificationNumber,
                accountStatus: userData.accountStatus || 'ACTIVE',
                isVerified: userData.isVerified || false,
                created: userData.created || new Date().toISOString()
              }
              setUser(user)
              localStorage.setItem('user', JSON.stringify(user))
            } else {
              localStorage.removeItem('authToken')
              localStorage.removeItem('user')
            }
          } else {
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
          }
        } catch {
          localStorage.removeItem('authToken')
          localStorage.removeItem('user')
        } finally {
          setIsLoading(false)
        }
      }
      
      // Always mark as initialized at the end
      setIsInitialized(true)
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true)
    try {
      const response = await erpsApi.auth.login({ email, password })
      
      if (response.success) {
        // Handle the API response structure - user data is directly in response.data
        const userData = response.data as unknown as (User & { token: string })
        const token = userData.token
        
        // Validate userData has required properties
        if (!userData || !userData.id || !userData.email) {
          return { success: false, message: 'Invalid user data received' }
        }
        
        // Create user object matching our interface
        const user: User = {
          id: userData.id,
          email: userData.email,
          fullName: userData.fullName || '',
          role: userData.role,
          partnerRole: userData.partnerRole,
          partnerAccountId: userData.partnerAccountId,
          mobileNumber: userData.mobileNumber,
          isAccreditedInstaller: userData.isAccreditedInstaller || false,
          isAuthorisedInspector: userData.isAuthorisedInspector || false,
          installerCertificationNumber: userData.installerCertificationNumber,
          inspectorCertificationNumber: userData.inspectorCertificationNumber,
          accountStatus: userData.accountStatus || 'ACTIVE',
          isVerified: userData.isVerified || false,
          created: userData.created || new Date().toISOString()
        }
        
        setUser(user)
        
        // Store user and token in localStorage
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('authToken', token)
        
        // Also set cookies for middleware to read
        document.cookie = `authToken=${token}; path=/; max-age=86400; SameSite=Lax`
        document.cookie = `userRole=${user.role}; path=/; max-age=86400; SameSite=Lax`
        if (user.partnerRole) {
          document.cookie = `partnerRole=${user.partnerRole}; path=/; max-age=86400; SameSite=Lax`
        }
        
        return { success: true }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error: unknown) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Login failed. Please try again.' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsLoading(true)

    // Clear localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    localStorage.removeItem('token')
    
    // Clear cookies for middleware
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'partnerRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

    erpsApi.auth.logout().finally(() => {
      setIsLoading(false)
      // Redirect to login after logout
      window.location.href = '/login'
    })
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading, isInitialized }}>
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