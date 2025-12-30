"use client"

import { useQuery } from '@tanstack/react-query'
import { erpsApi } from '@/lib/api/client'

// Query keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  summary: () => [...dashboardKeys.all, 'summary'] as const,
  activity: (params?: { limit?: number }) => [...dashboardKeys.all, 'activity', params] as const,
}

// Get dashboard stats
export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => erpsApi.dashboard.getStats(),
    // staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get dashboard summary
export function useDashboardSummary() {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: () => erpsApi.dashboard.getSummary(),
    // staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Get recent activity
export function useDashboardActivity(params?: { limit?: number }) {
  return useQuery({
    queryKey: dashboardKeys.activity(params),
    queryFn: () => erpsApi.dashboard.getActivity(params),
    // staleTime: 1 * 60 * 1000, // 1 minute
  })
}