import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { ShieldCheck, Mail, ArrowLeft, Timer, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import api from '../../../lib/axios'

export default function VendorVerifyResetOTPPage() {
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
            navigate(`/vendor/reset-password?email=${encodeURIComponent(email)}&resetToken=${resetToken}&verified=true`)
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
        <div className="min-h-screen bg-paper flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--shelf) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm relative z-10">
                <div className="library-panel border-shelf/10 shadow-shelf overflow-hidden bg-white">
                    <div className="h-1 w-full bg-burgundy" />

                    <div className="p-8">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-12 h-12 bg-shelf text-paper rounded-sm flex items-center justify-center shadow-lg mb-3">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <span className="font-ui text-[8px] uppercase font-bold tracking-[0.4em] text-burgundy mb-1">Partner Access</span>
                            <h1 className="font-heading text-2xl font-bold text-shelf">Verify Code</h1>
                            <div className="h-0.5 w-8 bg-burgundy/30 mt-1.5" />
                        </div>

                        <div className="mb-6 p-3 bg-shelf/[0.02] border border-shelf/5 rounded-sm">
                            <p className="font-body text-[10px] text-shelf/40 italic leading-relaxed text-center">
                                Code sent to:
                                <span className="block text-shelf font-medium not-italic mt-1 break-all uppercase tracking-wider text-[11px]">{email}</span>
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-burgundy/5 border-l-2 border-burgundy text-[9px] font-bold uppercase text-burgundy tracking-widest">
                                {error.response?.data?.error || 'Invalid Code'}
                            </div>
                        )}

                        <div className="flex justify-between gap-2 mb-6" onPaste={handlePaste}>
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
                                    className="w-full aspect-[4/5] bg-shelf/[0.02] border border-shelf/10 
                                               text-center text-2xl font-heading font-bold
                                               text-shelf rounded-sm
                                               focus:outline-none focus:border-burgundy/30
                                               transition-all placeholder:text-shelf/5"
                                    placeholder="0"
                                />
                            ))}
                        </div>

                        <div className="mb-6 text-center">
                            {isExpired ? (
                                <span className="text-[9px] uppercase font-bold text-burgundy tracking-widest">Code Expired</span>
                            ) : (
                                <div className="flex items-center justify-center gap-2 text-shelf/40 font-ui text-[9px] uppercase font-bold tracking-widest">
                                    <Timer size={12} className="animate-pulse" />
                                    <span>Expires in {minutes}:{seconds}</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => verifyOtp()}
                                disabled={!isComplete || isPending || isExpired}
                                className="w-full library-button py-4 text-[10px] flex items-center justify-center gap-2 disabled:opacity-30"
                            >
                                {isPending ? 'Verifying...' : 'Verify Code'}
                            </button>

                            <button
                                onClick={() => resendOtp()}
                                disabled={timeLeft > 0 || isResending}
                                className="w-full py-2 text-[9px] font-bold uppercase tracking-widest 
                                           flex items-center justify-center gap-2 hover:text-burgundy text-shelf/40 transition-colors disabled:opacity-30"
                            >
                                <RotateCcw size={12} />
                                {isResending ? 'Sending...' : 'Resend New Code'}
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-shelf/5 text-center">
                            <Link to="/vendor/forgot-password" className="text-[9px] font-bold text-shelf/40 hover:text-burgundy uppercase tracking-widest flex items-center justify-center gap-2">
                                <ArrowLeft size={10} /> Change Email
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
