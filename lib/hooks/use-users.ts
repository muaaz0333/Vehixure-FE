"use client"

import { useQuery } from '@tanstack/react-query'
import { erpsApi } from '@/lib/api/client'

// Get current user
export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => erpsApi.auth.getCurrentUser(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true
  })
}

// Get partner users (admin only)
export function usePartnerUsersAdmin(params?: { 
  page?: number
  limit?: number
  search?: string
  role?: string 
}) {
  return useQuery({
    queryKey: ['partnerUsers', params],
    queryFn: () => erpsApi.auth.getPartnerUsers(params),
    staleTime: 5 * 60 * 1000
  })
}
