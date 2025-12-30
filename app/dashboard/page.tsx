"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/auth-provider"
import { LogoutButton } from "@/components/auth/logout-button"
import { useDashboardStats } from "@/lib/hooks/use-dashboard"

// Dashboard data types based on backend API
interface WarrantyItemData {
  id: string
  vinNumber: string
  vehicle: string
  ownerName: string
  installerName: string
  dateInstalled: string
  verificationStatus: string
  status: string
  corrosionFound: boolean
}

interface InspectionItemData {
  id: string
  inspectorName: string
  inspectionDate: string
  verificationStatus: string
  corrosionFound: boolean
  warrantyExtendedUntil?: string
  warranty?: {
    vehicleMake: string
    vehicleModel: string
    vehicleVin: string
  }
}

interface CorrosionWarrantyData {
  id: string
  vinNumber: string
  vehicle: string
  ownerName: string
  installerName: string
  dateInstalled: string
  corrosionDetails: string
  corrosionNotes: string
  status: string
}

interface DashboardStatsData {
  lastWarranties: WarrantyItemData[]
  lastInspections: InspectionItemData[]
  corrosionWarranties: CorrosionWarrantyData[]
}

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("warranties")
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const { user } = useAuth()

    // Fetch dashboard stats from your backend API
    const { data: dashboardData, isLoading, error } = useDashboardStats()

    const dashboardStats = (dashboardData?.data as DashboardStatsData) || {
        lastWarranties: [],
        lastInspections: [],
        corrosionWarranties: []
    }
    
    const { lastWarranties, lastInspections, corrosionWarranties } = dashboardStats

    const normalize = (val: unknown): string =>
        String(val ?? "").toLowerCase()

    const matchesSearch = (item: WarrantyItemData | InspectionItemData | CorrosionWarrantyData): boolean =>
        Object.values(item).some((v) =>
            normalize(v).includes(searchQuery.toLowerCase())
        )

    const filteredWarranties = lastWarranties.filter(matchesSearch)
    const filteredInspections = lastInspections.filter(matchesSearch)
    const filteredCorrosionWarranties = corrosionWarranties.filter(matchesSearch)

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 text-lg mb-2">Error loading dashboard</div>
                    <div className="text-gray-500">{error.message}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen flex flex-col">
                {/* Header */}
                <header className="bg-white px-4 sm:px-6 lg:px-7 py-3 sm:py-5 flex items-center justify-between">
                    <h1 className="text-xl sm:text-xl lg:text-xl font-semibold truncate">
                        Welcome Back, {user?.fullName || user?.email || 'User'}
                    </h1>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <LogoutButton />

                        <div className="relative hidden sm:block">
                            <button
                                onClick={() => setSearchOpen((v) => !v)}
                                className="pt-1 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>

                            {searchOpen && (
                                <input
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search…"
                                    className="absolute right-0 top-12 w-64 border border-gray-200 rounded-lg px-3 py-2 text-sm shadow bg-white"
                                />
                            )}
                        </div>

                        <div className="flex items-center gap-1 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-xs sm:text-sm font-medium text-gray-700">
                                    {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                </span>
                            </div>
                            <span className="font-medium text-sm sm:text-base hidden sm:block">
                                {user?.fullName || user?.email || 'User'}
                            </span>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </header>

                {/* Tabs */}
                <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab("warranties")}
                            className={`py-3 sm:py-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeTab === "warranties"
                                ? "border-red-600 text-red-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Warranties
                        </button>
                        <button
                            onClick={() => setActiveTab("inspections")}
                            className={`py-3 sm:py-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeTab === "inspections"
                                ? "border-red-600 text-red-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Completed Inspections
                        </button>
                        <button
                            onClick={() => setActiveTab("corrosion")}
                            className={`py-3 sm:py-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeTab === "corrosion"
                                ? "border-red-600 text-red-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            SCI-FLEET Stats
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-lg">Loading dashboard data...</div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {/* Warranties Tab */}
                            {activeTab === "warranties" && (
                                <>
                                    <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                                        <h2 className="text-lg sm:text-lg font-bold">Warranties</h2>
                                        <div className="text-sm text-gray-500">
                                            Showing {filteredWarranties.length} warranties
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[800px]">
                                            <thead className="bg-gray-50">
                                                <tr className="text-left text-xs sm:text-sm text-gray-600">
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">VIN</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Vehicle</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Owner</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Installer</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Installation Date</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Status</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Corrosion</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {filteredWarranties.map((warranty) => (
                                                    <tr key={warranty.id} className="hover:bg-gray-50">
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-mono">
                                                            {warranty.vinNumber}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {warranty.vehicle}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {warranty.ownerName}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {warranty.installerName}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {new Date(warranty.dateInstalled).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                                warranty.verificationStatus === 'VERIFIED_ACTIVE' 
                                                                    ? "bg-green-100 text-green-800"
                                                                    : warranty.verificationStatus === 'DRAFT'
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : warranty.verificationStatus === 'SUBMITTED_PENDING_VERIFICATION'
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : "bg-gray-100 text-gray-800"
                                                            }`}>
                                                                {warranty.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {warranty.corrosionFound ? (
                                                                <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                                                                    Corrosion Found
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                                                    No Corrosion
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                            <Button variant="ghost" size="icon" aria-label="More actions" className="h-8 w-8 sm:h-10 sm:w-10">
                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                                </svg>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        
                                        {filteredWarranties.length === 0 && (
                                            <div className="text-center py-12">
                                                <div className="text-gray-500">No warranties found</div>
                                                <p className="text-gray-400 mt-2">
                                                    {searchQuery ? 'Try adjusting your search' : 'No warranties available'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Inspections Tab */}
                            {activeTab === "inspections" && (
                                <>
                                    <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                                        <h2 className="text-lg sm:text-lg font-bold">Recent Inspections</h2>
                                        <div className="text-sm text-gray-500">
                                            Showing {filteredInspections.length} inspections
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[1000px]">
                                            <thead className="bg-gray-50">
                                                <tr className="text-left text-xs sm:text-sm text-gray-600">
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Inspection ID</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Vehicle</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Inspector</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Inspection Date</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Status</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Corrosion</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Warranty Extended</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {filteredInspections.map((inspection) => (
                                                    <tr key={inspection.id} className="hover:bg-gray-50">
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-blue-600">
                                                            {inspection?.id ? inspection.id.substring(0, 12) + '...' : 'N/A'}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {inspection.warranty?.vehicleMake} {inspection.warranty?.vehicleModel}
                                                            <div className="text-gray-500">VIN: {inspection.warranty?.vehicleVin}</div>
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {inspection.inspectorName}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {new Date(inspection.inspectionDate).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                                inspection.verificationStatus === 'VERIFIED_ACTIVE'
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-yellow-100 text-yellow-800"
                                                            }`}>
                                                                {inspection.verificationStatus === 'VERIFIED_ACTIVE' ? 'Completed' : 'Pending'}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                                !inspection.corrosionFound
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-red-100 text-red-800"
                                                            }`}>
                                                                {inspection.corrosionFound ? 'Yes' : 'No'}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {inspection.warrantyExtendedUntil 
                                                                ? new Date(inspection.warrantyExtendedUntil).toLocaleDateString()
                                                                : 'N/A'
                                                            }
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                            <Button variant="ghost" size="icon" aria-label="More actions" className="h-8 w-8 sm:h-10 sm:w-10">
                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                                </svg>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        
                                        {filteredInspections.length === 0 && (
                                            <div className="text-center py-12">
                                                <div className="text-gray-500">No inspections found</div>
                                                <p className="text-gray-400 mt-2">
                                                    {searchQuery ? 'Try adjusting your search' : 'No inspections available'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Corrosion Warranties Tab */}
                            {activeTab === "corrosion" && (
                                <>
                                    <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                                        <h2 className="text-lg sm:text-lg font-bold">Corrosion Cases</h2>
                                        <div className="text-sm text-gray-500">
                                            Showing {filteredCorrosionWarranties.length} corrosion cases
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[1000px]">
                                            <thead className="bg-gray-50">
                                                <tr className="text-left text-xs sm:text-sm text-gray-600">
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">VIN</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Vehicle</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Owner</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Installer</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Installation Date</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Corrosion Details</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Notes</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Status</th>
                                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {filteredCorrosionWarranties.map((warranty) => (
                                                    <tr key={warranty.id} className="hover:bg-gray-50">
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-mono">
                                                            {warranty.vinNumber}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {warranty.vehicle}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {warranty.ownerName}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {warranty.installerName}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {new Date(warranty.dateInstalled).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            {warranty.corrosionDetails}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm max-w-xs truncate">
                                                            {warranty.corrosionNotes}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                                                                {warranty.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                            <Button variant="ghost" size="icon" aria-label="More actions" className="h-8 w-8 sm:h-10 sm:w-10">
                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                                </svg>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        
                                        {filteredCorrosionWarranties.length === 0 && (
                                            <div className="text-center py-12">
                                                <div className="text-gray-500">No corrosion cases found</div>
                                                <p className="text-gray-400 mt-2">
                                                    {searchQuery ? 'Try adjusting your search' : 'No corrosion cases available'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
    )
}