"use client"

import { useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Shield, Users, AlertTriangle, Search, ChevronLeft, UserCog, Building2 } from "lucide-react"
import Link from "next/link"

const mockUsers = [
  { id: 'usr-001', fullName: 'John Doe', email: 'john.doe@abcmotors.com', partnerRole: 'ACCOUNT_STAFF', partnerAccount: 'ABC Motors', partnerAccountId: 'acc-001', mobileNumber: '+61400123456', status: 'Active', isAccreditedInstaller: false },
  { id: 'usr-002', fullName: 'Jane Smith', email: 'jane.smith@xyzauto.com', partnerRole: 'ACCOUNT_INSTALLER', partnerAccount: 'XYZ Auto', partnerAccountId: 'acc-002', mobileNumber: '+61400654321', status: 'Active', isAccreditedInstaller: true },
  { id: 'usr-003', fullName: 'Mike Johnson', email: 'mike.j@abcmotors.com', partnerRole: 'ACCOUNT_ADMIN', partnerAccount: 'ABC Motors', partnerAccountId: 'acc-001', mobileNumber: '+61400789012', status: 'Active', isAccreditedInstaller: false },
  { id: 'usr-004', fullName: 'Sarah Wilson', email: 'sarah.w@premiumauto.com', partnerRole: 'ACCOUNT_INSTALLER', partnerAccount: 'Premium Auto', partnerAccountId: 'acc-003', mobileNumber: '+61400345678', status: 'Inactive', isAccreditedInstaller: true },
]

const mockAccounts = [
  { id: 'acc-001', name: 'ABC Motors' },
  { id: 'acc-002', name: 'XYZ Auto' },
  { id: 'acc-003', name: 'Premium Auto' },
  { id: 'acc-004', name: 'City Cars' },
]

export default function AdminUsersPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [accountFilter, setAccountFilter] = useState('')
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showReassignModal, setShowReassignModal] = useState(false)

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

  const filteredUsers = mockUsers.filter(u => {
    const matchesSearch = searchTerm === '' || u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === '' || u.partnerRole === roleFilter
    const matchesAccount = accountFilter === '' || u.partnerAccountId === accountFilter
    return matchesSearch && matchesRole && matchesAccount
  })

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ACCOUNT_ADMIN': return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
      case 'ACCOUNT_INSTALLER': return <Badge className="bg-green-100 text-green-800">Installer</Badge>
      case 'ACCOUNT_STAFF': return <Badge className="bg-blue-100 text-blue-800">Staff</Badge>
      default: return <Badge className="bg-gray-100 text-gray-800">{role}</Badge>
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 max-h-[450px]">
      {/* Header */}
      <header className="bg-white border-b px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link href="/admin"><Button variant="ghost" size="sm" className="shrink-0 px-2 sm:px-3"><ChevronLeft className="h-4 w-4" /><span className="hidden sm:inline ml-1">Back</span></Button></Link>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">User Management</h1>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Manage roles and account assignments</p>
            </div>
          </div>
          <Badge className="bg-red-100 text-red-800 px-2 py-1 text-xs shrink-0"><Shield className="h-3 w-3 mr-1" /><span className="hidden sm:inline">Admin</span></Badge>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 text-sm" />
          </div>
          <div className="flex gap-2">
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-3 py-2 border rounded-lg text-sm flex-1 sm:flex-none">
              <option value="">All Roles</option>
              <option value="ACCOUNT_ADMIN">Admin</option>
              <option value="ACCOUNT_STAFF">Staff</option>
              <option value="ACCOUNT_INSTALLER">Installer</option>
            </select>
            <select value={accountFilter} onChange={(e) => setAccountFilter(e.target.value)} className="px-3 py-2 border rounded-lg text-sm flex-1 sm:flex-none">
              <option value="">All Accounts</option>
              {mockAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <Card><CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0"><Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" /></div>
            <div><p className="text-lg sm:text-xl font-bold">{mockUsers.length}</p><p className="text-xs text-gray-500">Total</p></div>
          </CardContent></Card>
          <Card><CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0"><UserCog className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" /></div>
            <div><p className="text-lg sm:text-xl font-bold">{mockUsers.filter(u => u.partnerRole === 'ACCOUNT_INSTALLER').length}</p><p className="text-xs text-gray-500">Installers</p></div>
          </CardContent></Card>
          <Card><CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0"><Shield className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" /></div>
            <div><p className="text-lg sm:text-xl font-bold">{mockUsers.filter(u => u.partnerRole === 'ACCOUNT_ADMIN').length}</p><p className="text-xs text-gray-500">Admins</p></div>
          </CardContent></Card>
          <Card><CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0"><Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" /></div>
            <div><p className="text-lg sm:text-xl font-bold">{mockAccounts.length}</p><p className="text-xs text-gray-500">Accounts</p></div>
          </CardContent></Card>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg"><Users className="h-4 w-4 sm:h-5 sm:w-5" />Partner Users<Badge variant="outline" className="ml-2">{filteredUsers.length}</Badge></CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            {/* Mobile Cards */}
            <div className="block lg:hidden divide-y">
              {filteredUsers.map((u) => (
                <div key={u.id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div><p className="font-medium text-sm">{u.fullName}</p><p className="text-xs text-gray-500 truncate max-w-[200px]">{u.email}</p></div>
                    <Badge className={u.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>{u.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {getRoleBadge(u.partnerRole)}
                    {u.isAccreditedInstaller && <Badge variant="outline" className="text-xs">Accredited</Badge>}
                    <span className="text-xs text-gray-500">{u.partnerAccount}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => { setSelectedUser(u); setShowRoleModal(true) }}><UserCog className="h-4 w-4 mr-1" />Role</Button>
                    <Button size="sm" variant="ghost" className="flex-1" onClick={() => { setSelectedUser(u); setShowReassignModal(true) }}><Building2 className="h-4 w-4 mr-1" />Reassign</Button>
                  </div>
                </div>
              ))}
              {filteredUsers.length === 0 && <div className="p-8 text-center text-gray-500">No users found</div>}
            </div>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50"><tr className="text-left text-sm text-gray-600">
                  <th className="px-4 py-3 font-medium">User</th><th className="px-4 py-3 font-medium">Account</th><th className="px-4 py-3 font-medium">Role</th><th className="px-4 py-3 font-medium">Mobile</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Actions</th>
                </tr></thead>
                <tbody className="divide-y">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4"><div className="text-sm font-medium">{u.fullName}</div><div className="text-xs text-gray-500">{u.email}</div></td>
                      <td className="px-4 py-4 text-sm">{u.partnerAccount}</td>
                      <td className="px-4 py-4"><div className="flex items-center gap-2">{getRoleBadge(u.partnerRole)}{u.isAccreditedInstaller && <Badge variant="outline" className="text-xs">Accredited</Badge>}</div></td>
                      <td className="px-4 py-4 text-sm">{u.mobileNumber || '-'}</td>
                      <td className="px-4 py-4"><Badge className={u.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>{u.status}</Badge></td>
                      <td className="px-4 py-4"><div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedUser(u); setShowRoleModal(true) }}><UserCog className="h-4 w-4 mr-1" />Role</Button>
                        <Button size="sm" variant="ghost" onClick={() => { setSelectedUser(u); setShowReassignModal(true) }}><Building2 className="h-4 w-4 mr-1" />Reassign</Button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {showRoleModal && selectedUser && <RoleModal user={selectedUser} onClose={() => setShowRoleModal(false)} />}
      {showReassignModal && selectedUser && <ReassignModal user={selectedUser} accounts={mockAccounts} onClose={() => setShowReassignModal(false)} />}
    </div>
  )
}

