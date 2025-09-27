export interface User {
  id: number
  name: string
  email: string
  phone?: string
  age: number
  active: boolean
  createdAt: string
  updatedAt?: string
}

export interface CreateUserRequest {
  name: string
  email: string
  phone?: string
  age: number
  active: boolean
}

export interface UpdateUserRequest extends CreateUserRequest {
  id: number
}

export interface UserStats {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
}

export interface UserFilters {
  name?: string
  minAge?: number
  maxAge?: number
  active?: boolean
}
