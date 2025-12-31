'use client'

import { cn } from '@/lib/utils'

interface AlphabetTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]

export function AlphabetTabs({ activeTab, onTabChange }: AlphabetTabsProps) {
  return (
    <div className="hidden sm:block w-full overflow-hidden">
      <div className="
        flex flex-nowrap
        w-full
        justify-between
        gap-[2px]
        border rounded-lg
        bg-white
        py-2 px-2
      ">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => onTabChange(letter)}
            className={cn(
              `
              flex-1
              min-w-0
              h-7
              rounded-md
              text-[11px] sm:text-xs
              font-medium
              transition-colors
              border
              `,
              activeTab === letter
                ? 'border-black font-semibold text-black'
                : ' text-gray-600 hover:bg-gray-50'
            )}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  )
}
