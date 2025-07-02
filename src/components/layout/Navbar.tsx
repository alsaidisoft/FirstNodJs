'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, MessageSquare, User, Bell } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Submit Feedback', href: '/submit' },
    { name: 'View Reports', href: '/reports' },
    { name: 'About', href: '/about' },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-secondary-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-secondary-900">
                CitizenVoice
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth & Notifications */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error-500 ring-2 ring-white"></span>
            </button>
            <Link
              href="/login"
              className="flex items-center space-x-1 text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Link>
            <Link
              href="/submit"
              className="btn-primary text-sm"
            >
              Submit Feedback
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-secondary-600 hover:text-primary-600 hover:bg-secondary-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-secondary-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-secondary-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-secondary-200 pt-4 mt-4">
              <Link
                href="/login"
                className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link
                href="/submit"
                className="block mt-2 mx-3 btn-primary text-center text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Submit Feedback
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
