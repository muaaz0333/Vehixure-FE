'use client'

import { useState } from 'react'
import { Search, ChevronDown, MoreHorizontal } from 'lucide-react'

type TabType = 'warranty' | 'sci-fleet' | 'market'

interface WarrantyData {
  id: number
  month: string
  agent: string
  total: number
  er02212: number
  er04212: number
  fr04212: number
  er08212: number
  er10212: number
  question: number
  efp501: number
  efp502: number
  question2: number
}

interface SCIFleetData {
  id: number
  month: string
  agent: string
  total: number
  inspections: number
  completed: number
  pending: number
  cancelled: number
}

interface MarketData {
  id: number
  region: string
  sales: number
  growth: number
  marketShare: number
  revenue: number
}

const warrantyMockData: WarrantyData[] = [
  { id: 1, month: 'All', agent: 'SCI-FLEET Toyota', total: 1403, er02212: 6, er04212: 84, fr04212: 156, er08212: 2, er10212: 7, question: 10, efp501: 62, efp502: 981, question2: 95 },
  { id: 2, month: '08-12-2025', agent: 'U21342', total: 0, er02212: 0, er04212: 0, fr04212: 2010, er08212: 0, er10212: 0, question: 0, efp501: 0, efp502: 0, question2: 0 },
  { id: 3, month: '08-12-2025', agent: 'U21342', total: 0, er02212: 0, er04212: 0, fr04212: 2010, er08212: 0, er10212: 0, question: 0, efp501: 0, efp502: 0, question2: 0 },
  { id: 4, month: '08-12-2025', agent: 'U21342', total: 0, er02212: 0, er04212: 0, fr04212: 2010, er08212: 0, er10212: 0, question: 0, efp501: 0, efp502: 0, question2: 0 },
  { id: 5, month: '08-12-2025', agent: 'U21342', total: 0, er02212: 0, er04212: 0, fr04212: 2010, er08212: 0, er10212: 0, question: 0, efp501: 0, efp502: 0, question2: 0 },
  { id: 6, month: '08-12-2025', agent: 'U21342', total: 0, er02212: 0, er04212: 0, fr04212: 2010, er08212: 0, er10212: 0, question: 0, efp501: 0, efp502: 0, question2: 0 },
  { id: 7, month: '08-12-2025', agent: 'U21342', total: 0, er02212: 0, er04212: 0, fr04212: 2010, er08212: 0, er10212: 0, question: 0, efp501: 0, efp502: 0, question2: 0 },
  { id: 8, month: '08-12-2025', agent: 'U21342', total: 0, er02212: 0, er04212: 0, fr04212: 2010, er08212: 0, er10212: 0, question: 0, efp501: 0, efp502: 0, question2: 0 },
  { id: 9, month: '08-12-2025', agent: 'U21342', total: 0, er02212: 0, er04212: 0, fr04212: 2010, er08212: 0, er10212: 0, question: 0, efp501: 0, efp502: 0, question2: 0 },
  { id: 10, month: '08-12-2025', agent: 'U21342', total: 0, er02212: 0, er04212: 0, fr04212: 2010, er08212: 0, er10212: 0, question: 0, efp501: 0, efp502: 0, question2: 0 },
]

const sciFleetMockData: SCIFleetData[] = [
  { id: 1, month: 'All', agent: 'SCI-FLEET Toyota', total: 2450, inspections: 2450, completed: 2100, pending: 250, cancelled: 100 },
  { id: 2, month: '08-12-2025', agent: 'U21342', total: 245, inspections: 245, completed: 210, pending: 25, cancelled: 10 },
  { id: 3, month: '08-12-2025', agent: 'U21342', total: 245, inspections: 245, completed: 210, pending: 25, cancelled: 10 },
  { id: 4, month: '08-12-2025', agent: 'U21342', total: 245, inspections: 245, completed: 210, pending: 25, cancelled: 10 },
  { id: 5, month: '08-12-2025', agent: 'U21342', total: 245, inspections: 245, completed: 210, pending: 25, cancelled: 10 },
  { id: 6, month: '08-12-2025', agent: 'U21342', total: 245, inspections: 245, completed: 210, pending: 25, cancelled: 10 },
  { id: 7, month: '08-12-2025', agent: 'U21342', total: 245, inspections: 245, completed: 210, pending: 25, cancelled: 10 },
  { id: 8, month: '08-12-2025', agent: 'U21342', total: 245, inspections: 245, completed: 210, pending: 25, cancelled: 10 },
  { id: 9, month: '08-12-2025', agent: 'U21342', total: 245, inspections: 245, completed: 210, pending: 25, cancelled: 10 },
  { id: 10, month: '08-12-2025', agent: 'U21342', total: 245, inspections: 245, completed: 210, pending: 25, cancelled: 10 },
]

