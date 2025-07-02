export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Feedback {
  id: string
  title: string
  description: string
  category: string
  status: FeedbackStatus
  priority: Priority
  location?: {
    lat: number
    lng: number
    address: string
  }
  images: string[]
  isAnonymous: boolean
  createdAt: string
  updatedAt: string
  userId?: string
  user?: Pick<User, 'id' | 'name'>
  responses?: Response[]
  votes?: Vote[]
  tags?: FeedbackTag[]
}

export interface Response {
  id: string
  content: string
  isOfficial: boolean
  createdAt: string
  updatedAt: string
  feedbackId: string
  userId: string
  user: Pick<User, 'id' | 'name' | 'role'>
}

export interface Vote {
  id: string
  type: VoteType
  userId: string
  feedbackId: string
  createdAt: string
}

export interface Tag {
  id: string
  name: string
  color: string
}

export interface FeedbackTag {
  feedbackId: string
  tagId: string
  tag: Tag
}

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  createdAt: string
  userId: string
}

export interface Department {
  id: string
  name: string
  description?: string
  email?: string
  phone?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export enum UserRole {
  CITIZEN = 'CITIZEN',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  DEPARTMENT_HEAD = 'DEPARTMENT_HEAD'
}

export enum FeedbackStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
  CLOSED = 'CLOSED'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum VoteType {
  UP = 'UP',
  DOWN = 'DOWN'
}

export enum NotificationType {
  FEEDBACK_UPDATE = 'FEEDBACK_UPDATE',
  NEW_RESPONSE = 'NEW_RESPONSE',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
  ACCOUNT_UPDATE = 'ACCOUNT_UPDATE'
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  token?: string
}

export interface PaginationData {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface PaginatedResponse<T = any> {
  success: boolean
  data: {
    items: T[]
    pagination: PaginationData
  }
  error?: string
  message?: string
}
