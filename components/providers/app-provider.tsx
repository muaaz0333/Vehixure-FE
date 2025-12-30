"use client"

import { ReactNode } from 'react'
import { useAuth } from './auth-provider'
import { ClientOnly } from './client-only'
import { ErrorBoundary } from './error-boundary'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ErrorBoundary>
      <ClientOnly 
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading application...</p>
            </div>
          </div>
        }
      >
        <AppContent>{children}</AppContent>
      </ClientOnly>
    </ErrorBoundary>
  )
}

function AppContent({ children }: { children: ReactNode }) {
  const { isInitialized } = useAuth()

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Initializing authentication...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}