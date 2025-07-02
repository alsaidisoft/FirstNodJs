import { Shield, Smartphone, Globe, Zap } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Anonymous',
      description: 'Your privacy is protected with secure, anonymous reporting options and data encryption.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Fully responsive design that works seamlessly on mobile devices and tablets.'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Available in multiple languages including Arabic and English for better accessibility.'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Get instant notifications when authorities respond to your feedback or update status.'
    }
  ]

  return (
    <div className="py-16 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-secondary-600 mb-12 max-w-2xl mx-auto">
            Built with modern technology and user experience in mind
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-soft group-hover:shadow-card transition-shadow duration-300 mb-6">
                  <IconComponent className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
