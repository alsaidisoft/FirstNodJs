'use client'

import { useEffect, useState } from 'react'
import { BarChart3, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

interface StatItem {
  title: string
  value: string
  icon: any
  color: string
  bgColor: string
}

export default function Statistics() {
  const [stats, setStats] = useState<StatItem[]>([
    {
      title: 'Total Reports',
      value: '1,234',
      icon: BarChart3,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100'
    },
    {
      title: 'Resolved Issues',
      value: '892',
      icon: CheckCircle,
      color: 'text-success-600',
      bgColor: 'bg-success-100'
    },
    {
      title: 'In Progress',
      value: '267',
      icon: Clock,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100'
    },
    {
      title: 'Pending Review',
      value: '75',
      icon: AlertTriangle,
      color: 'text-accent-600',
      bgColor: 'bg-accent-100'
    },
  ])

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Platform Statistics
          </h2>
          <p className="text-lg text-secondary-600 mb-12 max-w-2xl mx-auto">
            See how our platform is making a difference in communities
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className="card hover:shadow-card transition-shadow duration-300 group"
              >
                <div className="flex items-center">
                  <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-secondary-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-secondary-600">
                      {stat.title}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
