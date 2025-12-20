'use client'

import InspectorSidebar from '@/components/layouts/inspector-sidebar'
import { Search, User, MoreHorizontal, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, Menu, Calendar, Car, Hash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Mock data for inspections
interface UpcomingInspection {
  no: number
  dueDate: string
  stockId: string
  vin: string
  year: number
  make: string
  model: string
  registration: string
}

interface CompletedInspection {
  no: number
  completedDate: string
  stockId: string
  vin: string
  year: number
  make: string
  model: string
  registration: string
}

const upcomingInspections: UpcomingInspection[] = [
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

const completedInspections: CompletedInspection[] = [
  { no: 1, completedDate: '05-12-2025', stockId: 'U21340', vin: 'JT4HNV09J...', year: 2009, make: 'HONDA', model: 'ACCORD', registration: '123ABC' },
  { no: 2, completedDate: '04-12-2025', stockId: 'U21338', vin: 'JT4HNV09J...', year: 2011, make: 'NISSAN', model: 'PATROL', registration: '456DEF' },
  { no: 3, completedDate: '03-12-2025', stockId: 'U21336', vin: 'JT4HNV09J...', year: 2012, make: 'TOYOTA', model: 'HILUX', registration: '789GHI' },
  { no: 4, completedDate: '02-12-2025', stockId: 'U21334', vin: 'JT4HNV09J...', year: 2010, make: 'FORD', model: 'RANGER', registration: '321JKL' },
  { no: 5, completedDate: '01-12-2025', stockId: 'U21332', vin: 'JT4HNV09J...', year: 2013, make: 'TOYOTA', model: 'PRADO', registration: '654MNO' },
]

export default function InspectionsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showRecordInspection, setShowRecordInspection] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
    <div className="flex h-dvh bg-gray-50 overflow-hidden">
      <InspectorSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="flex-1 flex flex-col lg:ml-0 min-h-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Inspections</h1>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
              <button
                onClick={() => setShowRecordInspection(true)}
                className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
              >
                <Search className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => setShowRecordInspection(true)}
                className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Record Inspection</span>
                <span className="sm:hidden">Record</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm text-gray-700 hidden md:block">Inspector</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-hidden flex flex-col min-h-0">
          {/* Record Inspection Panel */}
          {showRecordInspection && (
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6 shrink-0">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Record Inspection</h2>
                <button
                  onClick={() => setShowRecordInspection(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 lg:gap-4">
                <label className="text-sm font-medium text-gray-700 shrink-0">Search for:</label>
                <div className="flex items-center gap-2 flex-1 sm:flex-none">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="EX: 135932"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white flex-1 sm:w-48"
                  />
                  <button className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 shrink-0">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-4 sm:gap-6 lg:gap-8 border-b border-gray-200 mb-3 sm:mb-4 lg:mb-6 shrink-0">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-2 sm:pb-3 text-sm font-medium transition-colors relative ${activeTab === 'upcoming'
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
              className={`pb-2 sm:pb-3 text-sm font-medium transition-colors relative ${activeTab === 'completed'
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

          {/* Content Area */}
          <div className="bg-white rounded-lg border border-gray-200 flex flex-col flex-1 min-h-0">
            <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between shrink-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                {activeTab === 'upcoming' ? 'Upcoming' : 'Completed'}
              </h2>
              <button className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                All
                <span className="ml-1">▼</span>
              </button>
            </div>

            {/* Mobile Card View (visible on small screens) */}
            <div className="block sm:hidden flex-1 overflow-y-auto">
              <div className="p-3 space-y-3">
                {filteredData.map((item) => (
                  <div key={item.no} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">#{item.no}</span>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {activeTab === 'upcoming' ? 'Due:' : 'Completed:'} 
                        </span>
                        <span className="font-medium">
                          {activeTab === 'upcoming' 
                            ? (item as UpcomingInspection).dueDate 
                            : (item as CompletedInspection).completedDate}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Hash className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Stock ID:</span>
                        <span className="font-medium">{item.stockId}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Car className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{item.year} {item.make} {item.model}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm pt-1">
                        <div>
                          <span className="text-gray-600">VIN:</span>
                          <div className="font-mono text-xs">{item.vin}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Reg:</span>
                          <div className="font-medium">{item.registration}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredData.length === 0 && (
                  <div className="text-center py-8 text-sm text-gray-500">
                    No inspections found
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Table View (hidden on small screens) */}
            <div className="hidden sm:block flex-1 min-h-0 overflow-y-auto">
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[700px] text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="px-3 lg:px-4 py-3 text-left text-xs font-medium text-gray-600">No</th>
                      <th className="px-3 lg:px-4 py-3 text-left text-xs font-medium text-gray-600">
                        {activeTab === 'upcoming' ? 'Due Date' : 'Completed Date'}
                      </th>
                      <th className="px-3 lg:px-4 py-3 text-left text-xs font-medium text-gray-600">
                        Stock ID ⇅
                      </th>
                      <th className="px-3 lg:px-4 py-3 text-left text-xs font-medium text-gray-600">VIN No.</th>
                      <th className="px-3 lg:px-4 py-3 text-left text-xs font-medium text-gray-600">Year</th>
                      <th className="px-3 lg:px-4 py-3 text-left text-xs font-medium text-gray-600">Make ⇅</th>
                      <th className="px-3 lg:px-4 py-3 text-left text-xs font-medium text-gray-600">Model ⇅</th>
                      <th className="px-3 lg:px-4 py-3 text-left text-xs font-medium text-gray-600">Registration</th>
                      <th className="px-3 lg:px-4 py-3 text-left text-xs font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <tr key={item.no} className="hover:bg-gray-50">
                        <td className="px-3 lg:px-4 py-3 text-sm text-gray-900 font-medium">{item.no}</td>
                        <td className="px-3 lg:px-4 py-3 text-sm text-gray-900">
                          {activeTab === 'upcoming' 
                            ? (item as UpcomingInspection).dueDate 
                            : (item as CompletedInspection).completedDate}
                        </td>
                        <td className="px-3 lg:px-4 py-3 text-sm text-gray-900">{item.stockId}</td>
                        <td className="px-3 lg:px-4 py-3 text-xs text-gray-900 font-mono">{item.vin}</td>
                        <td className="px-3 lg:px-4 py-3 text-sm text-gray-900">{item.year}</td>
                        <td className="px-3 lg:px-4 py-3 text-sm text-gray-900">{item.make}</td>
                        <td className="px-3 lg:px-4 py-3 text-sm text-gray-900">{item.model}</td>
                        <td className="px-3 lg:px-4 py-3 text-sm text-gray-900">{item.registration}</td>
                        <td className="px-3 lg:px-4 py-3 text-sm text-gray-900">
                          <button className="hover:bg-gray-100 p-1 rounded">
                            <MoreHorizontal className="w-4 h-4 text-gray-600" />
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
            </div>

            {/* Pagination */}
            <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 shrink-0">
              <div className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
                1-{itemsPerPage} of {totalItems} items
              </div>

              <div className="flex items-center gap-1 order-1 sm:order-2">
                <button className="p-1 hover:bg-gray-100 rounded border border-gray-300">
                  <ChevronsLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded border border-gray-300">
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                </button>

                <button className="px-2 sm:px-3 py-1 bg-gray-900 text-white rounded text-xs sm:text-sm min-w-[28px]">1</button>
                <button className="px-2 sm:px-3 py-1 hover:bg-gray-100 rounded text-xs sm:text-sm text-gray-600 min-w-[28px]">2</button>
                <button className="px-2 sm:px-3 py-1 hover:bg-gray-100 rounded text-xs sm:text-sm text-gray-600 min-w-[28px]">3</button>
                <button className="px-2 sm:px-3 py-1 hover:bg-gray-100 rounded text-xs sm:text-sm text-gray-600 min-w-[28px] hidden md:inline-block">4</button>
                <button className="px-2 sm:px-3 py-1 hover:bg-gray-100 rounded text-xs sm:text-sm text-gray-600 min-w-[28px] hidden md:inline-block">5</button>

                <button className="p-1 hover:bg-gray-100 rounded border border-gray-300">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded border border-gray-300">
                  <ChevronsRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                </button>
              </div>

              <div className="flex items-center gap-2 order-3 text-sm">
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
                <span className="text-gray-500 hidden sm:inline whitespace-nowrap">per page</span>
                <span className="text-gray-500 sm:hidden">/page</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}