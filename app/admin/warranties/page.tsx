"use client"

import { useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Shield, 
  FileCheck, 
  CheckCircle,
  AlertTriangle,
  Search,
  ChevronLeft,
  Eye,
  Clock,
  History
} from "lucide-react"
import Link from "next/link"

// Mock data for pending warranties
const mockPendingWarranties = [
  {
    id: 'WRN-2024-001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '+61400123456',
    vehicle: 'Toyota Camry 2023',
    vin: '1HGBH41JXMN109186',
    installer: 'Mike Johnson',
    installerEmail: 'mike.j@abcmotors.com',
    status: 'SUBMITTED',
    submittedAt: '2024-12-20T10:30:00Z',
    daysWaiting: 9,
    partnerAccount: 'ABC Motors',
    photos: 3
  },
  {
    id: 'WRN-2024-002',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah.w@email.com',
    customerPhone: '+61400654321',
    vehicle: 'Honda Accord 2024',
    vin: '2HGFC2F59MH123456',
    installer: 'Tom Brown',
    installerEmail: 'tom.b@xyzauto.com',
    status: 'PENDING_CUSTOMER_ACTIVATION',
    submittedAt: '2024-12-15T14:00:00Z',
    verifiedAt: '2024-12-16T09:00:00Z',
    daysWaiting: 14,
    partnerAccount: 'XYZ Auto',
    photos: 4
  },
  {
    id: 'WRN-2024-003',
    customerName: 'Michael Chen',
    customerEmail: 'michael.c@email.com',
    customerPhone: '+61400789012',
    vehicle: 'Mazda CX-5 2023',
    vin: 'JM3KFBCM5N0123456',
    installer: 'David Lee',
    installerEmail: 'david.l@premiumauto.com',
    status: 'SUBMITTED',
    submittedAt: '2024-12-22T11:15:00Z',
    daysWaiting: 7,
    partnerAccount: 'Premium Auto',
    photos: 3
  },
]

