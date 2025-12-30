"use client"

import InspectorSidebar from '@/components/layouts/inspector-sidebar'
import { Search, Menu } from 'lucide-react'
import { useAuth } from "@/components/providers/auth-provider"
import { LogoutButton } from "@/components/auth/logout-button"
import { useState } from 'react'

export default function InspectorDashboard() {
  const { user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
        <InspectorSidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">
                  Welcome Back, {user?.fullName || user?.email || 'Inspector'}
                </h1>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden sm:block">
                  <LogoutButton />
                </div>
                <Search className="w-5 h-5 text-gray-400 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-700">{user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'I'}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 hidden sm:block">{user?.fullName || user?.email || 'Inspector'}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-3 sm:p-5 overflow-auto">
            <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Record Inspection Card */}
              <div className="bg-pink-100 rounded-xl p-4 sm:p-8 shadow-2xl border-4 border-white hover:shadow-lg transition-shadow cursor-pointer">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  Record Inspection
                </h2>
                <p className="text-gray-700 text-xs sm:text-sm mb-2">
                  Select this option to :-
                </p>
                <div className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  <p>Search for a Vehicle, Print</p>
                  <p>Inspection Sheet, Record an</p>
                  <p>Inspections</p>
                </div>
              </div>

              {/* Search for Vehicle Card */}
              <div className="bg-pink-100 rounded-xl p-4 sm:p-8 shadow-2xl border-4 border-white hover:shadow-lg transition-shadow cursor-pointer">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  Search for Vehicle
                </h2>
                <p className="text-gray-700 text-xs sm:text-sm mb-2">
                  Select this option to :-
                </p>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Find vehicle inspection details
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
  )
}