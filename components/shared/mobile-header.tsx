'use client'

import { Menu, Search, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MobileHeaderProps {
  onMenuClick: () => void
  title: string
}

export function MobileHeader({ onMenuClick, title }: MobileHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-900 truncate">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="p-2">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}