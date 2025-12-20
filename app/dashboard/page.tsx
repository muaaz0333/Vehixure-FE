"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RouteGuard } from "@/components/auth/route-guard"
import { useAuth } from "@/components/providers/auth-provider"
import { LogoutButton } from "@/components/auth/logout-button"

const warrantyData = [
    {
        no: 1,
        corrosion: "No",
        date: "Oct 15, 2023",
        agent: "UV 4x4 - Brendale",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        rego: "667A5A",
    },
    {
        no: 2,
        corrosion: "No",
        date: "Oct 15, 2023",
        agent: "UV 4x4 - Brendale",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        rego: "667A5A",
    },
    {
        no: 3,
        corrosion: "No",
        date: "Oct 15, 2023",
        agent: "UV 4x4 - Brendale",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        rego: "667A5A",
    },
    {
        no: 4,
        corrosion: "No",
        date: "Oct 15, 2023",
        agent: "UV 4x4 - Brendale",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        rego: "667A5A",
    },
    {
        no: 5,
        corrosion: "No",
        date: "Oct 15, 2023",
        agent: "UV 4x4 - Brendale",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        rego: "667A5A",
    },
    {
        no: 6,
        corrosion: "No",
        date: "Oct 15, 2023",
        agent: "UV 4x4 - Brendale",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        rego: "667A5A",
    },
    {
        no: 7,
        corrosion: "No",
        date: "Oct 15, 2023",
        agent: "UV 4x4 - Brendale",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        rego: "667A5A",
    },
    {
        no: 8,
        corrosion: "No",
        date: "Oct 15, 2023",
        agent: "UV 4x4 - Brendale",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        rego: "667A5A",
    },
    {
        no: 9,
        corrosion: "No",
        date: "Oct 15, 2023",
        agent: "UV 4x4 - Brendale",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        rego: "667A5A",
    },
    {
        no: 10,
        corrosion: "No",
        date: "Oct 15, 2023",
        agent: "UV 4x4 - Brendale",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        rego: "667A5A",
    },
]

// Mock completed inspections data
const completedInspectionsData = [
    {
        no: 1,
        inspectionId: "INS-2024-001",
        vehicleRego: "ABC123",
        make: "TOYOTA",
        model: "HILUX",
        year: 2023,
        inspector: "John Smith",
        completedDate: "Dec 15, 2024",
        status: "Passed",
        corrosionFound: "No",
        warrantyStatus: "Active"
    },
    {
        no: 2,
        inspectionId: "INS-2024-002",
        vehicleRego: "DEF456",
        make: "FORD",
        model: "RANGER",
        year: 2022,
        inspector: "Sarah Johnson",
        completedDate: "Dec 14, 2024",
        status: "Failed",
        corrosionFound: "Yes",
        warrantyStatus: "Claim Pending"
    },
    {
        no: 3,
        inspectionId: "INS-2024-003",
        vehicleRego: "GHI789",
        make: "NISSAN",
        model: "NAVARA",
        year: 2024,
        inspector: "Mike Wilson",
        completedDate: "Dec 13, 2024",
        status: "Passed",
        corrosionFound: "No",
        warrantyStatus: "Active"
    },
    {
        no: 4,
        inspectionId: "INS-2024-004",
        vehicleRego: "JKL012",
        make: "ISUZU",
        model: "D-MAX",
        year: 2021,
        inspector: "Emma Davis",
        completedDate: "Dec 12, 2024",
        status: "Passed",
        corrosionFound: "Minor",
        warrantyStatus: "Active"
    },
    {
        no: 5,
        inspectionId: "INS-2024-005",
        vehicleRego: "MNO345",
        make: "MITSUBISHI",
        model: "TRITON",
        year: 2023,
        inspector: "David Brown",
        completedDate: "Dec 11, 2024",
        status: "Failed",
        corrosionFound: "Yes",
        warrantyStatus: "Claim Approved"
    },
    {
        no: 6,
        inspectionId: "INS-2024-006",
        vehicleRego: "PQR678",
        make: "VW",
        model: "AMAROK",
        year: 2022,
        inspector: "Lisa Anderson",
        completedDate: "Dec 10, 2024",
        status: "Passed",
        corrosionFound: "No",
        warrantyStatus: "Active"
    },
    {
        no: 7,
        inspectionId: "INS-2024-007",
        vehicleRego: "STU901",
        make: "MAZDA",
        model: "BT-50",
        year: 2021,
        inspector: "Robert Taylor",
        completedDate: "Dec 09, 2024",
        status: "Passed",
        corrosionFound: "No",
        warrantyStatus: "Active"
    },
    {
        no: 8,
        inspectionId: "INS-2024-008",
        vehicleRego: "VWX234",
        make: "HOLDEN",
        model: "COLORADO",
        year: 2020,
        inspector: "Jennifer White",
        completedDate: "Dec 08, 2024",
        status: "Failed",
        corrosionFound: "Severe",
        warrantyStatus: "Claim Processing"
    },
    {
        no: 9,
        inspectionId: "INS-2024-009",
        vehicleRego: "YZA567",
        make: "TOYOTA",
        model: "LC300",
        year: 2024,
        inspector: "Mark Johnson",
        completedDate: "Dec 07, 2024",
        status: "Passed",
        corrosionFound: "No",
        warrantyStatus: "Active"
    },
    {
        no: 10,
        inspectionId: "INS-2024-010",
        vehicleRego: "BCD890",
        make: "FORD",
        model: "EVEREST",
        year: 2023,
        inspector: "Amanda Clark",
        completedDate: "Dec 06, 2024",
        status: "Passed",
        corrosionFound: "Minor",
        warrantyStatus: "Active"
    }
]

