'use client'

import Link from 'next/link'

import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { useState } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import { useRouter } from 'next/navigation'

// Mock data for inspectors
const inspectorsData = [
  {
    no: 1,
    businessName: 'Co-Op Toyota',
    id: 'EPT2002',
    contact: 'Jacob Thurston',
    username: 'jacob.thurston@co-optoyota.com.au',
    password: '374674',
    status: 'Active',
    loginSent: 'Y'
  },
  {
    no: 2,
    businessName: 'Co-Op Toyota',
    id: 'EPT2002',
    contact: 'Jacob Thurston',
    username: 'jacob.thurston@co-optoyota.com.au',
    password: '374674',
    status: 'Active',
    loginSent: 'Y'
  },
  {
    no: 3,
    businessName: 'Co-Op Toyota',
    id: 'EPT2002',
    contact: 'Jacob Thurston',
    username: 'jacob.thurston@co-optoyota.com.au',
    password: '374674',
    status: 'Active',
    loginSent: 'Y'
  },
  {
    no: 4,
    businessName: 'Co-Op Toyota',
    id: 'EPT2002',
    contact: 'Jacob Thurston',
    username: 'jacob.thurston@co-optoyota.com.au',
    password: '374674',
    status: 'Active',
    loginSent: 'Y'
  },
  {
    no: 5,
    businessName: 'Co-Op Toyota',
    id: 'EPT2002',
    contact: 'Jacob Thurston',
    username: 'jacob.thurston@co-optoyota.com.au',
    password: '374674',
    status: 'Active',
    loginSent: 'Y'
  },
  {
    no: 6,
    businessName: 'Co-Op Toyota',
    id: 'EPT2002',
    contact: 'Jacob Thurston',
    username: 'jacob.thurston@co-optoyota.com.au',
    password: '374674',
    status: 'Active',
    loginSent: 'Y'
  },
  {
    no: 7,
    businessName: 'Co-Op Toyota',
    id: 'EPT2002',
    contact: 'Jacob Thurston',
    username: 'jacob.thurston@co-optoyota.com.au',
    password: '374674',
    status: 'Active',
    loginSent: 'Y'
  },
  {
    no: 8,
    businessName: 'Co-Op Toyota',
    id: 'EPT2002',
    contact: 'Jacob Thurston',
    username: 'jacob.thurston@co-optoyota.com.au',
    password: '374674',
    status: 'Active',
    loginSent: 'Y'
  },
  {
    no: 9,
    businessName: 'Co-Op Toyota',
    id: 'EPT2002',
    contact: 'Jacob Thurston',
    username: 'jacob.thurston@co-optoyota.com.au',
    password: '374674',
    status: 'Active',
    loginSent: 'Y'
  },
  {
    no: 10,
    businessName: 'Co-Op Toyota',
    id: 'EPT2002',
    contact: 'Jacob Thurston',
    username: 'jacob.thurston@co-optoyota.com.au',
    password: '374674',
    status: 'Active',
    loginSent: 'Y'
  }
]

const columns = [
  { key: 'no', label: 'No', width: '60px' },
  { key: 'businessName', label: 'Business Name', width: '150px' },
  { key: 'id', label: 'ID', width: '120px' },
  { key: 'contact', label: 'Contact', width: '150px' },
  { key: 'username', label: 'Username', width: '250px' },
  { key: 'password', label: 'Password', width: '120px' },
  { key: 'status', label: 'Status', width: '100px' },
  { key: 'loginSent', label: 'Login Sent', width: '100px' }
]

export default function InspectorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredInspectors = inspectorsData.filter(inspector => {
    if (!searchTerm) return true

    const term = searchTerm.toLowerCase()

    return (
      inspector.businessName?.toLowerCase().includes(term) ||
      inspector.username?.toLowerCase().includes(term) ||
      inspector.contact?.toLowerCase().includes(term)
    )
  })

  const { user, logout } = useAuth()
  const router = useRouter()
  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Page Header */}
      <PageHeader
        title="Agents/Inspectors"
        showSearch
        onSearchChange={setSearchTerm}
        searchValue={searchTerm}
        user={user}
        onLogout={handleLogout}
      />

      {/* Sub navigation tabs */}
      <div className="bg-white border-b">
        <div className="px-6">
          <div className="flex border-b">
            <Link href="/agents">
              <button className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                Agents
              </button>
            </Link>
            <Link href="/inspectors">
              <button className="px-4 py-3 text-sm font-medium border-b-2 border-red-500 text-red-600">
                Inspectors
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white overflow-hidden">
        <div className="h-full flex flex-col p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Inspectors</h2>

          {/* Data table */}
          <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg">
            <DataTable
              columns={columns}
              data={filteredInspectors}
              title=""
              showSearch={false}
              showAdd={false}
              showEdit={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}