'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

import { AlphabetTabs } from '@/components/ui/alphabet-tabs'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { AgentModal } from '@/components/ui/agent-modal'
import { SuccessModal } from '@/components/ui/success-modal'
import { Plus } from 'lucide-react'

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

// Mock data for agents
const agentsData = [
  {
    no: 1,
    businessName: 'Darra 4x4',
    installerID: 'Q2127',
    contact: 'William Stibbard',
    username: 'william.stibbard@darrademos.com.au',
    password: 'darra4x4',
    status: 'Active',
    loginSent: 'Y',
    streetAddress: '123 Main Street',
    city: 'Brisbane',
    state: 'QLD',
    postcode: '4000',
    faxNumber: '07-3333-4444',
    personalPhoneNumber: '0412-345-678',
    email: 'william.stibbard@darrademos.com.au',
    installerId: 'Q2127',
    agentType: 'Admin',
    productsSold: ['ECO-PRO'],
    buyPrice: 'Price 1',
    accountStatus: 'Active'
  },
  {
    no: 2,
    businessName: 'Brisbane Motors',
    installerID: 'Q2128',
    contact: 'Sarah Johnson',
    username: 'sarah.johnson@brisbanemotors.com.au',
    password: 'brismotors',
    status: 'Active',
    loginSent: 'Y',
    streetAddress: '456 Queen Street',
    city: 'Brisbane',
    state: 'QLD',
    postcode: '4001',
    faxNumber: '07-3444-5555',
    personalPhoneNumber: '0423-456-789',
    email: 'sarah.johnson@brisbanemotors.com.au',
    installerId: 'Q2128',
    agentType: 'Manager',
    productsSold: ['ECO-PRO-10'],
    buyPrice: 'Price 2',
    accountStatus: 'Active'
  },
  {
    no: 3,
    businessName: 'Gold Coast Auto',
    installerID: 'Q2129',
    contact: 'Michael Brown',
    username: 'michael.brown@gcauto.com.au',
    password: 'gcauto123',
    status: 'Inactive',
    loginSent: 'N',
    streetAddress: '789 Pacific Highway',
    city: 'Gold Coast',
    state: 'QLD',
    postcode: '4217',
    faxNumber: '07-5555-6666',
    personalPhoneNumber: '0434-567-890',
    email: 'michael.brown@gcauto.com.au',
    installerId: 'Q2129',
    agentType: 'Support',
    productsSold: ['ERPS'],
    buyPrice: 'Price 3',
    accountStatus: 'Inactive'
  },
  {
    no: 4,
    businessName: 'Sunshine Coast Services',
    installerID: 'Q2130',
    contact: 'Emma Wilson',
    username: 'emma.wilson@scservices.com.au',
    password: 'sunshine2024',
    status: 'Active',
    loginSent: 'Y',
    streetAddress: '321 Nicklin Way',
    city: 'Sunshine Coast',
    state: 'QLD',
    postcode: '4551',
    faxNumber: '07-5444-7777',
    personalPhoneNumber: '0445-678-901',
    email: 'emma.wilson@scservices.com.au',
    installerId: 'Q2130',
    agentType: 'Viewer',
    productsSold: ['ECO-PRO'],
    buyPrice: 'Price 1',
    accountStatus: 'Active'
  },
  {
    no: 5,
    businessName: 'Toowoomba Tech',
    installerID: 'Q2131',
    contact: 'James Davis',
    username: 'james.davis@toowoombatech.com.au',
    password: 'ttech2024',
    status: 'Pending',
    loginSent: 'N',
    streetAddress: '654 Ruthven Street',
    city: 'Toowoomba',
    state: 'QLD',
    postcode: '4350',
    faxNumber: '07-4666-8888',
    personalPhoneNumber: '0456-789-012',
    email: 'james.davis@toowoombatech.com.au',
    installerId: 'Q2131',
    agentType: 'Menu Item',
    productsSold: ['ECO-PRO-10'],
    buyPrice: 'Price 2',
    accountStatus: 'Pending'
  },
  {
    no: 6,
    businessName: 'Cairns Car Care',
    installerID: 'Q2132',
    contact: 'Lisa Anderson',
    username: 'lisa.anderson@cairnscare.com.au',
    password: 'cairns123',
    status: 'Active',
    loginSent: 'Y',
    streetAddress: '987 Sheridan Street',
    city: 'Cairns',
    state: 'QLD',
    postcode: '4870',
    faxNumber: '07-4777-9999',
    personalPhoneNumber: '0467-890-123',
    email: 'lisa.anderson@cairnscare.com.au',
    installerId: 'Q2132',
    agentType: 'Admin',
    productsSold: ['ERPS'],
    buyPrice: 'Price 3',
    accountStatus: 'Active'
  },
  {
    no: 7,
    businessName: 'Rockhampton Repairs',
    installerID: 'Q2133',
    contact: 'David Miller',
    username: 'david.miller@rockrepairs.com.au',
    password: 'rockrepairs',
    status: 'Active',
    loginSent: 'Y',
    streetAddress: '147 East Street',
    city: 'Rockhampton',
    state: 'QLD',
    postcode: '4700',
    faxNumber: '07-4888-0000',
    personalPhoneNumber: '0478-901-234',
    email: 'david.miller@rockrepairs.com.au',
    installerId: 'Q2133',
    agentType: 'Manager',
    productsSold: ['ECO-PRO'],
    buyPrice: 'Price 1',
    accountStatus: 'Active'
  },
  {
    no: 8,
    businessName: 'Mackay Motors',
    installerID: 'Q2134',
    contact: 'Jennifer Taylor',
    username: 'jennifer.taylor@mackaymotors.com.au',
    password: 'mackay2024',
    status: 'Inactive',
    loginSent: 'N',
    streetAddress: '258 Victoria Street',
    city: 'Mackay',
    state: 'QLD',
    postcode: '4740',
    faxNumber: '07-4999-1111',
    personalPhoneNumber: '0489-012-345',
    email: 'jennifer.taylor@mackaymotors.com.au',
    installerId: 'Q2134',
    agentType: 'Support',
    productsSold: ['ECO-PRO-10'],
    buyPrice: 'Price 2',
    accountStatus: 'Inactive'
  },
  {
    no: 9,
    businessName: 'Townsville Trade',
    installerID: 'Q2135',
    contact: 'Robert Garcia',
    username: 'robert.garcia@townsvilletrade.com.au',
    password: 'townsville123',
    status: 'Active',
    loginSent: 'Y',
    streetAddress: '369 Flinders Street',
    city: 'Townsville',
    state: 'QLD',
    postcode: '4810',
    faxNumber: '07-4000-2222',
    personalPhoneNumber: '0490-123-456',
    email: 'robert.garcia@townsvilletrade.com.au',
    installerId: 'Q2135',
    agentType: 'Viewer',
    productsSold: ['ERPS'],
    buyPrice: 'Price 3',
    accountStatus: 'Active'
  },
  {
    no: 10,
    businessName: 'Bundaberg Business',
    installerID: 'Q2136',
    contact: 'Michelle Martinez',
    username: 'michelle.martinez@bundabergbiz.com.au',
    password: 'bundaberg2024',
    status: 'Active',
    loginSent: 'Y',
    streetAddress: '741 Bourbong Street',
    city: 'Bundaberg',
    state: 'QLD',
    postcode: '4670',
    faxNumber: '07-4111-3333',
    personalPhoneNumber: '0401-234-567',
    email: 'michelle.martinez@bundabergbiz.com.au',
    installerId: 'Q2136',
    agentType: 'Admin',
    productsSold: ['ECO-PRO'],
    buyPrice: 'Price 1',
    accountStatus: 'Active'
  }
]

