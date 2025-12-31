'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  showNavigation?: boolean
}

export function Header({ showNavigation = true }: HeaderProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])


  return (
    <header className="bg-[#131313] text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">

            <div className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="WarrantyDB Logo"
                width={118}
                height={40}
                loading="eager"
                priority
                className="h-8 sm:h-10"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>


          </Link>

          {showNavigation && (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-4 lg:gap-8">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-sm text-white hover:text-gray-300 hover:bg-gray-800 px-3 lg:px-4"
                  >
                    AGENT LOGIN
                  </Button>
                </Link>
                <Link href="/activate-warranty">
                  <Button
                    variant="ghost"
                    className="text-sm text-white hover:text-gray-300 hover:bg-gray-800 px-3 lg:px-4"
                  >
                    ACTIVATE WARRANTY
                  </Button>
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {/* Mobile Drawer */}
        {showNavigation && isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed top-0 right-0 z-50 h-full w-[78%] max-w-sm bg-[#131313] text-white shadow-2xl
                    animate-in slide-in-from-right duration-300">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
                <span className="text-lg font-semibold">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-800 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-5 py-6 gap-3">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full text-left px-4 py-3 rounded-4xl bg-[#E31D1C] hover:bg-red transition text-sm font-medium">
                    Agent Login
                  </button>
                </Link>

                <Link href="/activate-warranty" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full text-left px-4 py-3 rounded-4xl bg-[#E31D1C] hover:bg-red transition text-sm font-medium">
                    Activate Warranty
                  </button>
                </Link>
              </nav>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-gray-800 text-xs text-gray-400">
                © {new Date().getFullYear()} WarrantyDB
              </div>
            </div>
          </>
        )}

      </div>
    </header>
  )
}