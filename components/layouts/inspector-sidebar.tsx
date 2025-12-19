'use client'

import { BarChart3, FileText, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import OverviewIcon from '@/public/images/overview.svg'
import InspectionIcon from '@/public/images/inspections.svg'
import SettingsIcon from '@/public/images/settings.svg'
import { cn } from '@/lib/utils'

export default function InspectorSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  // const getActiveItem = () => {
  //   if (pathname.includes('/inspector/inspections')) return 'inspections'
  //   if (pathname.includes('/inspector/dashboard')) return 'overview'
  //   return 'overview'
  // }
  const getActiveItem = () => {
  if (pathname.startsWith('/inspector/inspections')) return 'inspections'
  if (pathname.startsWith('/inspector/account')) return 'account'
  if (pathname.startsWith('/inspector')) return 'overview'
  if (pathname.startsWith('/inspector-dashboard')) return 'overview'

  return ''
}


  const [activeItem, setActiveItem] = useState(getActiveItem())

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: OverviewIcon,
      href: '/inspector-dashboard'
    },
    {
      id: 'inspections',
      label: 'Inspections',
      icon: InspectionIcon,
      href: '/inspector/inspections'
    },
    {
      id: 'account',
      label: 'Account Info',
      icon: SettingsIcon,
      href: '/inspector/account'
    }
  ]
  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    // For example: localStorage.removeItem('authToken');
    router.push('/login')
  }

  return (
    <div className="w-64 bg-black text-white flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-700">
        {/* <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">ERPS</h2>
            <p className="text-xs text-gray-400">Electronic Road Pricing System</p>
          </div>
        </div> */}
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="WarrantyDB Logo"
            width={118}
            height={40}
            className="h-6 w-auto sm:h-10"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6">
        <ul className="space-y-0 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id

            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveItem(item.id)
                    router.push(item.href)
                  }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm transition-colors mx-2 rounded-lg",
                    isActive
                      ? "text-red-600"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-6 h-6 shrink-0 transition-colors",
                      isActive ? "text-red-600" : "text-gray-400"
                    )}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
          onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </div>
  )
}