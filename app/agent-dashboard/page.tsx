"use client"

import { RouteGuard } from "@/components/auth/route-guard"
import { useAuth } from "@/components/providers/auth-provider"
import { LogoutButton } from "@/components/auth/logout-button"

export default function AgentDashboard() {
    const { user } = useAuth()
    return (
        <RouteGuard allowedRoles={['agent']}>
        <div>
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-7 py-4 sm:py-5 flex items-center justify-between">
                <h1 className="text-xl sm:text-xl lg:text-xl font-bold truncate">Welcome Back, {user?.name || 'Agent'}</h1>

                <div className="flex items-center gap-2 sm:gap-4">
                    <LogoutButton />
                    
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs sm:text-sm font-medium text-gray-700">{user?.name?.charAt(0) || 'A'}</span>
                        </div>
                        <span className="font-medium text-sm sm:text-base hidden sm:block">{user?.name || 'Agent'}</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="p-2 sm:p-4 lg:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl">
                    {/* Print Installation Sheet Card */}
                    <div className="bg-white p-3 rounded-2xl shadow-md">
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
                    <div className="bg-white p-3 rounded-2xl shadow-md">
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
                                <br/>      
                                <br/>                         
                            </p>
                        </div>
                    </div>


                    {/* Record Inspection Card */}
                    <div className="bg-white p-3 rounded-2xl shadow-md">
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
                                <br/>
                                
                            </p>
                        </div>
                    </div>

                    {/* List of Annual Inspection Providers Card */}
                    <div className="bg-white p-3 rounded-2xl shadow-md">
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
        </RouteGuard>
    )
}
