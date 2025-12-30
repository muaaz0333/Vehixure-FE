// ERPS API Types
export type SystemRole = 'ERPS_ADMIN' | 'PARTNER_USER'
export type PartnerRole = 'ACCOUNT_ADMIN' | 'ACCOUNT_STAFF' | 'ACCOUNT_INSTALLER'

export interface User {
  id: string
  email: string
  fullName: string
  role: SystemRole
  partnerRole?: PartnerRole
  partnerAccountId?: string
  mobileNumber?: string
  isAccreditedInstaller?: boolean
  isAuthorisedInspector?: boolean
  installerCertificationNumber?: string
  inspectorCertificationNumber?: string
  accountStatus: string
  isVerified: boolean
  created: string
}

export interface PartnerAccount {
  id: string
  businessName: string
  contactPerson: string
  streetAddress?: string
  city?: string
  state?: string
  postcode?: string
  country?: string
  phone?: string
  faxNumber?: string
  email?: string
  productsSold?: string
  buyPrice?: string
  accountStatus: string
  isDeleted: boolean
  created: string
  modified: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  fullName?: string
  role: SystemRole
  partnerRole: PartnerRole
  mobileNumber?: string
  isAccreditedInstaller?: boolean
  installerCertificationNumber?: string
  isAuthorisedInspector?: boolean
  inspectorCertificationNumber?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    token: string
    expiresIn?: string
  }
}

// Role-based redirect paths
export const roleRedirects: Record<string, string> = {
  'ERPS_ADMIN': '/dashboard',
  'PARTNER_USER-ACCOUNT_ADMIN': '/agent-dashboard',
  'PARTNER_USER-ACCOUNT_STAFF': '/agent-dashboard',
  'PARTNER_USER-ACCOUNT_INSTALLER': '/inspector-dashboard'
}

export const getRedirectPath = (user: User): string => {
  if (user.role === 'ERPS_ADMIN') {
    return roleRedirects['ERPS_ADMIN']
  }
  
  if (user.role === 'PARTNER_USER' && user.partnerRole) {
    const key = `${user.role}-${user.partnerRole}`
    return roleRedirects[key] || '/dashboard'
  }
  
  return '/dashboard'
}