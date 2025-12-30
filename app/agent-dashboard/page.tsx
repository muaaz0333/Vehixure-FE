"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { LogoutButton } from "@/components/auth/logout-button"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"

export default function AgentDashboard() {
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


    const downloadEmptyInstallationPdf = () => {
        const pdfContent = `
    %PDF-1.4
    1 0 obj
    << /Type /Catalog /Pages 2 0 R >>
    endobj
    2 0 obj
    << /Type /Pages /Kids [3 0 R] /Count 1 >>
    endobj
    3 0 obj
    << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] >>
    endobj
    xref
    0 4
    0000000000 65535 f
    0000000010 00000 n
    0000000060 00000 n
    0000000120 00000 n
    trailer
    << /Size 4 /Root 1 0 R >>
    startxref
    180
    %%EOF
  `

        const blob = new Blob([pdfContent], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = 'installation-sheet.pdf'
        a.click()

        URL.revokeObjectURL(url)
    }

    const goToWarranties = () => {
        router.push('/agent/warranties')
    }

    const goToInspections = () => {
        router.push('/agent/inspections')
    }



    return (
        <div>
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-7 py-4 sm:py-5 flex items-center justify-between">
                <h1 className="text-xl sm:text-xl lg:text-xl font-bold truncate">Welcome Back, {user?.fullName || user?.email || 'Agent'}</h1>

                <div className="flex items-center gap-2 sm:gap-4">

                    {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
                        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button> */}

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

            {/* Main Content */}
            <div className="p-2 sm:p-4 lg:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl">



                    {/* Print Installation Sheet Card */}
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={downloadEmptyInstallationPdf}
                        className="bg-white p-3 rounded-2xl shadow-md cursor-pointer"
                    >
                        <div className="bg-gray-100 rounded-2xl border border-gray-200 pl-6 pt-6 pb-6 shadow-sm transition-shadow cursor-pointer">
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                Print Installation<br className="hidden sm:block" />
                                <span className="sm:hidden"> </span> Sheet
                            </h3>

                            <p className="text-md font-semibold text-gray-700 mb-1">
                                Select this option to :-
                            </p>

                            <p className="text-sm text-gray-600">
                                Print a blank Installation Sheet <br className="hidden sm:block" />
                                <span className="sm:hidden"> </span>for the Workshop
                            </p>
                        </div>
                    </div>



                    {/* Create Warranty Card */}
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={goToWarranties}
                        className="bg-white p-3 rounded-2xl shadow-md cursor-pointer"
                    >
                        <div className="bg-gray-100 rounded-2xl border border-gray-200 pl-6 pt-6 pb-6 shadow-sm transition-shadow cursor-pointer">
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                Create<br className="hidden sm:block" />
                                <span className="sm:hidden"> </span> Warranty
                            </h3>

                            <p className="text-md font-semibold text-gray-700 mb-2">
                                Select this option to :-
                            </p>

                            <p className="text-sm text-gray-600">
                                Create / Print a new Warranty
                                <br />
                                <br />
                            </p>
                        </div>
                    </div>




                    {/* Record Inspection Card */}
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={goToInspections}
                        className="bg-white p-3 rounded-2xl shadow-md cursor-pointer"
                    >
                        <div className="bg-gray-100 rounded-2xl border border-gray-200 pl-6 pt-6 pb-6 shadow-sm transition-shadow cursor-pointer">
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                Record Inspection
                            </h3>

                            <p className="text-md font-semibold text-gray-700 mb-2">
                                Select this option to :-
                            </p>

                            <p className="text-sm text-gray-600">
                                Search for a Vehicle. Print <br className="hidden sm:block" />
                                <span className="sm:hidden"> </span>inspection Sheet. Record an <br className="hidden sm:block" />
                                <span className="sm:hidden"> </span>Inspections
                                <br />

                            </p>
                        </div>
                    </div>



                    {/* List of Annual Inspection Providers Card */}
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={goToInspections}
                        className="bg-white p-3 rounded-2xl shadow-md cursor-pointer"
                    >
                        <div className="bg-gray-100 rounded-2xl border border-gray-200 pl-6 pt-6 pb-6 shadow-sm transition-shadow cursor-pointer">
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                List of Annual<br className="hidden sm:block" />
                                <span className="sm:hidden"> </span> Inspection<br className="hidden sm:block" />
                                <span className="sm:hidden"> </span> Providers
                            </h3>

                            <p className="text-md font-semibold text-gray-700 mb-2">
                                Select this option to :-
                            </p>

                            <p className="text-sm text-gray-600">
                                Find an annual Inspection Provider
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
