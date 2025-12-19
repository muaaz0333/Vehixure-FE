'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Shield,
  ClipboardList,
  User,
  LogOut,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import OverviewIcon from '@/public/images/overview.svg'
import WarrantyIcon from '@/public/images/Warranty.svg'
import InspectionIcon from '@/public/images/inspections.svg'
import SettingsIcon from '@/public/images/settings.svg'


const agentSidebarItems = [
  {
    title: 'Overview',
    href: '/agent-dashboard',
    icon: OverviewIcon
  },
  {
    title: 'Warranties',
    href: '/agent/warranties',
    icon: WarrantyIcon
  },
  {
    title: 'Inspections',
    href: '/agent/inspections',
    icon: InspectionIcon
  },
  {
    title: 'Account Info',
    href: '/agent/account',
    icon: SettingsIcon
  }
]

interface AgentSidebarProps {
  onClose?: () => void
}

export function AgentSidebar({ onClose }: AgentSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    // For example: localStorage.removeItem('authToken');
    router.push('/login')
  }

  const handleLinkClick = () => {
    // Close mobile sidebar when a link is clicked
    if (onClose) {
      onClose()
    }
  }

  return (
    <div
      className="
    bg-black text-white flex flex-col flex-shrink-0
    w-[285px] min-w-[285px] max-w-[285px]
    h-full
    py-[30px]
    rounded-tr-[20px]
  "
    >
      {/* Mobile Close Button */}
      {onClose && (
        <div className="lg:hidden flex justify-end p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-gray-800 p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Logo */}
      <div className="px-6 pb-4 border-b border-gray-700">
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

      {/* Navigation */}
      <nav className="flex-1 mt-6 overflow-y-auto">
        {agentSidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href ||
            (item.href === '/agent/warranties' && pathname.startsWith('/agent/warranties')) ||
            (item.href === '/agent/inspections' && pathname.startsWith('/agent/inspections')) ||
            (item.href === '/agent/account' && pathname.startsWith('/agent/account'))

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
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
              <span className="truncate">{item.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-6 pt-6 border-t border-gray-700">
        <button
          className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-gray-800 transition-colors w-full rounded-lg"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="truncate">Log out</span>
        </button>
      </div>
    </div>
  )
}