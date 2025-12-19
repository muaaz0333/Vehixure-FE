"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AddUserModal } from "@/components/ui/add-user-modal"
import { Eye, EyeOff } from "lucide-react"

export default function AgentAccount() {
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-7 py-4 sm:py-5 flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl lg:text-xl font-bold truncate">Account Info</h1>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-700">A</span>
                    </div>
                    <span className="font-medium text-sm sm:text-base hidden sm:block">Agent</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </header>

            {/* Content Section */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Agent Information Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Agent Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <Input
                                    value="Agent Vinod"
                                    className="bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                                <Input
                                    value="Agent"
                                    className="bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                                <Input
                                    value="Agent Vinod"
                                    className="bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <Input
                                    value="111-2222-33333"
                                    className="bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <Input
                                    value="jeff@erps.com.au"
                                    className="bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Installer ID</label>
                                <Input
                                    value="G-2000"
                                    className="bg-gray-50"
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Number of Warranties */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Warranties</label>
                            <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                <span className="text-red-600 font-medium">24</span>
                            </div>
                        </div>
                    </div>

                    {/* User Accounts Section */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">User Accounts</h2>
                            <Button
                                onClick={() => setIsAddUserModalOpen(true)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                            >
                                Add Account
                            </Button>
                        </div>

                        {/* User 1 */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-4">User 1:</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <Input
                                            value="Anthony Otsakwe"
                                            className="bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                                        <Input
                                            value="Anthony"
                                            className="bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-1">
                                            <Input
                                                type={showPassword1 ? "text" : "password"}
                                                value="••••"
                                                className="bg-red-50 pr-10"
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword1(!showPassword1)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword1 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <Button
                                            className="bg-red-600 hover:bg-red-700 text-white px-6"
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* User 2 */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-4">User 2:</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <Input
                                            value="Anthony Otsakwe"
                                            className="bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                                        <Input
                                            value="Anthony"
                                            className="bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-1">
                                            <Input
                                                type={showPassword2 ? "text" : "password"}
                                                value="••••"
                                                className="bg-red-50 pr-10"
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword2(!showPassword2)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <Button
                                            className="bg-red-600 hover:bg-red-700 text-white px-6"
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            <AddUserModal
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
            />
        </div>
    )
}