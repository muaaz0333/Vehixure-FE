"use client"

import { API_CONFIG } from '@/lib/config'
import { AuthResponse } from '../auth'

// ERPS API Types
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
  errors?: Array<{ field: string; message: string }>
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface Warranty {
  id: string
  vehicleVin: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: number
  vehicleColor?: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  ownerAddress?: string
  installationDate: string
  installerName: string
  installerId: string
  installationLocation?: string
  warrantyPeriod: number
  warrantyExpiryDate: string
  verificationStatus: string
  verificationToken?: string
  verificationTokenExpires?: string
  verifiedBy?: string
  verifiedAt?: string
  rejectionReason?: string
  notes?: string
  partnerAccountId: string
  submittedBy: string
  photos?: WarrantyPhoto[]
  created: string
  modified: string
  corrosionFound?: boolean
}

export interface WarrantyPhoto {
  id: string
  url: string
  category: string
  description?: string
  uploadedAt: string
}

export interface Inspection {
  id: string
  warrantyId: string
  inspectionDate: string
  inspectorName: string
  inspectorId: string
  corrosionFound: boolean
  corrosionNotes?: string
  checklist: InspectionChecklist
  checklistComplete: boolean
  verificationStatus: string
  warrantyExtendedUntil?: string
  notes?: string
  partnerAccountId: string
  submittedBy: string
  photos?: WarrantyPhoto[]
  created: string
  modified: string
}

export interface InspectionChecklist {
  systemOperational: boolean
  connectionsSecure: boolean
  wiringIntact: boolean
  componentsClean: boolean
  noVisibleDamage: boolean
  properGrounding: boolean
  voltageCorrect: boolean
  currentFlow: boolean
  temperatureNormal: boolean
  moistureProtection: boolean
  installationSecure: boolean
  documentationComplete: boolean
  customerSatisfied: boolean
  warrantyValid: boolean
  recommendContinuation: boolean
  additionalWork: boolean
  systemUpgrade: boolean
}

// Enhanced API client with ERPS endpoints
class ApiClient {
  private baseURL: string
  
