import axios from 'axios'
import { User, CreateUserRequest, UpdateUserRequest, UserStats, UserFilters } from '../types/user'

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor para adicionar token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor para error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    
    // Se receber 401, limpar token e redirecionar para login
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export const userService = {
  // Get all users
  getUsers: async (filters?: UserFilters): Promise<User[]> => {
    const params = new URLSearchParams()
    
    if (filters?.name) params.append('name', filters.name)
    if (filters?.minAge) params.append('minAge', filters.minAge.toString())
    if (filters?.maxAge) params.append('maxAge', filters.maxAge.toString())
    
    const queryString = params.toString()
    const url = queryString ? `/users/search?${queryString}` : '/users'
    
    const response = await api.get(url)
    return response.data
  },

  // Get user by ID
  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  // Create user
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await api.post('/users', userData)
    return response.data
  },

  // Update user
  updateUser: async (id: number, userData: CreateUserRequest): Promise<User> => {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  },

  // Delete user
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`)
  },

  // Activate user
  activateUser: async (id: number): Promise<User> => {
    const response = await api.patch(`/users/${id}/activate`)
    return response.data
  },

  // Deactivate user
  deactivateUser: async (id: number): Promise<User> => {
    const response = await api.patch(`/users/${id}/deactivate`)
    return response.data
  },

  // Get user statistics
  getUserStats: async (): Promise<UserStats> => {
    const response = await api.get('/users/stats')
    return response.data
  },

  // Get active users
  getActiveUsers: async (): Promise<User[]> => {
    const response = await api.get('/users/active')
    return response.data
  },

  // Get inactive users
  getInactiveUsers: async (): Promise<User[]> => {
    const response = await api.get('/users/inactive')
    return response.data
  },

  // Search users by age range
  getUsersByAgeRange: async (minAge: number, maxAge: number): Promise<User[]> => {
    const response = await api.get(`/users/age-range?minAge=${minAge}&maxAge=${maxAge}`)
    return response.data
  },

  // Generate token for user (Admin only)
  generateTokenForUser: async (email: string): Promise<{ token: string; user: User }> => {
    const response = await api.post('/admin/generate-token', { email })
    return response.data
  },
}

export default api
