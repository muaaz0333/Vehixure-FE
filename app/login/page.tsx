"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { authenticateUser, getRedirectPath } from "@/lib/auth"
import { AuthRedirect } from "@/components/auth/auth-redirect"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const user = authenticateUser(username, password)

      if (user) {
        login(user)
        const redirectPath = getRedirectPath(user.role)
        router.push(redirectPath)
      } else {
        setError("Invalid username or password")
      }
    } catch {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthRedirect>
      <div className="px-4 sm:px-6 py-8 sm:py-12 lg:py-16 bg-white min-h-[calc(100vh-200px)] flex items-center">
        <div className="w-full max-w-md mx-auto">
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
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              className="w-full h-10 sm:h-12 bg-[#FF2D20] hover:bg-[#FF2D20]/90 text-white rounded-lg text-sm font-medium disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div><strong>Admin:</strong> admin / admin123</div>
              <div><strong>Agent:</strong> agent / agent123</div>
              <div><strong>Inspector:</strong> inspector / inspector123</div>
            </div>
          </div>
        </div>
      </div>
    </AuthRedirect>
  )
}