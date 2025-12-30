"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from 'next/navigation'
import { Search } from "lucide-react"

const upcomingInspectionData = [
    {
        no: 1,
        dueDate: "08-12-2025",
        stockId: "U21342",
        vinNo: "JTM4HV09J...",
        year: 2010,
        make: "TOYOTA",
        model: "LANDCRUISER",
        registration: "424RAP"
    },
    {
        no: 2,
        dueDate: "08-12-2025",
        stockId: "U21342",
        vinNo: "JTM4HV09J...",
        year: 2010,
        make: "TOYOTA",
        model: "LANDCRUISER",
        registration: "424RAP"
    },
    {
        no: 3,
        dueDate: "08-12-2025",
        stockId: "U21342",
        vinNo: "JTM4HV09J...",
        year: 2010,
        make: "TOYOTA",
        model: "LANDCRUISER",
        registration: "424RAP"
    },
    {
        no: 4,
        dueDate: "08-12-2025",
        stockId: "U21342",
        vinNo: "JTM4HV09J...",
        year: 2010,
        make: "TOYOTA",
        model: "LANDCRUISER",
        registration: "424RAP"
    },
    {
        no: 5,
        dueDate: "08-12-2025",
        stockId: "U21342",
        vinNo: "JTM4HV09J...",
        year: 2010,
        make: "TOYOTA",
        model: "LANDCRUISER",
        registration: "424RAP"
    },
    {
        no: 6,
        dueDate: "08-12-2025",
        stockId: "U21342",
        vinNo: "JTM4HV09J...",
        year: 2010,
        make: "TOYOTA",
        model: "LANDCRUISER",
        registration: "424RAP"
    },
    {
        no: 7,
        dueDate: "08-12-2025",
        stockId: "U21342",
        vinNo: "JTM4HV09J...",
        year: 2010,
        make: "TOYOTA",
        model: "LANDCRUISER",
        registration: "424RAP"
    },
    {
        no: 8,
        dueDate: "08-12-2025",
        stockId: "U21342",
        vinNo: "JTM4HV09J...",
        year: 2010,
        make: "TOYOTA",
        model: "LANDCRUISER",
        registration: "424RAP"
    },
    {
        no: 9,
        dueDate: "08-12-2025",
        stockId: "U21342",
        vinNo: "JTM4HV09J...",
        year: 2010,
        make: "TOYOTA",
        model: "LANDCRUISER",
        registration: "424RAP"
    },
    {
        no: 10,
        dueDate: "08-12-2025",
        stockId: "U21342",
        vinNo: "JTM4HV09J...",
        year: 2010,
        make: "TOYOTA",
        model: "LANDCRUISER",
        registration: "424RAP"
    }
]

export default function AgentInspections() {
    const [showRecordInspection, setShowRecordInspection] = useState(false)
    const [activeTab, setActiveTab] = useState("upcoming")
    const [searchValue, setSearchValue] = useState("")
    const searchInputRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        if (showRecordInspection) {
            setTimeout(() => {
                searchInputRef.current?.focus()
            }, 50)
        }
    }, [showRecordInspection])


    const handleRecordInspection = () => {
        setShowRecordInspection(true)
    }

    const handleSearch = () => {
        // Handle search functionality here
        console.log("Searching for:", searchValue)
    }

    const normalizedSearch = searchValue.trim().toLowerCase()

    const filteredInspections = upcomingInspectionData.filter((inspection) => {
        if (!normalizedSearch) return true

        return (
            inspection.stockId.toLowerCase().includes(normalizedSearch) ||
            inspection.vinNo.toLowerCase().includes(normalizedSearch) ||
            inspection.registration.toLowerCase().includes(normalizedSearch) ||
            inspection.make.toLowerCase().includes(normalizedSearch) ||
            inspection.model.toLowerCase().includes(normalizedSearch) ||
            String(inspection.year).includes(normalizedSearch)
        )
    })

    const { user, logout } = useAuth()
    const [profileOpen, setProfileOpen] = useState(false);
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('.relative')) {
                setProfileOpen(false)
            }
        }
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [])


    const router = useRouter()
    const handleLogout = () => {
        logout()
        router.push('/login')
    }



    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-7 py-4 sm:py-5 flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl lg:text-xl font-bold truncate">Inspections</h1>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={() => setShowRecordInspection(true)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>

                    <Button
                        onClick={handleRecordInspection}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm"
                    >
                        Record Inspection
                    </Button>

                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(v => !v)}
                            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition focus:outline-none"
                        >
                            {/* Avatar */}
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-gray-700">
                                    {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                </span>
                            </div>

                            {/* Name */}
                            <span className="font-medium text-md hidden sm:block max-w-[120px] truncate">
                                {user?.fullName || user?.email || 'User'}
                            </span>

                            {/* Chevron */}
                            <svg
                                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        {profileOpen && (
                            <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-xl bg-white border border-gray-200 shadow-lg z-50 animate-in fade-in zoom-in-95">

                                {/* User Info */}
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user?.fullName || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user?.email}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="p-2">
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => {
                                            setProfileOpen(false)
                                            handleLogout()
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                setProfileOpen(false)
                                                handleLogout()
                                            }
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
               text-sm font-medium text-red-600 hover:bg-red-50
               transition cursor-pointer select-none"
                                    >
                                        {/* Icon */}
                                        <svg
                                            className="w-5 h-5 shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                                            />
                                        </svg>

                                        {/* Text */}
                                        <span>Logout</span>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Record Inspection Section */}
            {showRecordInspection && (
                <div className="bg-red-50 border-b border-red-200 px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-gray-900">Record Inspection</h2>
                        <button
                            onClick={() => setShowRecordInspection(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
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
            )}


            {/* Content Section */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-120px)]">
                    <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                        <h2 className="text-lg sm:text-lg font-bold">
                            {activeTab === "upcoming" ? "Upcoming" : "Completed"}
                        </h2>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">
                                {activeTab === "upcoming" ? "3 Months" : "All"}
                            </span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead className="bg-gray-50 sticky top-0 z-20">
                                <tr className="text-left text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">No</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Due Date</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">
                                        Stock ID / Ref No
                                        <svg className="inline w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">VIN No.</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Year</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">
                                        Make
                                        <svg className="inline w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">
                                        Model
                                        <svg className="inline w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Registration</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredInspections.map((inspection) => (
                                    <tr key={inspection.no} className="hover:bg-gray-50">
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                            {inspection.no}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                            {inspection.dueDate}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                            {inspection.stockId}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                            {inspection.vinNo}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                            {inspection.year}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                            {inspection.make}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                            {inspection.model}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                            {inspection.registration}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                aria-label="More actions"
                                                className="h-8 w-8 sm:h-10 sm:w-10"
                                            >
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

                    {/* Pagination */}
                    <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            1-10 of 5000 items
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="px-3 py-2 bg-red-600 text-white text-sm rounded">1</button>
                            <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">2</button>
                            <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">3</button>
                            <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">4</button>
                            <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">5</button>
                            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
                                </svg>
                            </button>
                            <select className="ml-4 border border-gray-300 rounded px-3 py-1 text-sm">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                            </select>
                            <span className="text-sm text-gray-500 ml-2">items per page</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}