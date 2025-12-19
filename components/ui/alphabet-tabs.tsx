'use client'

import { cn } from '@/lib/utils'

interface AlphabetTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]

export function AlphabetTabs({ activeTab, onTabChange }: AlphabetTabsProps) {
  return (
    <div className="flex gap-1 mb-6">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => onTabChange(letter)}
          className={cn(
            "w-8 h-8 text-sm font-medium rounded border transition-colors",
            activeTab === letter
              ? "bg-gray-200 border-gray-300 text-gray-900"
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
          )}
        >
          {letter}
        </button>
      ))}
    </div>
  )
}