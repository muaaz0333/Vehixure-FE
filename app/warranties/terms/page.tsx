"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AddTermsModal } from "@/components/ui/add-terms-modal"
import { Search, MoreHorizontal } from "lucide-react"
import { erpsApi } from "@/lib/api/client"

interface WarrantyTerm {
  id: string
  revision: string
  warrantyName: string
  description: string
  addedDate?: string
  created?: string
  deactivatedDate?: string | null
  replacedBy?: string | null
  status?: string
  isActive?: boolean
  addType?: string
  generatorLightColour?: string
  termsAndConditions?: string
  inspectionInstructions?: string
}

const columns = [
  { key: "revision", label: "Revision", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "description", label: "Description", sortable: true },
  { key: "added", label: "Added", sortable: true },
  { key: "isActive", label: "Activated", sortable: true },
  { key: "addType", label: "Add Type", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "action", label: "Action", sortable: false }
]

const tabs = [
  { id: "warranties", label: "Warranties", active: false, href: "/warranties" },
  { id: "corrosion", label: "Warranties with Corrosion", active: false, href: "/warranties/corrosion" },
  { id: "saved", label: "Saved Forms", active: false, href: "/warranties/saved" },
  { id: "deleted", label: "Deleted Warranties", active: false, href: "/warranties/deleted" },
  { id: "terms", label: "Terms and Conditions", active: true, href: "/warranties/terms" }
]

export default function TermsAndConditionsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [terms, setTerms] = useState<WarrantyTerm[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  const fetchTerms = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await erpsApi.warrantyTerms.getAll({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        status: statusFilter
      })

      console.log('Terms API Response:', response)

      // Handle response - check various structures
      const responseData = response as unknown as Record<string, unknown>
      let termsArray: WarrantyTerm[] = []

      if (Array.isArray(responseData.terms)) {
        termsArray = responseData.terms as WarrantyTerm[]
      } else if (Array.isArray(responseData.warrantyTerms)) {
        termsArray = responseData.warrantyTerms as WarrantyTerm[]
      } else if (Array.isArray(responseData.data)) {
        termsArray = responseData.data as WarrantyTerm[]
      } else if (responseData.data && typeof responseData.data === 'object') {
        const dataObj = responseData.data as Record<string, unknown>
        if (Array.isArray(dataObj.terms)) {
          termsArray = dataObj.terms as WarrantyTerm[]
        } else if (Array.isArray(dataObj.warrantyTerms)) {
          termsArray = dataObj.warrantyTerms as WarrantyTerm[]
        }
      }

      console.log('Terms Array:', termsArray)
      setTerms(termsArray)

      // Update pagination if available
      if (responseData.pagination) {
        setPagination(responseData.pagination as typeof pagination)
      } else if (responseData.total) {
        setPagination(prev => ({
          ...prev,
          total: responseData.total as number,
          totalPages: Math.ceil((responseData.total as number) / prev.limit)
        }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch terms')
      console.error('Error fetching terms:', err)
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, searchTerm, statusFilter])

  useEffect(() => {
    fetchTerms()
  }, [fetchTerms])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('en-AU')
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 sm:px-6 py-3 sm:py-4 gap-3 lg:gap-0">
          <h1 className="text-xl font-semibold text-gray-900">Terms and Conditions</h1>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Add Terms and Conditions
            </Button>
          </div>

          {/* Mobile + Tablet search */}
          <div className="lg:hidden relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden p-6 flex flex-col">
        {/* Tabs */}
        <div className="mb-4 bg-white">
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto border-b border-gray-200 px-1 sm:px-0 scrollbar-hide">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`py-3 text-sm font-medium whitespace-nowrap border-b-2 ${tab.active
                    ? "text-red-600 border-red-600"
                    : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Terms and Conditions Section */}
        <div className="bg-white rounded-lg shadow flex flex-col flex-1 min-h-0">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Terms and Conditions</h2>
              <div className="flex items-center gap-4">
                <select
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                  value={statusFilter}
                  onChange={handleStatusChange}
                >
                  <option value="">All</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">In-Active</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-3 text-gray-600">Loading terms...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-2">{error}</div>
              <button onClick={fetchTerms} className="text-blue-600 hover:underline">
                Try again
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-auto min-h-0">
              <table className="w-full">
                <thead className="sticky top-0 z-20 bg-gray-50 border-b border-gray-200">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50"
                      >
                        <div className="flex items-center gap-1">
                          {column.label}
                          {column.sortable && (
                            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M5 8l5-5 5 5H5z" />
                            </svg>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {terms.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                        No terms found
                      </td>
                    </tr>
                  ) : (
                    terms.map((term, index) => (
                      <tr key={term.id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {term.revision || `Rev ${index}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {term.warrantyName || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                          {term.description || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(term.addedDate || term.created as string)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {(term.isActive ? 'Yes' : 'No')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="text-red-600 font-medium">
                            {term.addType || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${term.status === "ACTIVE" || term.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                            }`}>
                            {term.status === "ACTIVE" ? "Active" : term.status === "INACTIVE" ? "In-Active" : term.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="px-4 sm:px-6 py-3 border-t border-gray-200 shrink-0">
            <div className="grid grid-cols-3 sm:grid-cols-3 items-center gap-3">
              <div className="text-xs sm:text-sm text-gray-500">
                {pagination.total > 0
                  ? `${(pagination.page - 1) * pagination.limit + 1}–${Math.min(pagination.page * pagination.limit, pagination.total)} of ${pagination.total} items`
                  : `${terms.length} items`
                }
              </div>

              <div className="flex items-center gap-1 overflow-x-auto">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.page === 1}
                  className="px-2 py-1 border rounded text-xs sm:text-sm disabled:opacity-50"
                >
                  &laquo;
                </button>
                <button
                  onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                  disabled={pagination.page === 1}
                  className="px-2 py-1 border rounded text-xs sm:text-sm disabled:opacity-50"
                >
                  &lsaquo;
                </button>

                {Array.from({ length: Math.min(5, pagination.totalPages || 1) }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-2 py-1 rounded text-xs sm:text-sm ${pagination.page === pageNum
                      ? "bg-red-600 text-white"
                      : "border hover:bg-gray-50"
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(Math.min(pagination.totalPages || 1, pagination.page + 1))}
                  disabled={pagination.page >= (pagination.totalPages || 1)}
                  className="px-2 py-1 border rounded text-xs sm:text-sm disabled:opacity-50"
                >
                  &rsaquo;
                </button>
                <button
                  onClick={() => handlePageChange(pagination.totalPages || 1)}
                  disabled={pagination.page >= (pagination.totalPages || 1)}
                  className="px-2 py-1 border rounded text-xs sm:text-sm disabled:opacity-50"
                >
                  &raquo;
                </button>

                {/* <select
                  className="hidden sm:block ml-3 border rounded px-2 py-1 text-sm"
                  value={pagination.limit}
                  onChange={(e) => setPagination(prev => ({ ...prev, limit: Number(e.target.value), page: 1 }))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Terms Modal */}
      <AddTermsModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchTerms}
      />
    </div>
  )
}
