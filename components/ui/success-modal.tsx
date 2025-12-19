'use client'

import { Dialog, DialogContent } from './dialog'
import { Button } from './button'
import { X } from 'lucide-react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onEditAgent: () => void
  mode: 'add' | 'edit'
  businessName?: string
}

export function SuccessModal({ isOpen, onClose, onEditAgent, mode, businessName }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-0 rounded-2xl" showCloseButton={false}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center py-8 px-6">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Successfully {mode === 'add' ? 'Added' : 'Edit'}
          </h2>

          {/* Description */}
          <p className="text-gray-500 mb-8">
            {businessName || 'Business Name'} has been {mode === 'add' ? 'added' : 'updated'}.
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full"
            >
              Go Back
            </Button>
            <Button
              onClick={onEditAgent}
              className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full"
            >
              Edit Agent Account
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}