'use client'

import Link from 'next/link'
import { CheckCircle, Home, MessageSquare, ArrowRight } from 'lucide-react'

export default function FeedbackSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-success-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-success-100 mb-6">
            <CheckCircle className="h-12 w-12 text-success-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">
            Feedback Submitted Successfully!
          </h1>
          
          <p className="text-lg text-secondary-600 mb-8">
            Thank you for your submission. Your feedback helps us improve our community services.
          </p>
        </div>

        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            What happens next?
          </h2>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-primary-600 text-sm font-medium">1</span>
              </div>
              <div>
                <h3 className="font-medium text-secondary-900">Review Process</h3>
                <p className="text-sm text-secondary-600">
                  Your feedback will be reviewed by the relevant department within 2-3 business days.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-primary-600 text-sm font-medium">2</span>
              </div>
              <div>
                <h3 className="font-medium text-secondary-900">Status Updates</h3>
                <p className="text-sm text-secondary-600">
                  You&apos;ll receive notifications about status changes and responses from authorities.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-primary-600 text-sm font-medium">3</span>
              </div>
              <div>
                <h3 className="font-medium text-secondary-900">Resolution</h3>
                <p className="text-sm text-secondary-600">
                  We&apos;ll work to address your feedback and keep you informed throughout the process.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/reports"
            className="w-full btn-primary inline-flex items-center justify-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>View All Reports</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          
          <Link
            href="/"
            className="w-full btn-secondary inline-flex items-center justify-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-800">
            <strong>Need urgent assistance?</strong> For emergencies, please contact your local emergency services directly.
          </p>
        </div>
      </div>
    </div>
  )
}
