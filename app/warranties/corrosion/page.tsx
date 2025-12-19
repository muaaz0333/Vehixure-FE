"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import { PageHeader } from "@/components/ui/page-header"
import { CreateWarrantyModal } from "@/components/ui/create-warranty-modal"
import { AgentSelectionModal } from "@/components/ui/agent-selection-modal"
import { Search } from "lucide-react"

// Mock warranties with corrosion data
const mockCorrosionWarranties = [
  {
    id: 1,
    corrosion: "Yes",
    installDate: "15-03-2024",
    agent: "Coastal Auto Services",
    serialNo: "EC55201",
    year: "2022",
    make: "Ford",
    model: "Ranger",
    rego: "ABC123",
    activated: "Y",
    corrosionLevel: "Moderate",
    inspectionDate: "20-03-2024"
  },
  {
    id: 2,
    corrosion: "Yes",
    installDate: "22-01-2024",
    agent: "Marine Protection Co",
    serialNo: "EC55202",
    year: "2021",
    make: "Toyota",
    model: "Hilux",
    rego: "DEF456",
    activated: "Y",
    corrosionLevel: "Severe",
    inspectionDate: "25-01-2024"
  },
  {
    id: 3,
    corrosion: "Yes",
    installDate: "10-02-2024",
    agent: "Salt Air Motors",
    serialNo: "EC55203",
    year: "2023",
    make: "Nissan",
    model: "Navara",
    rego: "GHI789",
    activated: "Y",
    corrosionLevel: "Minor",
    inspectionDate: "12-02-2024"
  },
  {
    id: 4,
    corrosion: "Yes",
    installDate: "05-04-2024",
    agent: "Beachside Auto",
    serialNo: "EC55204",
    year: "2020",
    make: "Isuzu",
    model: "D-Max",
    rego: "JKL012",
    activated: "Y",
    corrosionLevel: "Moderate",
    inspectionDate: "08-04-2024"
  },
  {
    id: 5,
    corrosion: "Yes",
    installDate: "18-05-2024",
    agent: "Ocean View Motors",
    serialNo: "EC55205",
    year: "2022",
    make: "Mitsubishi",
    model: "Triton",
    rego: "MNO345",
    activated: "Y",
    corrosionLevel: "Severe",
    inspectionDate: "20-05-2024"
  }
]

const columns = [
  { key: "id", label: "No", sortable: true },
  { key: "corrosion", label: "Corrosion", sortable: true },
  { key: "corrosionLevel", label: "Corrosion Level", sortable: true },
  { key: "installDate", label: "Install Date", sortable: true },
  { key: "inspectionDate", label: "Inspection Date", sortable: true },
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
  { id: "warranties", label: "Warranties", active: false, href: "/warranties" },
  { id: "corrosion", label: "Warranties with Corrosion", active: true, href: "/warranties/corrosion" },
  { id: "saved", label: "Saved Forms", active: false, href: "/warranties/saved" },
  { id: "deleted", label: "Deleted Warranties", active: false, href: "/warranties/deleted" },
  { id: "terms", label: "Terms and Conditions", active: false, href: "/warranties/terms" }
]

export default function WarrantiesWithCorrosionPage() {
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

  const filteredWarranties = mockCorrosionWarranties.filter(warranty =>
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
          <div className="mb-6">
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
          </div>

          {/* Warranties with Corrosion Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Warranties with Corrosion</h2>
                <div className="flex items-center gap-4">

                  <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                    <option>All Levels</option>
                    <option>Minor</option>
                    <option>Moderate</option>
                    <option>Severe</option>
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