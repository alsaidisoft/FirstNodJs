'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Users, MessageSquare, TrendingUp, Clock, CheckCircle } from 'lucide-react'

interface DashboardStats {
  totalFeedbacks: number
  pendingFeedbacks: number
  resolvedFeedbacks: number
  totalUsers: number
  responseTime: string
  satisfactionRate: number
}

interface RecentFeedback {
  id: string
  title: string
  status: string
  category: string
  priority: string
  createdAt: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalFeedbacks: 0,
    pendingFeedbacks: 0,
    resolvedFeedbacks: 0,
    totalUsers: 0,
    responseTime: '0',
    satisfactionRate: 0
  })
  const [recentFeedbacks, setRecentFeedbacks] = useState<RecentFeedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStats({
        totalFeedbacks: 1234,
        pendingFeedbacks: 89,
        resolvedFeedbacks: 892,
        totalUsers: 567,
        responseTime: '2.4 days',
        satisfactionRate: 87
      })

      setRecentFeedbacks([
        {
          id: '1',
          title: 'Broken streetlight on Main Street',
          status: 'PENDING',
          category: 'Infrastructure',
          priority: 'HIGH',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          title: 'Park maintenance required',
          status: 'IN_PROGRESS',
          category: 'Environment',
          priority: 'MEDIUM',
          createdAt: '2024-01-14T15:45:00Z'
        },
        {
          id: '3',
          title: 'Traffic signal malfunction',
          status: 'RESOLVED',
          category: 'Transportation',
          priority: 'URGENT',
          createdAt: '2024-01-13T09:15:00Z'
        }
      ])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Feedbacks',
      value: stats.totalFeedbacks.toLocaleString(),
      icon: MessageSquare,
      color: 'bg-primary-500',
      change: '+12%'
    },
    {
      title: 'Pending Review',
      value: stats.pendingFeedbacks.toString(),
      icon: Clock,
      color: 'bg-warning-500',
      change: '-5%'
    },
    {
      title: 'Resolved',
      value: stats.resolvedFeedbacks.toLocaleString(),
      icon: CheckCircle,
      color: 'bg-success-500',
      change: '+18%'
    },
    {
      title: 'Active Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-accent-500',
      change: '+8%'
    }
  ]

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Admin Dashboard</h1>
          <p className="mt-1 text-secondary-600">
            Monitor and manage community feedback submissions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="card">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-secondary-600">
                      {stat.title}
                    </p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-secondary-900">
                        {loading ? '...' : stat.value}
                      </p>
                      <span className={`ml-2 text-sm ${
                        stat.change.startsWith('+') ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Feedbacks */}
          <div className="card">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">
              Recent Feedbacks
            </h2>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-secondary-200 rounded mb-2"></div>
                    <div className="h-3 bg-secondary-200 rounded mb-1"></div>
                    <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentFeedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="border-l-4 border-primary-500 pl-4 py-2"
                  >
                    <h3 className="font-medium text-secondary-900">
                      {feedback.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-secondary-500">
                      <span className="capitalize">
                        {feedback.status.replace('_', ' ').toLowerCase()}
                      </span>
                      <span>{feedback.category}</span>
                      <span className={`font-medium ${
                        feedback.priority === 'URGENT' ? 'text-error-600' :
                        feedback.priority === 'HIGH' ? 'text-warning-600' :
                        'text-secondary-600'
                      }`}>
                        {feedback.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Performance Metrics */}
          <div className="card">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">
              Performance Metrics
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-secondary-600">
                    Average Response Time
                  </span>
                  <span className="text-sm font-bold text-secondary-900">
                    {loading ? '...' : stats.responseTime}
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-secondary-600">
                    Satisfaction Rate
                  </span>
                  <span className="text-sm font-bold text-secondary-900">
                    {loading ? '...' : `${stats.satisfactionRate}%`}
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="bg-success-500 h-2 rounded-full" style={{ width: `${stats.satisfactionRate}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-secondary-600">
                    Resolution Rate
                  </span>
                  <span className="text-sm font-bold text-secondary-900">
                    {loading ? '...' : `${Math.round((stats.resolvedFeedbacks / stats.totalFeedbacks) * 100)}%`}
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="bg-accent-500 h-2 rounded-full" style={{ width: `${Math.round((stats.resolvedFeedbacks / stats.totalFeedbacks) * 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
