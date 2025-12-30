"use client"

import { useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Shield, ClipboardCheck, CheckCircle, AlertTriangle, Search, ChevronLeft, Eye, Clock, X } from "lucide-react"
import Link from "next/link"

const mockPendingInspections = [
  { id: 'INS-2024-001', warrantyId: 'WRN-2023-100', vehicle: 'Ford Ranger 2022', vin: 'MNBFR5FS5MW123456', ownerName: 'Robert Taylor', inspector: 'James Wilson', inspectorEmail: 'james.w@inspections.com', status: 'SUBMITTED', inspectionDate: '2024-12-18', submittedAt: '2024-12-18T15:30:00Z', daysWaiting: 11, corrosionFound: false, partnerAccount: 'ABC Motors' },
  { id: 'INS-2024-002', warrantyId: 'WRN-2023-085', vehicle: 'Nissan Navara 2021', vin: 'JN1TBNT30Z0123456', ownerName: 'Emily Brown', inspector: 'Mark Thompson', inspectorEmail: 'mark.t@inspections.com', status: 'SUBMITTED', inspectionDate: '2024-12-22', submittedAt: '2024-12-22T10:00:00Z', daysWaiting: 7, corrosionFound: true, partnerAccount: 'XYZ Auto' },
]

export default function AdminInspectionsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInspection, setSelectedInspection] = useState<typeof mockPendingInspections[0] | null>(null)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

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

  const filteredInspections = mockPendingInspections.filter(i => {
    return searchTerm === '' || i.id.toLowerCase().includes(searchTerm.toLowerCase()) || i.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) || i.inspector.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 max-h-[450px]">
      {/* Header */}
      <header className="bg-white border-b px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link href="/admin"><Button variant="ghost" size="sm" className="shrink-0 px-2 sm:px-3"><ChevronLeft className="h-4 w-4" /><span className="hidden sm:inline ml-1">Back</span></Button></Link>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">Inspection Verification</h1>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Manual verification for pending inspections</p>
            </div>
          </div>
          <Badge className="bg-red-100 text-red-800 px-2 py-1 text-xs shrink-0"><Shield className="h-3 w-3 mr-1" /><span className="hidden sm:inline">Admin</span></Badge>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b px-4 sm:px-6 py-3 sm:py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search by ID, owner, or inspector..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 text-sm" />
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <Card><CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
            <div className="h-8 w-8 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0"><Clock className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" /></div>
            <div><p className="text-lg sm:text-2xl font-bold">{mockPendingInspections.length}</p><p className="text-xs text-gray-500 hidden sm:block">Pending</p></div>
          </CardContent></Card>
          <Card><CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
            <div className="h-8 w-8 sm:h-12 sm:w-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0"><AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" /></div>
            <div><p className="text-lg sm:text-2xl font-bold">{mockPendingInspections.filter(i => i.corrosionFound).length}</p><p className="text-xs text-gray-500 hidden sm:block">Corrosion</p></div>
          </CardContent></Card>
          <Card><CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
            <div className="h-8 w-8 sm:h-12 sm:w-12 bg-yellow-100 rounded-lg flex items-center justify-center shrink-0"><Clock className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600" /></div>
            <div><p className="text-lg sm:text-2xl font-bold">{mockPendingInspections.filter(i => i.daysWaiting > 10).length}</p><p className="text-xs text-gray-500 hidden sm:block">Overdue</p></div>
          </CardContent></Card>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg"><ClipboardCheck className="h-4 w-4 sm:h-5 sm:w-5" />Pending Inspections<Badge variant="outline" className="ml-2">{filteredInspections.length}</Badge></CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            {/* Mobile Cards */}
            <div className="block lg:hidden divide-y">
              {filteredInspections.map((i) => (
                <div key={i.id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div><p className="font-medium text-blue-600 text-sm">{i.id}</p><p className="text-xs text-gray-500 mt-1">Warranty: {i.warrantyId}</p></div>
                    <Badge className={i.corrosionFound ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>{i.corrosionFound ? 'Corrosion' : 'Clear'}</Badge>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1"><p>{i.vehicle}</p><p>Owner: {i.ownerName}</p><p>Inspector: {i.inspector}</p><p>Date: {new Date(i.inspectionDate).toLocaleDateString()}</p></div>
                  <div className="flex items-center justify-between pt-2">
                    <span className={`text-sm ${i.daysWaiting > 10 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>{i.daysWaiting}d waiting</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setSelectedInspection(i); setShowDetailModal(true) }}><Eye className="h-4 w-4" /></Button>
                      <Button size="sm" onClick={() => { setSelectedInspection(i); setShowVerifyModal(true) }}><CheckCircle className="h-4 w-4 mr-1" />Verify</Button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredInspections.length === 0 && <div className="p-8 text-center text-gray-500">No inspections found</div>}
            </div>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50"><tr className="text-left text-sm text-gray-600">
                  <th className="px-4 py-3 font-medium">ID</th><th className="px-4 py-3 font-medium">Warranty</th><th className="px-4 py-3 font-medium">Vehicle / Owner</th><th className="px-4 py-3 font-medium">Inspector</th><th className="px-4 py-3 font-medium">Date</th><th className="px-4 py-3 font-medium">Corrosion</th><th className="px-4 py-3 font-medium">Days</th><th className="px-4 py-3 font-medium">Actions</th>
                </tr></thead>
                <tbody className="divide-y">
                  {filteredInspections.map((i) => (
                    <tr key={i.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-blue-600">{i.id}</td>
                      <td className="px-4 py-4 text-sm">{i.warrantyId}</td>
                      <td className="px-4 py-4"><div className="text-sm">{i.vehicle}</div><div className="text-xs text-gray-500">{i.ownerName}</div></td>
                      <td className="px-4 py-4"><div className="text-sm">{i.inspector}</div><div className="text-xs text-gray-500">{i.inspectorEmail}</div></td>
                      <td className="px-4 py-4 text-sm">{new Date(i.inspectionDate).toLocaleDateString()}</td>
                      <td className="px-4 py-4"><Badge className={i.corrosionFound ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>{i.corrosionFound ? 'Yes' : 'No'}</Badge></td>
                      <td className="px-4 py-4"><span className={`text-sm ${i.daysWaiting > 10 ? 'text-red-600 font-medium' : ''}`}>{i.daysWaiting}</span></td>
                      <td className="px-4 py-4"><div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedInspection(i); setShowDetailModal(true) }}><Eye className="h-4 w-4" /></Button>
                        <Button size="sm" onClick={() => { setSelectedInspection(i); setShowVerifyModal(true) }}><CheckCircle className="h-4 w-4 mr-1" />Verify</Button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {showDetailModal && selectedInspection && <DetailModal inspection={selectedInspection} onClose={() => setShowDetailModal(false)} />}
      {showVerifyModal && selectedInspection && <VerifyModal inspection={selectedInspection} onClose={() => setShowVerifyModal(false)} />}
    </div>
  )
}

function DetailModal({ inspection, onClose }: { inspection: typeof mockPendingInspections[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <Card className="w-full sm:max-w-2xl rounded-t-xl sm:rounded-xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="p-4 sm:p-6 flex flex-row items-center justify-between">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2"><ClipboardCheck className="h-4 w-4 sm:h-5 sm:w-5" />Inspection Details</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}><X className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs text-gray-500 uppercase">Inspection ID</label><p className="font-medium text-blue-600">{inspection.id}</p></div>
            <div><label className="text-xs text-gray-500 uppercase">Warranty ID</label><p className="font-medium">{inspection.warrantyId}</p></div>
          </div>
          <div className="border-t pt-4"><h4 className="font-medium mb-3 text-sm">Vehicle</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div><label className="text-xs text-gray-500">Vehicle</label><p>{inspection.vehicle}</p></div>
              <div><label className="text-xs text-gray-500">VIN</label><p className="font-mono text-xs break-all">{inspection.vin}</p></div>
              <div><label className="text-xs text-gray-500">Owner</label><p>{inspection.ownerName}</p></div>
            </div>
          </div>
          <div className="border-t pt-4"><h4 className="font-medium mb-3 text-sm">Inspection</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div><label className="text-xs text-gray-500">Inspector</label><p>{inspection.inspector}</p></div>
              <div><label className="text-xs text-gray-500">Date</label><p>{new Date(inspection.inspectionDate).toLocaleDateString()}</p></div>
              <div><label className="text-xs text-gray-500">Corrosion</label><Badge className={inspection.corrosionFound ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>{inspection.corrosionFound ? 'Yes' : 'No'}</Badge></div>
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t"><Button variant="outline" onClick={onClose} className="flex-1">Close</Button></div>
        </CardContent>
      </Card>
    </div>
  )
}

function VerifyModal({ inspection, onClose }: { inspection: { id: string; inspector: string }; onClose: () => void }) {
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <Card className="w-full sm:max-w-lg rounded-t-xl sm:rounded-xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="p-4 sm:p-6"><CardTitle className="text-base sm:text-lg flex items-center gap-2"><Shield className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />Manual Verification</CardTitle></CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"><div className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" /><div><p className="font-medium text-yellow-800 text-sm">Admin Override</p><p className="text-xs text-yellow-700 mt-1">Bypasses inspector SMS for {inspection.id}</p></div></div></div>
          <div><label className="block text-sm font-medium mb-2">Inspector</label><input type="text" value={inspection.inspector} disabled className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-500 text-sm" /></div>
          <div><label className="block text-sm font-medium mb-2">Reason *</label><select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="">Select...</option><option value="left">Inspector left organization</option><option value="sms">SMS issues</option><option value="unavailable">Temporarily unavailable</option><option value="other">Other</option></select></div>
          <div><label className="block text-sm font-medium mb-2">Notes</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional context..." className="w-full px-3 py-2 border rounded-lg h-20 resize-none text-sm" /></div>
          <div className="flex gap-3 pt-2"><Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button><Button disabled={!reason} className="flex-1 bg-red-600 hover:bg-red-700" onClick={onClose}>Verify</Button></div>
        </CardContent>
      </Card>
    </div>
  )
}
