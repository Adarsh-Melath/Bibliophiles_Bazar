import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { BookOpen, Mail, ArrowLeft, ShieldCheck, Timer, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import api from '../../../lib/axios'

export default function VerifyResetOtpPage() {
    const [searchParams] = useSearchParams()
    const email = searchParams.get('email') || ''
    const navigate = useNavigate()

    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [timeLeft, setTimeLeft] = useState(60)
    const inputRefs = useRef([])

    useEffect(() => {
        inputRefs.current[0]?.focus()
    }, [])

    useEffect(() => {
        if (timeLeft <= 0) return
        const interval = setInterval(() => setTimeLeft(t => t - 1), 1000)
        return () => clearInterval(interval)
    }, [timeLeft])

    const { mutate: verifyOtp, isPending, error } = useMutation({
        mutationFn: () =>
            api.post('/auth/verify-reset-otp', { email, code: otp.join('') }),
        onSuccess: (res) => {
            const resetToken = res.data.resetToken
            // ✅ FIX: Added verified=true to prevent "Invalid Session" bug on next page
            navigate(`/reset-password?email=${encodeURIComponent(email)}&resetToken=${resetToken}&verified=true`)
        },
    })

    const { mutate: resendOtp, isPending: isResending } = useMutation({
        mutationFn: () => api.post('/auth/forgot-password', { email }),
        onSuccess: () => {
            setOtp(['', '', '', '', '', ''])
            setTimeLeft(60)
            inputRefs.current[0]?.focus()
        },
    })

    const handleChange = (i, val) => {
        if (!/^\d?$/.test(val)) return
        const newOtp = [...otp]
        newOtp[i] = val
        setOtp(newOtp)
        if (val && i < 5) inputRefs.current[i + 1]?.focus()
    }

    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !otp[i] && i > 0) {
            inputRefs.current[i - 1]?.focus()
        }
    }

    const handlePaste = (e) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
        if (pasted.length === 6) {
            setOtp(pasted.split(''))
            inputRefs.current[5]?.focus()
        }
    }

    const isComplete = otp.every(d => d !== '')
    const isExpired = timeLeft === 0
    const minutes = Math.floor(timeLeft / 60)
    const seconds = String(timeLeft % 60).padStart(2, '0')

    return (
        <div className="h-screen bg-paper flex items-center justify-center p-6 relative overflow-hidden selection:bg-burgundy/10">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, var(--shelf) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative"
            >
                <div className="bg-white border border-shelf/10 shadow-shelf rounded-sm overflow-hidden">
                    <div className="h-1.5 w-full bg-shelf" />

                    <div className="px-10 py-10">
                        {/* Header */}
                        <div className="flex flex-col items-center mb-8 text-center">
                            <div className="w-16 h-16 bg-shelf text-paper rounded-full flex items-center justify-center mb-6 shadow-lg">
                                <Mail size={28} />
                            </div>
                            <h1 className="font-heading text-3xl font-bold text-shelf tracking-tight">
                                Verify Code
                            </h1>
                            <div className="h-0.5 w-12 bg-burgundy mt-2 mb-4"></div>
                            
                            <div className="p-3 bg-shelf/[0.02] border border-shelf/5 rounded-sm w-full">
                                <p className="font-body text-[10px] text-shelf/40 italic leading-relaxed">
                                    Code sent to:
                                    <span className="block text-shelf font-medium not-italic mt-1 break-all uppercase tracking-wider">{email}</span>
                                </p>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 bg-burgundy/5 border-l-4 border-burgundy text-burgundy text-[10px] font-bold uppercase tracking-widest px-6 py-4">
                                {error.response?.data?.error || 'Invalid Code'}
                            </div>
                        )}

                        {/* OTP Input Container */}
                        <div className="flex justify-between gap-3 mb-8" onPaste={handlePaste}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={el => inputRefs.current[i] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleChange(i, e.target.value)}
                                    onKeyDown={e => handleKeyDown(i, e)}
                                    className="w-full aspect-[4/5] bg-paper border-b-2 
                                               text-center text-2xl font-heading font-bold
                                               border-shelf/10 text-shelf
                                               focus:outline-none focus:border-burgundy
                                               transition-all duration-300 placeholder:text-shelf/5"
                                    placeholder="0"
                                />
                            ))}
                        </div>

                        {/* Timer */}
                        <div className="mb-10 text-center">
                            {isExpired ? (
                                <span className="text-[10px] uppercase font-bold text-burgundy tracking-widest">Code Expired</span>
                            ) : (
                                <div className="flex items-center justify-center gap-2 text-shelf/40 font-ui text-[10px] uppercase font-bold tracking-widest">
                                    <Timer size={12} className="animate-pulse" />
                                    <span>Expires in {minutes}:{seconds}</span>
                                </div>
                            )}
                        </div>

                        {/* Main Button */}
                        <div className="space-y-4">
                            <button
                                onClick={() => verifyOtp()}
                                disabled={!isComplete || isPending || isExpired}
                                className="w-full py-4 bg-shelf text-paper font-ui font-bold uppercase tracking-[0.2em] text-xs hover:bg-burgundy transition-all duration-300 shadow-lg disabled:opacity-30 flex items-center justify-center gap-3"
                            >
                                {isPending ? 'Verifying...' : (
                                    <>
                                        <ShieldCheck size={16} />
                                        Verify Code
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => resendOtp()}
                                disabled={timeLeft > 0 || isResending}
                                className="w-full py-2 text-[9px] font-bold uppercase tracking-[0.25em] 
                                           flex items-center justify-center gap-2 mx-auto hover:text-burgundy text-shelf/40 transition-colors disabled:opacity-30"
                            >
                                <RotateCcw size={12} />
                                {isResending ? 'Sending...' : 'Resend New Code'}
                            </button>
                        </div>

                        <div className="text-center mt-10 p-4 border-t border-shelf/5">
                            <Link to="/forgot-password" title="Back" className="font-ui text-[10px] font-bold uppercase tracking-[0.3em] text-shelf/40 hover:text-burgundy flex items-center justify-center gap-2 transition-colors">
                                <ArrowLeft size={14} />
                                Change Email
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}