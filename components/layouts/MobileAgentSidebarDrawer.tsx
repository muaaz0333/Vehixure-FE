'use client'

import { useEffect } from 'react'
import { AgentSidebar } from '../../components/shared/agent-sidebar'

interface Props {
  open: boolean
  onClose: () => void
}

export function MobileAgentSidebarDrawer({ open, onClose }: Props) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="
          fixed top-0 left-0 z-50 h-full lg:hidden
          w-[285px]
          animate-in slide-in-from-left duration-300
        "
      >
        <AgentSidebar onClose={onClose} />
      </div>
    </>
  )
}
