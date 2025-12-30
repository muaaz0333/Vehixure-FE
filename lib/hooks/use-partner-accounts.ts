"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { erpsApi } from '@/lib/api/client'

// Query keys
export const partnerAccountKeys = {
  all: ['partnerAccounts'] as const,
  lists: () => [...partnerAccountKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...partnerAccountKeys.lists(), filters] as const,
  details: () => [...partnerAccountKeys.all, 'detail'] as const,
  detail: (id: string) => [...partnerAccountKeys.details(), id] as const,
  users: (accountId: string) => [...partnerAccountKeys.detail(accountId), 'users'] as const,
}

// Get partner accounts list (Admin only)
export function usePartnerAccounts(params?: {
  page?: number
  limit?: number
  search?: string
  status?: string
}) {
  return useQuery({
    queryKey: partnerAccountKeys.list(params || {}),
    queryFn: () => erpsApi.partnerAccounts.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get single partner account
export function usePartnerAccount(accountId: string) {
  return useQuery({
    queryKey: partnerAccountKeys.detail(accountId),
    queryFn: () => erpsApi.partnerAccounts.getById(accountId),
    enabled: !!accountId,
  })
}

// Get partner account users
export function usePartnerAccountUsers(accountId: string, params?: { role?: string }) {
  return useQuery({
    queryKey: partnerAccountKeys.users(accountId),
    queryFn: () => erpsApi.partnerAccounts.getUsers(accountId, params),
    enabled: !!accountId,
  })
}

// Create partner account mutation (Admin only)
export function useCreatePartnerAccount() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (accountData: any) => erpsApi.partnerAccounts.create(accountData),
    onSuccess: () => {
      // Invalidate and refetch partner accounts list
      queryClient.invalidateQueries({ queryKey: partnerAccountKeys.lists() })
    },
  })
}

// Update partner account mutation
export function useUpdatePartnerAccount() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      erpsApi.partnerAccounts.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific account and list
      queryClient.invalidateQueries({ queryKey: partnerAccountKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: partnerAccountKeys.lists() })
    },
  })
}

// Create partner user mutation
export function useCreatePartnerUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ accountId, userData }: { accountId: string; userData: any }) =>
      erpsApi.partnerAccounts.createUser(accountId, userData),
    onSuccess: (_, { accountId }) => {
      queryClient.invalidateQueries({ queryKey: partnerAccountKeys.users(accountId) })
    },
  })
}

// Get all partner users (Admin only)
export function usePartnerUsers(params?: {
  page?: number
  limit?: number
  search?: string
  role?: string
}) {
  return useQuery({
    queryKey: ['partnerUsers', params],
    queryFn: () => erpsApi.auth.getPartnerUsers(params),
    staleTime: 5 * 60 * 1000,
  })
}

// Admin impersonation (Login as user)
export function useLoginAs() {
  return useMutation({
    mutationFn: (userId: string) => erpsApi.auth.loginAs(userId),
    onSuccess: (response) => {
      const data = response as { success: boolean; data: { token: string; user: unknown } }
      if (data.success) {
        // Store new token and user data
        localStorage.setItem('authToken', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        
        // Reload the page to update the auth context
        window.location.reload()
      }
    },
  })
}