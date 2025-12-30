"use client"

import { useState } from 'react'
import { useWarranties, useCreateWarranty } from '@/lib/hooks/use-warranties'
import { useAuth } from '@/components/providers/auth-provider'

// Example component showing React Query usage with role-based access
export function WarrantyList() {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<string>('')
  
  // Get current user for role checking
  const { user, isAuthenticated } = useAuth()
  
  // Fetch warranties with pagination and filtering
  const { 
    data: warranties, 
    isLoading, 
    error, 
    refetch 
  } = useWarranties({ 
    page, 
    limit: 10, 
    ...(status && { status }) 
  })
  
  // Create warranty mutation
  const createWarrantyMutation = useCreateWarranty()
  
  const handleCreateWarranty = async () => {
    try {
      await createWarrantyMutation.mutateAsync({
        title: 'New Warranty',
        description: 'Warranty description',
        status: 'pending'
      })
    } catch (error) {
      console.error('Failed to create warranty:', error)
    }
  }
  
  if (!isAuthenticated || !user) {
    return <div>Please log in to view warranties</div>
  }
  
  // Role-based UI rendering
  const canCreateWarranty = ['ERPS_ADMIN', 'PARTNER_USER'].includes(user.role)
  const canViewAllWarranties = user.role === 'ERPS_ADMIN'
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Warranties</h1>
        
        {canCreateWarranty && (
          <button
            onClick={handleCreateWarranty}
            disabled={createWarrantyMutation.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {createWarrantyMutation.isPending ? 'Creating...' : 'Create Warranty'}
          </button>
        )}
      </div>
      
      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
        
        <button
          onClick={() => refetch()}
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>
      
      {/* Loading state */}
      {isLoading && <div>Loading warranties...</div>}
      
      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error.message}
        </div>
      )}
      
      {/* Warranties list */}
      {warranties && (
        <div className="space-y-4">
          {(warranties as any).data?.map((warranty: any) => (
            <div key={warranty.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{warranty.title}</h3>
                  <p className="text-gray-600">{warranty.description}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded ${
                    warranty.status === 'active' ? 'bg-green-100 text-green-800' :
                    warranty.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {warranty.status}
                  </span>
                </div>
                
                {canViewAllWarranties && (
                  <div className="text-sm text-gray-500">
                    ID: {warranty.id}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            
            <span>Page {page}</span>
            
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={!(warranties as any).hasMore}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
