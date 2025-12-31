'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

import { AlphabetTabs } from '@/components/ui/alphabet-tabs'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { AgentModal } from '@/components/ui/agent-modal'
import { SuccessModal } from '@/components/ui/success-modal'
import { Plus } from 'lucide-react'
import { usePartnerUsers, useCreatePartnerUser } from '@/lib/hooks/use-partner-accounts'
import { useAuth } from '@/components/providers/auth-provider'
import { useRouter } from 'next/navigation'

// Import AgentData type
interface AgentData {
  businessName: string
  contact: string
  streetAddress: string
  city: string
  state: string
  postcode: string
  faxNumber: string
  personalPhoneNumber: string
  email: string
  username: string
  password: string
  installerId: string
  agentType: string
  productsSold: string[]
  buyPrice: string
  accountStatus: string
}

const columns = [
  { key: 'no', label: 'No', width: '60px' },
  { key: 'businessName', label: 'Business Name', width: '150px' },
  { key: 'partnerRole', label: 'Partner Role', width: '150px' },
  { key: 'installerID', label: 'Installer ID', width: '120px' },
  { key: 'email', label: 'Email', width: '150px' },
  { key: 'phone', label: 'Phone', width: '250px' },
  { key: 'status', label: 'Status', width: '120px' },
  { key: 'status', label: 'Status', width: '100px' },
  { key: 'loginSent', label: 'Login Sent', width: '100px' }
]

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState('ALL')
  const alphabetRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [lastSavedAgent, setLastSavedAgent] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  const { user, logout } = useAuth()
  const router = useRouter()
  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm)

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 4000)
    return () => clearTimeout(t)
  }, [searchTerm])


  // Fetch partner users (agents)
  const { data, isLoading, error } = usePartnerUsers({
    page,
    limit: 50,
    search: debouncedSearch,
    role: 'ACCOUNT_ADMIN' // Filter for admin users who are typically agents
  })

  const createPartnerUser = useCreatePartnerUser()

  const users = Array.isArray(data?.data) ? data.data : []

  // Transform API data to match the table format
  const transformedAgents = users.map((user: any, index: number) => ({
    no: index + 1,
    partnerRole: user.partnerRole || 'N/A',
    businessName: user.fullName || 'N/A',
    installerID: user?.id ? user.id : 'N/A',
    email: user.email || 'N/A',
    phone: user.phone || 'N/A',
    status: user.isVerified || 'UNKNOWN',
    loginSent: user.isVerified ? 'Yes' : 'No'
  }))

  // Scroll to alphabet section when tab is clicked
  const handleTabChange = (letter: string) => {
    setActiveTab(letter)
    const element = alphabetRefs.current[letter]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleAddAgent = () => {
    setModalMode('add')
    setSelectedAgent(null)
    setIsAgentModalOpen(true)
  }

  const handleEditAgent = (agent: any) => {
    setSelectedAgent(agent)
    setModalMode('edit')
    setIsAgentModalOpen(true)
  }

  const handleSaveAgent = async (agentData: AgentData) => {
    try {
      if (modalMode === 'add') {
        // Create new partner user
        await createPartnerUser.mutateAsync({
          accountId: user?.partnerAccountId || '', // Use current user's account ID
          userData: {
            email: agentData.email,
            password: agentData.password,
            fullName: agentData.contact,
            partnerRole: 'ACCOUNT_ADMIN',
            phone: agentData.personalPhoneNumber,
            mobileNumber: agentData.personalPhoneNumber,
            isAccreditedInstaller: false,
            isAuthorisedInspector: false
          }
        })
      }
      // Note: Edit functionality would require additional API endpoints

      setLastSavedAgent(agentData.businessName)
      setIsAgentModalOpen(false)
      setIsSuccessModalOpen(true)
    } catch (error: unknown) {
      console.error('Error saving agent:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleSuccessEditAgent = () => {
    setIsSuccessModalOpen(false)
    setModalMode('edit')
    setIsAgentModalOpen(true)
  }

  const filteredAgents = transformedAgents.filter(agent => {
    const matchesAlphabet =
      activeTab === 'ALL'
        ? true
        : agent.businessName
          ?.toUpperCase()
          .startsWith(activeTab)

    const matchesSearch =
      agent.businessName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      agent.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())

    return matchesAlphabet && matchesSearch
  })

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg">Loading agents...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-red-600">Error loading agents: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className=" border-b sm:border-none">
        <PageHeader
          title="Agents/Inspectors"
          showSearch
          showAdd
          showEdit
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onAdd={handleAddAgent}
          onEdit={() => {
            if (!selectedAgent) return
            handleEditAgent(selectedAgent)
          }}
          user={user ?? undefined}
          onLogout={handleLogout}
        />
      </div>

      {/* Sub navigation tabs */}
      <div className="bg-white border-b">
        <div className="px-4 sm:px-6">
          <div className="flex gap-4 overflow-x-auto border-b">
            <Link href="/agents">
              <button type='button' className="px-4 py-3 text-sm font-medium border-b-2 border-red-500 text-red-600">
                Agents
              </button>
            </Link>
            <Link href="/inspectors">
              <button className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                Inspectors
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white overflow-hidden">
        <div className="h-full flex flex-col p-3 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="hidden sm:block text-lg font-semibold text-gray-900">
              Agents
            </h2>

            <Button
              onClick={handleAddAgent}
              type='button'
              className="hidden sm:inline-flex bg-red-600 hover:bg-red-700 text-white"
              disabled={createPartnerUser.isPending}
            >
              <Plus className="h-4 w-4 mr-2" />
              {createPartnerUser.isPending ? 'Adding...' : 'Add Agent'}
            </Button>
          </div>

          {/* Alphabet tabs */}
          <div className="hidden sm:block overflow-x-auto -mx-3 px-3 border-b">
            <AlphabetTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>

          {/* Data table */}
          <div className=" mt-2 flex-1 border border-gray-200 rounded-lg overflow-hidden [&_.pagination]:py-1 [&_.pagination]:text-xs sm:[&_.pagination]:py-3 sm:[&_.pagination]:text-sm">
            <DataTable
              columns={columns}
              data={filteredAgents}
              title=""
              showSearch={false}
              showAdd={false}
              showEdit={false}
              onRowEdit={(row) => {
                // Find the original user data using the row number
                const originalUser = users.find((_, index) => index + 1 === row.no)
                if (originalUser) {
                  handleEditAgent(originalUser)
                }
              }}
            />
          </div>

          {filteredAgents.length === 0 && !isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-500 text-lg">No agents found</div>
                <p className="text-gray-400 mt-2">
                  {searchTerm ? 'Try adjusting your search terms' : 'Add your first agent to get started'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AgentModal
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
        onSave={handleSaveAgent}
        mode={modalMode}
        initialData={selectedAgent || undefined}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onEditAgent={handleSuccessEditAgent}
        mode={modalMode}
        businessName={lastSavedAgent}
      />
    </div>
  )
}