'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Users,
  Shield,
  ClipboardList,
  BarChart,
  User,
  LogOut,
  X,
  ShieldCheck
} from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import OverviewIcon from '@/public/images/overview.svg'
import AgentIcon from '@/public/images/agent.svg'
import WarrantyIcon from '@/public/images/Warranty.svg'
import InspectionIcon from '@/public/images/inspections.svg'
import StatsIcon from '@/public/images/stats.svg'
import SettingsIcon from '@/public/images/settings.svg'


const baseSidebarItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: OverviewIcon
  },
  {
    title: 'Agents',
    href: '/agents',
    icon: AgentIcon
  },
  {
    title: 'Warranties',
    href: '/warranties',
    icon: WarrantyIcon
  },
  {
    title: 'Inspections',
    href: '/inspections',
    icon: InspectionIcon
  },
  {
    title: 'Stats',
    href: '/stats',
    icon: StatsIcon
  },
  {
    title: 'Account Info',
    href: '/account',
    icon: SettingsIcon
  }
]

// Admin-only menu item
const adminMenuItem = {
  title: 'Admin Panel',
  href: '/admin',
  icon: ShieldCheck,
  adminOnly: true
}

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()

  // Check if user is ERPS Admin
  const isErpsAdmin = user?.role === 'ERPS_ADMIN'

  // Build sidebar items based on user role
  const sidebarItems = isErpsAdmin 
    ? [...baseSidebarItems, adminMenuItem]
    : baseSidebarItems

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
    // <div className="w-full lg:w-[200px] bg-[#1a1a1a] text-white h-screen flex flex-col">
    <div
      className="
    bg-black text-white flex flex-col shrink-0
    w-[285px] min-w-[285px] max-w-[285px]
    h-screen
    py-[30px]
    rounded-tr-[20px]
    overflow-hidden
  "
    >
      {/* Mobile Close Button */}
      {onClose && (
        <div className="lg:hidden flex justify-end px-4 pb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-gray-800 p-2 rounded-full"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Logo */}
      <div className="px-6 pb-4 border-b border-gray-700 shrink-0">
        <div className="flex items-center justify-center lg:justify-start">
          <Image
            src="/images/logo.png"
            alt="WarrantyDB Logo"
            width={118}
            height={45}
            className="h-8 w-auto max-w-full"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 overflow-y-auto px-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href ||
            (item.href === '/agents' && (pathname.startsWith('/agents') || pathname.startsWith('/inspectors')))

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 mx-2 rounded-lg mb-1 hover:bg-gray-800/50",
                isActive
                  ? "text-red-600 bg-gray-800/30"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 shrink-0 transition-colors",
                  isActive ? "text-red-600" : "text-gray-400"
                )}
              />
              <span className="truncate font-medium">{item.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 pt-6 border-t border-gray-700 shrink-0">
        <button
          className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-gray-800/50 transition-all duration-200 w-full rounded-lg mx-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="truncate font-medium">Log out</span>
        </button>
      </div>
    </div>
  )
}