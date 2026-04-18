import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { BookOpen } from 'lucide-react'
import api from '../../../lib/axios'

export default function AdminVerifyResetOtpPage() {
    const [searchParams] = useSearchParams()
    const email = searchParams.get('email') || ''
    const navigate = useNavigate()

    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [timeLeft, setTimeLeft] = useState(60) // 1 minutes
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
            navigate(`/admin/reset-password?email=${encodeURIComponent(email)}&resetToken=${resetToken}`)
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
        <div className="min-h-screen bg-[#EFEBE9] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="h-1 bg-[#9CAF88]" />

                <div className="px-8 py-12">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-[#548C8C]" strokeWidth={1.5} />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-[#548C8C] text-center mb-2">
                        Verify Code
                    </h1>
                    <p className="text-sm text-[#9CAF88] text-center mb-1">
                        Enter the 6-digit code sent to
                    </p>
                    <p className="text-center text-sm font-medium text-[#2C3E50] mb-6">
                        {email}
                    </p>

                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2 rounded-lg">
                            {error.response?.data?.error || 'Invalid or expired code'}
                        </div>
                    )}

                    {/* OTP inputs */}
                    <div className="flex justify-center gap-3 mb-4" onPaste={handlePaste}>
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                ref={el => inputRefs.current[i] = el}
                                value={digit}
                                onChange={e => handleChange(i, e.target.value)}
                                onKeyDown={e => handleKeyDown(i, e)}
                                maxLength={1}
                                className="w-12 h-12 text-center text-lg font-bold rounded-lg border border-[#D7CCC8] bg-[#E8F4F8] focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all"
                            />
                        ))}
                    </div>

                    {/* Timer */}
                    <p className={`text-center text-xs mb-6 ${isExpired ? 'text-red-500' : 'text-[#9CAF88]'}`}>
                        {isExpired ? 'Code expired' : `Expires in ${minutes}:${seconds}`}
                    </p>

                    {/* Verify */}
                    <button
                        onClick={() => verifyOtp()}
                        disabled={!isComplete || isPending || isExpired}
                        className="w-full py-3 rounded-lg bg-[#9CAF88] hover:bg-[#8FA078] text-white font-semibold text-sm transition-all disabled:opacity-60 mb-3"
                    >
                        {isPending ? 'Verifying...' : 'Verify Code'}
                    </button>

                    {/* Resend */}
                    <button
                        onClick={() => resendOtp()}
                        disabled={timeLeft > 0 || isResending}
                        className="w-full py-2 rounded-lg border border-[#D7CCC8] text-sm text-[#548C8C] disabled:opacity-50"
                    >
                        {timeLeft > 0 ? `Resend in ${minutes}:${seconds}` : 'Resend Code'}
                    </button>

                    <div className="text-center mt-6">
                        <Link to="/admin/forgot-password" className="text-xs text-[#9CAF88] hover:text-[#548C8C]">
                            Back
                        </Link>
                    </div>
                </div>

                <div className="bg-[#F9F9F9] px-8 py-4 border-t border-[#D7CCC8] text-center">
                    <p className="text-xs text-[#9CAF88] font-medium tracking-wide">
                        Authorized administrators only.
                    </p>
                </div>
            </div>
        </div>
    )
}
