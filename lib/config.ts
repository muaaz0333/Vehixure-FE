// API Configuration
export const API_CONFIG = {
  // Base URL for the ERPS API
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5050/api/v1',
  
  // Timeout for API requests (in milliseconds)
  timeout: 30000,
  
  // Default pagination settings
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
  
  // File upload settings
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxPhotosPerUpload: 10,
  },
  
  // Photo categories for warranties and inspections
  photoCategories: {
    warranty: [
      'INSTALLATION_OVERVIEW',
      'COMPONENT_DETAIL', 
      'WIRING_DETAIL',
      'BEFORE_INSTALLATION',
      'AFTER_INSTALLATION'
    ],
    inspection: [
      'SYSTEM_OVERVIEW',
      'COMPONENT_CONDITION',
      'WIRING_CONDITION',
      'CORROSION_EVIDENCE',
      'MAINTENANCE_REQUIRED'
    ]
  },
  
  // Verification status options
  verificationStatuses: {
    warranty: [
      'DRAFT',
      'SUBMITTED_PENDING_VERIFICATION',
      'VERIFIED_ACTIVE',
      'REJECTED_INSTALLER_DECLINED',
      'LAPSED'
    ],
    inspection: [
      'DRAFT',
      'SUBMITTED_PENDING_VERIFICATION', 
      'VERIFIED_ACTIVE',
      'REJECTED_INSPECTOR_DECLINED'
    ]
  },
  
  // Partner roles
  partnerRoles: [
    'ACCOUNT_ADMIN',
    'ACCOUNT_STAFF',
    'ACCOUNT_INSTALLER'
  ],
  
  // System roles
  systemRoles: [
    'ERPS_ADMIN',
    'PARTNER_USER'
  ]
}

// Environment-specific settings
export const ENV = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
}

// Feature flags
export const FEATURES = {
  enableFileUpload: true,
  enableRealTimeUpdates: false,
  enableAdvancedFiltering: true,
  enableBulkOperations: false,
}