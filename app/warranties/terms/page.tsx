"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AddTermsModal } from "@/components/ui/add-terms-modal"
import { Search, MoreHorizontal } from "lucide-react"

// Mock terms and conditions data
const mockTermsData = [
  {
    revision: "Rev 7",
    name: "ECO-PRO",
    description: "Limited Lifetime Corrosion, 5 Year Product",
    added: "01-02-2016",
    deactivated: "08-06-2017",
    replacedBy: "REV 8",
    status: "In-Active"
  },
  {
    revision: "Rev 8",
    name: "ECO-PRO",
    description: "Limited Lifetime Corrosion, 5 Year Product",
    added: "01-02-2016",
    deactivated: "08-06-2017",
    replacedBy: "REV 8",
    status: "Active"
  },
  {
    revision: "Rev 8",
    name: "ECO-PRO",
    description: "Limited Lifetime Corrosion, 5 Year Product",
    added: "01-02-2016",
    deactivated: "08-06-2017",
    replacedBy: "REV 8",
    status: "In-Active"
  },
  {
    revision: "Rev 4",
    name: "ECO-PRO",
    description: "Limited Lifetime Corrosion, 5 Year Product",
    added: "01-02-2016",
    deactivated: "08-06-2017",
    replacedBy: "REV 8",
    status: "In-Active"
  },
  {
    revision: "Rev 3",
    name: "ECO-PRO",
    description: "Limited Lifetime Corrosion, 5 Year Product",
    added: "01-02-2016",
    deactivated: "08-06-2017",
    replacedBy: "REV 8",
    status: "In-Active"
  },
  {
    revision: "Rev 2",
    name: "ECO-PRO",
    description: "Limited Lifetime Corrosion, 5 Year Product",
    added: "01-02-2016",
    deactivated: "08-06-2017",
    replacedBy: "REV 8",
    status: "In-Active"
  },
  {
    revision: "Rev 0",
    name: "ECO-PRO",
    description: "Limited Lifetime Corrosion, 5 Year Product",
    added: "01-02-2016",
    deactivated: "08-06-2017",
    replacedBy: "REV 8",
    status: "In-Active"
  },
  {
    revision: "Rev 1",
    name: "ECO-PRO",
    description: "Limited Lifetime Corrosion, 5 Year Product",
    added: "01-02-2016",
    deactivated: "08-06-2017",
    replacedBy: "REV 8",
    status: "In-Active"
  },
  {
    revision: "Rev 3",
    name: "ECO-PRO",
    description: "Limited Lifetime Corrosion, 5 Year Product",
    added: "01-02-2016",
    deactivated: "08-06-2017",
    replacedBy: "REV 8",
    status: "In-Active"
  },
  {
    revision: "Rev 4",
    name: "ECO-PRO",
    description: "Limited Lifetime Corrosion, 5 Year Product",
    added: "01-02-2016",
    deactivated: "08-06-2017",
    replacedBy: "REV 8",
    status: "In-Active"
  }
]

const columns = [
  { key: "revision", label: "Revision", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "description", label: "Description", sortable: true },
  { key: "added", label: "Added", sortable: true },
  { key: "deactivated", label: "Deactivated", sortable: true },
  { key: "replacedBy", label: "Replaced By", sortable: true },
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

  const filteredTerms = mockTermsData.filter(term =>
    Object.values(term).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Terms and Conditions</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Add Terms and Conditions
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="text-sm font-medium">Anthony</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden p-6 flex flex-col">
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

        {/* Terms and Conditions Section */}
        <div className="bg-white rounded-lg shadow flex flex-col flex-1 min-h-0">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Terms and Conditions</h2>
              <div className="flex items-center gap-4">
                <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                  <option>All</option>
                  <option>Active</option>
                  <option>In-Active</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto min-h-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                {filteredTerms.map((term, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {term.revision}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {term.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      {term.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {term.added}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {term.deactivated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-red-600 font-medium">{term.replacedBy}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${term.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                        }`}>
                        {term.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                1-10 of 5000 items
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  &lt;&lt;
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  &lt;
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  4
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  5
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  &gt;
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  &gt;&gt;
                </button>
                <select className="ml-4 border border-gray-300 rounded px-2 py-1 text-sm">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                <span className="text-sm text-gray-500 ml-2">Items per page</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Terms Modal */}
      <AddTermsModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  )
}