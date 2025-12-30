'use client'

import { useState } from 'react'
import { Search, MoreHorizontal, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Mock data for inspections
const upcomingInspections = [
  {
    no: 1,
    dueDate: '08-12-2025',
    stockId: 'U23462',
    vinNo: 'JTHBW09J...',
    year: '2010',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '424RAP'
  },
  {
    no: 2,
    dueDate: '08-12-2025',
    stockId: 'U23462',
    vinNo: 'JTHBW09J...',
    year: '2010',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '424RAP'
  },
  {
    no: 3,
    dueDate: '08-12-2025',
    stockId: 'U23462',
    vinNo: 'JTHBW09J...',
    year: '2010',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '424RAP'
  },
  {
    no: 4,
    dueDate: '08-12-2025',
    stockId: 'U23462',
    vinNo: 'JTHBW09J...',
    year: '2010',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '424RAP'
  },
  {
    no: 5,
    dueDate: '08-12-2025',
    stockId: 'U23462',
    vinNo: 'JTHBW09J...',
    year: '2010',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '424RAP'
  },
  {
    no: 6,
    dueDate: '08-12-2025',
    stockId: 'U23462',
    vinNo: 'JTHBW09J...',
    year: '2010',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '424RAP'
  },
  {
    no: 7,
    dueDate: '08-12-2025',
    stockId: 'U23462',
    vinNo: 'JTHBW09J...',
    year: '2010',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '424RAP'
  },
  {
    no: 8,
    dueDate: '08-12-2025',
    stockId: 'U23462',
    vinNo: 'JTHBW09J...',
    year: '2010',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '424RAP'
  },
  {
    no: 9,
    dueDate: '08-12-2025',
    stockId: 'U23462',
    vinNo: 'JTHBW09J...',
    year: '2010',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '424RAP'
  },
  {
    no: 10,
    dueDate: '08-12-2025',
    stockId: 'U23462',
    vinNo: 'JTHBW09J...',
    year: '2010',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '424RAP'
  }
]

const completedInspections = [
  {
    no: 1,
    dueDate: '05-12-2025',
    stockId: 'U23461',
    vinNo: 'JTHBW09J...',
    year: '2009',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '423RAP'
  },
  {
    no: 2,
    dueDate: '04-12-2025',
    stockId: 'U23460',
    vinNo: 'JTHBW09J...',
    year: '2008',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '422RAP'
  },
  {
    no: 3,
    dueDate: '03-12-2025',
    stockId: 'U23459',
    vinNo: 'JTHBW09J...',
    year: '2007',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '421RAP'
  },
  {
    no: 4,
    dueDate: '02-12-2025',
    stockId: 'U23458',
    vinNo: 'JTHBW09J...',
    year: '2006',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '420RAP'
  },
  {
    no: 5,
    dueDate: '01-12-2025',
    stockId: 'U23457',
    vinNo: 'JTHBW09J...',
    year: '2005',
    make: 'TOYOTA',
    model: 'LANDCRUISER',
    registration: '419RAP'
  }
]

export default function InspectionsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [searchValue, setSearchValue] = useState('')
  const [showRecordInspection, setShowRecordInspection] = useState(false)

  const currentData = activeTab === 'upcoming' ? upcomingInspections : completedInspections
  const filteredData = currentData.filter((inspection) =>
    Object.values(inspection).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    )
  )


  return (
    <div className="bg-gray-50 flex flex-col h-screen">

      {/* Header */}
      <div className="bg-white ">
        {/* <div className="px-6 py-4">
          <div className="flex items-center justify-between"> */}
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0">

            <h1 className="text-xl font-semibold text-gray-900">Inspections</h1>
            {/* <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                <Input
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-8 w-full lg:w-64"
                />

              </div>
              <Button
                onClick={() => setShowRecordInspection(!showRecordInspection)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Record Inspection
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sample Inspection Sheet</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium">Anthony</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div> */}

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3" />
                <Input
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>

              <Button
                onClick={() => setShowRecordInspection(!showRecordInspection)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Record Inspection
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sample Inspection Sheet</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium">Anthony</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Mobile + tablet search */}
            <div className="lg:hidden relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3" />
              <Input
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-8 w-full"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Record Inspection Section - Hidden by default, shows when button is clicked */}
      {showRecordInspection && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="px-6 py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Record Inspection</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Search for :
              </span>

              <div className="relative w-full">
                <Input
                  placeholder="EX: 135632"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pr-12"
                />

                <Button
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 h-8"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'upcoming'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'completed'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white flex flex-col flex-1 ">
        {/* <div className="h-full overflow-y-auto"> */}
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 capitalize">{activeTab}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">All</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto max-h-[56vh] overflow-auto">
            {/* <table className="w-full"> */}
            <table className="min-w-[900px] w-full">
              <thead className="sticky top-0 z-20 bg-white">
                <tr className="border-b border-gray-200">
                  <th className="sticky top-0 bg-white text-left py-3 px-4 text-sm font-medium text-gray-600">No</th>
                  <th className="sticky top-0 bg-white text-left py-3 px-4 text-sm font-medium text-gray-600">Due Date</th>
                  <th className="sticky top-0 bg-white text-left py-3 px-4 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">
                      Stock ID / Ref No
                      <div className="w-3 h-3 bg-gray-300 rounded-sm flex items-center justify-center">
                        <span className="text-xs text-gray-600">i</span>
                      </div>
                    </div>
                  </th>
                  <th className="sticky top-0 bg-white text-left py-3 px-4 text-sm font-medium text-gray-600">VIN No.</th>
                  <th className="sticky top-0 bg-white text-left py-3 px-4 text-sm font-medium text-gray-600">Year</th>
                  <th className="sticky top-0 bg-white text-left py-3 px-4 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">
                      Make
                      <div className="w-3 h-3 bg-gray-300 rounded-sm flex items-center justify-center">
                        <span className="text-xs text-gray-600">i</span>
                      </div>
                    </div>
                  </th>
                  <th className="sticky top-0 bg-white text-left py-3 px-4 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">
                      Model
                      <div className="w-3 h-3 bg-gray-300 rounded-sm flex items-center justify-center">
                        <span className="text-xs text-gray-600">i</span>
                      </div>
                    </div>
                  </th>
                  <th className="sticky top-0 bg-white text-left py-3 px-4 text-sm font-medium text-gray-600">Registration</th>
                  <th className="sticky top-0 bg-white text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((inspection) => (
                  <tr key={inspection.no} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{inspection.no}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{inspection.dueDate}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{inspection.stockId}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{inspection.vinNo}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{inspection.year}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{inspection.make}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{inspection.model}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{inspection.registration}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" className="p-1">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {/* <div className="flex items-center justify-between mt-6"> */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mt-6">
            <div className="text-sm text-gray-600">
              1-10 of 5000 items
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="p-2">
                <span className="sr-only">First page</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="p-2">
                <span className="sr-only">Previous page</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="bg-[#ED1C24] text-white border-red-900">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                4
              </Button>
              <Button variant="outline" size="sm">
                5
              </Button>
              <Button variant="outline" size="sm" className="p-2">
                <span className="sr-only">Next page</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="p-2">
                <span className="sr-only">Last page</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-sm text-gray-600">Items per page</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}