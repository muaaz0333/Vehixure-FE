"use client"

import { useState } from 'react'
import { useWarranties } from '@/lib/hooks/use-warranties'
import { Button } from '@/components/ui/button'

export function WarrantiesList() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  })

  const { data, isLoading, error } = useWarranties({
    page,
    limit: 10,
    ...filters
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPage(1) // Reset to first page when filtering
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading warranties...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        Error loading warranties: {error.message}
      </div>
    )
  }

  const warranties = data?.data || []
  const pagination = data?.pagination

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Warranties</h2>
        <Button>Create New Warranty</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="SUBMITTED_PENDING_VERIFICATION">Pending Verification</option>
            <option value="VERIFIED_ACTIVE">Active</option>
            <option value="REJECTED_INSTALLER_DECLINED">Rejected</option>
            <option value="LAPSED">Lapsed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search VIN, make, model, owner..."
            className="p-2 border border-gray-300 rounded-md w-64"
          />
        </div>
      </div>

      {/* Warranties Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Installation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {warranties.map((warranty: any) => (
              <tr key={warranty.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {warranty.vehicleMake} {warranty.vehicleModel}
                    </div>
                    <div className="text-sm text-gray-500">
                      {warranty.vehicleYear} • {warranty.vehicleVin}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {warranty.ownerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {warranty.ownerEmail}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {warranty.installerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(warranty.installationDate).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    warranty.verificationStatus === 'VERIFIED_ACTIVE' 
                      ? 'bg-green-100 text-green-800'
                      : warranty.verificationStatus === 'DRAFT'
                      ? 'bg-yellow-100 text-yellow-800'
                      : warranty.verificationStatus === 'SUBMITTED_PENDING_VERIFICATION'
                      ? 'bg-blue-100 text-blue-800'
                      : warranty.verificationStatus === 'REJECTED_INSTALLER_DECLINED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {warranty.verificationStatus.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(warranty.warrantyExpiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    {warranty.verificationStatus === 'DRAFT' && (
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </Button>
            
            <span className="px-3 py-1 text-sm">
              Page {page} of {pagination.totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page >= pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {warranties.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No warranties found</div>
          <p className="text-gray-400 mt-2">
            {filters.search || filters.status 
              ? 'Try adjusting your filters' 
              : 'Create your first warranty to get started'
            }
          </p>
        </div>
      )}
    </div>
  )
}