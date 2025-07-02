'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, MapPin, Calendar, User, MessageSquare } from 'lucide-react'
import { Feedback, FeedbackStatus } from '@/types'
import { feedbackAPI } from '@/lib/api'
import { formatRelativeTime, getStatusColor, capitalizeFirst } from '@/lib/utils'

export default function ReportsPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const categories = [
    'Infrastructure',
    'Public Safety',
    'Environment',
    'Transportation',
    'Healthcare',
    'Education',
    'Utilities',
    'Social Services',
    'Other'
  ]

  const statuses = [
    'PENDING',
    'UNDER_REVIEW',
    'IN_PROGRESS',
    'RESOLVED',
    'REJECTED',
    'CLOSED'
  ]

  useEffect(() => {
    fetchFeedbacks()
  }, [currentPage, selectedCategory, selectedStatus])

  const fetchFeedbacks = async () => {
    try {
      setLoading(true)
      const response = await feedbackAPI.getAll({
        page: currentPage,
        limit: 10,
        category: selectedCategory || undefined,
        status: selectedStatus || undefined
      })
      
      if (response.success && response.data) {
        setFeedbacks(response.data.items)
      }
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Community Reports</h1>
              <p className="mt-1 text-secondary-600">
                View and track feedback submissions from the community
              </p>
            </div>
            <Link
              href="/submit"
              className="mt-4 sm:mt-0 btn-primary"
            >
              Submit New Feedback
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field sm:w-48"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-field sm:w-48"
          >
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {capitalizeFirst(status.replace('_', ' '))}
              </option>
            ))}
          </select>
        </div>

        {/* Reports Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-4 bg-secondary-200 rounded mb-4"></div>
                <div className="h-3 bg-secondary-200 rounded mb-2"></div>
                <div className="h-3 bg-secondary-200 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-20 bg-secondary-200 rounded"></div>
                  <div className="h-4 w-16 bg-secondary-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeedbacks.map((feedback) => (
              <Link
                key={feedback.id}
                href={`/reports/${feedback.id}`}
                className="card hover:shadow-card transition-shadow duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                    {capitalizeFirst(feedback.status.replace('_', ' '))}
                  </span>
                  <span className="text-xs text-secondary-500">
                    {formatRelativeTime(feedback.createdAt)}
                  </span>
                </div>

                <h3 className="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {feedback.title}
                </h3>

                <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
                  {feedback.description}
                </p>

                <div className="flex items-center justify-between text-xs text-secondary-500">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {feedback.category}
                    </span>
                    {feedback.location && (
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        Location
                      </span>
                    )}
                  </div>
                  {!feedback.isAnonymous && feedback.user && (
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {feedback.user.name || 'User'}
                    </span>
                  )}
                </div>

                {feedback.images && feedback.images.length > 0 && (
                  <div className="mt-3 flex -space-x-1">
                    {feedback.images.slice(0, 3).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Attachment ${index + 1}`}
                        className="h-8 w-8 rounded border-2 border-white object-cover"
                      />
                    ))}
                    {feedback.images.length > 3 && (
                      <div className="h-8 w-8 rounded border-2 border-white bg-secondary-100 flex items-center justify-center text-xs text-secondary-600">
                        +{feedback.images.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredFeedbacks.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">
              No reports found
            </h3>
            <p className="text-secondary-600 mb-4">
              {searchTerm || selectedCategory || selectedStatus
                ? 'Try adjusting your filters to see more results.'
                : 'Be the first to submit feedback to help improve the community.'}
            </p>
            <Link href="/submit" className="btn-primary">
              Submit Feedback
            </Link>
          </div>
        )}

        {/* Pagination would go here */}
      </div>
    </div>
  )
}
