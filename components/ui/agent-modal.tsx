'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from './dialog'
import { Button } from './button'
import { Input } from './input'
import { X, ChevronDown } from 'lucide-react'

interface AgentData {
  businessName: string
  contact: string
  streetAddress: string
  city: string
  state: string
  postcode: string
  faxNumber: string
  personalPhoneNumber: string
  email: string
  username: string
  password: string
  installerId: string
  agentType: string
  productsSold: string[]
  buyPrice: string
  accountStatus: string
}

interface AgentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: AgentData) => void
  mode: 'add' | 'edit'
  initialData?: Partial<AgentData>
}

const agentTypes = ['Admin', 'Support', 'Menu Item', 'Manager', 'Viewer']
const productOptions = [
  { id: 'ECO-PRO', name: 'ECO-PRO', description: 'Limited Lifetime Corrosion, 5 Year Product' },
  { id: 'ECO-PRO-10', name: 'ECO-PRO', description: '10 Year Corrosion, 5 Year Product' },
  { id: 'ERPS', name: 'ERPS', description: '10 Year Corrosion, 10 Year Product' }
]

export function AgentModal({ isOpen, onClose, onSave, mode, initialData }: AgentModalProps) {
  const [formData, setFormData] = useState<AgentData>({
    businessName: initialData?.businessName || (mode === 'add' ? '' : 'Eliza Maguire'),
    contact: initialData?.contact || (mode === 'add' ? '' : 'Eliza Maguire'),
    streetAddress: initialData?.streetAddress || (mode === 'add' ? '' : '123 Sample Street'),
    city: initialData?.city || (mode === 'add' ? '' : 'Brisbane'),
    state: initialData?.state || (mode === 'add' ? '' : 'QLD'),
    postcode: initialData?.postcode || (mode === 'add' ? '' : '4000'),
    faxNumber: initialData?.faxNumber || (mode === 'add' ? '' : '07-3333-4444'),
    personalPhoneNumber: initialData?.personalPhoneNumber || (mode === 'add' ? '' : '0412-345-678'),
    email: initialData?.email || (mode === 'add' ? '' : 'Eliza.Maguire@FlexiU.com'),
    username: initialData?.username || (mode === 'add' ? '' : 'Eliza.Maguire@FlexiU.com'),
    password: initialData?.password || (mode === 'add' ? '' : 'password123'),
    installerId: initialData?.installerId || (mode === 'add' ? '' : 'Q2137'),
    agentType: initialData?.agentType || 'Admin',
    productsSold: initialData?.productsSold || ['ECO-PRO'],
    buyPrice: initialData?.buyPrice || 'Select',
    accountStatus: initialData?.accountStatus || 'Select'
  })

  const [showAgentTypeDropdown, setShowAgentTypeDropdown] = useState(false)
  const [showBuyPriceDropdown, setShowBuyPriceDropdown] = useState(false)
  const [showAccountStatusDropdown, setShowAccountStatusDropdown] = useState(false)

  const handleInputChange = (field: keyof AgentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleProductChange = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      productsSold: [productId] // Only allow one selection for radio buttons
    }))
  }

  const handleSubmit = () => {
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-2xl lg:max-w-3xl max-h-[90vh] p-0 rounded-2xl flex flex-col overflow-hidden"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {mode === 'add' ? 'Add Agent' : 'Edit Agent'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 pb-0">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <Input
              placeholder="Ex: Eliza Maguire"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact: <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Ex: Eliza Maguire"
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address: <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Ex: Eliza Maguire"
              value={formData.streetAddress}
              onChange={(e) => handleInputChange('streetAddress', e.target.value)}
              className="w-full"
            />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City: <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Ex: Eliza Maguire"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State: <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Ex: Eliza Maguire"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Postcode and Fax Number */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postcode: <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Ex: Eliza Maguire"
                value={formData.postcode}
                onChange={(e) => handleInputChange('postcode', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fax Number:
              </label>
              <Input
                placeholder="Ex: Eliza Maguire"
                value={formData.faxNumber}
                onChange={(e) => handleInputChange('faxNumber', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Personal Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Personal Phone Number: <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Ex: Eliza Maguire"
              value={formData.personalPhoneNumber}
              onChange={(e) => handleInputChange('personalPhoneNumber', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Email and Username */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Ex: Eliza.Maguire@FlexiU.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Ex: Eliza.Maguire@FlexiU.com"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              placeholder="Ex: Eliza.Maguire@FlexiU.com"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Installer Id */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Installer Id
            </label>
            <Input
              placeholder="Ex: Eliza.Maguire@FlexiU.com"
              value={formData.installerId}
              onChange={(e) => handleInputChange('installerId', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Agent Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Agent Type
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAgentTypeDropdown(!showAgentTypeDropdown)}
                className="w-full h-9 px-3 py-1 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between"
              >
                <span className="text-red-500">{formData.agentType}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {showAgentTypeDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {agentTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        handleInputChange('agentType', type)
                        setShowAgentTypeDropdown(false)
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Sold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Products Sold:
            </label>
            <div className="space-y-3">
              {productOptions.map((product) => (
                <div key={product.id} className="flex items-start space-x-3">
                  <input
                    type="radio"
                    id={product.id}
                    name="productsSold"
                    checked={formData.productsSold.includes(product.id)}
                    onChange={() => handleProductChange(product.id)}
                    className="mt-1 w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                  />
                  <div className="flex-1">
                    <label htmlFor={product.id} className="text-sm font-medium text-gray-900">
                      {product.name}
                    </label>
                    <p className="text-xs text-gray-500">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buy Price and Account Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buy Price
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowBuyPriceDropdown(!showBuyPriceDropdown)}
                  className="w-full h-9 px-3 py-1 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between"
                >
                  <span className="text-gray-500">{formData.buyPrice}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {showBuyPriceDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {['Select', 'Price 1', 'Price 2', 'Price 3'].map((price) => (
                      <button
                        key={price}
                        type="button"
                        onClick={() => {
                          handleInputChange('buyPrice', price)
                          setShowBuyPriceDropdown(false)
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Status
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowAccountStatusDropdown(!showAccountStatusDropdown)}
                  className="w-full h-9 px-3 py-1 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between"
                >
                  <span className="text-gray-500">{formData.accountStatus}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {showAccountStatusDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {['Select', 'Active', 'Inactive', 'Pending'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          handleInputChange('accountStatus', status)
                          setShowAccountStatusDropdown(false)
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="shrink-0 sticky bottom-0 z-20 bg-white border-t px-6 py-4">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 h-10 border-gray-300 text-gray-700"
              >
                Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                className="flex-1 h-10 bg-red-600 hover:bg-red-700 text-white"
              >
                {mode === 'add' ? 'Add Account' : 'Save Changes'}
              </Button>
            </div>
          </div>


        </div>
      </DialogContent>
    </Dialog>
  )
}