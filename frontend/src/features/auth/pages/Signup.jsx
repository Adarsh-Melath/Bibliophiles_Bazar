import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, BookOpen } from 'lucide-react'
import { signupSchema } from '../schemas/authSchemas'
import { useSignup } from '../hooks/useSignup'
import OtpModal from '../components/OTPModal'
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
        <div className="min-h-screen bg-paper flex items-center justify-center p-6 relative overflow-hidden font-ui">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 right-0 w-full h-1.5 bg-ink"></div>
            <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-ink/5 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg editorial-card !p-0 overflow-hidden relative z-10"
            >
                <div className="p-12 md:p-16">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ink text-white mb-8 shadow-2xl shadow-ink/20">
                            <BookOpen size={28} />
                        </div>
                        <h1 className="text-5xl font-bold text-ink mb-3 tracking-tight">Create Account</h1>
                        <div className="h-1 w-16 bg-gold mx-auto" />
                        <p className="font-ui text-[10px] text-ink/40 uppercase tracking-[0.4em] mt-6">Join our Curated Community</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-10 bg-velvet/5 border border-velvet/10 text-velvet text-[11px] font-bold uppercase tracking-widest px-6 py-4 rounded-sm text-center"
                        >
                            {error.response?.data?.error || 'Registration failed. Please try again.'}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 block ml-1">
                                Full Name
                            </label>
                            <input
                                {...register('name')}
                                placeholder="Theodore Library"
                                className="w-full px-1 py-4 bg-transparent border-b border-ink/10 focus:border-gold transition-all duration-500 font-body text-base text-ink outline-none placeholder:text-ink/10"
                            />
                            {errors.name && (
                                <p className="text-velvet text-[9px] uppercase font-bold mt-2 tracking-widest">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 block ml-1">
                                Email Address
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="reader@bibliophiles.com"
                                className="w-full px-1 py-4 bg-transparent border-b border-ink/10 focus:border-gold transition-all duration-500 font-body text-base text-ink outline-none placeholder:text-ink/10"
                            />
                            {errors.email && (
                                <p className="text-velvet text-[9px] uppercase font-bold mt-2 tracking-widest">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 block ml-1">
                                    Access Key
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('password')}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        className="w-full px-1 py-4 bg-transparent border-b border-ink/10 focus:border-gold transition-all duration-500 font-body text-base text-ink outline-none pr-12 placeholder:text-ink/10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(p => !p)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/20 hover:text-gold transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-velvet text-[9px] uppercase font-bold mt-2 tracking-widest">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 block ml-1">
                                    Confirm Key
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('confirmPassword')}
                                        type={showConfirm ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        className="w-full px-1 py-4 bg-transparent border-b border-ink/10 focus:border-gold transition-all duration-500 font-body text-base text-ink outline-none pr-12 placeholder:text-ink/10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(p => !p)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/20 hover:text-gold transition-colors"
                                    >
                                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-velvet text-[9px] uppercase font-bold mt-2 tracking-widest">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-5 bg-ink text-white font-ui font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-ink/90 transition-all duration-500 shadow-2xl shadow-ink/20 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <span className="relative z-10">
                                {isPending ? 'Establishing Identity...' : 'Create Account'}
                            </span>
                            <div className="absolute inset-0 bg-gold/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                        </button>
                    </form>

                    {/* Social Auth */}
                    <div className="flex items-center gap-6 my-10">
                        <div className="flex-1 h-px bg-ink/5" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/20">Third Party</span>
                        <div className="flex-1 h-px bg-ink/5" />
                    </div>

                    <motion.a
                        href={`${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`}
                        whileHover={{ y: -2 }}
                        className="w-full py-4 border border-ink/10 rounded-full flex items-center justify-center gap-4 group transition-all duration-500 hover:border-gold hover:bg-gold/5"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform duration-500">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-ink/60">Continue with Google</span>
                    </motion.a>

                    {/* Footer */}
                    <div className="text-center mt-12 pt-8 border-t border-ink/5">
                        <p className="font-ui text-[11px] text-ink/40 uppercase tracking-widest">
                            Already a member?{' '}
                            <Link to="/login" className="text-gold font-bold hover:text-ink transition-colors ml-2">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="bg-ink/[0.02] px-8 py-4 text-center border-t border-ink/5">
                    <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-ink/20 flex items-center justify-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
                        Secure Identity Verification
                    </p>
                </div>
            </motion.div>

            {/* OTP Modal Backdrop Blur */}
            {otpEmail && (
                <div className="fixed inset-0 z-[100] backdrop-blur-md bg-ink/40 flex items-center justify-center p-6">
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
