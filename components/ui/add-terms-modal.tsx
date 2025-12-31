"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { erpsApi } from "@/lib/api/client"

interface AddTermsModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

interface FormErrors {
  warrantyName?: string
  description?: string
  revision?: string
  generatorLightColour?: string
  termsAndConditions?: string
  inspectionInstructions?: string
  addType?: string
}

export function AddTermsModal({ isOpen, onClose, onSuccess }: AddTermsModalProps) {
  const [formData, setFormData] = useState({
    warrantyName: "",
    description: "",
    revision: "",
    generatorLightColour: "",
    termsAndConditions: "",
    inspectionInstructions: "",
    addType: "",
    isActive: true
  })

  const [isAgentDropdownOpen, setIsAgentDropdownOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({})

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear field error when user starts typing
    if (fieldErrors[field as keyof FormErrors]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    if (!formData.warrantyName.trim()) {
      errors.warrantyName = "Warranty name is required"
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required"
    }

    if (!formData.revision.trim()) {
      errors.revision = "Revision is required"
    }

    if (!formData.generatorLightColour.trim()) {
      errors.generatorLightColour = "Generator light colour is required"
    }

    if (!formData.termsAndConditions.trim()) {
      errors.termsAndConditions = "Terms and conditions is required"
    }

    if (!formData.inspectionInstructions.trim()) {
      errors.inspectionInstructions = "Inspection instructions is required"
    }

    if (!formData.addType) {
      errors.addType = "Add type is required"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    setError(null)

    // Validate all fields
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        warrantyName: formData.warrantyName,
        description: formData.description,
        revision: formData.revision,
        generatorLightColour: formData.generatorLightColour,
        termsAndConditions: formData.termsAndConditions,
        addType: formData.addType,
        inspectionInstructions: formData.inspectionInstructions,
        isActive: formData.isActive
      }

      console.log("Submitting warranty terms:", payload)

      const response = await erpsApi.warrantyTerms.create(payload)

      console.log("API Response:", response)

      if (response.success) {
        // Reset form
        setFormData({
          warrantyName: "",
          description: "",
          revision: "",
          generatorLightColour: "",
          termsAndConditions: "",
          inspectionInstructions: "",
          addType: "",
          isActive: true
        })
        setFieldErrors({})

        // Call success callback to refresh the list
        if (onSuccess) {
          onSuccess()
        }

        onClose()
      } else {
        setError(response.message || "Failed to create warranty terms")
      }
    } catch (err) {
      console.error("Error creating warranty terms:", err)
      setError(err instanceof Error ? err.message : "Failed to create warranty terms")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setError(null)
    setFieldErrors({})
    setFormData({
      warrantyName: "",
      description: "",
      revision: "",
      generatorLightColour: "",
      termsAndConditions: "",
      inspectionInstructions: "",
      addType: "",
      isActive: true
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 h-[90vh] flex flex-col shadow-xl">

        {/* Header – FIXED */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Terms and Conditions
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Warranty Details Section */}
          <div>
            <h3 className="text-red-600 font-medium mb-4">Warranty Details</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warranty Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: ECO-PRO - Test Warranty"
                  value={formData.warrantyName}
                  onChange={(e) => handleInputChange("warrantyName", e.target.value)}
                  className={fieldErrors.warrantyName ? "border-red-500" : ""}
                />
                {fieldErrors.warrantyName && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.warrantyName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: Limited Lifetime Corrosion, 5 Year Product"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={fieldErrors.description ? "border-red-500" : ""}
                />
                {fieldErrors.description && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Revision <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Ex: 1,2,.."
                    value={formData.revision}
                    onChange={(e) => handleInputChange("revision", e.target.value)}
                    className={fieldErrors.revision ? "border-red-500" : ""}
                  />
                  {fieldErrors.revision && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.revision}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Generator Light Colour <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Ex: Yellow"
                    value={formData.generatorLightColour}
                    onChange={(e) => handleInputChange("generatorLightColour", e.target.value)}
                    className={fieldErrors.generatorLightColour ? "border-red-500" : ""}
                  />
                  {fieldErrors.generatorLightColour && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.generatorLightColour}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Terms and Conditions <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Enter terms and conditions"
                  rows={6}
                  value={formData.termsAndConditions}
                  onChange={(e) => handleInputChange("termsAndConditions", e.target.value)}
                  className={`resize-none ${fieldErrors.termsAndConditions ? "border-red-500" : ""}`}
                />
                {fieldErrors.termsAndConditions && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.termsAndConditions}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inspection Instructions <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Enter inspection instructions"
                  rows={6}
                  value={formData.inspectionInstructions}
                  onChange={(e) => handleInputChange("inspectionInstructions", e.target.value)}
                  className={`resize-none ${fieldErrors.inspectionInstructions ? "border-red-500" : ""}`}
                />
                {fieldErrors.inspectionInstructions && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.inspectionInstructions}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsAgentDropdownOpen(!isAgentDropdownOpen)}
                    className={`w-full flex items-center justify-between px-3 py-2 border rounded-md text-left text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${fieldErrors.addType ? "border-red-500" : "border-gray-300"
                      }`}
                  >
                    <span className={formData.addType ? "text-gray-900" : "text-gray-500"}>
                      {formData.addType === "ADD_WARRANTY"
                        ? "Add Warranty"
                        : formData.addType === "REPLACE_WARRANTY"
                          ? "Replace Warranty"
                          : "Select Type"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {isAgentDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleInputChange("addType", "ADD_WARRANTY")
                            setIsAgentDropdownOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          Add Warranty
                        </button>
                        <button
                          onClick={() => {
                            handleInputChange("addType", "REPLACE_WARRANTY")
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
                {fieldErrors.addType && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.addType}</p>
                )}
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange("isActive", e.target.checked)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
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
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 shrink-0 bg-white">
          <Button
            variant="outline"
            onClick={handleClose}
            className="px-6"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Warranty"}
          </Button>
        </div>
      </div>
    </div>
  )
}
