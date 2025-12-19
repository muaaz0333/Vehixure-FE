"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import { PageHeader } from "@/components/ui/page-header"
import { CreateWarrantyModal } from "@/components/ui/create-warranty-modal"
import { AgentSelectionModal } from "@/components/ui/agent-selection-modal"
import { Search } from "lucide-react"

// Mock saved forms data
const mockSavedForms = [
  {
    id: 1,
    formName: "Draft Warranty - Ford Ranger",
    customerName: "John Smith",
    agent: "ABB NorthSales",
    serialNo: "EC44097",
    year: "2023",
    make: "Ford",
    model: "Ranger",
    rego: "XYZ789",
    savedDate: "12-12-2024",
    status: "Draft",
    completionPercentage: "75%"
  },
  {
    id: 2,
    formName: "Incomplete Warranty - Toyota Hilux",
    customerName: "Sarah Johnson",
    agent: "Coastal Auto Services",
    serialNo: "EC44098",
    year: "2022",
    make: "Toyota",
    model: "Hilux",
    rego: "ABC456",
    savedDate: "10-12-2024",
    status: "Incomplete",
    completionPercentage: "45%"
  },
  {
    id: 3,
    formName: "Pending Review - Nissan Navara",
    customerName: "Mike Wilson",
    agent: "Marine Protection Co",
    serialNo: "EC44099",
    year: "2024",
    make: "Nissan",
    model: "Navara",
    rego: "DEF123",
    savedDate: "08-12-2024",
    status: "Pending Review",
    completionPercentage: "90%"
  },
  {
    id: 4,
    formName: "Draft Warranty - Isuzu D-Max",
    customerName: "Emma Davis",
    agent: "Salt Air Motors",
    serialNo: "EC44100",
    year: "2023",
    make: "Isuzu",
    model: "D-Max",
    rego: "GHI789",
    savedDate: "05-12-2024",
    status: "Draft",
    completionPercentage: "60%"
  },
  {
    id: 5,
    formName: "Incomplete Warranty - Mitsubishi Triton",
    customerName: "David Brown",
    agent: "Beachside Auto",
    serialNo: "EC44101",
    year: "2021",
    make: "Mitsubishi",
    model: "Triton",
    rego: "JKL012",
    savedDate: "03-12-2024",
    status: "Incomplete",
    completionPercentage: "30%"
  },
  {
    id: 6,
    formName: "Draft Warranty - VW Amarok",
    customerName: "Lisa Anderson",
    agent: "Ocean View Motors",
    serialNo: "EC44102",
    year: "2023",
    make: "VW",
    model: "Amarok",
    rego: "MNO345",
    savedDate: "01-12-2024",
    status: "Draft",
    completionPercentage: "85%"
  }
]

const columns = [
  { key: "id", label: "No", sortable: true },
  { key: "formName", label: "Form Name", sortable: true },
  { key: "customerName", label: "Customer", sortable: true },
  { key: "agent", label: "Agent", sortable: true },
  { key: "serialNo", label: "Serial No.", sortable: false },
  { key: "make", label: "Make", sortable: true },
  { key: "model", label: "Model", sortable: true },
  { key: "rego", label: "Rego", sortable: false },
  { key: "savedDate", label: "Saved Date", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "completionPercentage", label: "Completion", sortable: true },
  { key: "action", label: "Action", sortable: false }
]

const tabs = [
  { id: "warranties", label: "Warranties", active: false, href: "/warranties" },
  { id: "corrosion", label: "Warranties with Corrosion", active: false, href: "/warranties/corrosion" },
  { id: "saved", label: "Saved Forms", active: true, href: "/warranties/saved" },
  { id: "deleted", label: "Deleted Warranties", active: false, href: "/warranties/deleted" },
  { id: "terms", label: "Terms and Conditions", active: false, href: "/warranties/terms" }
]

export default function SavedFormsPage() {
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

  const filteredForms = mockSavedForms.filter(form =>
    Object.values(form).some(value =>
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

          {/* Saved Forms Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Saved Forms</h2>
                <div className="flex items-center gap-4">
                 
                  <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                    <option>All Status</option>
                    <option>Draft</option>
                    <option>Incomplete</option>
                    <option>Pending Review</option>
                  </select>
                </div>
              </div>
            </div>

            <DataTable
              data={filteredForms}
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