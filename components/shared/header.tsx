'use client'

import { useState } from 'react'
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

  return (
    <header className="bg-black text-white border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            {/* <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-[#FF2D20] rounded flex items-center justify-center text-white font-bold text-xs">
                <span>ERPS</span>
              </div>
              <div className="text-xs leading-tight hidden sm:block">
                <div className="font-bold">ERPS</div>
                <div className="text-gray-400">
                  Enhanced Rust Prevention
                  <br />
                  Systems
                </div>
              </div>
            </div> */}
            
              <div className="flex items-center">
                <Image 
                  src="/images/logo.png" 
                  alt="WarrantyDB Logo" 
                  width={118} 
                  height={40}
                  className="h-8 w-auto sm:h-10"
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
        {showNavigation && isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700 py-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:text-gray-300 hover:bg-gray-800"
                >
                  AGENT LOGIN
                </Button>
              </Link>
              <Link href="/activate-warranty" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:text-gray-300 hover:bg-gray-800"
                >
                  ACTIVATE WARRANTY
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}