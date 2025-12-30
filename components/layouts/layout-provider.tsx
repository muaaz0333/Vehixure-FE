'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { Sidebar } from '@/components/shared/sidebar'
import { AgentSidebar } from '@/components/shared/agent-sidebar'
import { MobileHeader } from '@/components/shared/mobile-header'

interface LayoutProviderProps {
  children: React.ReactNode
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Dashboard routes that need sidebar
  const isDashboardRoute = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/agents') || 
                          pathname.startsWith('/inspectors') || 
                          pathname.startsWith('/inspections') || 
                          pathname.startsWith('/warranties') ||
                          pathname.startsWith('/stats') ||
                          pathname.startsWith('/account') ||
                          pathname.startsWith('/admin')

  // Agent routes that need agent sidebar
  const isAgentRoute = pathname.startsWith('/agent-dashboard') || 
                      pathname.startsWith('/agent/')

  // Routes that need header and footer but no sidebar
  const isPublicRoute = pathname === '/' || 
                       pathname === '/login' || 
                       pathname === '/activate-warranty'

  // Agent layout with agent sidebar
  if (isAgentRoute) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <AgentSidebar />
        </div>
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 h-screen w-[285px] max-w-[85vw] bg-[#1a1a1a] shadow-lg rounded-tr-[20px] rounded-br-[20px] transform transition-transform duration-300 ease-in-out">
              <AgentSidebar onClose={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile Header */}
          <div className="lg:hidden shrink-0">
            <MobileHeader 
              onMenuClick={() => setIsSidebarOpen(true)}
              title="Agent Dashboard"
            />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    )
  }

  // Dashboard layout with sidebar
  if (isDashboardRoute) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 h-screen w-[285px] max-w-[85vw] bg-[#1a1a1a] shadow-lg rounded-tr-[20px] rounded-br-[20px] transform transition-transform duration-300 ease-in-out">
              <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile Header */}
          <div className="lg:hidden shrink-0">
            <MobileHeader 
              onMenuClick={() => setIsSidebarOpen(true)}
              title="Dashboard"
            />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    )
  }

  // Public layout with header and footer
  if (isPublicRoute) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header showNavigation={!pathname.startsWith('/dashboard')} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    )
  }

  // Default layout (fallback)
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}