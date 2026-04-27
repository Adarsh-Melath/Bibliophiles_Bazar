import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, BookOpen } from 'lucide-react'
import { signupSchema } from '../schemas/authSchemas'
import { useSignup } from '../hooks/useSignup'
import OtpModal from '../components/OTPModal'
import { BACKEND_URL } from '../../../lib/config'
import { motion } from 'framer-motion'

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
        <div className="min-h-screen bg-paper flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-full h-1 bg-shelf"></div>
            <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-shelf/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-burgundy/5 rounded-full blur-3xl"></div>

            {/* Card */}
            <div className="w-full max-w-md bg-white border border-shelf/10 shadow-shelf rounded-sm overflow-hidden relative z-10">

                <div className="px-10 py-8">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-5">
                        <div className="w-14 h-14 bg-shelf text-paper rounded-full flex items-center justify-center mb-3 shadow-lg">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h1 className="font-heading text-2xl font-bold text-shelf tracking-tight">
                            Create Account
                        </h1>
                        <div className="h-0.5 w-12 bg-burgundy mt-1"></div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-burgundy/5 border-l-4 border-burgundy text-burgundy text-xs px-4 py-3 font-medium">
                            {error.response?.data?.error || 'Registration failed. Please try again.'}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div className="form-group">
                            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60 mb-1 block">
                                Full Name
                            </label>
                            <input
                                {...register('name')}
                                placeholder="Theodore Library"
                                className="w-full px-4 py-3 bg-paper border border-shelf/15 focus:border-burgundy focus:ring-0 transition-all font-body text-sm text-shelf outline-none"
                            />
                            {errors.name && (
                                <p className="text-burgundy text-[10px] uppercase font-bold mt-1 tracking-wider">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60 mb-1 block">
                                Email Address
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="writer@bookshelf.com"
                                className="w-full px-4 py-3 bg-paper border border-shelf/15 focus:border-burgundy focus:ring-0 transition-all font-body text-sm text-shelf outline-none"
                            />
                            {errors.email && (
                                <p className="text-burgundy text-[10px] uppercase font-bold mt-1 tracking-wider">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Passwords - Two Column for compactness if needed, else stack */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="form-group">
                                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60 mb-1 block">
                                    Password
                                </label>
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

                            <div className="form-group">
                                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60 mb-1 block">
                                    Confirm Secret
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('confirmPassword')}
                                        type={showConfirm ? 'text' : 'password'}
                                        className="w-full px-4 py-3 bg-paper border border-shelf/15 focus:border-burgundy focus:ring-0 transition-all font-body text-sm text-shelf outline-none pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(p => !p)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-shelf/40 hover:text-burgundy transition-colors"
                                    >
                                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-burgundy text-[10px] uppercase font-bold mt-1 tracking-wider">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-4 bg-shelf text-paper font-ui font-bold uppercase tracking-[0.2em] text-xs hover:bg-burgundy transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? 'Writing to Ledger...' : 'Create Library Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-3">
                        <div className="flex-1 h-px bg-shelf/10" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-shelf/30">or continue with</span>
                        <div className="flex-1 h-px bg-shelf/10" />
                    </div>

                    {/* Premium OAuth Button */}
                    <motion.a
                        href={`${BACKEND_URL}/oauth2/authorization/google`}

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

                    {/* Links */}
                    <div className="text-center mt-5 space-y-2 p-2 border-t border-shelf/5">
                        <p className="text-xs text-shelf/60 font-medium">
                            Already a member?{' '}
                            <Link to="/login" className="text-burgundy font-bold hover:text-shelf transition-colors underline underline-offset-4 decoration-burgundy/30">
                                Log in here
                            </Link>
                        </p>

                        <p className="text-[10px] uppercase tracking-widest font-bold text-shelf/40">
                            Want to sell collections?{' '}
                            <Link to="/vendor/apply" className="text-shelf hover:text-burgundy transition-colors">
                                Apply as Curator
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* OTP Modal Backdrop Blur */}
            {otpEmail && (
                <div className="fixed inset-0 z-[100] backdrop-blur-md bg-shelf/20 flex items-center justify-center p-6">
                    <OtpModal
                        email={otpEmail}
                        onVerified={() => navigate('/login')}
                        onClose={() => setOtpEmail(null)}
                    />
                </div>
            )}
        </div>
    )
}
