"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CreateWarrantyModal } from "@/components/ui/create-warranty-modal"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from 'next/navigation'


const agentWarrantyData = [
    {
        no: 1,
        date: "15-12-2023",
        stockId: "Initial ERPS Currumbin",
        vinNo: "LRW3F7FJ...",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        registration: "667A5A"
    },
    {
        no: 2,
        date: "15-12-2023",
        stockId: "Initial ERPS Currumbin",
        vinNo: "LRW3F7FJ...",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        registration: "667A5A"
    },
    {
        no: 3,
        date: "15-12-2023",
        stockId: "Initial ERPS Currumbin",
        vinNo: "LRW3F7FJ...",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        registration: "667A5A"
    },
    {
        no: 4,
        date: "15-12-2023",
        stockId: "Initial ERPS Currumbin",
        vinNo: "LRW3F7FJ...",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        registration: "667A5A"
    },
    {
        no: 5,
        date: "15-12-2023",
        stockId: "Initial ERPS Currumbin",
        vinNo: "LRW3F7FJ...",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        registration: "667A5A"
    },
    {
        no: 6,
        date: "15-12-2023",
        stockId: "Initial ERPS Currumbin",
        vinNo: "LRW3F7FJ...",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        registration: "667A5A"
    },
    {
        no: 7,
        date: "15-12-2023",
        stockId: "Initial ERPS Currumbin",
        vinNo: "LRW3F7FJ...",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        registration: "667A5A"
    },
    {
        no: 8,
        date: "15-12-2023",
        stockId: "Initial ERPS Currumbin",
        vinNo: "LRW3F7FJ...",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        registration: "667A5A"
    },
    {
        no: 9,
        date: "15-12-2023",
        stockId: "Initial ERPS Currumbin",
        vinNo: "LRW3F7FJ...",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        registration: "667A5A"
    },
    {
        no: 10,
        date: "15-12-2023",
        stockId: "Initial ERPS Currumbin",
        vinNo: "LRW3F7FJ...",
        year: 2025,
        make: "TOYOTA",
        model: "LC300 GR SPORT",
        registration: "667A5A"
    }
]

const savedFormsData = [
    {
        no: 1,
        formName: "Draft Warranty - TOYOTA HILUX",
        customerName: "John Smith",
        vehicleDetails: "2024 TOYOTA HILUX - ABC123",
        savedDate: "18-12-2024",
        lastModified: "18-12-2024 10:30 AM",
        status: "Draft",
        completionPercentage: 75
    },
    {
        no: 2,
        formName: "Incomplete Form - FORD RANGER",
        customerName: "Sarah Johnson",
        vehicleDetails: "2023 FORD RANGER - DEF456",
        savedDate: "17-12-2024",
        lastModified: "17-12-2024 3:45 PM",
        status: "Incomplete",
        completionPercentage: 45
    },
    {
        no: 3,
        formName: "Draft Warranty - NISSAN NAVARA",
        customerName: "Mike Wilson",
        vehicleDetails: "2024 NISSAN NAVARA - GHI789",
        savedDate: "16-12-2024",
        lastModified: "16-12-2024 2:15 PM",
        status: "Draft",
        completionPercentage: 90
    },
    {
        no: 4,
        formName: "Pending Review - ISUZU D-MAX",
        customerName: "Emma Davis",
        vehicleDetails: "2023 ISUZU D-MAX - JKL012",
        savedDate: "15-12-2024",
        lastModified: "15-12-2024 11:20 AM",
        status: "Pending Review",
        completionPercentage: 100
    },
    {
        no: 5,
        formName: "Draft Warranty - MITSUBISHI TRITON",
        customerName: "David Brown",
        vehicleDetails: "2024 MITSUBISHI TRITON - MNO345",
        savedDate: "14-12-2024",
        lastModified: "14-12-2024 4:30 PM",
        status: "Draft",
        completionPercentage: 60
    },
    {
        no: 6,
        formName: "Incomplete Form - VW AMAROK",
        customerName: "Lisa Anderson",
        vehicleDetails: "2023 VW AMAROK - PQR678",
        savedDate: "13-12-2024",
        lastModified: "13-12-2024 9:45 AM",
        status: "Incomplete",
        completionPercentage: 30
    },
    {
        no: 7,
        formName: "Draft Warranty - MAZDA BT-50",
        customerName: "Robert Taylor",
        vehicleDetails: "2024 MAZDA BT-50 - STU901",
        savedDate: "12-12-2024",
        lastModified: "12-12-2024 1:15 PM",
        status: "Draft",
        completionPercentage: 85
    }
]

