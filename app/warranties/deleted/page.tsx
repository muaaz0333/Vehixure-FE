"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import { PageHeader } from "@/components/ui/page-header"
import { CreateWarrantyModal } from "@/components/ui/create-warranty-modal"
import { AgentSelectionModal } from "@/components/ui/agent-selection-modal"
import { Search } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from 'next/navigation'

// Mock deleted warranties data
const mockDeletedWarranties = [
  {
    id: 1,
    corrosion: "No",
    installDate: "15-11-2024",
    agent: "Former Agent Co",
    serialNo: "EC44050",
    year: "2020",
    make: "Holden",
    model: "Colorado",
    rego: "OLD123",
    activated: "N",
    deletedDate: "01-12-2024",
    deletedBy: "Admin User",
    reason: "Duplicate Entry"
  },
  {
    id: 2,
    corrosion: "Yes",
    installDate: "20-10-2024",
    agent: "Closed Motors Ltd",
    serialNo: "EC44051",
    year: "2019",
    make: "Mazda",
    model: "BT-50",
    rego: "DEL456",
    activated: "Y",
    deletedDate: "28-11-2024",
    deletedBy: "System Admin",
    reason: "Customer Request"
  },
  {
    id: 3,
    corrosion: "No",
    installDate: "05-09-2024",
    agent: "Expired Dealers",
    serialNo: "EC44052",
    year: "2018",
    make: "Ford",
    model: "Ranger",
    rego: "EXP789",
    activated: "Y",
    deletedDate: "25-11-2024",
    deletedBy: "Manager",
    reason: "Data Correction"
  },
  {
    id: 4,
    corrosion: "Yes",
    installDate: "12-08-2024",
    agent: "Terminated Agency",
    serialNo: "EC44053",
    year: "2017",
    make: "Toyota",
    model: "Hilux",
    rego: "TER012",
    activated: "N",
    deletedDate: "20-11-2024",
    deletedBy: "Admin User",
    reason: "Agent Termination"
  },
  {
    id: 5,
    corrosion: "No",
    installDate: "30-07-2024",
    agent: "Revoked License Co",
    serialNo: "EC44054",
    year: "2016",
    make: "Nissan",
    model: "Navara",
    rego: "REV345",
    activated: "Y",
    deletedDate: "15-11-2024",
    deletedBy: "System Admin",
    reason: "License Revoked"
  },
  {
    id: 6,
    corrosion: "Yes",
    installDate: "18-06-2024",
    agent: "Bankrupt Motors",
    serialNo: "EC44055",
    year: "2015",
    make: "Isuzu",
    model: "D-Max",
    rego: "BNK678",
    activated: "N",
    deletedDate: "10-11-2024",
    deletedBy: "Manager",
    reason: "Business Closure"
  }
]

const columns = [
  { key: "id", label: "No", sortable: true },
  { key: "corrosion", label: "Corrosion", sortable: true },
  { key: "installDate", label: "Install Date", sortable: true },
  { key: "agent", label: "Agent", sortable: true },
  { key: "serialNo", label: "Serial No.", sortable: false },
  { key: "year", label: "Year", sortable: false },
  { key: "make", label: "Make", sortable: true },
  { key: "model", label: "Model", sortable: true },
  { key: "rego", label: "Rego", sortable: false },
  { key: "deletedDate", label: "Deleted Date", sortable: true },
  { key: "deletedBy", label: "Deleted By", sortable: true },
  { key: "reason", label: "Reason", sortable: true },
  { key: "action", label: "Action", sortable: false }
]

const tabs = [
  { id: "warranties", label: "Warranties", active: false, href: "/warranties" },
  { id: "corrosion", label: "Warranties with Corrosion", active: false, href: "/warranties/corrosion" },
  { id: "saved", label: "Saved Forms", active: false, href: "/warranties/saved" },
  { id: "deleted", label: "Deleted Warranties", active: true, href: "/warranties/deleted" },
  { id: "terms", label: "Terms and Conditions", active: false, href: "/warranties/terms" }
]

export default function DeletedWarrantiesPage() {
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

  const filteredWarranties = mockDeletedWarranties.filter(warranty =>
    Object.values(warranty).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )
  const { user, logout } = useAuth()
  const router = useRouter()
  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="shrink-0">
        <PageHeader
          title="Warranties"
          showSearch
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onAdd={handleCreateWarranty}
          user={user}
          onLogout={handleLogout}
        />

      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="p-6">
          {/* Tabs */}
          {/* <div className="mb-6">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${tab.active
                    ? "text-red-600 border-red-600"
                    : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div> */}


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


          {/* Deleted Warranties Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Deleted Warranties</h2>
                <div className="flex items-center gap-4">

                  <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                    <option>All Reasons</option>
                    <option>Duplicate Entry</option>
                    <option>Customer Request</option>
                    <option>Data Correction</option>
                    <option>Agent Termination</option>
                    <option>License Revoked</option>
                    <option>Business Closure</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="h-[calc(100vh-240px)] flex flex-col">
              <DataTable
                data={filteredWarranties}
                columns={columns}
                itemsPerPage={10}
              />
            </div>

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