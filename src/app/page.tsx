import React from 'react'
import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Statistics from '@/components/home/Statistics'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Citizen Feedback Platform - Home',
  description: 'Submit feedback, suggestions, and complaints to local authorities. Help improve your community.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Statistics />
      <Features />
      <Footer />
    </main>
  )
}
