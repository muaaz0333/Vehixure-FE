"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import { PageHeader } from "@/components/ui/page-header"
import { CreateWarrantyModal } from "@/components/ui/create-warranty-modal"
import { AgentSelectionModal } from "@/components/ui/agent-selection-modal"
import { Search } from "lucide-react"

// Mock warranty data
const mockWarranties = [
  {
    id: 1,
    corrosion: "No",
    installDate: "08-12-2025",
    agent: "ABB NorthSales",
    serialNo: "EC44096",
    year: "2023",
    make: "VW",
    model: "AMAROK",
    rego: "279HE8",
    activated: "Y"
  },
  {
    id: 2,
    corrosion: "No",
    installDate: "08-12-2025",
    agent: "ABB NorthSales",
    serialNo: "EC44096",
    year: "2023",
    make: "VW",
    model: "AMAROK",
    rego: "279HE8",
    activated: "Y"
  },
  {
    id: 3,
    corrosion: "No",
    installDate: "08-12-2025",
    agent: "ABB NorthSales",
    serialNo: "EC44096",
    year: "2023",
    make: "VW",
    model: "AMAROK",
    rego: "279HE8",
    activated: "Y"
  },
  {
    id: 4,
    corrosion: "No",
    installDate: "08-12-2025",
    agent: "ABB NorthSales",
    serialNo: "EC44096",
    year: "2023",
    make: "VW",
    model: "AMAROK",
    rego: "279HE8",
    activated: "Y"
  },
  {
    id: 5,
    corrosion: "No",
    installDate: "08-12-2025",
    agent: "ABB NorthSales",
    serialNo: "EC44096",
    year: "2023",
    make: "VW",
    model: "AMAROK",
    rego: "279HE8",
    activated: "Y"
  },
  {
    id: 6,
    corrosion: "No",
    installDate: "08-12-2025",
    agent: "ABB NorthSales",
    serialNo: "EC44096",
    year: "2023",
    make: "VW",
    model: "AMAROK",
    rego: "279HE8",
    activated: "Y"
  },
  {
    id: 7,
    corrosion: "No",
    installDate: "08-12-2025",
    agent: "ABB NorthSales",
    serialNo: "EC44096",
    year: "2023",
    make: "VW",
    model: "AMAROK",
    rego: "279HE8",
    activated: "Y"
  },
  {
    id: 8,
    corrosion: "No",
    installDate: "08-12-2025",
    agent: "ABB NorthSales",
    serialNo: "EC44096",
    year: "2023",
    make: "VW",
    model: "AMAROK",
    rego: "279HE8",
    activated: "Y"
  },
  {
    id: 9,
    corrosion: "No",
    installDate: "08-12-2025",
    agent: "ABB NorthSales",
    serialNo: "EC44096",
    year: "2023",
    make: "VW",
    model: "AMAROK",
    rego: "279HE8",
    activated: "Y"
  },
  {
    id: 10,
    corrosion: "Yes",
    installDate: "08-12-2025",
    agent: "ABB NorthSales",
    serialNo: "EC44096",
    year: "2023",
    make: "VW",
    model: "AMAROK",
    rego: "279HE8",
    activated: "Y"
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
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAgentModal, setShowAgentModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<{
    id: string
    name: string
    company: string
    email: string
    phone: string
    location: string
    status: "active" | "inactive"
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
    status: "active" | "inactive"
  }) => {
    setSelectedAgent(agent)
    setShowAgentModal(false)
    setShowCreateModal(true)
  }

  const filteredWarranties = mockWarranties.filter(warranty =>
    Object.values(warranty).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

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
        />

      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Tabs */}
          {/* <div className="mb-6 bg-white">
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


          {/* Warranties Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Warranties</h2>
                <div className="flex items-center gap-4">

                  <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <DataTable
              data={filteredWarranties}
              columns={columns}
              itemsPerPage={10}
            />
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