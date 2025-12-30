"use client"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <Button 
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
    >
      Logout
    </Button>
  )
}