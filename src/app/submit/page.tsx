'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MapPin, Upload, X } from 'lucide-react'
import { feedbackAPI } from '@/lib/api'
import toast from 'react-hot-toast'

const schema = yup.object({
  title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
  description: yup.string().required('Description is required').min(20, 'Description must be at least 20 characters'),
  category: yup.string().required('Category is required'),
  location: yup.object({
    address: yup.string().optional(),
    lat: yup.number().optional(),
    lng: yup.number().optional()
  }).optional(),
  images: yup.mixed().required(),
  isAnonymous: yup.boolean().default(false)
})

})

interface FeedbackForm {
  title: string
  description: string
  category: string
  location?: {
    address?: string
    lat?: number
    lng?: number
  }
  images: File[]
  isAnonymous: boolean
}

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

export default function SubmitFeedbackPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [location, setLocation] = useState<{address: string, lat: number, lng: number} | null>(null)

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FeedbackForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      isAnonymous: false
    }
  })

  const isAnonymous = watch('isAnonymous')

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return
    
    const newImages = Array.from(files).slice(0, 5) // Max 5 images
    setSelectedImages(prev => [...prev, ...newImages].slice(0, 5))
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        // In a real app, you'd reverse geocode to get the address
        const mockAddress = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
        
        const locationData = {
          address: mockAddress,
          lat: latitude,
          lng: longitude
        }
        
        setLocation(locationData)
        setValue('location', locationData)
        toast.success('Location added successfully')
      },
      (error) => {
        toast.error('Error getting location: ' + error.message)
      }
    )
  }

  const onSubmit = async (data: FeedbackForm) => {
    setIsSubmitting(true)
    
    try {
      // In a real app, you'd upload images to Cloudinary first
      const imageUrls: string[] = []
      
      const feedbackData = {
        ...data,
        images: imageUrls,
        location: location
      }

      const response = await feedbackAPI.create(feedbackData)

      if (response.success) {
        toast.success('Feedback submitted successfully!')
        router.push('/submit/success')
      } else {
        toast.error('Failed to submit feedback')
      }
    } catch (error) {
      toast.error('An error occurred while submitting feedback')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Submit Feedback</h1>
          <p className="mt-2 text-secondary-600">
            Help improve your community by reporting issues and sharing suggestions
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">
              Feedback Details
            </h2>
            
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="title" className="label">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  {...register('title')}
                  className="input-field"
                  placeholder="Brief description of the issue"
                />
                {errors.title && (
                  <p className="error-text">{errors.title.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="label">
                  Category *
                </label>
                <select
                  id="category"
                  {...register('category')}
                  className="input-field"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="error-text">{errors.category.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="label">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register('description')}
                  className="input-field"
                  placeholder="Provide detailed information about the issue..."
                />
                {errors.description && (
                  <p className="error-text">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">
              Location (Optional)
            </h2>
            
            <div className="space-y-4">
              <button
                type="button"
                onClick={getCurrentLocation}
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <MapPin className="h-4 w-4" />
                <span>Use Current Location</span>
              </button>
              
              {location && (
                <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
                  <p className="text-sm text-primary-800">
                    <strong>Location:</strong> {location.address}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">
              Images (Optional)
            </h2>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-secondary-400 mx-auto mb-2" />
                <p className="text-sm text-secondary-600 mb-2">
                  Drop images here or click to upload
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="btn-secondary text-sm cursor-pointer"
                >
                  Choose Files
                </label>
                <p className="text-xs text-secondary-500 mt-1">
                  Maximum 5 images, up to 10MB each
                </p>
              </div>
              
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-error-500 text-white rounded-full p-1 hover:bg-error-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Privacy */}
          <div className="card">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isAnonymous"
                {...register('isAnonymous')}
                className="h-4 w-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="isAnonymous" className="text-sm text-secondary-700">
                Submit anonymously (your identity will not be shared)
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
