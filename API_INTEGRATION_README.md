# ERPS Frontend API Integration

This document explains how the ERPS API endpoints have been integrated into the frontend application.

## Overview

The frontend has been updated to work with the ERPS Partner Portal API, providing comprehensive functionality for:

- Authentication & User Management
- Partner Account Management  
- Warranty Registration & Management
- Annual Inspection Management
- Verification System
- File Upload & Photo Management

## Architecture

### API Client (`lib/api/client.ts`)

The main API client provides:
- Automatic JWT token handling
- Error handling and auth redirects
- Type-safe request/response handling
- File upload capabilities
- Structured endpoint organization

### Authentication (`lib/auth.ts` & `components/providers/auth-provider.tsx`)

Updated to support:
- ERPS user roles (ERPS_ADMIN, PARTNER_USER)
- Partner roles (ACCOUNT_ADMIN, ACCOUNT_STAFF, ACCOUNT_INSTALLER)
- JWT token management
- Role-based redirects

### React Query Hooks (`lib/hooks/`)

Custom hooks for data fetching and mutations:
- `use-warranties.ts` - Warranty management
- `use-inspections.ts` - Inspection management  
- `use-partner-accounts.ts` - Partner account operations

## Configuration

### Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api/v1
```

### API Configuration (`lib/config.ts`)

Centralized configuration for:
- API base URL and timeouts
- File upload settings
- Photo categories
- Status options
- Role definitions

## Usage Examples

### Authentication

```tsx
import { useAuth } from '@/components/providers/auth-provider'

function LoginComponent() {
  const { login, user, logout, isAuthenticated } = useAuth()
  
  const handleLogin = async () => {
    const result = await login('user@example.com', 'password')
    if (result.success) {
      // User logged in successfully
    }
  }
}
```

### Warranty Management

```tsx
import { useWarranties, useCreateWarranty } from '@/lib/hooks/use-warranties'

function WarrantyComponent() {
  // Fetch warranties with filters
  const { data, isLoading } = useWarranties({
    page: 1,
    limit: 10,
    status: 'VERIFIED_ACTIVE',
    search: 'Toyota'
  })
  
  // Create new warranty
  const createWarranty = useCreateWarranty()
  
  const handleCreate = async (warrantyData) => {
    await createWarranty.mutateAsync(warrantyData)
  }
}
```

### Direct API Calls

```tsx
import { erpsApi } from '@/lib/api/client'

// Get warranties
const warranties = await erpsApi.warranties.getAll({
  page: 1,
  limit: 10,
  status: 'VERIFIED_ACTIVE'
})

// Create warranty
const newWarranty = await erpsApi.warranties.create({
  vehicleVin: '1HGBH41JXMN109186',
  vehicleMake: 'Toyota',
  vehicleModel: 'Camry',
  // ... other fields
})

// Upload photos
await erpsApi.warranties.uploadPhotos(
  warrantyId,
  files,
  ['INSTALLATION_OVERVIEW', 'COMPONENT_DETAIL'],
  ['Overview photo', 'Detail photo']
)
```

## Available API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - Register new partner user
- `GET /auth/admin/partner-users` - Get all partner users (Admin)
- `POST /auth/admin/login-as` - Admin impersonation

### Partner Accounts
- `POST /admin/partner-accounts` - Create partner account
- `GET /admin/partner-accounts` - Get all partner accounts
- `GET /admin/partner-accounts/:id` - Get partner account by ID
- `PUT /admin/partner-accounts/:id` - Update partner account
- `POST /admin/partner-accounts/:id/users` - Create partner user
- `GET /admin/partner-accounts/:id/users` - Get partner users

### Warranties
- `POST /warranties` - Create warranty
- `GET /warranties` - Get warranties list
- `GET /warranties/:id` - Get warranty by ID
- `PUT /warranties/:id` - Update warranty
- `POST /warranties/:id/submit` - Submit for verification
- `POST /warranties/:id/photos` - Upload photos

### Inspections
- `POST /inspections` - Create inspection
- `GET /inspections` - Get inspections list
- `GET /inspections/:id` - Get inspection by ID
- `PUT /inspections/:id` - Update inspection
- `POST /inspections/:id/submit` - Submit for verification
- `POST /inspections/:id/photos` - Upload photos

### Verification (Public)
- `GET /verify/:token` - Get verification details
- `POST /verify/warranty/:token` - Verify warranty
- `POST /verify/inspection/:token` - Verify inspection

## Components

### Forms
- `WarrantyForm` - Create/edit warranty registrations
- `LoginForm` - User authentication

### Lists
- `WarrantiesList` - Display warranties with filtering and pagination

### Usage in Pages

```tsx
// app/warranties/page.tsx
import { WarrantiesList } from '@/components/lists/warranties-list'

export default function WarrantiesPage() {
  return (
    <div className="container mx-auto py-8">
      <WarrantiesList />
    </div>
  )
}
```

## Error Handling

The API client automatically handles:
- Authentication errors (401) - Redirects to login
- Permission errors (403) - Shows error message
- Network errors - Displays user-friendly messages
- Validation errors (400) - Shows field-specific errors

## File Upload

Photo upload is supported for warranties and inspections:

```tsx
import { useUploadWarrantyPhotos } from '@/lib/hooks/use-warranties'

function PhotoUpload({ warrantyId }) {
  const uploadPhotos = useUploadWarrantyPhotos()
  
  const handleUpload = async (files: File[]) => {
    await uploadPhotos.mutateAsync({
      id: warrantyId,
      files,
      categories: ['INSTALLATION_OVERVIEW'],
      descriptions: ['Installation overview']
    })
  }
}
```

## Type Safety

All API responses are typed with TypeScript interfaces:

```tsx
interface Warranty {
  id: string
  vehicleVin: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: number
  ownerName: string
  ownerEmail: string
  verificationStatus: string
  // ... other fields
}
```

## Next Steps

1. **Environment Setup**: Configure your API base URL in environment variables
2. **Authentication**: Update login pages to use the new auth system
3. **Components**: Replace existing components with the new API-integrated versions
4. **Testing**: Test all endpoints with your backend API
5. **Error Handling**: Customize error messages and handling as needed

## Migration Guide

### From Mock Data to Real API

1. Replace mock authentication with `useAuth` hook
2. Update components to use React Query hooks
3. Replace hardcoded data with API calls
4. Update routing based on user roles
5. Add proper error handling and loading states

### Example Migration

**Before:**
```tsx
const [warranties, setWarranties] = useState(mockWarranties)
```

**After:**
```tsx
const { data: warranties, isLoading, error } = useWarranties()
```

This integration provides a robust foundation for the ERPS frontend application with full API connectivity, type safety, and modern React patterns.