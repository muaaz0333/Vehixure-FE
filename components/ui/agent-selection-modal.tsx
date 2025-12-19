"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronDown, X } from "lucide-react"
import { useState } from "react"

interface Agent {
  id: string
  name: string
  company: string
  email: string
  phone: string
  location: string
  status: "active" | "inactive"
}

interface AgentSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectAgent: (agent: Agent) => void
}

// Mock agents data
const mockAgents: Agent[] = [
  {
    id: "1",
    name: "John Smith",
    company: "ABB NorthSales",
    email: "john.smith@abbnorth.com",
    phone: "+1 (555) 123-4567",
    location: "Sydney, NSW",
    status: "active"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    company: "Premium Auto Sales",
    email: "sarah.j@premiumauto.com",
    phone: "+1 (555) 234-5678",
    location: "Melbourne, VIC",
    status: "active"
  },
  {
    id: "3",
    name: "Mike Wilson",
    company: "Elite Motors",
    email: "mike.wilson@elitemotors.com",
    phone: "+1 (555) 345-6789",
    location: "Brisbane, QLD",
    status: "active"
  },
  {
    id: "4",
    name: "Emma Davis",
    company: "City Car Center",
    email: "emma.davis@citycar.com",
    phone: "+1 (555) 456-7890",
    location: "Perth, WA",
    status: "active"
  },
  {
    id: "5",
    name: "David Brown",
    company: "Metro Vehicle Sales",
    email: "david.brown@metrovehicle.com",
    phone: "+1 (555) 567-8901",
    location: "Adelaide, SA",
    status: "inactive"
  }
]

export function AgentSelectionModal({ isOpen, onClose, onSelectAgent }: AgentSelectionModalProps) {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const selectedAgent = mockAgents.find(agent => agent.id === selectedAgentId)

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgentId(agent.id)
    setIsDropdownOpen(false)
  }

  const handleLoadAgent = () => {
    if (selectedAgent) {
      onSelectAgent(selectedAgent)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" bg-white max-w-4xl" showCloseButton={false}>
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">Add Warranty</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
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
            
            {/* Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-12 px-4 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between"
              >
                <span className={selectedAgent ? "text-gray-900" : "text-gray-500"}>
                  {selectedAgent ? `${selectedAgent.name} - ${selectedAgent.company}` : "Select"}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {mockAgents.map((agent) => (
                    <button
                      key={agent.id}
                      type="button"
                      onClick={() => handleAgentSelect(agent)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium text-gray-700">
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900">{agent.name}</div>
                          <div className="text-sm text-gray-600">{agent.company}</div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          agent.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {agent.status}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleLoadAgent}
              disabled={!selectedAgent}
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