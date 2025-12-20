"use client"

import { useAuthQuery, useAuthMutation, useRoleQuery } from './use-auth-query'
import { api } from '@/lib/api/client'
import { UserRole } from '@/lib/auth'

// User management hooks (admin only)
export function useUsers(
  params?: { role?: string; page?: number; limit?: number },
  userRole?: UserRole
) {
  // Only admins can view all users
  return useRoleQuery(
    ['users', JSON.stringify(params || {})],
    () => api.getUsers(params),
    ['admin'],
    userRole,
    {
      staleTime: 5 * 60 * 1000
    }
  )
}

export function useUser(id: string, userRole?: UserRole) {
  return useRoleQuery(
    ['user', id],
    () => api.getUser(id),
    ['admin'],
    userRole
  )
}

export function useCurrentUser() {
  return useAuthQuery(
    ['currentUser'],
    () => api.getCurrentUser(),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: true
    }
  )
}

export function useCreateUser() {
  return useAuthMutation(
    (userData: any) => api.createUser(userData),
    {
      invalidateQueries: [['users']],
      onSuccess: () => {
        console.log('User created successfully')
      }
    }
  )
}

export function useUpdateUser() {
  return useAuthMutation(
    ({ id, data }: { id: string; data: any }) => api.updateUser(id, data),
    {
      invalidateQueries: [['users'], ['user'], ['currentUser']],
      onSuccess: () => {
        console.log('User updated successfully')
      }
    }
  )
}

export function useDeleteUser() {
  return useAuthMutation(
    (id: string) => api.deleteUser(id),
    {
      invalidateQueries: [['users']],
      onSuccess: () => {
        console.log('User deleted successfully')
      }
    }
  )
}

// Agents and Inspectors (filtered user views)
export function useAgents(params?: { page?: number; limit?: number }) {
  return useAuthQuery(
    ['agents', JSON.stringify(params || {})],
    () => api.getAgents(params),
    {
      staleTime: 5 * 60 * 1000
    }
  )
}

export function useInspectors(params?: { page?: number; limit?: number }) {
  return useAuthQuery(
    ['inspectors', JSON.stringify(params || {})],
    () => api.getInspectors(params),
    {
      staleTime: 5 * 60 * 1000
    }
  )
}