  constructor(baseURL: string = API_CONFIG.baseURL) {
    this.baseURL = baseURL
  }
  
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    // Get auth token from localStorage
    const token = this.getAuthToken()
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }
    
    try {
      const response = await fetch(url, config)
      
      // Handle auth errors
      if (response.status === 401) {
        this.handleAuthError()
        throw new Error('Unauthorized')
      }
      
      if (response.status === 403) {
        throw new Error('Forbidden: Insufficient permissions')
      }
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`)
      }
      
      return data
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error)
      throw error
    }
  }
  
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken')
    }
    return null
  }
  
  private handleAuthError() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
  }
  
  // HTTP methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint
    return this.request<T>(url, { method: 'GET' })
  }
  
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
  
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
  
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
  
  // File upload for photos
  async uploadFiles<T>(endpoint: string, files: File[], additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData()
    
    files.forEach((file, index) => {
      formData.append('photos', file)
    })
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => formData.append(key, String(item)))
        } else {
          formData.append(key, String(value))
        }
      })
    }
    
    const token = this.getAuthToken()
    
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // Don't set Content-Type for FormData, let browser set it with boundary
      },
      body: formData,
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// ERPS API endpoints
export const erpsApi = {
  // Authentication
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiClient.post<AuthResponse['data']>('/auth/login', credentials),
    
    register: (userData: any) =>
      apiClient.post<AuthResponse['data']>('/auth/register', userData),
    
    logout: () => apiClient.post('/auth/logout'),
    
    getCurrentUser: () => apiClient.get('/auth/me'),
    
    // Admin endpoints
    getPartnerUsers: (params?: { page?: number; limit?: number; search?: string; role?: string }) =>
      apiClient.get('/auth/admin/partner-users', params),
    
    loginAs: (userId: string) =>
      apiClient.post('/auth/admin/login-as', { userId }),
  },

  // Partner Account Management
  partnerAccounts: {
    create: (accountData: any) =>
      apiClient.post('/admin/partner-accounts', accountData),
    
    getAll: (params?: { page?: number; limit?: number; search?: string; status?: string }) =>
      apiClient.get('/admin/partner-accounts', params),
    
    getById: (accountId: string) =>
      apiClient.get(`/admin/partner-accounts/${accountId}`),
    
    update: (accountId: string, accountData: any) =>
      apiClient.put(`/admin/partner-accounts/${accountId}`, accountData),
    
    createUser: (accountId: string, userData: any) =>
      apiClient.post(`/admin/partner-accounts/${accountId}/users`, userData),
    
    getUsers: (accountId: string, params?: { role?: string }) =>
      apiClient.get(`/admin/partner-accounts/${accountId}/users`, params),
  },

  // Warranty Terms Management
  warrantyTerms: {
    getAll: (params?: { page?: number; limit?: number; search?: string; status?: string }) =>
      apiClient.get('/admin/warranty-terms', params),
    
    getById: (id: string) =>
      apiClient.get(`/admin/warranty-terms/${id}`),
    
    create: (termData: any) =>
      apiClient.post('/admin/warranty-terms', termData),
    
    update: (id: string, termData: any) =>
      apiClient.put(`/admin/warranty-terms/${id}`, termData),
    
    delete: (id: string) =>
      apiClient.delete(`/admin/warranty-terms/${id}`),
  },

  // Warranty Management
  warranties: {
    create: (warrantyData: any) =>
      apiClient.post<Warranty>('/warranties', warrantyData),
    
    getAll: (params?: { page?: number; limit?: number; status?: string; search?: string }) =>
      apiClient.get<Warranty[]>('/warranties', params),
    
    getById: (id: string) =>
      apiClient.get<Warranty>(`/warranties/${id}`),
    
    update: (id: string, warrantyData: any) =>
      apiClient.put<Warranty>(`/warranties/${id}`, warrantyData),
    
    submit: (id: string, installerId: string) =>
      apiClient.post(`/warranties/${id}/submit`, { installerId }),
    
    uploadPhotos: (id: string, files: File[], categories: string[], descriptions: string[]) =>
      apiClient.uploadFiles(`/warranties/${id}/photos`, files, { categories, descriptions }),
  },

  // Inspection Management
  inspections: {
    create: (inspectionData: any) =>
      apiClient.post<Inspection>('/inspections', inspectionData),
    
    getAll: (params?: { page?: number; limit?: number; status?: string; warrantyId?: string }) =>
      apiClient.get<Inspection[]>('/inspections', params),
    
    getById: (id: string) =>
      apiClient.get<Inspection>(`/inspections/${id}`),
    
    update: (id: string, inspectionData: any) =>
      apiClient.put<Inspection>(`/inspections/${id}`, inspectionData),
    
    submit: (id: string, inspectorId: string) =>
      apiClient.post(`/inspections/${id}/submit`, { inspectorId }),
    
    uploadPhotos: (id: string, files: File[], categories: string[], descriptions: string[]) =>
      apiClient.uploadFiles(`/inspections/${id}/photos`, files, { categories, descriptions }),
  },

  // Verification (Public endpoints)
  verification: {
    getDetails: (token: string) =>
      apiClient.get(`/verify/${token}`),
    
    verifyWarranty: (token: string, action: 'CONFIRM' | 'DECLINE', rejectionReason?: string) =>
      apiClient.post(`/verify/warranty/${token}`, { action, rejectionReason }),
    
    verifyInspection: (token: string, action: 'CONFIRM' | 'DECLINE', rejectionReason?: string) =>
      apiClient.post(`/verify/inspection/${token}`, { action, rejectionReason }),
    
    // Admin verification management
    resendSms: (recordId: string, recordType: 'WARRANTY' | 'INSPECTION') =>
      apiClient.post('/verify/resend', { recordId, recordType }),
    
    reinstateWarranty: (warrantyId: string, reinstatementReason: string) =>
      apiClient.post('/verify/reinstate', { warrantyId, reinstatementReason }),
  },

  // Reminder System
  reminders: {
    getStatistics: () =>
      apiClient.get('/reminders'),
    
    processReminders: () =>
      apiClient.post('/reminders/process'),
  },

  // Validation
  validation: {
    validatePhotos: (photos: Array<{ category: string; fileSize: number; fileType: string }>) =>
      apiClient.post('/validation/photos', { photos }),
    
    validateChecklist: (checklist: InspectionChecklist) =>
      apiClient.post('/validation/checklist', { checklist }),
  },

  // Dashboard
  dashboard: {
    getStats: () =>
      apiClient.get('/dashboard/stats'),
    
    getSummary: () =>
      apiClient.get('/dashboard/summary'),
    
    getActivity: (params?: { limit?: number }) =>
      apiClient.get('/dashboard/activity', params),
  },

  // ERPS Admin Override Functions
  erpsAdmin: {
    // Manual warranty verification (when installer has left)
    verifyWarranty: (warrantyId: string, data: { 
      reason: string
      notes?: string
      skipCustomerNotification?: boolean 
    }) =>
      apiClient.post(`/erps-admin/warranties/${warrantyId}/verify`, data),
    
    // Manual warranty activation (skip customer terms)
    activateWarranty: (warrantyId: string, data: { 
      reason: string
      notes: string 
    }) =>
      apiClient.post(`/erps-admin/warranties/${warrantyId}/activate`, data),
    
    // Manual inspection verification
    verifyInspection: (inspectionId: string, data: { 
      reason: string
      notes?: string 
    }) =>
      apiClient.post(`/erps-admin/inspections/${inspectionId}/verify`, data),
    
    // Update user role
    updateUserRole: (userId: string, data: { 
      partnerRole: 'ACCOUNT_ADMIN' | 'ACCOUNT_STAFF' | 'ACCOUNT_INSTALLER'
      mobileNumber?: string
      isAccreditedInstaller?: boolean
      reason: string 
    }) =>
      apiClient.put(`/erps-admin/users/${userId}/role`, data),
    
    // Reassign user to different account
    reassignUser: (userId: string, data: { 
      newPartnerAccountId: string
      reason: string 
    }) =>
      apiClient.put(`/erps-admin/users/${userId}/reassign`, data),
    
    // Get warranty audit history
    getWarrantyAuditHistory: (warrantyId: string) =>
      apiClient.get(`/erps-admin/warranties/${warrantyId}/audit-history`),
    
    // Get inspection audit history
    getInspectionAuditHistory: (inspectionId: string) =>
      apiClient.get(`/erps-admin/inspections/${inspectionId}/audit-history`),

    // Get all admin audit history
    getAllAuditHistory: (params?: { 
      page?: number
      limit?: number
      actionType?: string
      recordType?: string 
    }) =>
      apiClient.get('/erps-admin/audit-history', params),

    // Get pending verifications for admin dashboard
    getPendingVerifications: () =>
      apiClient.get('/erps-admin/pending-verifications'),
  },
}

// Legacy API for backward compatibility (can be removed once all components are updated)
export const api = {
  // Auth
  login: (credentials: { username: string; password: string }) =>
    erpsApi.auth.login({ email: credentials.username, password: credentials.password }),
  
  logout: () => erpsApi.auth.logout(),
  
  getCurrentUser: () => erpsApi.auth.getCurrentUser(),
  
  // Warranties
  getWarranties: (params?: { status?: string; page?: number; limit?: number }) =>
    erpsApi.warranties.getAll(params),
  
  getWarranty: (id: string) => erpsApi.warranties.getById(id),
  
  createWarranty: (warrantyData: any) => erpsApi.warranties.create(warrantyData),
  
  updateWarranty: (id: string, warrantyData: any) => erpsApi.warranties.update(id, warrantyData),
  
  activateWarranty: (id: string, activationData: any) => 
    erpsApi.warranties.submit(id, activationData.installerId),
  
  // Inspections
  getInspections: (params?: { status?: string; inspector?: string; page?: number; limit?: number }) =>
    erpsApi.inspections.getAll(params),
  
  getInspection: (id: string) => erpsApi.inspections.getById(id),
  
  createInspection: (inspectionData: unknown) => erpsApi.inspections.create(inspectionData),
  
  updateInspection: (id: string, inspectionData: unknown) => 
    erpsApi.inspections.update(id, inspectionData),
  
  uploadInspectionPhoto: (inspectionId: string, file: File) =>
    erpsApi.inspections.uploadPhotos(inspectionId, [file], ['GENERAL'], ['Inspection photo']),
}