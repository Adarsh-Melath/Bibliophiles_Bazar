import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { BookOpen, Building2, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react'
import api from '../../../lib/axios'
import { vendorSignUpSchema } from '../schemas/vendorSchemas'

const categories = [
  'Fiction', 'Non-Fiction', 'Science', 'Technology',
  'Self-Help', 'Business', 'History', 'Children', 'Academic', 'Comics',
]


const STEP1_FIELDS = ['name', 'email', 'phone']
const STEP2_FIELDS = ['businessName', 'businessRegistrationNumber', 'website', 'publishingSince', 'businessDescription', 'category']

export default function VendorApplyPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({ resolver: zodResolver(vendorSignUpSchema) })

  const { mutate: apply, isPending, error } = useMutation({
    mutationFn: (data) => api.post('/vendor/apply', data),
    onSuccess: () => setSubmitted(true),
  })

  const handleNext = async () => {
    const valid = await trigger(STEP1_FIELDS)
    if (valid) setStep(2)
  }

  const onSubmit = (data) => apply(data)

  // ── Success state ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#EFEBE9] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="h-1 bg-[#9CAF88]" />
          <div className="px-8 py-14 text-center space-y-5">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-[#9CAF88]" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-[#548C8C]">Application Submitted!</h1>
            <p className="text-sm text-[#9CAF88] leading-6">
              Thank you for applying to become a publisher on Bibliophile's Bazar.
              We'll review your application and get back to you via email within 3–5 business days.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 rounded-lg bg-[#9CAF88] hover:bg-[#8FA078] text-white font-semibold text-sm transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Form ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#EFEBE9] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="h-1 bg-[#9CAF88]" />

        <div className="px-8 py-10">
          {/* Icon + header */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center">
              {step === 1
                ? <BookOpen className="w-8 h-8 text-[#548C8C]" strokeWidth={1.5} />
                : <Building2 className="w-8 h-8 text-[#548C8C]" strokeWidth={1.5} />
              }
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[#548C8C] text-center mb-1">
            Become a Publisher
          </h1>
          <p className="text-sm text-[#9CAF88] text-center mb-6">
            {step === 1 ? 'Step 1 of 2 — Contact Information' : 'Step 2 of 2 — Publisher Details'}
          </p>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`flex-1 h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-[#9CAF88]' : 'bg-[#E8F4F8]'}`} />
            <div className={`flex-1 h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-[#9CAF88]' : 'bg-[#E8F4F8]'}`} />
          </div>

          {/* API error */}
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2 rounded-lg">
              {error.response?.data?.error || 'Something went wrong. Please try again.'}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* ── Step 1 ── */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                    Contact Person Name
                  </label>
                  <input
                    {...register('name')}
                    placeholder="e.g. John Smith"
                    className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all"
                  />
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                    Business Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="e.g. partnerships@yourpublisher.com"
                    className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all"
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="e.g. +1 555 234 5678"
                    className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all"
                  />
                  {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3 rounded-lg bg-[#9CAF88] hover:bg-[#8FA078] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  Next <ChevronRight size={16} />
                </button>
              </>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                    Publishing House Name
                  </label>
                  <input
                    {...register('businessName')}
                    placeholder="e.g. Penguin Random House"
                    className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all"
                  />
                  {errors.businessName && <p className="text-red-600 text-xs mt-1">{errors.businessName.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                    Business Registration Number
                  </label>
                  <input
                    {...register('businessRegistrationNumber')}
                    placeholder="e.g. U22110MH1985PTC036347"
                    className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all"
                  />
                  {errors.businessRegistrationNumber && <p className="text-red-600 text-xs mt-1">{errors.businessRegistrationNumber.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                      Official Website
                    </label>
                    <input
                      {...register('website')}
                      placeholder="https://yourpublisher.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all"
                    />
                    {errors.website && <p className="text-red-600 text-xs mt-1">{errors.website.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                      Publishing Since
                    </label>
                    <input
                      {...register('publishingSince')}
                      placeholder="e.g. 1935"
                      maxLength={4}
                      className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all"
                    />
                    {errors.publishingSince && <p className="text-red-600 text-xs mt-1">{errors.publishingSince.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                    Primary Category
                  </label>
                  <select
                    {...register('category')}
                    className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                    About Your Publishing House
                  </label>
                  <textarea
                    {...register('businessDescription')}
                    rows={3}
                    placeholder="Tell us about your publishing house, the genres you specialize in, and why you want to partner with Bibliophile's Bazar..."
                    className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all resize-none"
                  />
                  {errors.businessDescription && <p className="text-red-600 text-xs mt-1">{errors.businessDescription.message}</p>}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-lg border border-[#D7CCC8] text-[#548C8C] font-semibold text-sm transition-all hover:bg-[#F5F5F5] flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 py-3 rounded-lg bg-[#9CAF88] hover:bg-[#8FA078] text-white font-semibold text-sm transition-all disabled:opacity-60"
                  >
                    {isPending ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="text-center mt-6">
            <p className="text-xs text-[#9CAF88]">
              Already a vendor?{' '}
              <Link to="/login" className="text-[#548C8C] font-medium hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>

        <div className="bg-[#F9F9F9] px-8 py-4 border-t border-[#D7CCC8] text-center">
          <p className="text-xs text-[#9CAF88]">
            Applications are reviewed within 3–5 business days.
          </p>
        </div>
      </div>
    </div>
  )
}
