"use client"

import InspectorSidebar from '@/components/layouts/inspector-sidebar'
import { Search, User } from 'lucide-react'
import { RouteGuard } from "@/components/auth/route-guard"
import { useAuth } from "@/components/providers/auth-provider"
import { LogoutButton } from "@/components/auth/logout-button"

export default function InspectorDashboard() {
  const { user } = useAuth()
  return (
    <RouteGuard allowedRoles={['inspector']}>
      <div className="flex h-screen bg-gray-50">
        <InspectorSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Welcome Back, {user?.name || 'Inspector'}
              </h1>

              <div className="flex items-center gap-4">
                <LogoutButton />
                <Search className="w-5 h-5 text-gray-400" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-700">{user?.name?.charAt(0) || 'I'}</span>
                  </div>
                  <span className="text-sm text-gray-700">{user?.name || 'Inspector'}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-5">
            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Record Inspection Card */}
              {/* <div className="bg-pink-100 rounded-2xl p-8 hover:shadow-lg transition-shadow cursor-pointer">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Record Inspection
                </h2>
                <p className="text-gray-700 text-sm mb-2">
                  Select this option to :-
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <p>Search for a Vehicle, Print</p>
                  <p>Inspection Sheet, Record an</p>
                  <p>Inspections</p>
                </p>
              </div> */}



              <div className="bg-pink-100 rounded-xl p-8 shadow-2xl border-4 border-white hover:shadow-lg transition-shadow cursor-pointer">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Record Inspection
                </h2>
                <p className="text-gray-700 text-sm mb-2">
                  Select this option to :-
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <p>Search for a Vehicle, Print</p>
                  <p>Inspection Sheet, Record an</p>
                  <p>Inspections</p>
                </p>
              </div>




              {/* Search for Vehicle Card */}
              {/* <div className="bg-pink-100 rounded-2xl p-8 hover:shadow-lg transition-shadow cursor-pointer">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Search for  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>Vehicle
                </h2>
                <p className="text-gray-700 text-sm mb-2">
                  Select this option to :-
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Find vehicle inspection details
                </p>
              </div>*/}
            









            <div className="bg-pink-100 rounded-xl p-8 shadow-2xl border-4 border-white hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Search for  <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Vehicle
              </h2>
              <p className="text-gray-700 text-sm mb-2">
                Select this option to :-
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Find vehicle inspection details
              </p>
            </div>

            </div>

            {/* Dashboard Cards */}

          </main>
        </div>
      </div >
    </RouteGuard >
  )
}