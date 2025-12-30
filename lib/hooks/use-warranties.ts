"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { erpsApi, Warranty } from '@/lib/api/client'

// Query keys
export const warrantyKeys = {
  all: ['warranties'] as const,
  lists: () => [...warrantyKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...warrantyKeys.lists(), filters] as const,
  details: () => [...warrantyKeys.all, 'detail'] as const,
  detail: (id: string) => [...warrantyKeys.details(), id] as const,
}

// Get warranties list
export function useWarranties(params?: {
  page?: number
  limit?: number
  status?: string
  search?: string
}) {
  return useQuery({
    queryKey: warrantyKeys.list(params || {}),
    queryFn: () => erpsApi.warranties.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get single warranty
export function useWarranty(id: string) {
  return useQuery({
    queryKey: warrantyKeys.detail(id),
    queryFn: () => erpsApi.warranties.getById(id),
    enabled: !!id,
  })
}

// Create warranty mutation
export function useCreateWarranty() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (warrantyData: any) => erpsApi.warranties.create(warrantyData),
    onSuccess: () => {
      // Invalidate and refetch warranties list
      queryClient.invalidateQueries({ queryKey: warrantyKeys.lists() })
    },
  })
}

// Update warranty mutation
export function useUpdateWarranty() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      erpsApi.warranties.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific warranty and list
      queryClient.invalidateQueries({ queryKey: warrantyKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: warrantyKeys.lists() })
    },
  })
}

// Submit warranty for verification
export function useSubmitWarranty() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, installerId }: { id: string; installerId: string }) =>
      erpsApi.warranties.submit(id, installerId),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: warrantyKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: warrantyKeys.lists() })
    },
  })
}

// Upload warranty photos
export function useUploadWarrantyPhotos() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ 
      id, 
      files, 
      categories, 
      descriptions 
    }: { 
      id: string
      files: File[]
      categories: string[]
      descriptions: string[]
    }) => erpsApi.warranties.uploadPhotos(id, files, categories, descriptions),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: warrantyKeys.detail(id) })
    },
  })
}