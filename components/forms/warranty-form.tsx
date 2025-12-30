"use client"

import { useState } from 'react'
import { useCreateWarranty } from '@/lib/hooks/use-warranties'
import { Button } from '@/components/ui/button'

interface WarrantyFormData {
  vehicleVin: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: number
  vehicleColor?: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  ownerAddress?: string
  installationDate: string
  installerName: string
  installerId: string
  installationLocation?: string
  warrantyPeriod?: number
  notes?: string
}

export function WarrantyForm() {
  const [formData, setFormData] = useState<WarrantyFormData>({
    vehicleVin: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: new Date().getFullYear(),
    vehicleColor: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerAddress: '',
    installationDate: new Date().toISOString().split('T')[0],
    installerName: '',
    installerId: '',
    installationLocation: '',
    warrantyPeriod: 12,
    notes: ''
  })

  const createWarranty = useCreateWarranty()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const result = await createWarranty.mutateAsync(formData)
      if (result.success) {
        alert('Warranty created successfully!')
        // Reset form or redirect
        setFormData({
          vehicleVin: '',
          vehicleMake: '',
          vehicleModel: '',
          vehicleYear: new Date().getFullYear(),
          vehicleColor: '',
          ownerName: '',
          ownerEmail: '',
          ownerPhone: '',
          ownerAddress: '',
          installationDate: new Date().toISOString().split('T')[0],
          installerName: '',
          installerId: '',
          installationLocation: '',
          warrantyPeriod: 12,
          notes: ''
        })
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create Warranty Registration</h2>
      
      {/* Vehicle Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Vehicle Information</h3>
        
        <div>
          <label className="block text-sm font-medium mb-1">Vehicle VIN *</label>
          <input
            type="text"
            name="vehicleVin"
            value={formData.vehicleVin}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter vehicle VIN"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Make *</label>
            <input
              type="text"
              name="vehicleMake"
              value={formData.vehicleMake}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Toyota"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Model *</label>
            <input
              type="text"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Camry"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Year *</label>
            <input
              type="number"
              name="vehicleYear"
              value={formData.vehicleYear}
              onChange={handleChange}
              required
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            type="text"
            name="vehicleColor"
            value={formData.vehicleColor}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="White"
          />
        </div>
      </div>

      {/* Owner Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Owner Information</h3>
        
        <div>
          <label className="block text-sm font-medium mb-1">Owner Name *</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="John Smith"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              name="ownerEmail"
              value={formData.ownerEmail}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input
              type="tel"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="+61 412 345 678"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            name="ownerAddress"
            value={formData.ownerAddress}
            onChange={handleChange}
            rows={2}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="123 Main Street, Sydney, NSW 2000"
          />
        </div>
      </div>

      {/* Installation Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Installation Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Installation Date *</label>
            <input
              type="date"
              name="installationDate"
              value={formData.installationDate}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Warranty Period (months)</label>
            <input
              type="number"
              name="warrantyPeriod"
              value={formData.warrantyPeriod}
              onChange={handleChange}
              min="1"
              max="60"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Installer Name *</label>
            <input
              type="text"
              name="installerName"
              value={formData.installerName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="John Smith"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Installer ID *</label>
            <input
              type="text"
              name="installerId"
              value={formData.installerId}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="uuid-installer-id"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Installation Location</label>
          <input
            type="text"
            name="installationLocation"
            value={formData.installationLocation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="ABC Auto Services"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Additional installation notes..."
          />
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={createWarranty.isPending}
        className="w-full"
      >
        {createWarranty.isPending ? 'Creating...' : 'Create Warranty'}
      </Button>
    </form>
  )
}