function RoleModal({ user, onClose }: { user: { fullName: string; partnerRole: string; mobileNumber?: string }; onClose: () => void }) {
  const [newRole, setNewRole] = useState(user.partnerRole)
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber || '')
  const [reason, setReason] = useState('')
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <Card className="w-full sm:max-w-lg rounded-t-xl sm:rounded-xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="p-4 sm:p-6"><CardTitle className="text-base sm:text-lg flex items-center gap-2"><UserCog className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />Change User Role</CardTitle></CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3"><p className="text-sm text-blue-800">Changing role for: <span className="font-medium">{user.fullName}</span></p><p className="text-xs text-blue-600 mt-1">Current: {user.partnerRole.replace('ACCOUNT_', '')}</p></div>
          <div><label className="block text-sm font-medium mb-2">New Role *</label><select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="ACCOUNT_ADMIN">Account Admin</option><option value="ACCOUNT_STAFF">Account Staff</option><option value="ACCOUNT_INSTALLER">Account Installer</option></select></div>
          {newRole === 'ACCOUNT_INSTALLER' && <div><label className="block text-sm font-medium mb-2">Mobile Number *</label><Input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="+61400123456" /><p className="text-xs text-gray-500 mt-1">Required for SMS verification</p></div>}
          <div><label className="block text-sm font-medium mb-2">Reason *</label><textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g., Completed training" className="w-full px-3 py-2 border rounded-lg h-20 resize-none text-sm" /></div>
          <div className="flex gap-3 pt-2"><Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button><Button disabled={!reason || (newRole === 'ACCOUNT_INSTALLER' && !mobileNumber)} className="flex-1" onClick={onClose}>Update</Button></div>
        </CardContent>
      </Card>
    </div>
  )
}

function ReassignModal({ user, accounts, onClose }: { user: { fullName: string; partnerAccount: string; partnerAccountId: string }; accounts: Array<{ id: string; name: string }>; onClose: () => void }) {
  const [newAccountId, setNewAccountId] = useState('')
  const [reason, setReason] = useState('')
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <Card className="w-full sm:max-w-lg rounded-t-xl sm:rounded-xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="p-4 sm:p-6"><CardTitle className="text-base sm:text-lg flex items-center gap-2"><Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />Reassign Account</CardTitle></CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3"><p className="text-sm text-orange-800">Reassigning: <span className="font-medium">{user.fullName}</span></p><p className="text-xs text-orange-600 mt-1">Current: {user.partnerAccount}</p></div>
          <div><label className="block text-sm font-medium mb-2">New Account *</label><select value={newAccountId} onChange={(e) => setNewAccountId(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="">Select account...</option>{accounts.filter(a => a.id !== user.partnerAccountId).map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></div>
          <div><label className="block text-sm font-medium mb-2">Reason *</label><textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g., Transferred to new location" className="w-full px-3 py-2 border rounded-lg h-20 resize-none text-sm" /></div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"><p className="text-xs text-yellow-800"><AlertTriangle className="h-4 w-4 inline mr-1" />This will be logged in audit trail.</p></div>
          <div className="flex gap-3 pt-2"><Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button><Button disabled={!newAccountId || !reason} className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={onClose}>Reassign</Button></div>
        </CardContent>
      </Card>
    </div>
  )
}
