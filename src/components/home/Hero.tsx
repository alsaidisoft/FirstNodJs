'use client'

import Link from 'next/link'
import { ArrowRight, MapPin, Users, TrendingUp } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-secondary-600/5"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-secondary-900">
              <span className="block">Your Voice,</span>
              <span className="block text-gradient">Your Community</span>
            </h1>
            
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-secondary-600 leading-relaxed">
              Submit feedback, suggestions, and complaints to local authorities. 
              Help improve your community by reporting issues and tracking their progress.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/submit"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 group"
              >
                <span>Submit Feedback</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link
                href="/reports"
                className="btn-secondary text-lg px-8 py-4"
              >
                View Reports
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl group-hover:bg-primary-200 transition-colors duration-200">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-secondary-900">
                  Location-Based
                </h3>
                <p className="mt-2 text-secondary-600">
                  Report issues with precise location mapping
                </p>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-success-100 rounded-xl group-hover:bg-success-200 transition-colors duration-200">
                  <Users className="h-6 w-6 text-success-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-secondary-900">
                  Community Driven
                </h3>
                <p className="mt-2 text-secondary-600">
                  Connect with fellow citizens and authorities
                </p>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-xl group-hover:bg-accent-200 transition-colors duration-200">
                  <TrendingUp className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-secondary-900">
                  Track Progress
                </h3>
                <p className="mt-2 text-secondary-600">
                  Monitor status updates and responses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