const columns = [
  { key: 'no', label: 'No', width: '60px' },
  { key: 'businessName', label: 'Business Name', width: '150px' },
  { key: 'installerID', label: 'Installer ID', width: '120px' },
  { key: 'contact', label: 'Contact', width: '150px' },
  { key: 'username', label: 'Username', width: '250px' },
  { key: 'password', label: 'Password', width: '120px' },
  { key: 'status', label: 'Status', width: '100px' },
  { key: 'loginSent', label: 'Login Sent', width: '100px' }
]

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState('ALL')
  const alphabetRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [agents, setAgents] = useState(agentsData)
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [selectedAgent, setSelectedAgent] = useState<typeof agentsData[0] | null>(null)
  const [lastSavedAgent, setLastSavedAgent] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')


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

  const handleEditAgent = (agent: typeof agentsData[0]) => {
    setSelectedAgent(agent)
    setModalMode('edit')
    setIsAgentModalOpen(true)
  }

  const handleSaveAgent = (agentData: AgentData) => {
    if (modalMode === 'add') {
      const newAgent = {
        ...agentData,
        no: agents.length + 1,
        installerID: `Q${2136 + agents.length + 1}`,
        status: agentData.accountStatus,
        loginSent: 'N'
      }
      setAgents([...agents, newAgent as typeof agents[0]])
    } else {
      setAgents(agents.map(agent =>
        agent.no === selectedAgent?.no
          ? { ...agent, ...agentData, status: agentData.accountStatus }
          : agent
      ))
    }

    setLastSavedAgent(agentData.businessName)
    setIsAgentModalOpen(false)
    setIsSuccessModalOpen(true)
  }

  const handleSuccessEditAgent = () => {
    setIsSuccessModalOpen(false)
    setModalMode('edit')
    setIsAgentModalOpen(true)
  }

  const filteredAgents = agents.filter(agent => {
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
      agent.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())

    return matchesAlphabet && matchesSearch
  })



  // Transform agents data to match TableRow interface
  const transformedAgents = filteredAgents.map(agent => ({
    no: agent.no,
    businessName: agent.businessName,
    installerID: agent.installerID,
    contact: agent.contact,
    username: agent.username,
    password: agent.password,
    status: agent.status,
    loginSent: agent.loginSent
  }))

  // Use agents data directly since DataTable handles actions internally

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
        />
      </div>




      {/* Sub navigation tabs */}
      {/* <div className="bg-white border-b">
        <div className="px-6">
          <div className="flex border-b"> */}
      <div className="bg-white border-b">
        <div className="px-4 sm:px-6">
          <div className="flex gap-4 overflow-x-auto border-b">

            <Link href="/agents">
              <button className="px-4 py-3 text-sm font-medium border-b-2 border-red-500 text-red-600">
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
          {/* <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Agents</h2>
            <Button
              onClick={handleAddAgent}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          </div> */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="hidden sm:block text-lg font-semibold text-gray-900">
              Agents
            </h2>

            <Button
              onClick={handleAddAgent}
              className="hidden sm:inline-flex bg-red-600 hover:bg-red-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          </div>


          {/* Alphabet tabs */}
          <div className="overflow-x-auto -mx-3 px-3 py-2 border-b">
            <AlphabetTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>


          {/* Data table */}
          {/* Data table */}
          <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg [&_.pagination]:py-1 [&_.pagination]:text-xs sm:[&_.pagination]:py-3 sm:[&_.pagination]:text-sm">
            <DataTable
              columns={columns}
              data={transformedAgents}
              title=""
              showSearch={false}
              showAdd={false}
              showEdit={false}
              onRowEdit={(row) => {
                // Find the original agent data using the row number
                const originalAgent = filteredAgents.find(agent => agent.no === row.no)
                if (originalAgent) {
                  handleEditAgent(originalAgent)
                }
              }}
            />
          </div>

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