import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Edit2, ShieldCheck, Store, BookOpen } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import Badge from '../../../components/ui/Badge';

const ROLE_MAP = {
  admin: { label: 'Administrator', icon: ShieldCheck, color: 'text-gold' },
  vendor: { label: 'Artisan Vendor', icon: Store, color: 'text-gold' },
  user: { label: 'Distinguished Member', icon: BookOpen, color: 'text-gold' },
};

export default function ProfileHeader({ onEdit }) {
  const { data: user, isLoading } = useProfile();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-64 bg-ink/[0.02] rounded-sm animate-pulse mb-12 border border-ink/[0.05]" />
    );
  }

  const memberSince = user?.createdAt ? new Date(user.createdAt).getFullYear() : '2026';
  const roleInfo = ROLE_MAP[user?.role] || ROLE_MAP.user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="editorial-card p-12 md:p-16 mb-12 overflow-hidden relative bg-white/50 backdrop-blur-md border border-ink/[0.03]"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Avatar Container */}
        <div className="relative group">
            <div className="w-36 h-36 rounded-full bg-ink text-white flex items-center justify-center border-8 border-white shadow-2xl overflow-hidden relative z-10 transition-transform duration-700 group-hover:scale-105">
            {user?.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
            ) : (
                <span className="text-5xl font-heading font-bold">{user?.name?.charAt(0) || 'R'}</span>
            )}
            </div>
            {/* Subtle decorative ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gold/20 -m-3 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000"></div>
        </div>

        {/* Info Column */}
        <div className="flex-grow text-center md:text-left pt-4">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-ink tracking-tighter">
              {user?.name || 'Distinguished Reader'}
            </h1>
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-ink text-white rounded-full text-[9px] font-bold uppercase tracking-[0.4em] shadow-xl shadow-ink/20">
              <roleInfo.icon size={12} className="text-gold" />
              {roleInfo.label}
            </div>
          </div>
          
          <p className="font-ui text-[11px] font-bold uppercase tracking-[0.2em] text-ink/30 mb-8">{user?.email}</p>
          
          <div className="flex items-center justify-center md:justify-start gap-6">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-ink/[0.03] border border-ink/[0.05] rounded-sm text-[9px] font-bold uppercase tracking-[0.4em] text-ink/30">
              <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_#d4af37]"></div>
              Registry Entry: {memberSince}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 md:mt-0 md:pt-4">
          <motion.button
            onClick={() => navigate('/profile/edit')}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-5 bg-ink text-white font-bold uppercase tracking-[0.4em] text-[11px] shadow-2xl shadow-ink/20 hover:bg-gold transition-all duration-700 flex items-center gap-4 group"
          >
            <Edit2 size={16} className="group-hover:rotate-12 transition-transform duration-500" />
            Modify Profile
          </motion.button>
        </div>
        
      </div>
    </motion.div>
  );
}