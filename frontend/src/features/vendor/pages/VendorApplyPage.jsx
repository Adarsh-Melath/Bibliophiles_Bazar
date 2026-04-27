import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { BookOpen, Building2, ChevronRight, ChevronLeft, CheckCircle, ShieldCheck, XCircle } from 'lucide-react'
import api from '../../../lib/axios'
import { vendorSignUpSchema } from '../schemas/vendorSchemas'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [status, setStatus] = useState('pending'); // 'pending' // 'approved' //rejected


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

  if (submitted) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--shelf) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm library-panel p-10 text-center space-y-6 relative z-10 shadow-shelf"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center border transition-colors duration-500">
              {status === 'pending' && (
                <div className="w-full h-full bg-burgundy/5 rounded-full flex items-center justify-center border-burgundy/10">
                  <CheckCircle className="w-8 h-8 text-burgundy" strokeWidth={1} />
                </div>
              )}
              {status === 'approved' && (
                <div className="w-full h-full bg-emerald-50 rounded-full flex items-center justify-center border-emerald-200">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" strokeWidth={1} />
                </div>
              )}
              {status === 'rejected' && (
                <div className="w-full h-full bg-red-50 rounded-full flex items-center justify-center border-red-200">
                  <XCircle className="w-8 h-8 text-red-600" strokeWidth={1} />
                </div>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-heading font-bold text-shelf mb-2">
              {status === 'pending' && 'Application Pending'}
              {status === 'approved' && 'Registry Approved!'}
              {status === 'rejected' && 'Review Denied'}
            </h1>
            <p className="text-xs font-body text-shelf/50 leading-relaxed px-2 italic">
              {status === 'pending' && "Your registry entry is currently under curation. We will verify your credentials shortly."}
              {status === 'approved' && "Welcome! We've dispatched your temporary password to your email. Check your inbox to begin."}
              {status === 'rejected' && "Unfortunately, your application does not align with our current collection standards."}
            </p>

            {status === 'rejected' && (
              <div className="mt-4 p-3 bg-red-50/50 border border-red-100 rounded-sm">
                <p className="text-[10px] font-ui font-bold uppercase text-red-800 tracking-widest mb-1">Reason for Rejection</p>
                <p className="text-[11px] font-body text-red-600 italic">"The provided business documentation was insufficient for our verification process."</p>
              </div>
            )}
          </div>

          <div className="pt-2">
            {status === 'pending' && (
              <button disabled className="w-full library-button py-3 text-[9px] opacity-50 cursor-not-allowed bg-shelf">
                Awaiting Verification...
              </button>
            )}
            {status === 'approved' && (
              <button
                onClick={() => navigate('/vendor/login')}
                className="w-full library-button py-4 text-[10px] bg-burgundy hover:bg-shelf shadow-lg active:scale-95 transition-all"
              >
                Go to Login
              </button>
            )}
            {status === 'rejected' && (
              <button onClick={() => setSubmitted(false)} className="w-full library-button py-4 text-[10px] bg-shelf hover:bg-burgundy transition-all">
                Resubmit Catalog
              </button>
            )}
          </div>
        </motion.div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4 relative overflow-hidden selection:bg-burgundy/10">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--shelf) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="library-panel overflow-hidden border-shelf/10 shadow-shelf">
          <div className="h-1 w-full bg-burgundy" />

          <div className="px-8 py-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-shelf text-paper rounded-sm flex items-center justify-center shadow-lg mb-3">
                {step === 1
                  ? <BookOpen className="w-6 h-6" />
                  : <Building2 className="w-6 h-6" />
                }
              </div>
              <span className="font-ui text-[8px] uppercase font-bold tracking-[0.4em] text-burgundy mb-1">Portal Application</span>
              <h1 className="font-heading text-2xl font-bold text-shelf">Partner Registry</h1>
              <div className="h-0.5 w-8 bg-burgundy/30 mt-1.5" />
            </div>

            {/* Step Indicators */}
            <div className="flex items-center gap-2 mb-6 px-4">
              <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-burgundy' : 'bg-shelf/10'}`} />
              <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-burgundy' : 'bg-shelf/10'}`} />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30 mb-1.5">Direct Name</label>
                      <input
                        {...register('name')}
                        placeholder="Legal Full Name"
                        className="w-full px-4 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 focus:ring-0 transition-all font-body text-sm text-shelf outline-none rounded-sm shadow-inner"
                      />
                      {errors.name && <p className="text-burgundy text-[8px] font-bold uppercase mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30 mb-1.5">Email Contact</label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="business@email.com"
                        className="w-full px-4 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 focus:ring-0 transition-all font-body text-sm text-shelf outline-none rounded-sm shadow-inner"
                      />
                      {errors.email && <p className="text-burgundy text-[8px] font-bold uppercase mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30 mb-1.5">Phone Line</label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+91 00000 00000"
                        className="w-full px-4 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 focus:ring-0 transition-all font-body text-sm text-shelf outline-none rounded-sm shadow-inner"
                      />
                      {errors.phone && <p className="text-burgundy text-[8px] font-bold uppercase mt-1">{errors.phone.message}</p>}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full library-button py-4 text-[10px] flex items-center justify-center gap-2 group"
                      >
                        Next Stage <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30 mb-1.5">Business Entity</label>
                      <input
                        {...register('businessName')}
                        placeholder="Registered Name"
                        className="w-full px-4 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 focus:ring-0 transition-all font-body text-sm text-shelf outline-none rounded-sm shadow-inner"
                      />
                      {errors.businessName && <p className="text-burgundy text-[8px] font-bold uppercase mt-1">{errors.businessName.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30 mb-1.5">Business Number</label>
                        <input
                          {...register('businessRegistrationNumber')}
                          placeholder="ID Number"
                          className="w-full px-4 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 focus:ring-0 transition-all font-body text-sm text-shelf outline-none rounded-sm shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30 mb-1.5">Launch Year</label>
                        <input
                          {...register('publishingSince')}
                          placeholder="e.g. 2024"
                          className="w-full px-4 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 focus:ring-0 transition-all font-body text-sm text-shelf outline-none rounded-sm shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30 mb-1.5">Catalog Category</label>
                        <select
                          {...register('category')}
                          className="w-full px-4 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 focus:ring-0 transition-all font-body text-xs text-shelf outline-none rounded-sm shadow-inner appearance-none cursor-pointer"
                        >
                          <option value="">Select Category</option>
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30 mb-1.5">Official Website</label>
                        <input
                          {...register('website')}
                          placeholder="https://..."
                          className="w-full px-4 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 focus:ring-0 transition-all font-body text-sm text-shelf outline-none rounded-sm shadow-inner"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30 mb-1.5">Brief Synopsis</label>
                      <textarea
                        {...register('businessDescription')}
                        rows={2}
                        placeholder="Describe your library..."
                        className="w-full px-4 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 focus:ring-0 transition-all font-body text-sm text-shelf outline-none rounded-sm resize-none shadow-inner"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 library-button-secondary py-4 text-[10px]"
                      >
                        Previous
                      </button>
                      <button
                        type="submit"
                        disabled={isPending}
                        className="flex-[2] library-button py-4 text-[10px] relative overflow-hidden"
                      >
                        {isPending ? 'Processing...' : 'Complete Registry'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="text-center mt-6 p-4 border-t border-shelf/5">
              <p className="font-ui text-[9px] font-bold text-shelf/30 uppercase tracking-[0.2em] flex items-center justify-center gap-1.5">
                Existing Partner?{' '}
                <Link to="/login" className="text-burgundy hover:text-shelf transition-colors">Enter here</Link>
              </p>
            </div>
          </div>

          <div className="bg-shelf/5 px-8 py-2 border-t border-shelf/5 text-center flex items-center justify-center gap-2">
            <ShieldCheck size={11} className="text-burgundy/40" />
            <p className="font-ui text-[8px] text-shelf/30 font-bold uppercase tracking-[0.3em]">
              Registry Secured • Bibliophile's Bazar
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
