'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Shield, CheckCircle, RotateCcw, Eye, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useAuth } from '@/components/providers/auth-provider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface FormData {
  name: string
  username: string
  password: string
}

interface AddUserData {
  name: string
  username: string
  password: string
}

function Stat({
  value,
  label,
  icon,
  bg,
}: {
  value: string
  label: string
  icon: React.ReactNode
  bg: string
}) {
  return (
    <div className="flex items-start justify-between px-4 py-2">
      <div>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
      </div>
      <div className={`w-10 h-10 rounded-lg shadow flex items-center justify-center ${bg}`}>
        {icon}
      </div>
    </div>
  )
}

function Divider() {
  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="w-px h-20 bg-gray-200" />
    </div>
  )
}


export default function AccountPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showAddUserPassword, setShowAddUserPassword] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    name: 'Anthony Osokwe',
    username: 'Anthony',
    password: '••••'
  })

  const [addUserData, setAddUserData] = useState<AddUserData>({
    name: '',
    username: '',
    password: ''
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [addUserErrors, setAddUserErrors] = useState<{ [key: string]: string }>({})

  // const validateForm = (data: FormData) => {
  //   const newErrors: {[key: string]: string} = {}

  //   if (!data.name.trim()) {
  //     newErrors.name = 'Name is required'
  //   }

  //   if (!data.username.trim()) {
  //     newErrors.username = 'Username is required'
  //   }

  //   if (!data.password.trim()) {
  //     newErrors.password = 'Password is required'
  //   }

  //   return newErrors
  // }

  const validateAddUserForm = (data: AddUserData) => {
    const newErrors: { [key: string]: string } = {}

    if (!data.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!data.username.trim()) {
      newErrors.username = 'Username is required'
    }

    if (!data.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleAddUserChange = (field: keyof AddUserData, value: string) => {
    setAddUserData(prev => ({ ...prev, [field]: value }))
    if (addUserErrors[field]) {
      setAddUserErrors(prev => ({ ...prev, [field]: '' }))
    }
  }


  const handleAddUser = () => {
    const newErrors = validateAddUserForm(addUserData)
    setAddUserErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Add user logic here
      console.log('Adding user:', addUserData)
      setAddUserData({ name: '', username: '', password: '' })
      setShowAddUser(false)
    }
  }

  const handleCancel = () => {
    setAddUserData({ name: '', username: '', password: '' })
    setAddUserErrors({})
    setShowAddUser(false)
  }

  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.inspection-profile')) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])



  return (

    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      {/* <div className="bg-white px-8 py-4 shrink-0">
        <div className="flex items-center justify-between"> */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <h1 className="text-xl font-semibold text-gray-900">Account Info</h1>
          <div className="relative inspection-profile">
            <button
              onClick={() => setProfileOpen(v => !v)}
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition focus:outline-none"
            >
              {/* Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">
                  {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              </div>

              {/* Name */}
              <span className="text-sm font-medium hidden sm:block max-w-[120px] truncate">
                {user?.fullName || user?.email || 'User'}
              </span>

              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-64 rounded-xl bg-white border border-gray-200 shadow-lg z-50">
                {/* User info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.fullName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>

                {/* Logout */}
                <div className="p-2">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setProfileOpen(false)
                      handleLogout()
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setProfileOpen(false)
                        handleLogout()
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg
                     text-sm font-medium text-red-600 hover:bg-red-50
                     cursor-pointer transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                      />
                    </svg>
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {/* Admin Information Display */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Information</h2>
          <div className="bg-white rounded-2xl p-3 w-full border border-gray-300">
            <span className="text-gray-600 text-base">Anthony</span>
          </div>
        </div>

        {/* ✅ Figma-accurate Statistics Section */}
        {/* Statistics Cards */}
        <div className="bg-white border border-gray-200 rounded-2xl px-8 py-6 mb-8">
          {/* <div className="flex items-center justify-between"> */}
          <div className="
  flex flex-col gap-4
  sm:grid sm:grid-cols-2 sm:gap-4
  lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-0
">



            {/* Stat 1 */}
            <Stat
              value="4512"
              label="Number of Customers"
              icon={<Image
                src="/images/shape.png"
                alt="Customers"
                width={20}
                height={20}
              />}
              bg="bg-white"
            />

            <div className="hidden lg:block">
              <Divider />
            </div>


            {/* Stat 2 */}
            <Stat
              value="4500"
              label="Number of Warranties"
              icon={<Image
                src="/images/shape1.png"
                alt="Customers"
                width={20}
                height={20}
              />}
              bg="bg-white"
            />

            <div className="hidden lg:block">
              <Divider />
            </div>


            {/* Stat 3 */}
            <Stat
              value="3101"
              label="Activated Warranties"
              icon={<Image
                src="/images/shape2.png"
                alt="Customers"
                width={20}
                height={20}
              />}
              bg="bg-white"
            />

            <div className="hidden lg:block">
              <Divider />
            </div>


            {/* Stat 4 */}
            <Stat
              value="355"
              label="Number of Users"
              icon={<Image
                src="/images/shape3.png"
                alt="Customers"
                width={20}
                height={20}
              />}
              bg="bg-white"
            />

          </div>
        </div>



        {/* Admin Information Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Admin Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`h-12 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className={`h-12 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`h-12 pr-20 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter password"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
        </div>

        {/* Add User Section */}
        {!showAddUser ? (
          <div className="bg-red-50 rounded-lg border border-red-200 p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Add User</h2>
              <Button
                onClick={() => setShowAddUser(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
              >
                Add User
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 rounded-lg border border-red-200 p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Add User</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Name
                </label>
                <Input
                  value={addUserData.name}
                  onChange={(e) => handleAddUserChange('name', e.target.value)}
                  className={`h-12 ${addUserErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="enter name"
                />
                {addUserErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{addUserErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Username <span className="text-red-500">*</span>
                </label>
                <Input
                  value={addUserData.username}
                  onChange={(e) => handleAddUserChange('username', e.target.value)}
                  className={`h-12 ${addUserErrors.username ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="enter username"
                />
                {addUserErrors.username && (
                  <p className="text-red-500 text-sm mt-1">{addUserErrors.username}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showAddUserPassword ? 'text' : 'password'}
                    value={addUserData.password}
                    onChange={(e) => handleAddUserChange('password', e.target.value)}
                    className={`h-12 pr-20 ${addUserErrors.password ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="enter password"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddUserPassword(!showAddUserPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {addUserErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{addUserErrors.password}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1 h-12 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddUser}
                className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white"
              >
                Add Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}