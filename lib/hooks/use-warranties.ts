"use client"

import { useAuthQuery, useAuthMutation } from './use-auth-query'
import { api } from '@/lib/api/client'

// Example: Warranties hooks using React Query
export function useWarranties(params?: { status?: string; page?: number; limit?: number }) {
  return useAuthQuery(
    ['warranties', JSON.stringify(params || {})],
    () => api.getWarranties(params),
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
      refetchOnWindowFocus: true
    }
  )
}

export function useWarranty(id: string) {
  return useAuthQuery(
    ['warranty', id],
    () => api.getWarranty(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000
    }
  )
}

export function useCreateWarranty() {
  return useAuthMutation(
    (warrantyData: any) => api.createWarranty(warrantyData),
    {
      invalidateQueries: [['warranties']],
      onSuccess: () => {
        console.log('Warranty created successfully')
      },
      onError: (error) => {
        console.error('Failed to create warranty:', error)
      }
    }
  )
}

export function useUpdateWarranty() {
  return useAuthMutation(
    ({ id, data }: { id: string; data: any }) => api.updateWarranty(id, data),
    {
      invalidateQueries: [['warranties'], ['warranty']],
      onSuccess: () => {
        console.log('Warranty updated successfully')
      }
    }
  )
}

export function useActivateWarranty() {
  return useAuthMutation(
    ({ id, data }: { id: string; data: any }) => api.activateWarranty(id, data),
    {
      invalidateQueries: [['warranties'], ['warranty']],
      onSuccess: () => {
        console.log('Warranty activated successfully')
      }
    }
  )
}