export default function AgentWarranties() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("warranties")
    const [search, setSearch] = useState("")
    useEffect(() => {
        setSearch("")
    }, [activeTab])

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


    const normalizedQuery = search.trim().toLowerCase()

    const filterBySearch = (obj: Record<string, any>) =>
        Object.values(obj).some((val) =>
            String(val).toLowerCase().includes(normalizedQuery)
        )

    const filteredWarranties = agentWarrantyData.filter(filterBySearch)
    const filteredSavedForms = savedFormsData.filter(filterBySearch)


    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-7 py-4 sm:py-5 flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl lg:text-xl font-bold truncate">Warranties</h1>

                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="relative hidden sm:block">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search warranties..."
                            className="pl-10 pr-3 py-2 w-56 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>


                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm"
                    >
                        Create Warranty
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
                        onClick={() => setActiveTab("saved-forms")}
                        className={`py-3 sm:py-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeTab === "saved-forms"
                            ? "border-red-600 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Saved Forms
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                        <h2 className="text-lg sm:text-xl font-bold">
                            {activeTab === "warranties" ? "Warranties" : "Saved Forms"}
                        </h2>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">
                                {activeTab === "warranties" ? "Last 10" : "All Forms"}
                            </span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <div className="relative flex flex-col h-[calc(100vh-240px)]">

                        <div className="overflow-x-auto">
                            {activeTab === "warranties" ? (
                                // Warranties Table
                                <table className="w-full min-w-[1000px]">
                                    <thead className="bg-gray-50 sticky top-0 z-10">
                                        <tr className="text-left text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                            <th className="w-12 px-3 sm:px-6 py-3 font-medium">
                                                No
                                            </th>
                                            <th className="w-28 px-3 sm:px-6 py-3 font-medium">
                                                Date
                                                <svg className="inline w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                </svg>
                                            </th>
                                            <th className="w-40 px-3 sm:px-6 py-3 font-medium">Stock ID / Ref No.</th>
                                            <th className="w-48 px-3 sm:px-6 py-3 font-medium">
                                                VIN No.
                                                <svg className="inline w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                </svg>
                                            </th>
                                            <th className="w-20 px-3 sm:px-6 py-3 font-medium">Year</th>
                                            <th className="w-32 px-3 sm:px-6 py-3 font-medium">
                                                Make
                                                <svg className="inline w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                </svg>
                                            </th>
                                            <th className="w-32 px-3 sm:px-6 py-3 font-medium">
                                                Model
                                                <svg className="inline w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                </svg>
                                            </th>
                                            <th className="w-36 px-3 sm:px-6 py-3 font-medium">Registration</th>
                                            <th className="w-20 px-3 sm:px-6 py-3 font-medium text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredWarranties.map((warranty) => (
                                            <tr key={warranty.no} className="hover:bg-gray-50">
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.no}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.date}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.stockId}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.vinNo}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.year}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.make}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.model}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{warranty.registration}</td>
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
                            ) : (
                                // Saved Forms Table
                                <table className="w-full min-w-[1000px]">
                                    <thead className="bg-gray-50 sticky top-0 z-10">
                                        <tr className="text-left text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                            <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">No</th>
                                            <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">
                                                Form Name
                                                <svg className="inline w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                </svg>
                                            </th>
                                            <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Customer Name</th>
                                            <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Vehicle Details</th>
                                            <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">
                                                Saved Date
                                                <svg className="inline w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                </svg>
                                            </th>
                                            <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Last Modified</th>
                                            <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Status</th>
                                            <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Progress</th>
                                            <th className="px-3 sm:px-6 py-2 sm:py-3 font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredSavedForms.map((form) => (
                                            <tr key={form.no} className="hover:bg-gray-50">
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{form.no}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-blue-600">{form.formName}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{form.customerName}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{form.vehicleDetails}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{form.savedDate}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{form.lastModified}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${form.status === "Draft"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : form.status === "Incomplete"
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-blue-100 text-blue-800"
                                                        }`}>
                                                        {form.status}
                                                    </span>
                                                </td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className={`h-2 rounded-full ${form.completionPercentage >= 80 ? 'bg-green-500' :
                                                                    form.completionPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                                    }`}
                                                                style={{ width: `${form.completionPercentage}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs text-gray-600">{form.completionPercentage}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                                                            Edit
                                                        </Button>
                                                        <Button variant="ghost" size="icon" aria-label="More actions" className="h-8 w-8">
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                            </svg>
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                {activeTab === "warranties"
                                    ? `1-${filteredWarranties.length} of ${filteredWarranties.length} items`
                                    : `1-${filteredSavedForms.length} of ${filteredSavedForms.length} items`}
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
                                {activeTab === "warranties" && (
                                    <>
                                        <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">2</button>
                                        <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">3</button>
                                        <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">4</button>
                                        <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">5</button>
                                    </>
                                )}
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

            {/* Create Warranty Modal */}
            <CreateWarrantyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedAgent={null}
            />
        </div>
    )
}