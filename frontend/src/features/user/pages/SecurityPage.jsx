import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, ShieldCheck, AlertTriangle, Loader } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import api from '../../../lib/axios'
import ProfileSidebar from '../components/ProfileSidebar'
import { changePasswordSchema } from '../schemas/userSchema'
import { Navbar } from '../../home/components/Navbar'
import { Footer } from '../../home/components/Footer'
import { motion } from 'framer-motion'
import PageTransition from '../../../components/ui/PageTransition'

export default function SecurityPage() {
    const [show, setShow] = useState({ current: false, new: false, confirm: false })
    const [success, setSuccess] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(changePasswordSchema),
    })

    const { mutate: changePassword, isPending, error } = useMutation({
        mutationFn: (data) => api.put('/user/change-password', {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        }),
        onSuccess: () => {
            setSuccess(true)
            reset()
            setTimeout(() => setSuccess(false), 4000)
        },
    })

    const toggle = (field) => setShow(s => ({ ...s, [field]: !s[field] }))

    const inputClass = `w-full pl-11 pr-11 py-4 bg-transparent border-b border-shelf/10
                        font-body text-base text-shelf placeholder:text-shelf/20
                        focus:outline-none focus:border-burgundy
                        transition-all duration-300`

    return (
        <div className="min-h-screen bg-paper font-body text-shelf selection:bg-burgundy/10">
            <Navbar />

            <PageTransition>
                <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-12">
                    <ProfileSidebar />

                    <div className="flex-1 min-w-0 max-w-3xl flex flex-col gap-10">

                        {/* Archival Header */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border-b border-shelf/5 pb-10"
                        >
                            <span className="font-ui text-[10px] uppercase font-bold tracking-[0.4em] text-burgundy mb-4 block">Security</span>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold text-shelf tracking-tight">
                                Security Settings
                            </h1>
                            <p className="font-body text-shelf/40 mt-3 text-base italic max-w-lg">
                                Manage your login details and protect your account.
                            </p>
                        </motion.div>

                        {/* Change Password Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="library-panel p-10"
                        >
                            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-shelf/5">
                                <div className="w-12 h-12 rounded-sm bg-shelf/5
                                                flex items-center justify-center border border-shelf/5 shadow-inner">
                                    <Lock size={20} className="text-burgundy" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl font-bold text-shelf tracking-tight">
                                        Change Password
                                    </h2>
                                    <p className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-shelf/30 mt-1">
                                        Enter a new password below
                                    </p>
                                </div>
                            </div>

                            {/* Notifications */}
                            {success && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-burgundy/5 border-l-4 border-burgundy text-burgundy
                                                text-xs font-bold uppercase tracking-widest px-6 py-4 mb-8 flex items-center gap-3 shadow-soft"
                                >
                                    <ShieldCheck size={18} />
                                    Password updated successfully
                                </motion.div>
                            )}

                            {error && (
                                <div className="bg-shelf/5 border-l-4 border-shelf/20 text-shelf/60
                                                text-xs font-bold uppercase tracking-widest px-6 py-4 mb-8">
                                    {error.response?.data?.error || 'Update failed'}
                                </div>
                            )}

                            <form onSubmit={handleSubmit(d => changePassword(d))} className="space-y-10">

                                {/* Current Password */}
                                <div className="space-y-3">
                                    <label className="font-ui text-[10px] font-bold text-shelf/40 uppercase tracking-[0.25em] block">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register('currentPassword')}
                                            type={show.current ? 'text' : 'password'}
                                            placeholder="Your current password"
                                            className={inputClass}
                                        />
                                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-shelf/10" />
                                        <button type="button" onClick={() => toggle('current')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-shelf/20 hover:text-burgundy transition-colors">
                                            {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.currentPassword && (
                                        <p className="font-ui text-[9px] font-bold text-burgundy uppercase tracking-wider mt-2">{errors.currentPassword.message}</p>
                                    )}
                                </div>

                                {/* New Passwords Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="font-ui text-[10px] font-bold text-shelf/40 uppercase tracking-[0.25em] block">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                {...register('newPassword')}
                                                type={show.new ? 'text' : 'password'}
                                                placeholder="Min 8 characters"
                                                className={inputClass}
                                            />
                                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-shelf/10" />
                                            <button type="button" onClick={() => toggle('new')}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-shelf/20 hover:text-burgundy transition-colors">
                                                {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {errors.newPassword && (
                                            <p className="font-ui text-[9px] font-bold text-burgundy uppercase tracking-wider mt-2">{errors.newPassword.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="font-ui text-[10px] font-bold text-shelf/40 uppercase tracking-[0.25em] block">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                {...register('confirmPassword')}
                                                type={show.confirm ? 'text' : 'password'}
                                                placeholder="Repeat password"
                                                className={inputClass}
                                            />
                                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-shelf/10" />
                                            <button type="button" onClick={() => toggle('confirm')}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-shelf/20 hover:text-burgundy transition-colors">
                                                {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="font-ui text-[9px] font-bold text-burgundy uppercase tracking-wider mt-2">{errors.confirmPassword.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button type="submit" disabled={isPending}
                                        className="bg-shelf text-paper font-ui text-[10px] font-bold uppercase tracking-[0.3em] px-12 py-5 rounded-sm shadow-shelf hover:bg-burgundy transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3">
                                        {isPending
                                            ? <><Loader size={16} className="animate-spin" /> Saving...</>
                                            : 'Save Changes'
                                        }
                                    </button>
                                </div>

                            </form>
                        </motion.div>

                        {/* Danger Zone - Archival Restricted Area */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-paper border border-burgundy/10 p-10 rounded-sm relative overflow-hidden"
                        >
                            {/* Decorative background for danger area */}
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                                <AlertTriangle size={120} className="text-burgundy" />
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-sm bg-burgundy/5
                                                flex items-center justify-center border border-burgundy/10">
                                    <AlertTriangle size={20} className="text-burgundy" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl font-bold text-shelf tracking-tight">
                                        Danger Zone
                                    </h2>
                                    <p className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-shelf/30 mt-1">
                                        Caution: This cannot be undone
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between p-8 rounded-sm
                                            bg-burgundy/[0.02] border border-burgundy/5 gap-6">
                                <div className="text-center sm:text-left">
                                    <p className="font-heading text-xl font-bold text-shelf">
                                        Delete Account
                                    </p>
                                    <p className="font-body text-shelf/40 text-sm mt-1 italic">
                                        Permanently delete your account and all your data.
                                    </p>
                                </div>
                                <button className="px-8 py-3 border-2 border-burgundy/20
                                                   text-burgundy font-ui text-[10px] font-bold uppercase tracking-[0.25em]
                                                   hover:bg-burgundy hover:text-paper
                                                   transition-all duration-300 rounded-sm shadow-soft">
                                    Delete My Account
                                </button>
                            </div>
                        </motion.div>

                    </div>
                </main>
            </PageTransition>

            <Footer />
        </div>
    )
}