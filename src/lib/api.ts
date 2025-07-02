import axios, { AxiosResponse } from 'axios'
import { APIResponse, PaginatedResponse } from '@/types'

// In production, this will use the same domain (for Heroku deployments)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.origin ? 
    `${window.location.origin}/api` : 
    'http://localhost:5000/api')

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API calls
export const authAPI = {
  register: async (userData: {
    email: string
    password: string
    name?: string
    phone?: string
  }): Promise<APIResponse> => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  login: async (credentials: {
    email: string
    password: string
  }): Promise<APIResponse> => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  guestSession: async (): Promise<APIResponse> => {
    const response = await api.post('/auth/guest')
    return response.data
  }
}

// Feedback API calls
export const feedbackAPI = {
  getAll: async (params?: {
    page?: number
    limit?: number
    category?: string
    status?: string
  }): Promise<PaginatedResponse> => {
    const response = await api.get('/feedback', { params })
    return response.data
  },

  getById: async (id: string): Promise<APIResponse> => {
    const response = await api.get(`/feedback/${id}`)
    return response.data
  },

  create: async (feedbackData: {
    title: string
    description: string
    category: string
    location?: any
    images?: string[]
    isAnonymous?: boolean
    userId?: string
  }): Promise<APIResponse> => {
    const response = await api.post('/feedback', feedbackData)
    return response.data
  },

  getStats: async (): Promise<APIResponse> => {
    const response = await api.get('/feedback/stats')
    return response.data
  }
}

// Upload API calls
export const uploadAPI = {
  uploadImage: async (file: File): Promise<APIResponse> => {
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}

// Admin API calls
export const adminAPI = {
  getDashboard: async (): Promise<APIResponse> => {
    const response = await api.get('/admin/dashboard')
    return response.data
  }
}

// User API calls
export const userAPI = {
  getProfile: async (): Promise<APIResponse> => {
    const response = await api.get('/user/profile')
    return response.data
  }
}

export default api
