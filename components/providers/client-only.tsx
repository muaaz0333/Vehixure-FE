"use client"

import { useEffect, useState } from 'react'

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    // Use setTimeout to avoid cascading renders warning
    const timer = setTimeout(() => setHasMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  if (!hasMounted) {
    return <div suppressHydrationWarning>{fallback}</div>
  }

  return <>{children}</>
}