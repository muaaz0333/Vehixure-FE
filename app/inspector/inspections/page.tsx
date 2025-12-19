'use client'

import InspectorSidebar from '@/components/layouts/inspector-sidebar'
import { Search, User, MoreHorizontal, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Mock data for inspections
const upcomingInspections = [
  { no: 1, dueDate: '08-12-2025', stockId: 'U21342', vin: 'JT4HNV09J...', year: 2010, make: 'TOYOTA', model: 'LANDCRUISER', registration: '424RAP' },
  { no: 2, dueDate: '08-12-2025', stockId: 'U21342', vin: 'JT4HNV09J...', year: 2010, make: 'TOYOTA', model: 'LANDCRUISER', registration: '424RAP' },
  { no: 3, dueDate: '08-12-2025', stockId: 'U21342', vin: 'JT4HNV09J...', year: 2010, make: 'TOYOTA', model: 'LANDCRUISER', registration: '424RAP' },
  { no: 4, dueDate: '08-12-2025', stockId: 'U21342', vin: 'JT4HNV09J...', year: 2010, make: 'TOYOTA', model: 'LANDCRUISER', registration: '424RAP' },
  { no: 5, dueDate: '08-12-2025', stockId: 'U21342', vin: 'JT4HNV09J...', year: 2010, make: 'TOYOTA', model: 'LANDCRUISER', registration: '424RAP' },
  { no: 6, dueDate: '08-12-2025', stockId: 'U21342', vin: 'JT4HNV09J...', year: 2010, make: 'TOYOTA', model: 'LANDCRUISER', registration: '424RAP' },
  { no: 7, dueDate: '08-12-2025', stockId: 'U21342', vin: 'JT4HNV09J...', year: 2010, make: 'TOYOTA', model: 'LANDCRUISER', registration: '424RAP' },
  { no: 8, dueDate: '08-12-2025', stockId: 'U21342', vin: 'JT4HNV09J...', year: 2010, make: 'TOYOTA', model: 'LANDCRUISER', registration: '424RAP' },
  { no: 9, dueDate: '08-12-2025', stockId: 'U21342', vin: 'JT4HNV09J...', year: 2010, make: 'TOYOTA', model: 'LANDCRUISER', registration: '424RAP' },
  { no: 10, dueDate: '08-12-2025', stockId: 'U21342', vin: 'JT4HNV09J...', year: 2010, make: 'TOYOTA', model: 'LANDCRUISER', registration: '424RAP' },
]

const completedInspections = [
  { no: 1, completedDate: '05-12-2025', stockId: 'U21340', vin: 'JT4HNV09J...', year: 2009, make: 'HONDA', model: 'ACCORD', registration: '123ABC' },
  { no: 2, completedDate: '04-12-2025', stockId: 'U21338', vin: 'JT4HNV09J...', year: 2011, make: 'NISSAN', model: 'PATROL', registration: '456DEF' },
  { no: 3, completedDate: '03-12-2025', stockId: 'U21336', vin: 'JT4HNV09J...', year: 2012, make: 'TOYOTA', model: 'HILUX', registration: '789GHI' },
  { no: 4, completedDate: '02-12-2025', stockId: 'U21334', vin: 'JT4HNV09J...', year: 2010, make: 'FORD', model: 'RANGER', registration: '321JKL' },
  { no: 5, completedDate: '01-12-2025', stockId: 'U21332', vin: 'JT4HNV09J...', year: 2013, make: 'TOYOTA', model: 'PRADO', registration: '654MNO' },
]

export default function InspectionsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showRecordInspection, setShowRecordInspection] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (showRecordInspection) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)
    }
  }, [showRecordInspection])


  const currentData = activeTab === 'upcoming' ? upcomingInspections : completedInspections
  const totalItems = activeTab === 'upcoming' ? 5000 : 250

  const filteredData = currentData.filter((item) => {
    if (!searchValue.trim()) return true

    const query = searchValue.toLowerCase()

    return (
      item.stockId?.toLowerCase().includes(query) ||
      item.vin?.toLowerCase().includes(query) ||
      item.registration?.toLowerCase().includes(query) ||
      item.make?.toLowerCase().includes(query) ||
      item.model?.toLowerCase().includes(query)
    )
  })


  return (
    <div className="flex h-screen bg-gray-50">
      <InspectorSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Inspections</h1>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowRecordInspection(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Search className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => setShowRecordInspection(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
              >
                Record Inspection
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm text-gray-700">Inspector</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Record Inspection Panel */}
          {showRecordInspection && (
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Record Inspection</h2>
                <button
                  onClick={() => setShowRecordInspection(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Search for :</label>
                <div className="flex items-center gap-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="EX: 135932"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                  />

                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'upcoming'
                ? 'text-red-600'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Upcoming
              {activeTab === 'upcoming' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'completed'
                ? 'text-red-600'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Completed
              {activeTab === 'completed' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
              )}
            </button>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {activeTab === 'upcoming' ? 'Upcoming' : 'Completed'}
              </h2>
              <button className="text-sm text-gray-600 flex items-center gap-1">
                All
                <span className="ml-1">▼</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                      {activeTab === 'upcoming' ? 'Due Date' : 'Completed Date'}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                      Stock ID / Ref No ⇅
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">VIN No.</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Year</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Make ⇅</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Model ⇅</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Registration</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.no} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{item.no}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {activeTab === 'upcoming' ? item.dueDate : (item as unknown).completedDate}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.stockId}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.vin}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.year}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.make}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.model}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.registration}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <button className="hover:bg-gray-100 p-1 rounded">
                          <MoreHorizontal className="w-5 h-5 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="py-8 text-center text-sm text-gray-500"
                      >
                        No inspections found
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                1-{itemsPerPage} of {totalItems} items
              </div>

              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded border border-gray-300">
                  <ChevronsLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded border border-gray-300">
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>

                <button className="px-3 py-1 bg-gray-900 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 hover:bg-gray-100 rounded text-sm text-gray-600">2</button>
                <button className="px-3 py-1 hover:bg-gray-100 rounded text-sm text-gray-600">3</button>
                <button className="px-3 py-1 hover:bg-gray-100 rounded text-sm text-gray-600">4</button>
                <button className="px-3 py-1 hover:bg-gray-100 rounded text-sm text-gray-600">5</button>

                <button className="p-1 hover:bg-gray-100 rounded border border-gray-300">
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded border border-gray-300">
                  <ChevronsRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-sm text-gray-500">Items per page</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
