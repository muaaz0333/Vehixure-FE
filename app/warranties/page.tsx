"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { DataTable } from "@/components/ui/data-table"
import { PageHeader } from "@/components/ui/page-header"
import { CreateWarrantyModal } from "@/components/ui/create-warranty-modal"
import { AgentSelectionModal } from "@/components/ui/agent-selection-modal"
import { erpsApi } from "@/lib/api/client"
import { useAuth } from "@/components/providers/auth-provider"
import { Shield } from "lucide-react"
import { useRouter } from 'next/navigation'

interface WarrantyTableItem {
  [key: string]: string | number | boolean
}

const columns = [
  { key: "id", label: "No", sortable: true },
  { key: "corrosion", label: "Corrosion", sortable: true },
  { key: "installDate", label: "Install Date", sortable: true },
  { key: "agent", label: "Agent", sortable: true },
  { key: "serialNo", label: "Serial No.", sortable: false },
  { key: "year", label: "Year", sortable: false },
  { key: "make", label: "Make", sortable: true },
  { key: "model", label: "Model", sortable: true },
  { key: "status", label: "Rego", sortable: false },
  { key: "activated", label: "Activated", sortable: false },
  { key: "action", label: "Action", sortable: false }
]

const tabs = [
  { id: "warranties", label: "Warranties", active: true, href: "/warranties" },
  { id: "corrosion", label: "Warranties with Corrosion", active: false, href: "/warranties/corrosion" },
  { id: "saved", label: "Saved Forms", active: false, href: "/warranties/saved" },
  { id: "deleted", label: "Deleted Warranties", active: false, href: "/warranties/deleted" },
  { id: "terms", label: "Terms and Conditions", active: false, href: "/warranties/terms" }
]

export default function WarrantiesPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const handleLogout = () => {
    logout()
    router.push('/login')
  }
  const isErpsAdmin = user?.role === 'ERPS_ADMIN'

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAgentModal, setShowAgentModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<{
    id: string
    name: string
    company: string
    email: string
    phone: string
    location: string
    accountStatus: "Active" | "inactive"
  } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [warranties, setWarranties] = useState<WarrantyTableItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  // Fetch warranties from API
  const fetchWarranties = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await erpsApi.warranties.getAll({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        status: statusFilter
      })

      console.log('API Response:', response) // Debug log

      // Handle different response structures
      // The API might return { warranties: [...] } directly or wrapped in { data: { warranties: [...] } }
      let warrantiesArray: Array<{
        id: string
        customerName: string
        companyName: string
        vehicle: string
        vinNumber: string
        installerName: string
        verificationStatus: string
        status: string
        corrosionFound: boolean
        photoCount: number
        created: string
        verifiedAt: string | null
        rejectionReason: string | null
      }> = []

      // Check various possible response structures
      const responseData = response as unknown as Record<string, unknown>

      if (Array.isArray(responseData.warranties)) {
        // Direct { warranties: [...] } structure
        warrantiesArray = responseData.warranties as typeof warrantiesArray
      } else if (responseData.data && typeof responseData.data === 'object') {
        const dataObj = responseData.data as Record<string, unknown>
        if (Array.isArray(dataObj.warranties)) {
          // Wrapped { data: { warranties: [...] } } structure
          warrantiesArray = dataObj.warranties as typeof warrantiesArray
        } else if (Array.isArray(dataObj)) {
          // { data: [...] } structure
          warrantiesArray = dataObj as typeof warrantiesArray
        }
      } else if (Array.isArray(responseData.data)) {
        warrantiesArray = responseData.data as typeof warrantiesArray
      }

      console.log('Warranties Array:', warrantiesArray) // Debug log

      // Transform API data to table format
      const tableData: WarrantyTableItem[] = warrantiesArray.map((w, index) => ({
        id: index + 1,
        corrosion: w.corrosionFound ? 'Yes' : 'No',
        installDate: w.created ? new Date(w.created).toLocaleDateString('en-AU') : '-',
        agent: w.installerName || '-',
        serialNo: w.vinNumber,
        year: '-',
        make: w.vehicle?.split(' ')[0] || '-',
        model: w.vehicle?.split(' ').slice(1).join(' ') || '-',
        status: w.status,
        activated: w.status === 'ACTIVE' || w.verificationStatus === 'VERIFIED' ? 'Y' : 'N'
      }))

      console.log('Table Data:', tableData) // Debug log
      setWarranties(tableData)

      if (response.pagination) {
        setPagination(response.pagination)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch warranties')
      console.error('Error fetching warranties:', err)
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, searchTerm, statusFilter])

  useEffect(() => {
    fetchWarranties()
  }, [fetchWarranties])

  const handleCreateWarranty = () => {
    setShowAgentModal(true)
  }

  const handleAgentSelect = (agent: {
    id: string
    name: string
    company: string
    email: string
    phone: string
    location: string
    accountStatus: "Active" | "inactive"
  }) => {
    setSelectedAgent(agent)
    setShowAgentModal(false)
    setShowCreateModal(true)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="shrink-0">
        <PageHeader
          title="Warranties"
          showSearch
          searchValue={searchTerm}
          onSearchChange={handleSearch}
          onAdd={handleCreateWarranty}
          user={user ?? undefined}
          onLogout={handleLogout}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="p-6">
          {/* Tabs */}
          <div className="mb-4 bg-white">
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto border-b border-gray-200 px-1 sm:px-0 scrollbar-hide">
                {tabs.map((tab) => (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={`
                      py-3 text-sm font-medium whitespace-nowrap border-b-2
                      ${tab.active
                        ? "text-red-600 border-red-600"
                        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"}
                    `}
                  >
                    {tab.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Warranties Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Warranties</h2>
                <div className="flex items-center gap-4">
                  {isErpsAdmin && (
                    <Link
                      href="/admin/warranties"
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Shield className="h-4 w-4" />
                      Admin Verification
                    </Link>
                  )}
                  <select
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                    value={statusFilter}
                    onChange={handleStatusChange}
                  >
                    <option value="">All</option>
                    <option value="VERIFIED_ACTIVE">Active</option>
                    <option value="DRAFT">Draft</option>
                    <option value="SUBMITTED_PENDING_VERIFICATION">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-3 text-gray-600">Loading warranties...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-2">{error}</div>
                <button
                  onClick={fetchWarranties}
                  className="text-blue-600 hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : (
              <div className="h-[calc(100vh-240px)] flex flex-col">
                <DataTable
                  data={warranties}
                  columns={columns}
                  itemsPerPage={pagination.limit}
                />
              </div>

            )}
          </div>
        </div>

        {/* Agent Selection Modal */}
        <AgentSelectionModal
          isOpen={showAgentModal}
          onClose={() => setShowAgentModal(false)}
          onSelectAgent={handleAgentSelect}
        />

        {/* Create Warranty Modal */}
        <CreateWarrantyModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          selectedAgent={selectedAgent}
        />
      </div>
    </div>
  )
}