const marketMockData: MarketData[] = [
  { id: 1, region: 'North America', sales: 15420, growth: 12.5, marketShare: 34.2, revenue: 2450000 },
  { id: 2, region: 'Europe', sales: 12350, growth: 8.3, marketShare: 28.5, revenue: 1980000 },
  { id: 3, region: 'Asia Pacific', sales: 18900, growth: 15.7, marketShare: 42.1, revenue: 3120000 },
  { id: 4, region: 'Latin America', sales: 6780, growth: 6.2, marketShare: 18.9, revenue: 890000 },
  { id: 5, region: 'Middle East', sales: 4560, growth: 9.8, marketShare: 15.3, revenue: 670000 },
  { id: 6, region: 'Africa', sales: 3210, growth: 11.2, marketShare: 12.7, revenue: 450000 },
  { id: 7, region: 'Australia', sales: 5670, growth: 7.9, marketShare: 21.4, revenue: 780000 },
  { id: 8, region: 'Southeast Asia', sales: 8900, growth: 14.3, marketShare: 31.8, revenue: 1340000 },
  { id: 9, region: 'Eastern Europe', sales: 4320, growth: 5.6, marketShare: 14.2, revenue: 560000 },
  { id: 10, region: 'South America', sales: 5890, growth: 8.7, marketShare: 19.6, revenue: 820000 },
]

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('warranty')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')

  const getCurrentData = () => {
    switch (activeTab) {
      case 'warranty':
        return warrantyMockData
      case 'sci-fleet':
        return sciFleetMockData
      case 'market':
        return marketMockData
      default:
        return warrantyMockData
    }
  }

  const rawData = getCurrentData()

  const filteredData = rawData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    )
  )

  const totalItems = 5000
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const q = searchValue.trim().toLowerCase()

  const matches = (obj: Record<string, any>) =>
    Object.values(obj).some((v) => String(v).toLowerCase().includes(q))

  const filteredWarrantyData = warrantyMockData.filter((row) => matches(row))
  const filteredSciFleetData = sciFleetMockData.filter((row) => matches(row))
  const filteredMarketData = marketMockData.filter((row) => matches(row))


  return (
    <div className="h-screen bg-white flex flex-col">

      <div className="shrink-0">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 sm:px-6 lg:px-8 py-3 gap-3 lg:gap-0">
          <h1 className="text-xl font-semibold text-gray-900">Stats</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-9 pr-3 py-1 w-full lg:w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium text-gray-700">Anthony</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('warranty')}
              className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === 'warranty'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              Warranty
            </button>
            <button
              onClick={() => setActiveTab('sci-fleet')}
              className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === 'sci-fleet'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              SCI-Fleet
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === 'market'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              Market
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="px-8 py-6 h-full flex flex-col">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeTab === 'warranty' && 'Warranty'}
              {activeTab === 'sci-fleet' && 'SCI-Fleet'}
              {activeTab === 'market' && 'Market'}
            </h2>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              All
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Warranty Tab Content */}
          {activeTab === 'warranty' && (
            <div className="overflow-x-auto">
              <div className="mb-4 flex gap-2">
                <div className="flex-1 bg-red-600 text-white text-center py-2 text-xs font-medium">
                  ERPS
                </div>
                <div className="flex-1 bg-black text-white text-center py-2 text-xs font-medium">
                  ECO-PRO
                </div>
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Month</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Agent</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Total</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">ER 02 212</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">ER 04 212</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">FR 04 212</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">ER 08 212</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">ER 10 212</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">?</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">EFP501</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">EFP502</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">?</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWarrantyData.map((row: WarrantyData, index) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{index === 0 ? row.month : row.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{index === 0 ? <span className="text-red-600">{row.agent}</span> : row.agent}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.total}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.er02212}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.er04212}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.fr04212}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.er08212}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.er10212}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.question}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.efp501}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.efp502}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 flex items-center justify-between">
                        {row.question2}
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreHorizontal className="w-4 h-4 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SCI-Fleet Tab Content */}
          {activeTab === 'sci-fleet' && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Month</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Agent</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Total</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Inspections</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Completed</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Pending</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Cancelled</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSciFleetData.map((row: SCIFleetData, index) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{index === 0 ? row.month : row.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{index === 0 ? <span className="text-red-600">{row.agent}</span> : row.agent}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.total}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.inspections}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.completed}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.pending}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.cancelled}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreHorizontal className="w-4 h-4 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Market Tab Content */}
          {activeTab === 'market' && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Region</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Sales</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Growth (%)</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Market Share (%)</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Revenue ($)</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMarketData.map((row: MarketData) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{row.region}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.sales.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.growth}%</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.marketShare}%</td>
                      <td className="py-3 px-4 text-sm text-gray-900">${row.revenue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreHorizontal className="w-4 h-4 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              {startItem}-{endItem} of {totalItems} items
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">4</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">5</button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">items per page</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
