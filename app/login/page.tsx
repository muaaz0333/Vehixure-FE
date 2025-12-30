"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"
import { getRedirectPath } from "@/lib/auth"
import { Eye, EyeOff } from "lucide-react"
import { ClientOnly } from "@/components/providers/client-only"
import Cookies from 'js-cookie'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { login, isLoading, isAuthenticated, user, isInitialized } = useAuth()
  const router = useRouter()

  // Redirect authenticated users
  useEffect(() => {
    if (isInitialized && isAuthenticated && user) {
      const redirectPath = getRedirectPath(user)
      router.replace(redirectPath)
    }
  }, [isInitialized, isAuthenticated, user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const result = await login(email, password)
      if (result.success) {
        // Get user from localStorage and redirect immediately after successful login
        const userStr = localStorage.getItem('user')
        if (userStr) {
          try {
            const userData = JSON.parse(userStr)
            Cookies.set("user", userStr, { expires: 7 })
            const redirectPath = getRedirectPath(userData)
            router.replace(redirectPath)
          } catch {
            router.replace('/dashboard')
          }
        } else {
          router.replace('/dashboard')
        }
      } else {
        setError(result.message || "Invalid email or password")
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
    }
  }

  // Show loading while auth is initializing
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is already authenticated, show redirecting message
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <ClientOnly fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <div className="px-4 sm:px-6 py-8 sm:py-12 lg:py-16 bg-white min-h-[calc(100vh-200px)] flex items-center">
        <div className="w-full max-w-lg mx-auto">
          <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-10">
            Login
          </h1>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 sm:h-12 bg-gray-100 border border-gray-200 rounded-lg text-sm sm:text-base"
              required
              disabled={isLoading}
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 sm:h-12 bg-gray-100 border border-gray-200 rounded-lg pr-12 text-sm sm:text-base"
                required
                disabled={isLoading}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-10 sm:h-12 bg-[#ED1C24] hover:bg-[#FF2D20]/95 text-white rounded-lg text-sm font-medium disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div><strong>Admin:</strong> admin@erps.com / admin123</div>
              <div><strong>Partner Admin:</strong> partner@test.com / partner123</div>
              <div><strong>Installer:</strong> installer@test.com / installer123</div>
            </div>
          </div> */}
        </div>
      </div>
    </ClientOnly>
  )
}