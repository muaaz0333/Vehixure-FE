"use client"

import { useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Users, 
  FileCheck, 
  ClipboardCheck, 
  History,
  AlertTriangle,
  CheckCircle,
  Clock,
  Menu
} from "lucide-react"
import Link from "next/link"

// Stats card component - responsive
function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  description
}: { 
  title: string
  value: string | number
  icon: React.ElementType
  description?: string
}) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">{title}</p>
            <p className="text-xl sm:text-2xl font-bold mt-1">{value}</p>
            {description && (
              <p className="text-xs text-gray-400 mt-1 truncate">{description}</p>
            )}
          </div>
          <div className="h-10 w-10 sm:h-12 sm:w-12 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState<'overview' | 'warranties' | 'inspections' | 'users'>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isErpsAdmin = user?.role === 'ERPS_ADMIN'

  if (!isErpsAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 sm:p-8 text-center">
            <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-sm sm:text-base text-gray-500">
              This page is only accessible to ERPS Administrators.
            </p>
            <Link href="/dashboard">
              <Button className="mt-4 w-full sm:w-auto">Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', shortLabel: 'Overview', icon: Shield },
    { id: 'warranties', label: 'Warranty Verification', shortLabel: 'Warranties', icon: FileCheck },
    { id: 'inspections', label: 'Inspection Verification', shortLabel: 'Inspections', icon: ClipboardCheck },
    { id: 'users', label: 'User Management', shortLabel: 'Users', icon: Users },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 max-h-[444px]">
      {/* Header - Responsive */}
      <header className="bg-white border-b px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">ERPS Admin Panel</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 hidden sm:block">Manual verification and system management</p>
          </div>
          <Badge className="bg-red-100 text-red-800 px-2 sm:px-3 py-1 text-xs sm:text-sm shrink-0">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">Admin Access</span>
            <span className="sm:hidden">Admin</span>
          </Badge>
        </div>
      </header>

      {/* Navigation Tabs - Responsive with horizontal scroll on mobile */}
      <div className="bg-white border-b">
        <div className="px-4 sm:px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 sm:gap-4 lg:gap-6 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as typeof activeSection)}
                className={`flex items-center gap-1.5 sm:gap-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeSection === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content - Responsive padding */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {activeSection === 'overview' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Stats Grid - Responsive columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatsCard title="Pending Verifications" value={12} icon={Clock} description="Awaiting action" />
              <StatsCard title="Manual Overrides" value={8} icon={Shield} description="This month" />
              <StatsCard title="Active Users" value={156} icon={Users} description="All accounts" />
              <StatsCard title="Inspections" value={89} icon={CheckCircle} description="This month" />
            </div>

            {/* Quick Actions - Responsive grid */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <Link href="/admin/warranties" className="block">
                    <Button variant="outline" className="w-full h-20 sm:h-24 flex flex-col gap-1 sm:gap-2 text-xs sm:text-sm">
                      <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                      <span className="text-center leading-tight">Warranty Verification</span>
                    </Button>
                  </Link>
                  <Link href="/admin/inspections" className="block">
                    <Button variant="outline" className="w-full h-20 sm:h-24 flex flex-col gap-1 sm:gap-2 text-xs sm:text-sm">
                      <ClipboardCheck className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                      <span className="text-center leading-tight">Inspection Verification</span>
                    </Button>
                  </Link>
                  <Link href="/admin/users" className="block">
                    <Button variant="outline" className="w-full h-20 sm:h-24 flex flex-col gap-1 sm:gap-2 text-xs sm:text-sm">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                      <span className="text-center leading-tight">User Management</span>
                    </Button>
                  </Link>
                  <Link href="/admin/audit" className="block">
                    <Button variant="outline" className="w-full h-20 sm:h-24 flex flex-col gap-1 sm:gap-2 text-xs sm:text-sm">
                      <History className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                      <span className="text-center leading-tight">Audit History</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Admin Actions - Responsive */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <History className="h-4 w-4 sm:h-5 sm:w-5" />
                  Recent Admin Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { action: 'Manual Warranty Verification', target: 'WRN-2024-001', user: 'Admin', time: '2 hours ago', type: 'verify' },
                    { action: 'User Role Changed', target: 'john.doe@example.com', user: 'Admin', time: '5 hours ago', type: 'role' },
                    { action: 'Manual Activation', target: 'WRN-2024-002', user: 'Admin', time: '1 day ago', type: 'activate' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start sm:items-center justify-between gap-3 py-2 sm:py-3 border-b last:border-0">
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shrink-0 ${
                          item.type === 'verify' ? 'bg-blue-100' :
                          item.type === 'role' ? 'bg-purple-100' : 'bg-green-100'
                        }`}>
                          {item.type === 'verify' && <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
                          {item.type === 'role' && <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />}
                          {item.type === 'activate' && <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-xs sm:text-sm truncate">{item.action}</p>
                          <p className="text-xs text-gray-500 truncate">{item.target}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs sm:text-sm text-gray-500">{item.time}</p>
                        <p className="text-xs text-gray-400 hidden sm:block">by {item.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'warranties' && <WarrantyVerificationSection />}
        {activeSection === 'inspections' && <InspectionVerificationSection />}
        {activeSection === 'users' && <UserManagementSection />}
      </div>
    </div>
  )
}


// Warranty Verification Section - Responsive
function WarrantyVerificationSection() {
  const [selectedWarranty, setSelectedWarranty] = useState<string | null>(null)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showActivateModal, setShowActivateModal] = useState(false)

  const pendingWarranties = [
    { id: 'WRN-2024-001', customerName: 'John Smith', vehicle: 'Toyota Camry 2023', vin: '1HGBH41JXMN109186', installer: 'Mike Johnson', status: 'SUBMITTED', daysWaiting: 9 },
    { id: 'WRN-2024-002', customerName: 'Sarah Wilson', vehicle: 'Honda Accord 2024', vin: '2HGFC2F59MH123456', installer: 'Tom Brown', status: 'PENDING_CUSTOMER_ACTIVATION', daysWaiting: 14 },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <FileCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              Pending Warranty Verifications
            </CardTitle>
            <Badge variant="outline" className="w-fit">{pendingWarranties.length} pending</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          {/* Mobile Card View */}
          <div className="block sm:hidden divide-y">
            {pendingWarranties.map((warranty) => (
              <div key={warranty.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-blue-600 text-sm">{warranty.id}</p>
                    <p className="text-sm font-medium mt-1">{warranty.customerName}</p>
                  </div>
                  <Badge className={warranty.status === 'SUBMITTED' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}>
                    {warranty.status === 'SUBMITTED' ? 'Submitted' : 'Pending'}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>{warranty.vehicle}</p>
                  <p>VIN: {warranty.vin}</p>
                  <p>Installer: {warranty.installer}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className={`text-sm ${warranty.daysWaiting > 10 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                    {warranty.daysWaiting} days waiting
                  </span>
                  <div className="flex gap-2">
                    {warranty.status === 'SUBMITTED' ? (
                      <Button size="sm" variant="outline" onClick={() => { setSelectedWarranty(warranty.id); setShowVerifyModal(true) }}>
                        <CheckCircle className="h-4 w-4 mr-1" />Verify
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => { setSelectedWarranty(warranty.id); setShowActivateModal(true) }}>
                        <Shield className="h-4 w-4 mr-1" />Activate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-4 py-3 font-medium">Warranty ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Installer</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Days</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pendingWarranties.map((warranty) => (
                  <tr key={warranty.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-blue-600">{warranty.id}</td>
                    <td className="px-4 py-4 text-sm">{warranty.customerName}</td>
                    <td className="px-4 py-4 text-sm">
                      <div>{warranty.vehicle}</div>
                      <div className="text-xs text-gray-500">VIN: {warranty.vin}</div>
                    </td>
                    <td className="px-4 py-4 text-sm">{warranty.installer}</td>
                    <td className="px-4 py-4">
                      <Badge className={warranty.status === 'SUBMITTED' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}>
                        {warranty.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={warranty.daysWaiting > 10 ? 'text-red-600 font-medium' : ''}>{warranty.daysWaiting}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        {warranty.status === 'SUBMITTED' ? (
                          <Button size="sm" variant="outline" onClick={() => { setSelectedWarranty(warranty.id); setShowVerifyModal(true) }}>
                            <CheckCircle className="h-4 w-4 mr-1" />Verify
                          </Button>
                        ) : (
                          <Button size="sm" onClick={() => { setSelectedWarranty(warranty.id); setShowActivateModal(true) }}>
                            <Shield className="h-4 w-4 mr-1" />Activate
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showVerifyModal && <ManualVerifyModal type="warranty" recordId={selectedWarranty!} onClose={() => setShowVerifyModal(false)} onConfirm={() => setShowVerifyModal(false)} />}
      {showActivateModal && <ManualActivateModal recordId={selectedWarranty!} onClose={() => setShowActivateModal(false)} onConfirm={() => setShowActivateModal(false)} />}
    </div>
  )
}

// Inspection Verification Section - Responsive
function InspectionVerificationSection() {
  const [selectedInspection, setSelectedInspection] = useState<string | null>(null)
  const [showVerifyModal, setShowVerifyModal] = useState(false)

  const pendingInspections = [
    { id: 'INS-2024-001', warranty: 'WRN-2023-100', vehicle: 'Ford Ranger 2022', inspector: 'James Wilson', inspectionDate: '2024-12-18', daysWaiting: 11 },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <ClipboardCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              Pending Inspection Verifications
            </CardTitle>
            <Badge variant="outline" className="w-fit">{pendingInspections.length} pending</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          {/* Mobile Card View */}
          <div className="block sm:hidden divide-y">
            {pendingInspections.map((inspection) => (
              <div key={inspection.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-blue-600 text-sm">{inspection.id}</p>
                    <p className="text-xs text-gray-500 mt-1">Warranty: {inspection.warranty}</p>
                  </div>
                  <span className={`text-sm ${inspection.daysWaiting > 10 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                    {inspection.daysWaiting} days
                  </span>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>{inspection.vehicle}</p>
                  <p>Inspector: {inspection.inspector}</p>
                  <p>Date: {new Date(inspection.inspectionDate).toLocaleDateString()}</p>
                </div>
                <div className="pt-2">
                  <Button size="sm" variant="outline" className="w-full" onClick={() => { setSelectedInspection(inspection.id); setShowVerifyModal(true) }}>
                    <CheckCircle className="h-4 w-4 mr-1" />Verify Inspection
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-4 py-3 font-medium">Inspection ID</th>
                  <th className="px-4 py-3 font-medium">Warranty</th>
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Inspector</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Days</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pendingInspections.map((inspection) => (
                  <tr key={inspection.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-blue-600">{inspection.id}</td>
                    <td className="px-4 py-4 text-sm">{inspection.warranty}</td>
                    <td className="px-4 py-4 text-sm">{inspection.vehicle}</td>
                    <td className="px-4 py-4 text-sm">{inspection.inspector}</td>
                    <td className="px-4 py-4 text-sm">{new Date(inspection.inspectionDate).toLocaleDateString()}</td>
                    <td className="px-4 py-4 text-sm">
                      <span className={inspection.daysWaiting > 10 ? 'text-red-600 font-medium' : ''}>{inspection.daysWaiting}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Button size="sm" variant="outline" onClick={() => { setSelectedInspection(inspection.id); setShowVerifyModal(true) }}>
                        <CheckCircle className="h-4 w-4 mr-1" />Verify
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showVerifyModal && <ManualVerifyModal type="inspection" recordId={selectedInspection!} onClose={() => setShowVerifyModal(false)} onConfirm={() => setShowVerifyModal(false)} />}
    </div>
  )
}


// User Management Section - Responsive
function UserManagementSection() {
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const users = [
    { id: 'usr-001', name: 'John Doe', email: 'john.doe@example.com', partnerRole: 'ACCOUNT_STAFF', account: 'ABC Motors', status: 'Active' },
    { id: 'usr-002', name: 'Jane Smith', email: 'jane.smith@example.com', partnerRole: 'ACCOUNT_INSTALLER', account: 'XYZ Auto', status: 'Active' },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              User Management
            </CardTitle>
            <input type="text" placeholder="Search users..." className="px-3 py-2 border rounded-lg text-sm w-full sm:w-auto" />
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          {/* Mobile Card View */}
          <div className="block sm:hidden divide-y">
            {users.map((user) => (
              <div key={user.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {user.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={
                    user.partnerRole === 'ACCOUNT_INSTALLER' ? 'bg-green-100 text-green-800' :
                    user.partnerRole === 'ACCOUNT_ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }>
                    {user.partnerRole.replace('ACCOUNT_', '')}
                  </Badge>
                  <span className="text-xs text-gray-500">{user.account}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => { setSelectedUser(user.id); setShowRoleModal(true) }}>
                    Change Role
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1">Reassign</Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Account</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium">{user.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{user.email}</td>
                    <td className="px-4 py-4 text-sm">{user.account}</td>
                    <td className="px-4 py-4">
                      <Badge className={
                        user.partnerRole === 'ACCOUNT_INSTALLER' ? 'bg-green-100 text-green-800' :
                        user.partnerRole === 'ACCOUNT_ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }>
                        {user.partnerRole.replace('ACCOUNT_', '')}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedUser(user.id); setShowRoleModal(true) }}>Change Role</Button>
                        <Button size="sm" variant="ghost">Reassign</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showRoleModal && <ChangeRoleModal userId={selectedUser!} onClose={() => setShowRoleModal(false)} onConfirm={() => setShowRoleModal(false)} />}
    </div>
  )
}

// Modal Components - Responsive
function ManualVerifyModal({ type, recordId, onClose, onConfirm }: { type: 'warranty' | 'inspection'; recordId: string; onClose: () => void; onConfirm: () => void }) {
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <Card className="w-full sm:max-w-lg rounded-t-xl sm:rounded-xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
            Manual {type === 'warranty' ? 'Warranty' : 'Inspection'} Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-yellow-800 text-sm">Admin Override</p>
                <p className="text-xs sm:text-sm text-yellow-700 mt-1">This action bypasses normal verification and will be logged.</p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Record ID</label>
            <input type="text" value={recordId} disabled className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Reason *</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
              <option value="">Select a reason...</option>
              <option value="installer_left">Installer has left organization</option>
              <option value="sms_issues">SMS delivery issues</option>
              <option value="system_error">System error</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional context..." className="w-full px-3 py-2 border rounded-lg h-20 sm:h-24 resize-none text-sm" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button onClick={onConfirm} disabled={!reason} className="flex-1 bg-red-600 hover:bg-red-700">Confirm</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ManualActivateModal({ recordId, onClose, onConfirm }: { recordId: string; onClose: () => void; onConfirm: () => void }) {
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <Card className="w-full sm:max-w-lg rounded-t-xl sm:rounded-xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            Manual Warranty Activation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-yellow-800 text-sm">Skip Customer Terms</p>
                <p className="text-xs sm:text-sm text-yellow-700 mt-1">Ensure verbal/written confirmation obtained.</p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Warranty ID</label>
            <input type="text" value={recordId} disabled className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Reason *</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
              <option value="">Select a reason...</option>
              <option value="no_email">Customer unable to access email</option>
              <option value="verbal">Verbal confirmation received</option>
              <option value="written">Written confirmation received</option>
              <option value="expired">Link expired</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Confirmation Details *</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Document how acceptance was confirmed..." className="w-full px-3 py-2 border rounded-lg h-20 sm:h-24 resize-none text-sm" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button onClick={onConfirm} disabled={!reason || !notes} className="flex-1 bg-green-600 hover:bg-green-700">Activate</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ChangeRoleModal({ userId, onClose, onConfirm }: { userId: string; onClose: () => void; onConfirm: () => void }) {
  const [newRole, setNewRole] = useState('')
  const [reason, setReason] = useState('')
  console.debug('Editing role for user:', userId)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <Card className="w-full sm:max-w-lg rounded-t-xl sm:rounded-xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            Change User Role
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">New Role *</label>
            <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
              <option value="">Select new role...</option>
              <option value="ACCOUNT_ADMIN">Account Admin</option>
              <option value="ACCOUNT_STAFF">Account Staff</option>
              <option value="ACCOUNT_INSTALLER">Account Installer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Reason *</label>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g., User completed training" className="w-full px-3 py-2 border rounded-lg h-20 sm:h-24 resize-none text-sm" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button onClick={onConfirm} disabled={!newRole || !reason} className="flex-1">Update Role</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