// Mock SCI Fleet Stats data
const sciFleetStatsData = [
    {
        no: 1,
        fleetId: "FLEET-001",
        companyName: "ABC Transport Ltd",
        totalVehicles: 45,
        protectedVehicles: 42,
        inspectionsDue: 3,
        corrosionClaims: 2,
        activeWarranties: 40,
        lastInspection: "Dec 10, 2024",
        fleetManager: "John Manager",
        status: "Active"
    },
    {
        no: 2,
        fleetId: "FLEET-002",
        companyName: "XYZ Logistics",
        totalVehicles: 78,
        protectedVehicles: 75,
        inspectionsDue: 8,
        corrosionClaims: 1,
        activeWarranties: 74,
        lastInspection: "Dec 12, 2024",
        fleetManager: "Sarah Fleet",
        status: "Active"
    },
    {
        no: 3,
        fleetId: "FLEET-003",
        companyName: "Coastal Delivery Co",
        totalVehicles: 32,
        protectedVehicles: 28,
        inspectionsDue: 12,
        corrosionClaims: 5,
        activeWarranties: 23,
        lastInspection: "Nov 28, 2024",
        fleetManager: "Mike Ocean",
        status: "Attention Required"
    },
    {
        no: 4,
        fleetId: "FLEET-004",
        companyName: "Mountain Mining Corp",
        totalVehicles: 156,
        protectedVehicles: 150,
        inspectionsDue: 15,
        corrosionClaims: 8,
        activeWarranties: 142,
        lastInspection: "Dec 08, 2024",
        fleetManager: "Emma Stone",
        status: "Active"
    },
    {
        no: 5,
        fleetId: "FLEET-005",
        companyName: "City Construction",
        totalVehicles: 89,
        protectedVehicles: 85,
        inspectionsDue: 6,
        corrosionClaims: 3,
        activeWarranties: 82,
        lastInspection: "Dec 14, 2024",
        fleetManager: "David Build",
        status: "Active"
    },
    {
        no: 6,
        fleetId: "FLEET-006",
        companyName: "Rural Services Pty",
        totalVehicles: 23,
        protectedVehicles: 20,
        inspectionsDue: 4,
        corrosionClaims: 0,
        activeWarranties: 20,
        lastInspection: "Dec 05, 2024",
        fleetManager: "Lisa Country",
        status: "Active"
    },
    {
        no: 7,
        fleetId: "FLEET-007",
        companyName: "Metro Taxi Services",
        totalVehicles: 67,
        protectedVehicles: 60,
        inspectionsDue: 18,
        corrosionClaims: 4,
        activeWarranties: 56,
        lastInspection: "Nov 25, 2024",
        fleetManager: "Robert Drive",
        status: "Overdue"
    },
    {
        no: 8,
        fleetId: "FLEET-008",
        companyName: "Industrial Equipment Co",
        totalVehicles: 134,
        protectedVehicles: 128,
        inspectionsDue: 9,
        corrosionClaims: 6,
        activeWarranties: 122,
        lastInspection: "Dec 11, 2024",
        fleetManager: "Jennifer Heavy",
        status: "Active"
    },
    {
        no: 9,
        fleetId: "FLEET-009",
        companyName: "Emergency Response Unit",
        totalVehicles: 28,
        protectedVehicles: 28,
        inspectionsDue: 2,
        corrosionClaims: 0,
        activeWarranties: 28,
        lastInspection: "Dec 13, 2024",
        fleetManager: "Mark Emergency",
        status: "Active"
    },
    {
        no: 10,
        fleetId: "FLEET-010",
        companyName: "Agricultural Solutions",
        totalVehicles: 41,
        protectedVehicles: 38,
        inspectionsDue: 7,
        corrosionClaims: 2,
        activeWarranties: 36,
        lastInspection: "Dec 02, 2024",
        fleetManager: "Amanda Farm",
        status: "Active"
    }
]

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("warranties")
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const { user } = useAuth()

    const normalize = (val: unknown): string =>
        String(val ?? "").toLowerCase()

    const matchesSearch = (item: Record<string, unknown>): boolean =>
        Object.values(item).some((v) =>
            normalize(v).includes(searchQuery.toLowerCase())
        )

    const filteredWarranties = warrantyData.filter(matchesSearch)
    const filteredInspections = completedInspectionsData.filter(matchesSearch)
    const filteredFleet = sciFleetStatsData.filter(matchesSearch)


    return (
        <RouteGuard allowedRoles={['admin']}>
            <div className="h-screen flex flex-col">
                {/* Header */}
                {/* <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-7 py-4 sm:py-5 flex items-center justify-between"> */}
                <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-7 py-3 sm:py-5 flex items-center justify-between">
                    <h1 className="text-xl sm:text-xl lg:text-xl font-bold truncate">Welcome Back, {user?.name || 'Admin'}</h1>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <LogoutButton />

                        <div className="relative hidden sm:block">
                            <button
                                onClick={() => setSearchOpen((v) => !v)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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


                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-xs sm:text-sm font-medium text-gray-700">{user?.name?.charAt(0) || 'A'}</span>
                            </div>
                            <span className="font-medium text-sm sm:text-base hidden sm:block">{user?.name || 'Admin'}</span>
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
                            onClick={() => setActiveTab("fleet")}
                            className={`py-3 sm:py-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeTab === "fleet"
                                ? "border-red-600 text-red-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            SCI-FLEET Stats
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {/* Warranties Tab */}
                        {activeTab === "warranties" && (
                            <>
                                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                                    <h2 className="text-lg sm:text-lg font-bold">Warranties</h2>
                                    <select className="border border-gray-200 rounded px-3 py-1.5 text-sm w-full sm:w-auto">
                                        <option>Last 10</option>
                                        <option>Last 20</option>
                                        <option>Last 50</option>
                                    </select>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[800px]">
                                        <thead className="bg-gray-50">
                                            <tr className="text-left text-xs sm:text-sm text-gray-600">
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">No</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Corrosion</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Date</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Agent</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Year</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Make</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Model</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Rego</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {filteredWarranties.map((warranty) => (
                                                <tr key={warranty.no} className="hover:bg-gray-50">
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.no}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.corrosion}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.date}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.agent}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.year}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.make}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.model}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.rego}</td>
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
                                </div>
                            </>
                        )}

                        {/* Completed Inspections Tab */}
                        {activeTab === "inspections" && (
                            <>
                                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                                    <h2 className="text-lg sm:text-lg font-bold">Completed Inspections</h2>
                                    <select className="border border-gray-200 rounded px-3 py-1.5 text-sm w-full sm:w-auto">
                                        <option>Last 10</option>
                                        <option>Last 20</option>
                                        <option>Last 50</option>
                                    </select>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[1000px]">
                                        <thead className="bg-gray-50">
                                            <tr className="text-left text-xs sm:text-sm text-gray-600">
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">No</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Inspection ID</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Vehicle Rego</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Make</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Model</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Inspector</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Completed Date</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Status</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Corrosion</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Warranty Status</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {filteredInspections.map((inspection) => (
                                                <tr key={inspection.no} className="hover:bg-gray-50">
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{inspection.no}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-blue-600">{inspection.inspectionId}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{inspection.vehicleRego}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{inspection.make}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{inspection.model}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{inspection.inspector}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{inspection.completedDate}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${inspection.status === "Passed"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                            }`}>
                                                            {inspection.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${inspection.corrosionFound === "No"
                                                            ? "bg-green-100 text-green-800"
                                                            : inspection.corrosionFound === "Minor"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-red-100 text-red-800"
                                                            }`}>
                                                            {inspection.corrosionFound}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${inspection.warrantyStatus === "Active"
                                                            ? "bg-green-100 text-green-800"
                                                            : inspection.warrantyStatus === "Claim Approved"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : "bg-yellow-100 text-yellow-800"
                                                            }`}>
                                                            {inspection.warrantyStatus}
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
                                </div>
                            </>
                        )}

                        {/* SCI-FLEET Stats Tab */}
                        {activeTab === "fleet" && (
                            <>
                                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                                    <h2 className="text-lg sm:text-lg font-bold">SCI-FLEET Stats</h2>
                                    <select className="border border-gray-200 rounded px-3 py-1.5 text-sm w-full sm:w-auto">
                                        <option>All Fleets</option>
                                        <option>Active Only</option>
                                        <option>Attention Required</option>
                                        <option>Overdue</option>
                                    </select>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[1200px]">
                                        <thead className="bg-gray-50">
                                            <tr className="text-left text-xs sm:text-sm text-gray-600">
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">No</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Fleet ID</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Company Name</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Total Vehicles</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Protected</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Inspections Due</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Corrosion Claims</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Active Warranties</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Last Inspection</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Fleet Manager</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Status</th>
                                                <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {filteredFleet.map((fleet) => (
                                                <tr key={fleet.no} className="hover:bg-gray-50">
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{fleet.no}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-blue-600">{fleet.fleetId}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">{fleet.companyName}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-center">{fleet.totalVehicles}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-center">{fleet.protectedVehicles}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-center">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${fleet.inspectionsDue === 0
                                                            ? "bg-green-100 text-green-800"
                                                            : fleet.inspectionsDue <= 5
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-red-100 text-red-800"
                                                            }`}>
                                                            {fleet.inspectionsDue}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-center">{fleet.corrosionClaims}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-center">{fleet.activeWarranties}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{fleet.lastInspection}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{fleet.fleetManager}</td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${fleet.status === "Active"
                                                            ? "bg-green-100 text-green-800"
                                                            : fleet.status === "Attention Required"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-red-100 text-red-800"
                                                            }`}>
                                                            {fleet.status}
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
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </RouteGuard>
    )
}