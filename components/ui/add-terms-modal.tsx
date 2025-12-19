"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AddTermsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddTermsModal({ isOpen, onClose }: AddTermsModalProps) {
  const [formData, setFormData] = useState({
    warrantyDetails: "",
    description: "",
    revision: "",
    generatorLightColour: "",
    termsAndConditions: "",
    inspectionInstructions: "",
    agentType: "Select Type",
    productsSold: "NONE"
  })

  const [isAgentDropdownOpen, setIsAgentDropdownOpen] = useState(false)

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form data:", formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add Terms and Conditions</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Warranty Details Section */}
          <div>
            <h3 className="text-red-600 font-medium mb-4">Warranty Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warranty Details
                </label>
                <Input
                  placeholder="Ex: Eliza Maguire"
                  value={formData.warrantyDetails}
                  onChange={(e) => handleInputChange("warrantyDetails", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Input
                  placeholder="Ex: Eliza Maguire"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Revision
                  </label>
                  <Input
                    placeholder="Ex: Eliza Maguire"
                    value={formData.revision}
                    onChange={(e) => handleInputChange("revision", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Generator Light Colour
                  </label>
                  <Input
                    placeholder="Ex: Eliza Maguire"
                    value={formData.generatorLightColour}
                    onChange={(e) => handleInputChange("generatorLightColour", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Terms and Conditions
                </label>
                <Textarea
                  placeholder="enter terms n conditions"
                  rows={6}
                  value={formData.termsAndConditions}
                  onChange={(e) => handleInputChange("termsAndConditions", e.target.value)}
                  className="resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inspection Instructions
                </label>
                <Textarea
                  placeholder="enter Inspection Instructions"
                  rows={6}
                  value={formData.inspectionInstructions}
                  onChange={(e) => handleInputChange("inspectionInstructions", e.target.value)}
                  className="resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agent Type
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsAgentDropdownOpen(!isAgentDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-red-500 rounded-md text-left text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <span className={formData.agentType === "Select Type" ? "text-gray-500" : "text-gray-900"}>
                      {formData.agentType}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {isAgentDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleInputChange("agentType", "Add Warranty")
                            setIsAgentDropdownOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          Add Warranty
                        </button>
                        <button
                          onClick={() => {
                            handleInputChange("agentType", "Replace Warranty")
                            setIsAgentDropdownOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          Replace Warranty
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Products Sold:
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="productsSold"
                      value="NONE"
                      checked={formData.productsSold === "NONE"}
                      onChange={(e) => handleInputChange("productsSold", e.target.value)}
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">NONE</span>
                  </label>
                  
                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="productsSold"
                      value="ECO-PRO"
                      checked={formData.productsSold === "ECO-PRO"}
                      onChange={(e) => handleInputChange("productsSold", e.target.value)}
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 mt-0.5"
                    />
                    <div className="ml-2">
                      <span className="text-sm text-gray-700">ECO-PRO</span>
                      <p className="text-xs text-gray-500">Limited Lifetime Corrosion, 5 Year Product</p>
                    </div>
                  </label>
                  
                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="productsSold"
                      value="ECO-PRO-10"
                      checked={formData.productsSold === "ECO-PRO-10"}
                      onChange={(e) => handleInputChange("productsSold", e.target.value)}
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 mt-0.5"
                    />
                    <div className="ml-2">
                      <span className="text-sm text-gray-700">ECO-PRO</span>
                      <p className="text-xs text-gray-500">10 Year Corrosion, 5 Year Product</p>
                    </div>
                  </label>
                  
                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="productsSold"
                      value="ERPS"
                      checked={formData.productsSold === "ERPS"}
                      onChange={(e) => handleInputChange("productsSold", e.target.value)}
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 mt-0.5"
                    />
                    <div className="ml-2">
                      <span className="text-sm text-gray-700">ERPS</span>
                      <p className="text-xs text-gray-500">10 Year Corrosion, 10 Year Product</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm text-red-600">
                  * Please note that Replacing an Existing Warranty will make it in-active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-6"
          >
            Add Warranty
          </Button>
        </div>
      </div>
    </div>
  )
}