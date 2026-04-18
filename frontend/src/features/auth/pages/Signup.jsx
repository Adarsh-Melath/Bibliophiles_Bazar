import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, BookOpen } from 'lucide-react'
import { signupSchema } from '../schemas/authSchemas'
import { useSignup } from '../hooks/useSignup'
import OtpModal from '../components/OtpModal'

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [otpEmail, setOtpEmail] = useState(null)

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signupSchema)
    })

    const { mutate: signup, isPending, error } = useSignup()

    const onSubmit = (data) => {
        signup(
            { name: data.name, email: data.email, password: data.password },
            { onSuccess: () => setOtpEmail(data.email) }
        )
    }

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
                        Create Account
                    </h1>
                    <p className="text-sm text-[#9CAF88] text-center mb-6">
                        Join the bookstore platform
                    </p>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2 rounded-lg">
                            {error.response?.data?.error || 'Something went wrong'}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Name */}
                        <div>
                            <label className="text-xs font-semibold text-[#548C8C] mb-1 block">
                                Full Name
                            </label>
                            <input
                                {...register('name')}
                                className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8]"
                            />
                            {errors.name && (
                                <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-xs font-semibold text-[#548C8C] mb-1 block">
                                Email
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8]"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs font-semibold text-[#548C8C] mb-1 block">
                                Password
                            </label>
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

                        {/* Confirm Password */}
                        <div>
                            <label className="text-xs font-semibold text-[#548C8C] mb-1 block">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    {...register('confirmPassword')}
                                    type={showConfirm ? 'text' : 'password'}
                                    className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(p => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3 rounded-lg bg-[#9CAF88] text-white font-semibold"
                        >
                            {isPending ? 'Creating...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-[#D7CCC8]" />
                        <span className="text-xs text-[#9CAF88]">or</span>
                        <div className="flex-1 h-px bg-[#D7CCC8]" />
                    </div>

                    {/* Google OAuth */}
                    <a
                        href="http://localhost:2007/oauth2/authorization/google"
                        className="w-full py-3 rounded-lg border border-[#D7CCC8] flex items-center justify-center gap-3 hover:bg-gray-50 transition"
                    >
                        <img src="/google-icon.svg" width={18} alt="Google" />
                        Continue with Google
                    </a>

                    {/* Links */}
                    <div className="text-center mt-6 space-y-2">
                        <p className="text-xs text-[#9CAF88]">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#548C8C] font-medium hover:underline">
                                Login
                            </Link>
                        </p>

                        <p className="text-xs text-[#9CAF88]">
                            Want to sell books?{' '}
                            <Link to="/vendor/apply" className="text-[#548C8C] font-medium hover:underline">
                                Join as Vendor
                            </Link>
                        </p>
                    </div>

                </div>
            </div>

            {/* OTP */}
            {otpEmail && (
                <OtpModal
                    email={otpEmail}
                    onVerified={() => navigate('/login')}
                    onClose={() => setOtpEmail(null)}
                />
            )}
        </div>
    )
}