export default function AdminWarrantiesPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [selectedWarranty, setSelectedWarranty] = useState<typeof mockPendingWarranties[0] | null>(null)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showActivateModal, setShowActivateModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Check if user is ERPS Admin
  const isErpsAdmin = user?.role === 'ERPS_ADMIN'

  if (!isErpsAdmin) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-gray-500">
              This page is only accessible to ERPS Administrators.
            </p>
            <Link href="/dashboard">
              <Button className="mt-4">Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Filter warranties
  const filteredWarranties = mockPendingWarranties.filter(w => {
    const matchesSearch = searchTerm === '' ||
      w.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.installer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === '' || w.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return <Badge className="bg-blue-100 text-blue-800">Awaiting Installer Verification</Badge>
      case 'PENDING_CUSTOMER_ACTIVATION':
        return <Badge className="bg-yellow-100 text-yellow-800">Awaiting Customer Activation</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Warranty Verification</h1>
              <p className="text-sm text-gray-500 mt-1">Manual verification and activation for pending warranties</p>
            </div>
          </div>
          <Badge className="bg-red-100 text-red-800 px-3 py-1">
            <Shield className="h-4 w-4 mr-1" />
            Admin Access
          </Badge>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by ID, customer, VIN, or installer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">All Statuses</option>
            <option value="SUBMITTED">Awaiting Installer Verification</option>
            <option value="PENDING_CUSTOMER_ACTIVATION">Awaiting Customer Activation</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockPendingWarranties.filter(w => w.status === 'SUBMITTED').length}
                </p>
                <p className="text-sm text-gray-500">Awaiting Installer Verification</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FileCheck className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockPendingWarranties.filter(w => w.status === 'PENDING_CUSTOMER_ACTIVATION').length}
                </p>
                <p className="text-sm text-gray-500">Awaiting Customer Activation</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockPendingWarranties.filter(w => w.daysWaiting > 10).length}
                </p>
                <p className="text-sm text-gray-500">Overdue (10+ days)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Pending Warranties
              <Badge variant="outline" className="ml-2">
                {filteredWarranties.length} records
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-left text-sm text-gray-600">
                    <th className="px-4 py-3 font-medium">Warranty ID</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Vehicle</th>
                    <th className="px-4 py-3 font-medium">Partner / Installer</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Waiting</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredWarranties.map((warranty) => (
                    <tr key={warranty.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <span className="font-medium text-blue-600">{warranty.id}</span>
                        <div className="text-xs text-gray-400 mt-1">
                          {warranty.photos} photos
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium">{warranty.customerName}</div>
                        <div className="text-xs text-gray-500">{warranty.customerEmail}</div>
                        <div className="text-xs text-gray-400">{warranty.customerPhone}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">{warranty.vehicle}</div>
                        <div className="text-xs text-gray-500 font-mono">VIN: {warranty.vin}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium">{warranty.partnerAccount}</div>
                        <div className="text-xs text-gray-500">{warranty.installer}</div>
                        <div className="text-xs text-gray-400">{warranty.installerEmail}</div>
                      </td>
                      <td className="px-4 py-4">
                        {getStatusBadge(warranty.status)}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm font-medium ${
                          warranty.daysWaiting > 10 ? 'text-red-600' : 
                          warranty.daysWaiting > 5 ? 'text-yellow-600' : 'text-gray-600'
                        }`}>
                          {warranty.daysWaiting} days
                        </span>
                        <div className="text-xs text-gray-400">
                          Since {new Date(warranty.submittedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedWarranty(warranty)
                              setShowDetailModal(true)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {warranty.status === 'SUBMITTED' && (
                            <Button 
                              size="sm"
                              onClick={() => {
                                setSelectedWarranty(warranty)
                                setShowVerifyModal(true)
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verify
                            </Button>
                          )}
                          {warranty.status === 'PENDING_CUSTOMER_ACTIVATION' && (
                            <Button 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => {
                                setSelectedWarranty(warranty)
                                setShowActivateModal(true)
                              }}
                            >
                              <Shield className="h-4 w-4 mr-1" />
                              Activate
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredWarranties.length === 0 && (
                <div className="text-center py-12">
                  <FileCheck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No pending warranties found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedWarranty && (
        <WarrantyDetailModal
          warranty={selectedWarranty}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {/* Verify Modal */}
      {showVerifyModal && selectedWarranty && (
        <ManualVerifyModal
          warranty={selectedWarranty}
          onClose={() => setShowVerifyModal(false)}
          onConfirm={(reason, notes) => {
            console.log('Verify warranty:', selectedWarranty.id, reason, notes)
            setShowVerifyModal(false)
          }}
        />
      )}

      {/* Activate Modal */}
      {showActivateModal && selectedWarranty && (
        <ManualActivateModal
          warranty={selectedWarranty}
          onClose={() => setShowActivateModal(false)}
          onConfirm={(reason, notes) => {
            console.log('Activate warranty:', selectedWarranty.id, reason, notes)
            setShowActivateModal(false)
          }}
        />
      )}
    </div>
  )
}


// Warranty Detail Modal
function WarrantyDetailModal({
  warranty,
  onClose
}: {
  warranty: {
    id: string
    customerName: string
    customerEmail: string
    customerPhone: string
    vehicle: string
    vin: string
    installer: string
    installerEmail: string
    status: string
    submittedAt: string
    verifiedAt?: string
    daysWaiting: number
    partnerAccount: string
    photos: number
  }
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Warranty Details
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Warranty Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase">Warranty ID</label>
              <p className="font-medium text-blue-600">{warranty.id}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">Status</label>
              <p>
                <Badge className={
                  warranty.status === 'SUBMITTED' 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }>
                  {warranty.status.replace(/_/g, ' ')}
                </Badge>
              </p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Customer Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase">Name</label>
                <p className="font-medium">{warranty.customerName}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Email</label>
                <p>{warranty.customerEmail}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Phone</label>
                <p>{warranty.customerPhone}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Vehicle Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase">Vehicle</label>
                <p className="font-medium">{warranty.vehicle}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">VIN</label>
                <p className="font-mono text-sm">{warranty.vin}</p>
              </div>
            </div>
          </div>

          {/* Installer Info */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Installation Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase">Partner Account</label>
                <p className="font-medium">{warranty.partnerAccount}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Installer</label>
                <p>{warranty.installer}</p>
                <p className="text-xs text-gray-500">{warranty.installerEmail}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Submitted</label>
                <p>{new Date(warranty.submittedAt).toLocaleString()}</p>
              </div>
              {warranty.verifiedAt && (
                <div>
                  <label className="text-xs text-gray-500 uppercase">Verified</label>
                  <p>{new Date(warranty.verifiedAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Photos placeholder */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Photos ({warranty.photos})</h4>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: warranty.photos }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Photo {i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button variant="outline" className="flex-1">
              <History className="h-4 w-4 mr-2" />
              View Audit History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Manual Verify Modal
function ManualVerifyModal({
  warranty,
  onClose,
  onConfirm
}: {
  warranty: { id: string; installer: string }
  onClose: () => void
  onConfirm: (reason: string, notes: string) => void
}) {
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [skipNotification, setSkipNotification] = useState(false)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg mx-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            Manual Warranty Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Admin Override</p>
                <p className="text-sm text-yellow-700 mt-1">
                  This will bypass installer SMS verification for warranty {warranty.id}.
                  The action will be logged in the audit trail.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Installer
            </label>
            <input
              type="text"
              value={warranty.installer}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Reason for Manual Verification *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select a reason...</option>
              <option value="installer_left">Installer has left the organization</option>
              <option value="sms_issues">SMS delivery issues</option>
              <option value="installer_unavailable">Installer temporarily unavailable</option>
              <option value="system_error">System error</option>
              <option value="other">Other (specify in notes)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide additional context for this override..."
              className="w-full px-3 py-2 border rounded-lg h-24 resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="skipNotification"
              checked={skipNotification}
              onChange={(e) => setSkipNotification(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="skipNotification" className="text-sm">
              Skip customer notification email
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={() => onConfirm(reason, notes)}
              disabled={!reason}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Confirm Verification
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Manual Activate Modal
function ManualActivateModal({
  warranty,
  onClose,
  onConfirm
}: {
  warranty: { id: string; customerName: string }
  onClose: () => void
  onConfirm: (reason: string, notes: string) => void
}) {
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg mx-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Manual Warranty Activation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Skip Customer Terms Acceptance</p>
                <p className="text-sm text-yellow-700 mt-1">
                  This will activate warranty {warranty.id} for {warranty.customerName} 
                  without online terms acceptance. Ensure confirmation has been obtained.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Reason for Manual Activation *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select a reason...</option>
              <option value="no_email">Customer unable to access email</option>
              <option value="verbal_confirmation">Verbal confirmation received (phone)</option>
              <option value="written_confirmation">Written confirmation received</option>
              <option value="link_expired">Activation link expired</option>
              <option value="customer_request">Customer request</option>
              <option value="other">Other (specify in notes)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirmation Details *
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Document how customer acceptance was confirmed (e.g., phone call date/time, written document reference)..."
              className="w-full px-3 py-2 border rounded-lg h-24 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={() => onConfirm(reason, notes)}
              disabled={!reason || !notes}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Activate Warranty
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
