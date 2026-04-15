import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Shield, Clock, RefreshCw } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import api from '../../../lib/axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { resetPasswordSchema } from '../schemas/authSchemas'

const FLOATING_MARKS = [
  { top: '15%', left: '10%', delay: '0s', size: 20 },
  { top: '25%', right: '12%', delay: '1s', size: 16 },
  { top: '60%', left: '8%', delay: '2s', size: 14 },
  { top: '70%', right: '10%', delay: '0.5s', size: 18 },
  { top: '40%', left: '5%', delay: '1.5s', size: 12 },
  { top: '45%', right: '6%', delay: '2.5s', size: 15 },
]

export default function VerifyResetOtpPage() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const navigate = useNavigate()

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(60) // 1 minutes
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef([])

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])

  // Verify OTP mutation
  const { mutate: verifyOtp, isPending: isVerifying, error: verifyError } = useMutation({
    mutationFn: () => {
      const otpCode = otp.join('')
      return api.post('/auth/verify-reset-otp', {
        email,
        code: otpCode,
      })
    },
    onSuccess: (response) => {
      const resetToken = response.data.resetToken
      navigate(`/reset-password?email=${encodeURIComponent(email)}&resetToken=${encodeURIComponent(resetToken)}&verified=true`)
    },
  })

  // Resend OTP mutation
  const { mutate: resendOtp, isPending: isResendingOtp, error: resendError } = useMutation({
    mutationFn: () => api.post('/auth/forgot-password', { email }),
    onSuccess: () => {
      setTimeLeft(300)
      setOtp(['', '', '', '', '', ''])
      setIsResending(false)
      inputRefs.current[0]?.focus()
    },
  })

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp]

    if (value.length > 1) {
      // Handle paste
      const pastedOtp = value.slice(0, 6 - index).split('')
      for (let i = 0; i < pastedOtp.length; i++) {
        if (index + i < 6) {
          newOtp[index + i] = pastedOtp[i]
        }
      }
      setOtp(newOtp)

      // Move focus to the last filled input
      const nextEmptyIndex = newOtp.findIndex(digit => !digit)
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
      inputRefs.current[focusIndex]?.focus()
    } else {
      newOtp[index] = value.replace(/\D/g, '') // Only digits

      if (newOtp[index] && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }

      setOtp(newOtp)
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = async (e) => {
    e.preventDefault()
    try {
      const pastedText = await navigator.clipboard.readText()
      const digits = pastedText.replace(/\D/g, '').slice(0, 6).split('')
      
      const newOtp = [...otp]
      digits.forEach((digit, i) => {
        if (i < 6) {
          newOtp[i] = digit
        }
      })
      
      setOtp(newOtp)
      
      // Focus on the last filled field or the next empty field
      const nextEmptyIndex = newOtp.findIndex(d => !d)
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
      setTimeout(() => inputRefs.current[focusIndex]?.focus(), 0)
    } catch (err) {
      // Silently fail if clipboard access is denied
    }
  }

  const isOtpComplete = otp.every(digit => digit !== '')
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isExpired = timeLeft === 0

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

        {/* Floating shields */}
        {FLOATING_MARKS.map((mark, i) => (
          <div key={i} className="absolute text-white/20"
            style={{
              ...mark,
              animation: `float ${6 + i}s ease-in-out infinite`,
              animationDelay: mark.delay,
            }}>
            <Shield size={mark.size} />
          </div>
        ))}

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-16">

          {/* Shield animation */}
          <div className="relative flex items-center justify-center mb-10"
            style={{ animation: 'floatSlow 6s ease-in-out infinite' }}>

            {/* Outer glow ring */}
            <div className="absolute w-36 h-36 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                animation: 'shimmer 3s ease-in-out infinite',
              }} />

            {/* Shield circle */}
            <div className="w-28 h-28 rounded-full bg-white/15 border-2 border-white/40
                            flex items-center justify-center backdrop-blur-sm relative">
              <Shield size={44} className="text-white" strokeWidth={1.5} />
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
            "Your security is our priority.<br />One code away from safety."
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md" style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>

          {/* Back link */}
          <Link to="/forgot-password"
            className="flex items-center gap-2 text-sm font-body text-heading-muted
                       hover:text-heading transition-colors mb-8">
            <ArrowLeft size={16} />
            Back
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Shield size={26} className="text-primary" />
            </div>
            <h2 className="font-heading text-3xl text-heading font-bold mb-2">
              Verify Reset Code
            </h2>
            <p className="font-body text-heading-muted text-sm">
              Enter the 6-digit code sent to <span className="font-semibold text-heading">{email}</span>
            </p>
          </div>

          {/* Error */}
          {(verifyError || resendError) && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              {verifyError?.response?.data?.error || resendError?.response?.data?.error || 'Something went wrong'}
            </div>
          )}

          {/* OTP Inputs */}
          <div className="mb-6">
            <label className="font-body text-sm text-heading font-medium mb-4 block">
              Reset Code
            </label>
            <div className="flex gap-3 justify-center mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={e => handleOtpChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={isExpired || isVerifying}
                  className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2
                             border-accent bg-white text-heading placeholder-accent
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                             transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="•"
                />
              ))}
            </div>
          </div>

          {/* Timer */}
          <div className={`flex items-center justify-center gap-2 text-sm mb-6 font-body ${isExpired ? 'text-red-500' : 'text-heading-muted'}`}>
            <Clock size={16} />
            {isExpired ? (
              <span className="font-semibold">Code expired</span>
            ) : (
              <span>
                Code expires in <span className="font-semibold">{minutes}:{seconds.toString().padStart(2, '0')}</span>
              </span>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={() => verifyOtp()}
            disabled={!isOtpComplete || isVerifying || isExpired}
            className="w-full py-3 rounded-xl bg-primary text-white font-button
                       font-semibold tracking-wide hover:bg-primary-dark
                       active:scale-95 transition-all duration-200
                       disabled:opacity-60 disabled:cursor-not-allowed shadow-sm
                       flex items-center justify-center gap-2"
          >
            <Shield size={17} />
            {isVerifying ? 'Verifying...' : 'Verify Code'}
          </button>

          {/* Resend section */}
          <div className="mt-6 pt-6 border-t border-accent">
            <p className="font-body text-sm text-heading-muted text-center mb-3">
              Didn't receive the code?
            </p>
            <button
              onClick={() => {
                setIsResending(true)
                resendOtp()
              }}
              disabled={timeLeft > 0 || isResendingOtp || isResending}
              title={timeLeft > 0 ? `Resend available in ${minutes}:${seconds.toString().padStart(2, '0')}` : ''}
              className="w-full py-2 rounded-xl border-2 border-primary text-primary font-button
                         font-semibold tracking-wide hover:bg-primary/5
                         active:scale-95 transition-all duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              {isResendingOtp ? 'Sending...' : timeLeft > 0 ? `Resend in ${minutes}:${seconds.toString().padStart(2, '0')}` : 'Resend Code'}
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}
