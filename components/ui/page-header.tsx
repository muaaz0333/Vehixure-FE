'use client'

import { Search, Plus, Edit, ChevronDown } from 'lucide-react'
import { Button } from './button'
import Image from 'next/image'

interface PageHeaderProps {
  title: string
  showSearch?: boolean
  showAdd?: boolean
  showEdit?: boolean
  onAdd?: () => void
  onEdit?: () => void
  searchValue?: string
  onSearchChange?: (value: string) => void
}

export function PageHeader({
  title,
  showSearch = true,
  showAdd = true,
  showEdit = true,
  onAdd,
  onEdit,
  searchValue,
  onSearchChange
}: PageHeaderProps) {
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">A</span>
            </div>
            <span className="text-sm font-medium text-gray-900">Anthony</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
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
