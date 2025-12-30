"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User, SystemRole } from '@/lib/auth'

// Auth-aware query hook that automatically handles authentication
export function useAuthQuery<T>(
  key: string[],
  fetcher: () => Promise<T>,
  options?: {
    enabled?: boolean
    staleTime?: number
    refetchOnWindowFocus?: boolean
  }
) {
  return useQuery({
    queryKey: key,
    queryFn: fetcher,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes default
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error: any) => {
      // Don't retry on auth errors
      if (error?.status === 401 || error?.status === 403) {
        return false
      }
      return failureCount < 3
    }
  })
}

// Role-based query hook that only fetches if user has required role
export function useRoleQuery<T>(
  key: string[],
  fetcher: () => Promise<T>,
  requiredRoles: SystemRole[],
  currentUserRole?: SystemRole,
  options?: {
    staleTime?: number
    refetchOnWindowFocus?: boolean
  }
) {
  const hasAccess = currentUserRole && requiredRoles.includes(currentUserRole)
  
  return useAuthQuery(key, fetcher, {
    ...options,
    enabled: hasAccess
  })
}

// Mutation hook with optimistic updates and error handling
export function useAuthMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void
    onError?: (error: any, variables: TVariables) => void
    invalidateQueries?: string[][]
  }
) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate related queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey })
        })
      }
      
      options?.onSuccess?.(data, variables)
    },
    onError: (error: any, variables) => {
      // Handle auth errors globally
      if (error?.status === 401) {
        // Redirect to login or refresh token
        window.location.href = '/login'
        return
      }
      
      options?.onError?.(error, variables)
    }
  })
}

// Prefetch hook for better UX
export function usePrefetchQuery() {
  const queryClient = useQueryClient()
  
  return {
    prefetch: <T>(key: string[], fetcher: () => Promise<T>) => {
      queryClient.prefetchQuery({
        queryKey: key,
        queryFn: fetcher,
        staleTime: 5 * 60 * 1000
      })
    },
    
    prefetchInfinite: <T>(key: string[], fetcher: ({ pageParam }: { pageParam: number }) => Promise<T>) => {
      queryClient.prefetchInfiniteQuery({
        queryKey: key,
        queryFn: fetcher,
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000
      })
    }
  }
}