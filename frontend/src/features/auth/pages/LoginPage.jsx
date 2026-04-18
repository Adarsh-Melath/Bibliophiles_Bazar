import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, BookOpen } from 'lucide-react'
import { loginSchema } from '../schemas/authSchemas'
import { useMutation } from '@tanstack/react-query'
import api from '../../../lib/axios'
import { useAuthStore } from '../../../store/authStore'
import { useState } from 'react'

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
    <div className="min-h-screen bg-[#EFEBE9] flex items-center justify-center p-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* Top Accent */}
        <div className="h-1 bg-[#9CAF88]"></div>

        <div className="px-8 py-12">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-[#548C8C]" />
            </div>
          </div>

          {/* Header */}
          <h1 className="text-2xl font-bold text-[#548C8C] text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-[#9CAF88] text-center mb-6">
            Login to your account
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2 rounded-lg">
              {error.response?.data?.error || 'Invalid credentials'}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-[#548C8C] mb-1 block">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8]"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-[#548C8C]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#9CAF88] hover:text-[#548C8C]"
                >
                  Forgot?
                </Link>
              </div>

              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-lg bg-[#9CAF88] text-white font-semibold"
            >
              {isPending ? 'Logging in...' : 'Login'}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#D7CCC8]" />
            <span className="text-xs text-[#9CAF88]">or</span>
            <div className="flex-1 h-px bg-[#D7CCC8]" />
          </div>

          {/* Google */}
          <a
            href="http://localhost:2007/oauth2/authorization/google"
            className="w-full py-3 rounded-lg border border-[#D7CCC8] flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          >
            <img src="/google-icon.svg" width={18} alt="Google" />
            Continue with Google
          </a>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-[#9CAF88]">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-[#548C8C] font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

        </div>

        {/* Bottom Notice */}
        <div className="bg-[#F9F9F9] px-6 py-3 text-center border-t border-[#D7CCC8]">
          <p className="text-xs text-[#9CAF88]">
            Secure login for authorized users
          </p>
        </div>

      </div>
    </div>
  )
}