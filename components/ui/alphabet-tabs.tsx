'use client'

import { cn } from '@/lib/utils'

interface AlphabetTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]

export function AlphabetTabs({ activeTab, onTabChange }: AlphabetTabsProps) {
  return (
    <div className="flex gap-1.5 mb-5 border rounded-lg shadow-lg bg-white py-3 px-2">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => onTabChange(letter)}
          className={cn(
            "w-8 h-8 text-sm font-medium transition-colors",
            activeTab === letter
              ? "font-semibold border-black border rounded-md "
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
          )}
        >
          {letter}
        </button>
      ))}
    </div>
  )
}