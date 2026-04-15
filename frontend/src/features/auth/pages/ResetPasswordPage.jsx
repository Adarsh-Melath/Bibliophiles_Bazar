import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, KeyRound, Eye, EyeOff, CheckCircle } from 'lucide-react'
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

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const resetToken = searchParams.get('resetToken') || ''
  const isVerified = searchParams.get('verified') === 'true'
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  })

  const password = watch('password')
  const confirmPassword = watch('confirmPassword')
  const passwordStrength = getPasswordStrength(password)
  
  // Reset password mutation
  const { mutate: resetPassword, isPending, error } = useMutation({
    mutationFn: (data) => {
      if (!resetToken) {
        throw new Error('Reset token is missing. Please start over.')
      }
      return api.post('/auth/reset-password', {
        resetToken,
        password: data.password,
      })
    },
    onSuccess: () => {
      setResetSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    },
  })

  function getPasswordStrength(pwd) {
    if (!pwd) return 0
    let strength = 0
    if (pwd.length >= 8) strength++
    if (pwd.length >= 12) strength++
    if (/[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[!@#$%^&*]/.test(pwd)) strength++
    return Math.min(strength, 4)
  }

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600']

  if (!isVerified || !resetToken) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <h2 className="font-heading text-2xl font-bold text-heading mb-2">Access Denied</h2>
          <p className="font-body text-heading-muted mb-6">
            {!isVerified ? 'Please verify your OTP first' : 'Reset token is missing or expired'}
          </p>
          <p className="font-body text-sm text-heading-muted mb-6">
            Your session may have expired. Please start the password reset process again.
          </p>
          <Link to="/forgot-password" className="inline-block px-6 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
            Start Over
          </Link>
        </div>
      </div>
    )
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

        {/* Floating keys */}
        {FLOATING_MARKS.map((mark, i) => (
          <div key={i} className="absolute text-white/20"
            style={{
              ...mark,
              animation: `float ${6 + i}s ease-in-out infinite`,
              animationDelay: mark.delay,
            }}>
            <KeyRound size={mark.size} />
          </div>
        ))}

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-16">

          {/* Key animation */}
          <div className="relative flex items-center justify-center mb-10"
            style={{ animation: 'floatSlow 6s ease-in-out infinite' }}>

            {/* Outer glow ring */}
            <div className="absolute w-36 h-36 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                animation: 'shimmer 3s ease-in-out infinite',
              }} />

            {/* Key circle */}
            <div className="w-28 h-28 rounded-full bg-white/15 border-2 border-white/40
                            flex items-center justify-center backdrop-blur-sm relative">
              <KeyRound size={44} className="text-white" strokeWidth={1.5} />
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
            "A strong password is your<br />first line of defense."
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md" style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>

          {!resetSuccess ? (
            <>
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
                  <KeyRound size={26} className="text-primary" />
                </div>
                <h2 className="font-heading text-3xl text-heading font-bold mb-2">
                  Create New Password
                </h2>
                <p className="font-body text-heading-muted text-sm">
                  Enter a strong password to secure your account
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
                  {error.response?.data?.error || 'Something went wrong'}
                </div>
              )}

              <form onSubmit={handleSubmit((data) => resetPassword(data))} className="space-y-6">

                {/* Password input */}
                <div>
                  <label className="font-body text-sm text-heading font-medium mb-1 block">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="At least 8 characters"
                      className="w-full pl-11 pr-11 py-3 rounded-xl border border-accent bg-white
                                 font-body text-heading placeholder-accent
                                 focus:outline-none focus:ring-2 focus:ring-primary
                                 transition-all duration-200"
                    />
                    <KeyRound size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-accent hover:text-heading transition-colors"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all ${i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-accent'
                              }`}
                          />
                        ))}
                      </div>
                      <p className={`font-body text-xs font-medium ${passwordStrength <= 1 ? 'text-red-500' : passwordStrength === 2 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                        {strengthLabels[passwordStrength - 1] || 'Too weak'}
                      </p>
                    </div>
                  )}

                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm password input */}
                <div>
                  <label className="font-body text-sm text-heading font-medium mb-1 block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter password"
                      className="w-full pl-11 pr-11 py-3 rounded-xl border border-accent bg-white
                                 font-body text-heading placeholder-accent
                                 focus:outline-none focus:ring-2 focus:ring-primary
                                 transition-all duration-200"
                    />
                    <KeyRound size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-accent hover:text-heading transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>

                  {confirmPassword && password === confirmPassword && (
                    <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                      <CheckCircle size={14} /> Passwords match
                    </p>
                  )}

                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 rounded-xl bg-primary text-white font-button
                             font-semibold tracking-wide hover:bg-primary-dark
                             active:scale-95 transition-all duration-200
                             disabled:opacity-60 disabled:cursor-not-allowed shadow-sm
                             flex items-center justify-center gap-2"
                >
                  {isPending ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>

              {/* Info box */}
              <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <p className="font-body text-xs text-heading-muted">
                  💡 <span className="font-semibold text-heading">Tip:</span> Use a mix of uppercase, lowercase, numbers, and special characters for a strong password.
                </p>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="text-center" style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="font-heading text-2xl text-heading font-bold mb-3">
                Password Reset Successfully!
              </h2>
              <p className="font-body text-heading-muted text-sm mb-8">
                Your password has been updated. You'll be redirected to login shortly.
              </p>
              <Link to="/login"
                className="w-full py-3 rounded-xl bg-primary text-white font-button
                           font-semibold tracking-wide hover:bg-primary-dark
                           active:scale-95 transition-all duration-200 shadow-sm
                           flex items-center justify-center gap-2">
                Go to Login
              </Link>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}
