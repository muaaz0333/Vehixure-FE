"use client"

import { useAuthQuery, useAuthMutation, useRoleQuery } from './use-auth-query'
import { api } from '@/lib/api/client'
import { UserRole } from '@/lib/auth'

// Inspections hooks with role-based access
export function useInspections(
  params?: { status?: string; inspector?: string; page?: number; limit?: number },
  userRole?: UserRole
) {
  // Only inspectors and admins can view all inspections
  return useRoleQuery(
    ['inspections', JSON.stringify(params || {})],
    () => api.getInspections(params),
    ['inspector', 'admin'],
    userRole,
    {
      staleTime: 2 * 60 * 1000
    }
  )
}

export function useInspection(id: string, userRole?: UserRole) {
  return useRoleQuery(
    ['inspection', id],
    () => api.getInspection(id),
    ['inspector', 'admin'],
    userRole,
    {
      staleTime: 5 * 60 * 1000
    }
  )
}

export function useCreateInspection() {
  return useAuthMutation(
    (inspectionData: any) => api.createInspection(inspectionData),
    {
      invalidateQueries: [['inspections']],
      onSuccess: () => {
        console.log('Inspection created successfully')
      }
    }
  )
}

export function useUpdateInspection() {
  return useAuthMutation(
    ({ id, data }: { id: string; data: any }) => api.updateInspection(id, data),
    {
      invalidateQueries: [['inspections'], ['inspection']],
      onSuccess: () => {
        console.log('Inspection updated successfully')
      }
    }
  )
}

export function useUploadInspectionPhoto() {
  return useAuthMutation(
    ({ inspectionId, file }: { inspectionId: string; file: File }) => 
      api.uploadInspectionPhoto(inspectionId, file),
    {
      invalidateQueries: [['inspection']],
      onSuccess: () => {
        console.log('Photo uploaded successfully')
      }
    }
  )
}