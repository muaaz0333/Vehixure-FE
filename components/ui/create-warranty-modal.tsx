"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, ChevronDown, Calendar } from "lucide-react"
import { useState } from "react"

interface Agent {
  id: string
  name: string
  company: string
  email: string
  phone: string
  location: string
  accountStatus: "Active" | "inactive"
}

interface CreateWarrantyModalProps {
  isOpen: boolean
  onClose: () => void
  selectedAgent: Agent | null
}

const makeOptions = ["TOYOTA", "FORD", "HOLDEN", "MAZDA", "NISSAN", "HONDA", "HYUNDAI", "KIA", "SUBARU", "MITSUBISHI"]
const modelOptions = ["Cruiser", "Ranger", "Commodore", "CX-5", "Navara", "Civic", "i30", "Cerato", "Forester", "Triton"]
const productOptions = [
  { id: "eco-pro", name: "ECO-PRO", description: "Limited Lifetime Corrosion, 5 Year Product" },
  { id: "eco-pro-10", name: "ECO-PRO", description: "10 Year Corrosion, 5 Year Product" },
  { id: "erps", name: "ERPS", description: "10 Year Corrosion, 10 Year Product" }
]
const installerOptions = ["Cruiser", "Ranger", "Commodore", "CX-5", "Navara"]

