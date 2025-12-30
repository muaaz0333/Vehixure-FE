"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronDown, X } from "lucide-react"
import { useState, useEffect } from "react"
import { erpsApi } from "@/lib/api/client"

interface Agent {
  id: string
  name: string
  company: string
  email: string
  phone: string
  location: string
  accountStatus: "Active" | "inactive"
}

interface PartnerAccount {
  id: string
  businessName: string
  contactPerson: string
  email?: string
  phone?: string
  city?: string
  state?: string
  accountStatus: string
}

interface AgentSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectAgent: (agent: Agent) => void
}

export function AgentSelectionModal({ isOpen, onClose, onSelectAgent }: AgentSelectionModalProps) {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch partner accounts when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchPartnerAccounts()
    }
  }, [isOpen])

  const fetchPartnerAccounts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await erpsApi.partnerAccounts.getAll({
        page: 1,
        limit: 100 // Get all accounts for dropdown
      })

      console.log('Partner Accounts Response:', response)

      // Handle various response structures
      const responseData = response as unknown as Record<string, unknown>
      let accountsArray: PartnerAccount[] = []

      if (Array.isArray(responseData.partnerAccounts)) {
        accountsArray = responseData.partnerAccounts as PartnerAccount[]
      } else if (Array.isArray(responseData.accounts)) {
        accountsArray = responseData.accounts as PartnerAccount[]
      } else if (Array.isArray(responseData.data)) {
        accountsArray = responseData.data as PartnerAccount[]
      } else if (responseData.data && typeof responseData.data === 'object') {
        const dataObj = responseData.data as Record<string, unknown>
        if (Array.isArray(dataObj.partnerAccounts)) {
          accountsArray = dataObj.partnerAccounts as PartnerAccount[]
        } else if (Array.isArray(dataObj.accounts)) {
          accountsArray = dataObj.accounts as PartnerAccount[]
        }
      }

      console.log('Accounts Array:', accountsArray)

      // Transform to Agent format
      const transformedAgents: Agent[] = accountsArray.map(account => ({
        id: account.id,
        name: account.contactPerson || account.businessName,
        company: account.businessName,
        email: account.email || '',
        phone: account.phone || '',
        location: [account.city, account.state].filter(Boolean).join(', ') || '-',
        accountStatus: account.accountStatus === 'Active' ? 'Active' : 'inactive'
      }))

      setAgents(transformedAgents)
    } catch (err) {
      console.error('Error fetching partner accounts:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch agents')
    } finally {
      setLoading(false)
    }
  }

  const selectedAgent = agents.find(agent => agent.id === selectedAgentId)

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgentId(agent.id)
    setIsDropdownOpen(false)
  }

  const handleLoadAgent = () => {
    if (selectedAgent) {
      onSelectAgent(selectedAgent)
    }
  }

  const handleClose = () => {
    setSelectedAgentId(null)
    setIsDropdownOpen(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white max-w-4xl" showCloseButton={false}>
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">Add Warranty</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose} className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Agent Selection Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select an Agent Account
            </label>
            
            {/* Error Message */}
            {error && (
              <div className="mb-3 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
                {error}
                <button onClick={fetchPartnerAccounts} className="ml-2 underline">
                  Retry
                </button>
              </div>
            )}
            
            {/* Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={loading}
                className="w-full h-12 px-4 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between disabled:bg-gray-100"
              >
                <span className={selectedAgent ? "text-gray-900" : "text-gray-500"}>
                  {loading 
                    ? "Loading agents..." 
                    : selectedAgent 
                      ? `${selectedAgent.name} - ${selectedAgent.company}` 
                      : "Select"
                  }
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>
              
              {isDropdownOpen && !loading && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {agents.length === 0 ? (
                    <div className="px-4 py-3 text-gray-500 text-center">
                      No agents found
                    </div>
                  ) : (
                    agents.map((agent) => (
                      <button
                        key={agent.id}
                        type="button"
                        onClick={() => handleAgentSelect(agent)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-xs font-medium text-gray-700">
                              {agent.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900">{agent.name}</div>
                            <div className="text-sm text-gray-600">{agent.company}</div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            agent.accountStatus === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {agent.accountStatus}
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1 h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleLoadAgent}
              disabled={!selectedAgent || loading}
              className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-300 disabled:text-gray-500"
            >
              Load Agent Account
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
