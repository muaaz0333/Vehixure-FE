export type UserRole = 'admin' | 'agent' | 'inspector'

export interface User {
  id: string
  username: string
  password: string
  role: UserRole
  name: string
}

// Mock users for demonstration
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Admin'
  },
  {
    id: '2',
    username: 'agent',
    password: 'agent123',
    role: 'agent',
    name: 'Agent'
  },
  {
    id: '3',
    username: 'inspector',
    password: 'inspector123',
    role: 'inspector',
    name: 'Inspector'
  }
]

// Role-based redirect paths
export const roleRedirects: Record<UserRole, string> = {
  admin: '/dashboard',
  agent: '/agent-dashboard',
  inspector: '/inspector-dashboard'
}

// Authentication functions
export const authenticateUser = (username: string, password: string): User | null => {
  const user = mockUsers.find(u => u.username === username && u.password === password)
  return user || null
}

export const getRedirectPath = (role: UserRole): string => {
  return roleRedirects[role]
}