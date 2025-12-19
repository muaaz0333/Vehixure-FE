"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ActivateWarrantyPage() {
  const [activationCode, setActivationCode] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Activation code submitted:", activationCode)
    // In a real app, this would handle warranty activation
  }

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold text-left mb-6 sm:mb-12">
          Activate Warranty
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter Activation Code:
            </label>

            <Input
              placeholder="Enter your activation code"
              className="w-full h-10 sm:h-12 bg-gray-100 border border-gray-200 rounded-lg text-sm sm:text-base"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-10 sm:h-12 bg-[#FF2D20] hover:bg-[#FF2D20]/90 text-white rounded-lg font-medium text-sm sm:text-base"
          >
            Submit
          </Button>
        </form>

        <div className="mt-6 sm:mt-10 text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">
          <p>Enter the Activation Code provided with your Warranty document.</p>
          <p className="mt-2">
            If you experience any problems please complete the &apos;CONTACT US&apos; form below,
            <span className="hidden sm:inline"><br /></span>
            <span className="sm:hidden"> </span>
            providing your name, email, phone number & vehicle VIN number.
          </p>
        </div>
      </div>
    </div>
  )
}