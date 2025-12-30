'use client'

import { Search, Plus, Edit, ChevronDown } from 'lucide-react'
import { Button } from './button'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"

interface PageHeaderProps {
  title: string
  showSearch?: boolean
  showAdd?: boolean
  showEdit?: boolean
  onAdd?: () => void
  onEdit?: () => void
  searchValue?: string
  onSearchChange?: (value: string) => void

  user?: {
    fullName?: string
    email?: string
  }
  onLogout?: () => void
}

export function PageHeader({
  title,
  showSearch = true,
  showAdd = true,
  showEdit = true,
  onAdd,
  onEdit,
  searchValue,
  onSearchChange,
  user,
  onLogout
}: PageHeaderProps) {

   const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.page-header-profile')) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

    const { logout } = useAuth()
      const router = useRouter()
  
      const handleLogout = () => {
          logout()
          router.push("/login")
      }

  return (
    <div className="bg-white  px-4 sm:px-6 py-3">
      {/* Top row */}
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate">
          {title}
        </h1>

        {/* Right actions (desktop only) */}
        <div className="hidden sm:flex items-center gap-3">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 pr-4 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
              />
            </div>
          )}

          {showAdd && (
            <Button onClick={onAdd} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1">
              <Image src="/images/add.svg" className='stroke-white' alt="Add" width={17} height={17} />
              Add
            </Button>
          )}

          {showEdit && (
            <Button
              onClick={onEdit}
              disabled={!onEdit}
              variant="outline"
              className="border-gray-200 px-4 py-1"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}

          {/* User */}
          <div className="relative page-header-profile">
            <button
              onClick={() => setProfileOpen(v => !v)}
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition focus:outline-none"
            >
              {/* Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">
                  {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              </div>

              {/* Name */}
              <span className="text-sm font-medium text-gray-900 hidden sm:block max-w-[120px] truncate">
                {user?.fullName || user?.email || 'User'}
              </span>

              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-64 rounded-xl bg-white border border-gray-200 shadow-lg z-50">
                {/* User info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.fullName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>

                {/* Logout */}
                <div className="p-2">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setProfileOpen(false)
                      onLogout?.()
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setProfileOpen(false)
                        onLogout?.()
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg
                     text-sm font-medium text-red-600 hover:bg-red-50
                     cursor-pointer transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                      />
                    </svg>
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Mobile right icons */}
        <div className="flex sm:hidden items-center gap-2">
          {showAdd && (
            <Button
              onClick={onAdd}
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white px-3"
            >
              <Plus className="w-4 h-4" />
            </Button>
          )}

          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">A</span>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      {showSearch && (
        <div className="mt-3 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      )}
    </div>
  )
}
