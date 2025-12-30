"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { erpsApi, Inspection } from '@/lib/api/client'

// Query keys
export const inspectionKeys = {
  all: ['inspections'] as const,
  lists: () => [...inspectionKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...inspectionKeys.lists(), filters] as const,
  details: () => [...inspectionKeys.all, 'detail'] as const,
  detail: (id: string) => [...inspectionKeys.details(), id] as const,
}

// Get inspections list
export function useInspections(params?: {
  page?: number
  limit?: number
  status?: string
  warrantyId?: string
}) {
  return useQuery({
    queryKey: inspectionKeys.list(params || {}),
    queryFn: () => erpsApi.inspections.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get single inspection
export function useInspection(id: string) {
  return useQuery({
    queryKey: inspectionKeys.detail(id),
    queryFn: () => erpsApi.inspections.getById(id),
    enabled: !!id,
  })
}

// Create inspection mutation
export function useCreateInspection() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (inspectionData: any) => erpsApi.inspections.create(inspectionData),
    onSuccess: () => {
      // Invalidate and refetch inspections list
      queryClient.invalidateQueries({ queryKey: inspectionKeys.lists() })
    },
  })
}

// Update inspection mutation
export function useUpdateInspection() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      erpsApi.inspections.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific inspection and list
      queryClient.invalidateQueries({ queryKey: inspectionKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: inspectionKeys.lists() })
    },
  })
}

// Submit inspection for verification
export function useSubmitInspection() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, inspectorId }: { id: string; inspectorId: string }) =>
      erpsApi.inspections.submit(id, inspectorId),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: inspectionKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: inspectionKeys.lists() })
    },
  })
}

// Upload inspection photos
export function useUploadInspectionPhotos() {
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
    }) => erpsApi.inspections.uploadPhotos(id, files, categories, descriptions),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: inspectionKeys.detail(id) })
    },
  })
}