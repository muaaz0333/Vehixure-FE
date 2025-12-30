"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageUpload } from "@/components/ui/image-upload"
import { X, ChevronDown, Calendar, Search } from "lucide-react"
import { useState } from "react"

interface Inspection {
  no: number
  dueDate: string
  stockId: string
  vinNo: string
  year: string
  make: string
  model: string
  registration: string
}

interface RecordInspectionModalProps {
  isOpen: boolean
  onClose: () => void
  inspection?: Inspection | null
}

const conditionOptions = ["Excellent", "Good", "Fair", "Poor", "Needs Repair"]

export function RecordInspectionModal({ isOpen, onClose, inspection }: RecordInspectionModalProps) {
  const [formData, setFormData] = useState({
    stockId: inspection?.stockId || "",
    vinNumber: inspection?.vinNo || "",
    make: inspection?.make || "",
    model: inspection?.model || "",
    year: inspection?.year || "",
    registration: inspection?.registration || "",
    inspectionDate: new Date().toISOString().split('T')[0],
    inspectorName: "",
    overallCondition: "",
    corrosionFound: "no",
    corrosionDetails: "",
    systemFunctional: "yes",
    voltageReading: "",
    couplerCondition: "",
    notes: "",
    recommendedAction: ""
  })

  const [images, setImages] = useState<File[]>([])

  const [dropdowns, setDropdowns] = useState({
    overallCondition: false,
    couplerCondition: false
  })

  const handleInputChange = (field: string, value: string) => {
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
    console.log("Recording inspection with data:", formData)
    console.log("Uploaded images:", images)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          w-[95vw] sm:w-full
          max-w-full sm:max-w-xl lg:max-w-3xl
          max-h-[90vh]
          p-0
          rounded-2xl
          flex flex-col
          overflow-hidden
          [&>button]:hidden
        "
      >
        {/* Header */}
        <div className="shrink-0 bg-white px-4 sm:px-6 py-4 border-b">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Record Inspection</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 space-y-6"
          style={{ scrollbarGutter: 'stable' }}
        >
          {/* Vehicle Information */}
          <div>
            <h3 className="text-md font-semibold text-red-600 mb-3">Vehicle Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock ID / Ref No
                  </label>
                  <Input
                    value={formData.stockId}
                    onChange={(e) => handleInputChange('stockId', e.target.value)}
                    placeholder="Ex: U23462"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    VIN Number
                  </label>
                  <Input
                    value={formData.vinNumber}
                    onChange={(e) => handleInputChange('vinNumber', e.target.value)}
                    placeholder="Ex: JTHBW09J..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Make
                  </label>
                  <Input
                    value={formData.make}
                    onChange={(e) => handleInputChange('make', e.target.value)}
                    placeholder="Ex: TOYOTA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <Input
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    placeholder="Ex: LANDCRUISER"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <Input
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    placeholder="Ex: 2010"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration
                </label>
                <Input
                  value={formData.registration}
                  onChange={(e) => handleInputChange('registration', e.target.value)}
                  placeholder="Ex: 424RAP"
                />
              </div>
            </div>
          </div>

          {/* Inspection Details */}
          <div>
            <h3 className="text-md font-semibold text-red-600 mb-3">Inspection Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inspection Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.inspectionDate}
                      onChange={(e) => handleInputChange('inspectionDate', e.target.value)}
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inspector Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.inspectorName}
                    onChange={(e) => handleInputChange('inspectorName', e.target.value)}
                    placeholder="Enter inspector name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overall Condition <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown('overallCondition')}
                    className="w-full h-10 px-3 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between"
                  >
                    <span className={formData.overallCondition ? "text-gray-900" : "text-gray-500"}>
                      {formData.overallCondition || "Select condition"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {dropdowns.overallCondition && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {conditionOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => selectOption('overallCondition', option)}
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
          </div>

          {/* System Check */}
          <div>
            <h3 className="text-md font-semibold text-red-600 mb-3">System Check</h3>
            <div className="space-y-4">
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
                {formData.corrosionFound === "yes" && (
                  <div className="mt-2">
                    <Input
                      value={formData.corrosionDetails}
                      onChange={(e) => handleInputChange('corrosionDetails', e.target.value)}
                      placeholder="Describe corrosion found..."
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  System Functional:
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="systemFunctional"
                      value="yes"
                      checked={formData.systemFunctional === "yes"}
                      onChange={(e) => handleInputChange('systemFunctional', e.target.value)}
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="systemFunctional"
                      value="no"
                      checked={formData.systemFunctional === "no"}
                      onChange={(e) => handleInputChange('systemFunctional', e.target.value)}
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Voltage Reading
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={formData.voltageReading}
                      onChange={(e) => handleInputChange('voltageReading', e.target.value)}
                      placeholder="Ex: 12.5"
                      className="flex-1"
                    />
                    <span className="text-gray-600 font-medium">V</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coupler Condition
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('couplerCondition')}
                      className="w-full h-10 px-3 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between"
                    >
                      <span className={formData.couplerCondition ? "text-gray-900" : "text-gray-500"}>
                        {formData.couplerCondition || "Select condition"}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {dropdowns.couplerCondition && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {conditionOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => selectOption('couplerCondition', option)}
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
            </div>
          </div>

          {/* Inspection Photos */}
          <div>
            <h3 className="text-md font-semibold text-red-600 mb-3">Inspection Photos</h3>
            <ImageUpload
              maxImages={3}
              images={images}
              onImagesChange={setImages}
              label="Upload Inspection Images"
              description="Upload up to 3 photos documenting the inspection"
            />
          </div>

          {/* Notes & Recommendations */}
          <div>
            <h3 className="text-md font-semibold text-red-600 mb-3">Notes & Recommendations</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inspection Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Enter any additional notes about the inspection..."
                  className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recommended Action
                </label>
                <textarea
                  value={formData.recommendedAction}
                  onChange={(e) => handleInputChange('recommendedAction', e.target.value)}
                  placeholder="Enter any recommended actions or follow-ups..."
                  className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="shrink-0 border-t bg-white px-4 sm:px-6 py-4">
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Complete Inspection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
