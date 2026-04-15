import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, BookOpen, Feather, BookMarked, Library, Bookmark, Lock } from 'lucide-react'
import { signupSchema } from '../schemas/authSchemas'
import { useSignup } from '../hooks/useSignup'
import OtpModal from '../components/OtpModal'

const QUOTES = [
    { text: "Every book you read rewrites a part of you.", author: "— Unknown" },
    { text: "A reader lives a thousand lives before he dies.", author: "— George R.R. Martin" },
    { text: "Books are a uniquely portable magic.", author: "— Stephen King" },
    { text: "Reading is dreaming with open eyes.", author: "— Anissa Trisdianty" },
    { text: "One must always be careful of books.", author: "— Cassandra Clare" },
    { text: "A book is a dream you hold in your hands.", author: "— Neil Gaiman" },
]

const FLOATING_ICONS = [
    { Icon: BookOpen, top: '12%', left: '15%', delay: '0s', size: 28 },
    { Icon: Feather, top: '20%', right: '12%', delay: '1.2s', size: 22 },
    { Icon: BookMarked, bottom: '25%', left: '10%', delay: '2s', size: 26 },
    { Icon: Library, bottom: '15%', right: '15%', delay: '0.6s', size: 24 },
    { Icon: Bookmark, top: '50%', left: '6%', delay: '1.8s', size: 20 },
    { Icon: Feather, top: '40%', right: '6%', delay: '3s', size: 18 },
]

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [otpEmail, setOtpEmail] = useState(null)
    const [quoteIndex, setQuoteIndex] = useState(0)
    const [quoteVisible, setQuoteVisible] = useState(true)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signupSchema)
    })

    const { mutate: signup, isPending, error } = useSignup()

    // Rotate quotes every 4 seconds with fade animation
    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteVisible(false)
            setTimeout(() => {
                setQuoteIndex(i => (i + 1) % QUOTES.length)
                setQuoteVisible(true)
            }, 500)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const onSubmit = (data) => {
        signup(
            { name: data.name, email: data.email, password: data.password },
            { onSuccess: () => setOtpEmail(data.email) }
        )
    }

    return (
        <div className="min-h-screen flex bg-[#EFEBE9]">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex w-1/2 flex-col items-center justify-center relative overflow-hidden sticky top-0 h-screen"
                style={{ background: 'linear-gradient(145deg, #6b9060 0%, #9CAF88 50%, #b5c9a3 100%)' }}>

                {/* Background glow blobs */}
                <div className="absolute w-80 h-80 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)', top: '-60px', left: '-60px', animation: 'shimmer 5s ease-in-out infinite' }} />
                <div className="absolute w-64 h-64 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', bottom: '-30px', right: '-30px', animation: 'shimmer 5s ease-in-out infinite 2s' }} />

                {/* Floating Lucide icons */}
                {FLOATING_ICONS.map(({ Icon, delay, size, ...pos }, i) => (
                    <div key={i} className="absolute text-white/25"
                        style={{ ...pos, animation: `float ${6 + i}s ease-in-out infinite`, animationDelay: delay }}>
                        <Icon size={size} />
                    </div>
                ))}

                {/* Center content */}
                <div className="relative z-10 text-center px-12">

                    {/* Brand icon */}
                    <div className="flex justify-center mb-6"
                        style={{ animation: 'floatSlow 8s ease-in-out infinite' }}>
                        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                            <Library size={40} className="text-white" />
                        </div>
                    </div>

                    {/* Brand name */}
                    <h1 className="font-heading text-4xl text-white font-bold leading-tight mb-1 drop-shadow-sm">
                        The Bibliophile's
                    </h1>
                    <h1 className="font-heading text-4xl text-white/80 font-bold leading-tight mb-6">
                        Bazaar
                    </h1>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-10 h-px bg-white/30" />
                        <BookOpen size={14} className="text-white/50" />
                        <div className="w-10 h-px bg-white/30" />
                    </div>

                    {/* Animated Quote */}
                    <div className="h-24 flex flex-col items-center justify-center">
                        <div style={{
                            opacity: quoteVisible ? 1 : 0,
                            transform: quoteVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.5s ease, transform 0.5s ease'
                        }}>
                            <p className="font-body text-white/90 text-base italic leading-relaxed max-w-xs mx-auto">
                                "{QUOTES[quoteIndex].text}"
                            </p>
                            <p className="font-body text-white/55 text-xs mt-2">
                                {QUOTES[quoteIndex].author}
                            </p>
                        </div>
                    </div>

                    {/* Quote dots indicator */}
                    <div className="flex justify-center gap-2 mt-4">
                        {QUOTES.map((_, i) => (
                            <div key={i} className="rounded-full transition-all duration-300"
                                style={{
                                    width: i === quoteIndex ? '20px' : '6px',
                                    height: '6px',
                                    background: i === quoteIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)'
                                }} />
                        ))}
                    </div>


                </div>
            </div>

            {/* RIGHT SIDE — FORM */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
                <div className="w-full max-w-md" style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="font-heading text-3xl text-[#548C8C] font-bold mb-2">
                            Create your account
                        </h2>
                        <p className="font-body text-[#548C8C]/70 text-sm">
                            Join and explore thousands of books
                        </p>
                    </div>

                    {/* Global error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
                            {error.response?.data?.error || 'Something went wrong'}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Full Name */}
                        <div>
                            <label className="font-body text-sm text-[#548C8C] font-medium mb-1 block">Full Name</label>
                            <input
                                {...register('name')}
                                placeholder="Your full name"
                                className="w-full px-4 py-3 rounded-xl border border-[#D7CCC8] bg-white
                           font-body text-[#548C8C] placeholder-[#D7CCC8]
                           focus:outline-none focus:ring-2 focus:ring-[#9CAF88]
                           transition-all duration-200"
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="font-body text-sm text-[#548C8C] font-medium mb-1 block">Email Address</label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-[#D7CCC8] bg-white
                           font-body text-[#548C8C] placeholder-[#D7CCC8]
                           focus:outline-none focus:ring-2 focus:ring-[#9CAF88]
                           transition-all duration-200"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="font-body text-sm text-[#548C8C] font-medium mb-1 block">Password</label>
                            <div className="relative">
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Min 8 characters"
                                    className="w-full px-4 py-3 rounded-xl border border-[#D7CCC8] bg-white
                             font-body text-[#548C8C] placeholder-[#D7CCC8]
                             focus:outline-none focus:ring-2 focus:ring-[#9CAF88]
                             transition-all duration-200 pr-12"
                                />
                                <button type="button" onClick={() => setShowPassword(p => !p)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CAF88] hover:text-[#548C8C] transition-colors">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="font-body text-sm text-[#548C8C] font-medium mb-1 block">Confirm Password</label>
                            <div className="relative">
                                <input
                                    {...register('confirmPassword')}
                                    type={showConfirm ? 'text' : 'password'}
                                    placeholder="Repeat your password"
                                    className="w-full px-4 py-3 rounded-xl border border-[#D7CCC8] bg-white
                             font-body text-[#548C8C] placeholder-[#D7CCC8]
                             focus:outline-none focus:ring-2 focus:ring-[#9CAF88]
                             transition-all duration-200 pr-12"
                                />
                                <button type="button" onClick={() => setShowConfirm(p => !p)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CAF88] hover:text-[#548C8C] transition-colors">
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3 rounded-xl bg-[#9CAF88] text-white font-button
                         font-semibold tracking-wide hover:bg-[#8a9d76]
                         active:scale-95 transition-all duration-200 mt-2
                         disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                        >
                            {isPending ? 'Creating account...' : 'Create Account'}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-[#D7CCC8]" />
                        <span className="font-body text-xs text-[#D7CCC8]">or continue with</span>
                        <div className="flex-1 h-px bg-[#D7CCC8]" />
                    </div>

                    {/* Google SSO */}
                    <button className="w-full py-3 rounded-xl border border-[#D7CCC8] bg-white
                             font-button text-sm text-[#548C8C] font-medium
                             hover:border-[#9CAF88] hover:bg-[#EFEBE9]
                             transition-all duration-200 flex items-center justify-center gap-3">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg"
                            className="w-5 h-5" alt="Google" />
                        Continue with Google
                    </button>

                    {/* Links */}
                    <div className="mt-6 text-center space-y-2">
                        <p className="font-body text-sm text-[#548C8C]/70">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#9CAF88] font-medium hover:underline">Login</Link>
                        </p>
                        <p className="font-body text-sm text-[#548C8C]/70">
                            Want to sell books?{' '}
                            <Link to="/vendor/signup" className="text-[#9CAF88] font-medium hover:underline">Join as Vendor</Link>
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-1 mt-4">
                        <Lock size={12} className="text-[#D7CCC8]" />
                        <p className="font-body text-xs text-[#D7CCC8]">We respect your privacy. No spam.</p>
                    </div>

                </div>
            </div>

            {/* OTP Modal */}
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
