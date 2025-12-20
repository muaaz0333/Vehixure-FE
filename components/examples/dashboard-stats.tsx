"use client"

import { User } from '@/lib/auth'
import { useCurrentUser } from '@/lib/hooks/use-users'
import { useWarranties } from '@/lib/hooks/use-warranties'
import { useInspections } from '@/lib/hooks/use-inspections'

// Example dashboard component showing role-based data fetching
export function DashboardStats() {
  // Get current user for role-based access
  const { data: currentUser, isLoading: userLoading } = useCurrentUser()
  
  // Fetch data based on user role
  const { data: warranties, isLoading: warrantiesLoading } = useWarranties(
    { limit: 5 }, // Get recent 5 warranties
  )
  
  const { data: inspections, isLoading: inspectionsLoading } = useInspections(
    { limit: 5 }, // Get recent 5 inspections
    (currentUser as User)?.role
  )
  
  if (userLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }
  
  if (!currentUser) {
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
          Welcome, {(currentUser as User)?.name}
        </h1>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {(currentUser as User)?.role}
        </span>
      </div>
      
      {/* Role-based dashboard sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Warranties section - visible to agents and admins */}
        {['admin', 'agent'].includes((currentUser as User)?.role || '') && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Warranties</h2>
            
            {warrantiesLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (warranties as any)?.data?.length > 0 ? (
              <div className="space-y-3">
                {(warranties as any).data.slice(0, 5).map((warranty: any) => (
                  <div key={warranty.id} className="flex justify-between items-center">
                    <span className="text-sm">{warranty.title}</span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      warranty.status === 'active' ? 'bg-green-100 text-green-800' :
                      warranty.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {warranty.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No warranties found</p>
            )}
          </div>
        )}
        
        {/* Inspections section - visible to inspectors and admins */}
        {['admin', 'inspector'].includes((currentUser as User)?.role || '') && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Inspections</h2>
            
            {inspectionsLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (inspections as any)?.data?.length > 0 ? (
              <div className="space-y-3">
                {(inspections as any).data.slice(0, 5).map((inspection: any) => (
                  <div key={inspection.id} className="flex justify-between items-center">
                    <span className="text-sm">{inspection.title}</span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      inspection.status === 'completed' ? 'bg-green-100 text-green-800' :
                      inspection.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {inspection.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No inspections found</p>
            )}
          </div>
        )}
        
        {/* Admin-only stats */}
        {(currentUser as User)?.role === 'admin' && (
          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">System Overview</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {(warranties as any)?.total || 0}
                </div>
                <div className="text-sm text-gray-500">Total Warranties</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {(inspections as any)?.total || 0}
                </div>
                <div className="text-sm text-gray-500">Total Inspections</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {((warranties as any)?.total || 0) + ((inspections as any)?.total || 0)}
                </div>
                <div className="text-sm text-gray-500">Total Records</div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Quick actions based on role */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          {(currentUser as User)?.role === 'admin' && (
            <>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                Manage Users
              </button>
              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                View Reports
              </button>
            </>
          )}
          
          {['admin', 'agent'].includes((currentUser as User)?.role || '') && (
            <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
              Create Warranty
            </button>
          )}
          
          {['admin', 'inspector'].includes((currentUser as User)?.role || '') && (
            <button className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700">
              New Inspection
            </button>
          )}
        </div>
      </div>
    </div>
  )
}