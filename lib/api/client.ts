"use client"

// Enhanced API client with automatic auth handling
class ApiClient {
  private baseURL: string
  
  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL
  }
  
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    // Get auth token from cookie or localStorage
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
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }
      
      // Handle empty responses
      const contentType = response.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        return await response.json()
      }
      
      return response.text() as unknown as T
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error)
      throw error
    }
  }
  
  private getAuthToken(): string | null {
    // Try multiple sources for auth token
    if (typeof window !== 'undefined') {
      // Check localStorage
      const token = localStorage.getItem('authToken')
      if (token) return token
      
      // Check sessionStorage
      const sessionToken = sessionStorage.getItem('authToken')
      if (sessionToken) return sessionToken
      
      // Check cookie (for SSR compatibility)
      const cookies = document.cookie.split(';')
      const authCookie = cookies.find(c => c.trim().startsWith('authToken='))
      if (authCookie) {
        return authCookie.split('=')[1]
      }
    }
    
    return null
  }
  
  private handleAuthError() {
    // Clear auth data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
      sessionStorage.removeItem('authToken')
      
      // Clear auth cookies
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      
      // Redirect to login
      window.location.href = '/login'
    }
  }
  
  // HTTP methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint
    return this.request<T>(url, { method: 'GET' })
  }
  
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
  
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
  
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
  
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
  
  // File upload
  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value))
      })
    }
    
    const token = this.getAuthToken()
    
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Convenience functions for common operations
export const api = {
  // Auth
  login: (credentials: { username: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  
  logout: () => apiClient.post('/auth/logout'),
  
  getCurrentUser: () => apiClient.get('/auth/me'),
  
  // Users
  getUsers: (params?: { role?: string; page?: number; limit?: number }) =>
    apiClient.get('/users', params),
  
  getUser: (id: string) => apiClient.get(`/users/${id}`),
  
  createUser: (userData: any) => apiClient.post('/users', userData),
  
  updateUser: (id: string, userData: any) => apiClient.put(`/users/${id}`, userData),
  
  deleteUser: (id: string) => apiClient.delete(`/users/${id}`),
  
  // Warranties
  getWarranties: (params?: { status?: string; page?: number; limit?: number }) =>
    apiClient.get('/warranties', params),
  
  getWarranty: (id: string) => apiClient.get(`/warranties/${id}`),
  
  createWarranty: (warrantyData: any) => apiClient.post('/warranties', warrantyData),
  
  updateWarranty: (id: string, warrantyData: any) => apiClient.put(`/warranties/${id}`, warrantyData),
  
  activateWarranty: (id: string, activationData: any) => 
    apiClient.post(`/warranties/${id}/activate`, activationData),
  
  // Inspections
  getInspections: (params?: { status?: string; inspector?: string; page?: number; limit?: number }) =>
    apiClient.get('/inspections', params),
  
  getInspection: (id: string) => apiClient.get(`/inspections/${id}`),
  
  createInspection: (inspectionData: any) => apiClient.post('/inspections', inspectionData),
  
  updateInspection: (id: string, inspectionData: any) => 
    apiClient.put(`/inspections/${id}`, inspectionData),
  
  uploadInspectionPhoto: (inspectionId: string, file: File) =>
    apiClient.upload(`/inspections/${inspectionId}/photos`, file),
  
  // Agents
  getAgents: (params?: { page?: number; limit?: number }) =>
    apiClient.get('/agents', params),
  
  getAgent: (id: string) => apiClient.get(`/agents/${id}`),
  
  // Inspectors
  getInspectors: (params?: { page?: number; limit?: number }) =>
    apiClient.get('/inspectors', params),
  
  getInspector: (id: string) => apiClient.get(`/inspectors/${id}`),
  
  // Stats (admin only)
  getStats: () => apiClient.get('/stats'),
  
  getDashboardStats: (role: string) => apiClient.get(`/stats/dashboard/${role}`)
}