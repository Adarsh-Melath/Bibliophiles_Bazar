import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { loginSchema } from '../schemas/authSchemas'
import { useMutation } from '@tanstack/react-query'
import api from '../../../lib/axios'
import { useAuthStore } from '../../../store/authStore'
import { useState } from 'react'

const LINES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${15 + i * 7}%`,
  height: `${50 + (i % 3) * 40}px`,
  delay: `${i * 0.4}s`,
  duration: `${3 + (i % 3)}s`,
}))

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const { mutate: login, isPending, error } = useMutation({
    mutationFn: (data) => api.post('/auth/login', data),
    onSuccess: (res) => {
      setAuth(res.data.accessToken, res.data.user)
      navigate('/')
    },
  })

  const onSubmit = (data) => login(data)

  return (
    <div className="h-screen overflow-hidden flex bg-background">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #6b9060 0%, #9CAF88 50%, #b5c9a3 100%)' }}>

        {/* White radial glow */}
        <div className="absolute pointer-events-none"
          style={{
            width: '420px', height: '420px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -60%)',
          }} />

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-16">

          {/* Book + rising lines container */}
          <div className="relative" style={{ animation: 'floatSlow 7s ease-in-out infinite' }}>

            {/* Rising lines ABOVE the book */}
            <div className="relative w-56 h-24 mb-0">
              {LINES.map(line => (
                <div key={line.id} className="absolute bottom-0 w-0.5 rounded-full"
                  style={{
                    left: line.left,
                    height: line.height,
                    background: 'linear-gradient(to top, rgba(255,255,255,0.7), transparent)',
                    animation: `riseUp ${line.duration} ease-in-out infinite`,
                    animationDelay: line.delay,
                  }} />
              ))}
            </div>

            {/* Book SVG */}
            <svg width="220" height="140" viewBox="0 0 220 140" fill="none">

              {/* Book shadow */}
              <ellipse cx="110" cy="135" rx="80" ry="6" fill="rgba(0,0,0,0.15)" />

              {/* Left cover */}
              <path d="M110 120 C85 114 45 108 15 114 L15 25 C45 18 85 24 110 30 Z"
                fill="rgba(255,255,255,0.18)"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.5" />

              {/* Left page lines */}
              <line x1="30" y1="45" x2="98" y2="43" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="30" y1="58" x2="98" y2="56" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="30" y1="71" x2="98" y2="69" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="30" y1="84" x2="90" y2="82" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="30" y1="97" x2="80" y2="95" stroke="white" strokeWidth="1" strokeOpacity="0.15" />

              {/* Right cover */}
              <path d="M110 120 C135 114 175 108 205 114 L205 25 C175 18 135 24 110 30 Z"
                fill="rgba(255,255,255,0.12)"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.5" />

              {/* Right page lines */}
              <line x1="122" y1="43" x2="190" y2="45" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="122" y1="56" x2="190" y2="58" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="122" y1="69" x2="190" y2="71" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="122" y1="82" x2="185" y2="84" stroke="white" strokeWidth="1" strokeOpacity="0.15" />

              {/* Spine */}
              <line x1="110" y1="30" x2="110" y2="120"
                stroke="white" strokeWidth="2" strokeOpacity="0.9" />

              {/* Spine glow dot */}
              <circle cx="110" cy="30" r="5" fill="white" fillOpacity="0.95" />
              <circle cx="110" cy="30" r="9" fill="white" fillOpacity="0.2" />

              {/* Bookmark left */}
              <path d="M55 18 L55 35 L62 30 L69 35 L69 18 Z"
                fill="white" fillOpacity="0.6" />

              {/* Bookmark right */}
              <path d="M148 18 L148 35 L155 30 L162 35 L162 18 Z"
                fill="white" fillOpacity="0.4" />

            </svg>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mt-8 mb-6 w-full justify-center">
            <div className="flex-1 max-w-14 h-px bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="flex-1 max-w-14 h-px bg-white/30" />
          </div>

          {/* Quote */}
          <p className="font-body text-base italic leading-relaxed max-w-xs text-white/80">
            "Every time you return,<br />a new story begins."
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md" style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>

          {/* Header */}
          <div className="mb-8">
            <h2 className="font-heading text-3xl text-heading font-bold mb-2">
              Welcome Back Reader
            </h2>
            <p className="font-body text-heading-muted text-sm">
              Login to continue your reading journey
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              <p className="font-semibold mb-1">Login failed</p>
              <p>
                {error.response?.data?.error || error.message || 'Something went wrong'}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <div>
              <label className="font-body text-sm text-heading font-medium mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-accent bg-white
                             font-body text-heading placeholder-accent
                             focus:outline-none focus:ring-2 focus:ring-primary
                             transition-all duration-200"
                />
                <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-body text-sm text-heading font-medium">
                  Password
                </label>
                <Link to="/forgot-password"
                  className="font-body text-xs text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-accent bg-white
                             font-body text-heading placeholder-accent
                             focus:outline-none focus:ring-2 focus:ring-primary
                             transition-all duration-200"
                />
                <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                <button type="button" onClick={() => setShowPassword(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-heading transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-primary text-white font-button
                         font-semibold tracking-wide hover:bg-primary-dark
                         active:scale-95 transition-all duration-200 mt-2
                         disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {isPending ? 'Logging in...' : 'Login'}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-accent" />
            <span className="font-body text-xs text-accent">or continue with</span>
            <div className="flex-1 h-px bg-accent" />
          </div>

          {/* Google SSO */}
          <button className="w-full py-3 rounded-xl border border-accent bg-white
                             font-button text-sm text-heading font-medium
                             hover:border-primary hover:bg-background
                             transition-all duration-200 flex items-center justify-center gap-3">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>

          {/* Links */}
          <div className="mt-6 text-center">
            <p className="font-body text-sm text-heading-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Trust */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <Lock size={12} className="text-accent" />
            <p className="font-body text-xs text-accent">
              Your account is secure and protected.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}
