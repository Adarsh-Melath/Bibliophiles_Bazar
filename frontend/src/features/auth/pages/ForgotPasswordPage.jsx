import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, Lock, Key, HelpCircle, Send, AlertCircle, CheckCircle2, Loader } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import api from '../../../lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema } from '../schemas/authSchemas'
import { useForm } from 'react-hook-form'

const FLOATING_MARKS = [
  { top: '15%', left: '10%', delay: '0s', size: 20 },
  { top: '25%', right: '12%', delay: '1s', size: 16 },
  { top: '60%', left: '8%', delay: '2s', size: 14 },
  { top: '70%', right: '10%', delay: '0.5s', size: 18 },
  { top: '40%', left: '5%', delay: '1.5s', size: 12 },
  { top: '45%', right: '6%', delay: '2.5s', size: 15 },
]

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [canResend, setCanResend] = useState(true)
  const [resendCountdown, setResendCountdown] = useState(0)

  const { mutate: sendOtp, isPending, error } = useMutation({
    mutationFn: (emailData) => api.post('/auth/forgot-password', { email: emailData }),
    onSuccess: () => {
      setSent(true)
      setCanResend(false)
      setResendCountdown(60)
      
      // Start countdown for resend button
      const interval = setInterval(() => {
        setResendCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    },
  })

  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange'
  })

  const emailValue = watch('email')

  const onSubmit = (data) => {
    sendOtp(data.email)
    setEmail(data.email)
  }

  return (
    <div className="h-screen overflow-hidden flex bg-background">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #6b9060 0%, #9CAF88 50%, #b5c9a3 100%)' }}>

        {/* Background glow */}
        <div className="absolute pointer-events-none"
          style={{
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 65%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }} />

        {/* Floating question marks */}
        {FLOATING_MARKS.map((mark, i) => (
          <div key={i} className="absolute text-white/20"
            style={{
              ...mark,
              animation: `float ${6 + i}s ease-in-out infinite`,
              animationDelay: mark.delay,
            }}>
            <HelpCircle size={mark.size} />
          </div>
        ))}

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-16">

          {/* Lock + Key animation */}
          <div className="relative flex items-center justify-center mb-10"
            style={{ animation: 'floatSlow 6s ease-in-out infinite' }}>

            {/* Outer glow ring */}
            <div className="absolute w-36 h-36 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                animation: 'shimmer 3s ease-in-out infinite',
              }} />

            {/* Lock circle */}
            <div className="w-28 h-28 rounded-full bg-white/15 border-2 border-white/40
                            flex items-center justify-center backdrop-blur-sm relative">
              <Lock size={44} className="text-white" strokeWidth={1.5} />

              {/* Key orbiting the lock */}
              <div className="absolute"
                style={{
                  animation: 'orbit 4s linear infinite',
                  transformOrigin: '0 0',
                  top: '50%',
                  left: '50%',
                }}>
                <div style={{ transform: 'translate(52px, -52px)' }}>
                  <Key size={22} className="text-white/80" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6 w-full justify-center">
            <div className="flex-1 max-w-14 h-px bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="flex-1 max-w-14 h-px bg-white/30" />
          </div>

          {/* Quote */}
          <p className="font-body text-base italic leading-relaxed max-w-xs text-white/80">
            "The key to every door is<br />remembering where you left it."
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md" style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>

          {/* Back link */}
          <Link to="/login"
            className="flex items-center gap-2 text-sm font-body text-heading-muted
                       hover:text-heading transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Login
          </Link>

          {!sent ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Key size={26} className="text-primary" />
                </div>
                <h2 className="font-heading text-3xl text-heading font-bold mb-2">
                  Forgot Password?
                </h2>
                <p className="font-body text-heading-muted text-sm">
                  No worries. Enter your email and we'll send you a reset code within seconds.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl mb-6 p-4 flex gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-sm font-semibold text-red-900">
                      {error.response?.status === 404 ? 'Email not found' : 'Error'}
                    </p>
                    <p className="font-body text-xs text-red-700 mt-1">
                      {error.response?.data?.error || error.message || 'Something went wrong. Please try again.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl mb-6 p-4 flex gap-3">
                <HelpCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="font-body text-xs text-blue-900">
                  We'll send a 6-digit reset code to your email. Check your spam folder if you don't see it.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email input */}
                <div className="mb-6">
                  <label className="font-body text-sm text-heading font-medium mb-2 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="you@example.com"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white
                                 font-body text-heading placeholder-accent
                                 focus:outline-none focus:ring-2 focus:ring-primary
                                 transition-all duration-200 ${
                                   errors.email ? 'border-red-300' : 'border-accent'
                                 }`}
                    />
                    <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                    
                    {/* Email validation check */}
                    {emailValue && !errors.email && (
                      <CheckCircle2 size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                    )}

                    {errors.email && (
                      <AlertCircle size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500" />
                    )}
                  </div>
                  
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button type="submit"
                  disabled={isPending || !isValid}
                  className="w-full py-3 rounded-xl bg-primary text-white font-button
                           font-semibold tracking-wide hover:bg-primary-dark
                           active:scale-95 transition-all duration-200
                           disabled:opacity-60 disabled:cursor-not-allowed shadow-sm
                           flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader size={17} className="animate-spin" />
                      Sending Code...
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Send Reset Code
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h2 className="font-heading text-2xl text-heading font-bold mb-2">
                  Reset Code Sent!
                </h2>
                <p className="font-body text-heading-muted text-sm mb-2">
                  We sent a reset code to
                </p>
                <p className="font-body text-heading font-semibold text-lg mb-1">{email}</p>
                <p className="font-body text-heading-muted text-xs">
                  Code expires in 5 minutes
                </p>
              </div>

              {/* Email Tips */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl mb-6 p-4 flex gap-3">
                <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-xs font-semibold text-yellow-900 mb-2">Tips:</p>
                  <ul className="font-body text-xs text-yellow-800 space-y-1 list-disc list-inside">
                    <li>Check your spam/promotions folder</li>
                    <li>Code is valid for 5 minutes only</li>
                    <li>You can request a new code if needed</li>
                  </ul>
                </div>
              </div>

              <Link to={`/verify-reset-otp?email=${encodeURIComponent(email)}`}
                className="w-full py-3 rounded-xl bg-primary text-white font-button
                           font-semibold tracking-wide hover:bg-primary-dark
                           active:scale-95 transition-all duration-200 shadow-sm
                           flex items-center justify-center gap-2 mb-3">
                <Key size={17} />
                Enter Reset Code
              </Link>

              <button
                onClick={() => {
                  setSent(false)
                  setEmail('')
                }}
                className="w-full py-2 rounded-xl border-2 border-primary text-primary font-button
                           font-semibold tracking-wide hover:bg-primary/5
                           active:scale-95 transition-all duration-200
                           flex items-center justify-center gap-2">
                <Mail size={17} />
                Use Different Email
              </button>

              {/* Resend Section */}
              <div className="mt-6 pt-6 border-t border-accent">
                <p className="font-body text-xs text-heading-muted text-center mb-3">
                  Didn't receive the code?
                </p>
                <button
                  onClick={() => sendOtp(email)}
                  disabled={!canResend || isPending}
                  title={!canResend ? `Resend available in ${resendCountdown}s` : ''}
                  className="w-full py-2 rounded-xl border-2 border-primary text-primary font-button
                             font-semibold tracking-wide hover:bg-primary/5
                             active:scale-95 transition-all duration-200
                             disabled:opacity-60 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {isPending ? 'Resending...' : canResend ? 'Resend Code' : `Resend in ${resendCountdown}s`}
                </button>
              </div>
            </div>
          )}

          {/* Bottom Links */}
          {!sent && (
            <p className="font-body text-sm text-heading-muted text-center mt-8">
              Remember your password?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Login
              </Link>
            </p>
          )}

        </div>
      </div>

    </div>
  )
}
