import InspectorSidebar from '@/components/layouts/inspector-sidebar'
import { Search, User } from 'lucide-react'

export default function InspectorDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <InspectorSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome Back, Inspector
            </h1>
            
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-gray-400" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm text-gray-700">Inspector</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Record Inspection Card */}
            <div className="bg-pink-100 rounded-lg p-6 border border-pink-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Record Inspection
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Select this option to:-
              </p>
              <div className="text-sm text-gray-700 space-y-1">
                <p>Search for a Vehicle, Print</p>
                <p>Inspection Sheet, Record an</p>
                <p>Inspections</p>
              </div>
            </div>

            {/* Search for Vehicle Card */}
            <div className="bg-pink-100 rounded-lg p-6 border border-pink-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Search for Vehicle
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Select this option to:-
              </p>
              <div className="text-sm text-gray-700">
                <p>Find vehicle inspection details</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}