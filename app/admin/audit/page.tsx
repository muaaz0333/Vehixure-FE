"use client"

import { useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { History, Shield, FileCheck, Users, CheckCircle, AlertTriangle, Search, ChevronLeft, Download } from "lucide-react"
import Link from "next/link"

const mockAuditHistory = [
  { id: 'audit-001', actionType: 'ADMIN_OVERRIDE_VERIFY', recordType: 'WARRANTY', recordId: 'WRN-2024-001', statusBefore: 'SUBMITTED', statusAfter: 'PENDING_CUSTOMER_ACTIVATION', performedAt: '2024-12-29T14:00:00Z', reason: 'Installer has left the organization', notes: 'Verified based on photo evidence', performedBy: { fullName: 'Admin User', email: 'admin@erps.com.au' } },
  { id: 'audit-002', actionType: 'ADMIN_OVERRIDE_ACTIVATE', recordType: 'WARRANTY', recordId: 'WRN-2024-002', statusBefore: 'PENDING_CUSTOMER_ACTIVATION', statusAfter: 'ACTIVE', performedAt: '2024-12-28T10:30:00Z', reason: 'Customer unable to access email', notes: 'Verbal confirmation via phone', performedBy: { fullName: 'Admin User', email: 'admin@erps.com.au' } },
  { id: 'audit-003', actionType: 'ADMIN_USER_ROLE_CHANGE', recordType: 'USER', recordId: 'usr-001', statusBefore: 'ACCOUNT_STAFF', statusAfter: 'ACCOUNT_INSTALLER', performedAt: '2024-12-27T16:45:00Z', reason: 'User completed installer training', notes: 'Certificate verified', performedBy: { fullName: 'Admin User', email: 'admin@erps.com.au' } },
  { id: 'audit-004', actionType: 'ADMIN_OVERRIDE_VERIFY', recordType: 'INSPECTION', recordId: 'INS-2024-001', statusBefore: 'SUBMITTED', statusAfter: 'VERIFIED', performedAt: '2024-12-26T09:15:00Z', reason: 'Inspector has left the organization', notes: 'Verified based on photos', performedBy: { fullName: 'Admin User', email: 'admin@erps.com.au' } },
]

const actionLabels: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  'ADMIN_OVERRIDE_VERIFY': { label: 'Manual Verification', color: 'bg-blue-100 text-blue-800', icon: FileCheck },
  'ADMIN_OVERRIDE_ACTIVATE': { label: 'Manual Activation', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  'ADMIN_USER_ROLE_CHANGE': { label: 'Role Change', color: 'bg-purple-100 text-purple-800', icon: Users },
  'ADMIN_USER_ACCOUNT_REASSIGN': { label: 'Account Reassign', color: 'bg-orange-100 text-orange-800', icon: Users },
}

export default function AuditHistoryPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterRecordType, setFilterRecordType] = useState('')

  const isErpsAdmin = user?.role === 'ERPS_ADMIN'

  if (!isErpsAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Access Restricted</h2>
            <p className="text-sm text-gray-500">ERPS Administrators only.</p>
            <Link href="/dashboard"><Button className="mt-4">Return to Dashboard</Button></Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const filteredHistory = mockAuditHistory.filter(item => {
    const matchesSearch = searchTerm === '' || item.recordId.toLowerCase().includes(searchTerm.toLowerCase()) || item.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === '' || item.actionType === filterType
    const matchesRecordType = filterRecordType === '' || item.recordType === filterRecordType
    return matchesSearch && matchesType && matchesRecordType
  })

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 max-h-[450px]">
      {/* Header */}
      <header className="bg-white border-b px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link href="/admin"><Button variant="ghost" size="sm" className="shrink-0 px-2 sm:px-3"><ChevronLeft className="h-4 w-4" /><span className="hidden sm:inline ml-1">Back</span></Button></Link>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">Audit History</h1>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Complete log of admin actions</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="shrink-0"><Download className="h-4 w-4 sm:mr-2" /><span className="hidden sm:inline">Export</span></Button>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search by record ID or reason..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 text-sm" />
          </div>
          <div className="flex gap-2">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 border rounded-lg text-sm flex-1 sm:flex-none">
              <option value="">All Actions</option>
              <option value="ADMIN_OVERRIDE_VERIFY">Verification</option>
              <option value="ADMIN_OVERRIDE_ACTIVATE">Activation</option>
              <option value="ADMIN_USER_ROLE_CHANGE">Role Change</option>
            </select>
            <select value={filterRecordType} onChange={(e) => setFilterRecordType(e.target.value)} className="px-3 py-2 border rounded-lg text-sm flex-1 sm:flex-none">
              <option value="">All Types</option>
              <option value="WARRANTY">Warranty</option>
              <option value="INSPECTION">Inspection</option>
              <option value="USER">User</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg"><History className="h-4 w-4 sm:h-5 sm:w-5" />Admin Actions Log<Badge variant="outline" className="ml-2">{filteredHistory.length}</Badge></CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {filteredHistory.map((item) => {
                const actionInfo = actionLabels[item.actionType] || { label: item.actionType, color: 'bg-gray-100 text-gray-800', icon: Shield }
                const ActionIcon = actionInfo.icon
                return (
                  <div key={item.id} className="border rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shrink-0 ${
                          item.actionType.includes('VERIFY') ? 'bg-blue-100' : item.actionType.includes('ACTIVATE') ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                          <ActionIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            item.actionType.includes('VERIFY') ? 'text-blue-600' : item.actionType.includes('ACTIVATE') ? 'text-green-600' : 'text-purple-600'
                          }`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <Badge className={actionInfo.color + ' text-xs'}>{actionInfo.label}</Badge>
                            <Badge variant="outline" className="text-xs">{item.recordType}</Badge>
                          </div>
                          <p className="font-medium text-sm">Record: <span className="text-blue-600">{item.recordId}</span></p>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1"><span className="font-medium">Reason:</span> {item.reason}</p>
                          {item.notes && <p className="text-xs text-gray-500 mt-1 line-clamp-2"><span className="font-medium">Notes:</span> {item.notes}</p>}
                          <p className="text-xs text-gray-400 mt-2">{item.statusBefore} → {item.statusAfter}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right text-xs sm:text-sm shrink-0 pl-11 sm:pl-0">
                        <p className="text-gray-500">{new Date(item.performedAt).toLocaleDateString()}</p>
                        <p className="text-gray-400">{new Date(item.performedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="text-gray-500 mt-1 hidden sm:block">by {item.performedBy.fullName}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
              {filteredHistory.length === 0 && (
                <div className="text-center py-12"><History className="h-12 w-12 text-gray-300 mx-auto mb-4" /><p className="text-gray-500">No audit entries found</p><p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p></div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
