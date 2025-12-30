"use client"

import { useAuth } from '@/components/providers/auth-provider'
import { useWarranties } from '@/lib/hooks/use-warranties'
import { useInspections } from '@/lib/hooks/use-inspections'

// Example dashboard component showing role-based data fetching
export function DashboardStats() {
  const { user, isAuthenticated } = useAuth()
  
  // Fetch data
  const { data: warranties, isLoading: warrantiesLoading } = useWarranties({ limit: 5 })
  const { data: inspections, isLoading: inspectionsLoading } = useInspections({ limit: 5 })
  
  if (!isAuthenticated || !user) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">
          Please log in to view dashboard
        </div>
      </div>
    )
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Welcome, {user.fullName}
        </h1>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {user.role}
        </span>
      </div>
      
      {/* Dashboard sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Warranties section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Warranties</h2>
          
          {warrantiesLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              {(warranties as any)?.data?.length || 0} warranties found
            </p>
          )}
        </div>
        
        {/* Inspections section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Inspections</h2>
          
          {inspectionsLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              {(inspections as any)?.data?.length || 0} inspections found
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
