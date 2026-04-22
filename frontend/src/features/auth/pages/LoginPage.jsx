import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, BookOpen } from 'lucide-react'
import { loginSchema } from '../schemas/authSchemas'
import { useMutation } from '@tanstack/react-query'
import api from '../../../lib/axios'
import { useAuthStore } from '../../../store/authStore'
import { useState } from 'react'
import {motion} from 'framer-motion'
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
      const role = res.data.user.role
      if (role === 'ADMIN') {
        navigate('/admin/dashboard')
      } else if (role === 'VENDOR') {
        navigate('/vendor/dashboard')
      } else {
        navigate('/')
      }
    },
  })

  const onSubmit = (data) => login(data)

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-shelf"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-shelf/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="w-full max-w-md bg-white border border-shelf/10 shadow-shelf rounded-sm overflow-hidden relative z-10">
        
        <div className="px-10 py-10">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-shelf text-paper rounded-full flex items-center justify-center mb-3 shadow-lg">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-shelf tracking-tight">
              Welcome back
            </h1>
            <div className="h-0.5 w-12 bg-burgundy mt-1"></div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-burgundy/5 border-l-4 border-burgundy text-burgundy text-xs px-4 py-3 font-medium"
            >
              {error.response?.data?.error || 'Authentication failed. Please check your credentials.'}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-group">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60 mb-1 block">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="reader@library.com"
                className="w-full px-4 py-3 bg-paper border border-shelf/15 focus:border-burgundy focus:ring-0 transition-all font-body text-sm text-shelf outline-none"
              />
              {errors.email && (
                <p className="text-burgundy text-[10px] uppercase font-bold mt-1 tracking-wider">{errors.email.message}</p>
              )}
            </div>

            <div className="form-group">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60 block">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[10px] font-bold uppercase tracking-widest text-burgundy hover:text-shelf transition-colors"
                >
                  Forgot?
                </Link>
              </div>

              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 bg-paper border border-shelf/15 focus:border-burgundy focus:ring-0 transition-all font-body text-sm text-shelf outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-shelf/40 hover:text-burgundy transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-burgundy text-[10px] uppercase font-bold mt-1 tracking-wider">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 bg-shelf text-paper font-ui font-bold uppercase tracking-[0.2em] text-xs hover:bg-burgundy transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isPending ? 'Authenticating...' : (
                <span className="flex items-center justify-center gap-2">
                  Sign In 
                </span>
              )}
            </button>
          </form>

          {/* OAuth Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-shelf/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-shelf/30">or</span>
            <div className="flex-1 h-px bg-shelf/10" />
          </div>

          {/* Premium OAuth Button */}
          <motion.a
            href="http://localhost:2007/oauth2/authorization/google"
            whileHover={{ y: -2, shadow: '0 10px 25px -5px rgba(44, 30, 17, 0.1)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-white border border-shelf/15 rounded-sm flex items-center justify-center gap-4 group transition-all duration-300 shadow-soft"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform duration-300">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-ui text-[11px] font-bold uppercase tracking-[0.2em] text-shelf">Continuing with Google</span>
          </motion.a>

          {/* Footer Navigation */}
          <div className="text-center mt-6 p-2 border-t border-shelf/5">
            <p className="text-xs text-shelf/60 font-medium">
              New to our library?{' '}
              <Link to="/signup" className="text-burgundy font-bold hover:text-shelf transition-colors underline underline-offset-4 decoration-burgundy/30">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Decorative Bar */}
        <div className="bg-paper border-t border-shelf/5 px-6 py-3 text-center">
            <p className="text-[10px] uppercase tracking-widest font-bold text-shelf/30 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/40"></span>
                Secure Architectural Encryption Enabled
            </p>
        </div>
      </div>
    </div>
  )
}