export function CreateWarrantyModal({ isOpen, onClose, selectedAgent }: CreateWarrantyModalProps) {
  const [formData, setFormData] = useState({
    refStockId: "",
    agentAccount: selectedAgent?.company || "",
    companyName: "",
    emailAddress: "",
    firstName: "",
    lastName: "",
    personalPhoneNumber: "",
    make: "",
    model: "",
    registrationNumber: "",
    buildDate: "",
    vinNumber: "",
    productInstalled: "",
    installerName: "",
    generatorSerialNumber: "",
    generatorSerialNumber2: "",
    voltageInCouplerSupplyLine: "",
    positionOfCouplers: "",
    corrosionFound: "yes",
    confirmInstallation: false
  })

  const [dropdowns, setDropdowns] = useState({
    make: false,
    model: false,
    productInstalled: false,
    installerName: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleDropdown = (dropdown: string) => {
    setDropdowns(prev => ({ ...prev, [dropdown]: !prev[dropdown as keyof typeof prev] }))
  }

  const selectOption = (dropdown: string, value: string) => {
    handleInputChange(dropdown, value)
    setDropdowns(prev => ({ ...prev, [dropdown]: false }))
  }

  const handleSubmit = () => {
    console.log("Creating warranty with data:", formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide [&>button]:hidden"> */}
      <DialogContent
        className="
    w-[95vw] sm:w-full
    max-w-full sm:max-w-xl lg:max-w-2xl
    max-h-[90vh]
    overflow-y-auto
    scrollbar-hide
    px-4 sm:px-6
    [&>button]:hidden
  "
      >

        <DialogHeader className="pb-4">
          {/* <div className="flex items-center justify-between"> */}
          <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">

            <DialogTitle className="text-xl font-bold">Add Warranty</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* REF / Stock ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              REF / Stock ID
            </label>
            <Input
              value={formData.refStockId}
              onChange={(e) => handleInputChange('refStockId', e.target.value)}
              className="bg-gray-50"
              // readOnly
            />
          </div>

          {/* Agent Information */}
          <div>
            <h3 className="text-md font-semibold text-red-600 mb-3">Agent Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select an Agent Account
              </label>
              {/* <div className="flex items-center gap-2"> */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Input
                  value={selectedAgent ? `${selectedAgent.name} - ${selectedAgent.company}` : "No agent selected"}
                  className="flex-1 bg-gray-50"
                  readOnly
                />
                <span className="text-red-600 font-medium">Admin</span>
              </div>
            </div>
          </div>

          {/* Vehicle Owner */}
          <div>
            <h3 className="text-md font-semibold text-red-600 mb-3">Vehicle Owner</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <Input
                  placeholder="Ex: Eliza Maguire"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  placeholder="Ex: Eliza Maguire"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                />
              </div>
              {/* <div className="grid grid-cols-2 gap-4"> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input
                    placeholder="Ex: Eliza Maguire"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input
                    placeholder="Ex: Eliza Maguire"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Personal Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: Eliza Maguire"
                  value={formData.personalPhoneNumber}
                  onChange={(e) => handleInputChange('personalPhoneNumber', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div>
            <h3 className="text-md font-semibold text-red-600 mb-3">Vehicle Details</h3>
            <div className="space-y-4">
              {/* <div className="grid grid-cols-2 gap-4"> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Make
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('make')}
                      className="w-full h-10 px-3 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between"
                    >
                      <span className="text-gray-500">{formData.make}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {dropdowns.make && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {makeOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => selectOption('make', option)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('model')}
                      className="w-full h-10 px-3 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between"
                    >
                      <span className="text-gray-500">{formData.model}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {dropdowns.model && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {modelOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => selectOption('model', option)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="grid grid-cols-2 gap-4"> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Number
                  </label>
                  <Input
                    placeholder="Ex: TGI 12345"
                    value={formData.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Build Date
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.buildDate}
                      onChange={(e) => handleInputChange('buildDate', e.target.value)}
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  VIN Number <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: P34562"
                  value={formData.vinNumber}
                  onChange={(e) => handleInputChange('vinNumber', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Installation Details */}
          <div>
            <h3 className="text-md font-semibold text-red-600 mb-3">Installation Details</h3>
            <div className="space-y-4">
              {/* <div className="grid grid-cols-2 gap-4"> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Installed <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('productInstalled')}
                      className="w-full h-10 px-3 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between"
                    >
                      <span className="text-gray-900">
                        {productOptions.find(p => p.id === formData.productInstalled)?.name || "Select Product Installed"}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {dropdowns.productInstalled && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {productOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => selectOption('productInstalled', option.id)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                          >
                            <div>
                              <div className="font-medium">{option.name}</div>
                              <div className="text-xs text-gray-500">{option.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Installer Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('installerName')}
                      className="w-full h-10 px-3 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between"
                    >
                      <span className="text-gray-500">{formData.installerName}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {dropdowns.installerName && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {installerOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => selectOption('installerName', option)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="grid grid-cols-2 gap-4"> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Generator Serial Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Ex: TGI 12345"
                    value={formData.generatorSerialNumber}
                    onChange={(e) => handleInputChange('generatorSerialNumber', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Generator Serial Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.generatorSerialNumber2}
                      onChange={(e) => handleInputChange('generatorSerialNumber2', e.target.value)}
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Voltage in Coupler Supply Line:
                </label>
                {/* <div className="flex items-center gap-2"> */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">

                  <Input
                    placeholder="Ex: 34"
                    value={formData.voltageInCouplerSupplyLine}
                    onChange={(e) => handleInputChange('voltageInCouplerSupplyLine', e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-gray-600 font-medium">V</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position of Couplers:
                </label>
                <textarea
                  placeholder="Explain positions of couplers"
                  value={formData.positionOfCouplers}
                  onChange={(e) => handleInputChange('positionOfCouplers', e.target.value)}
                  className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Corrosion Found:
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="corrosionFound"
                      value="yes"
                      checked={formData.corrosionFound === "yes"}
                      onChange={(e) => handleInputChange('corrosionFound', e.target.value)}
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="corrosionFound"
                      value="no"
                      checked={formData.corrosionFound === "no"}
                      onChange={(e) => handleInputChange('corrosionFound', e.target.value)}
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">Explain</p>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="confirmInstallation"
                  checked={formData.confirmInstallation}
                  onChange={(e) => handleInputChange('confirmInstallation', e.target.checked)}
                  className="mt-1 w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                />
                <label htmlFor="confirmInstallation" className="text-sm text-gray-700">
                  I confirm I have installed the system as per the installation instructions. ( Check box to accept)
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex justify-between pt-6 border-t"> */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-6 border-t">

            <Button variant="outline" className="px-8">
              Save Information for Later
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white px-8"
            >
              Create Warranty
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}