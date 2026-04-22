import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Edit2, ShieldCheck, Store, BookOpen } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import Badge from '../../../components/ui/Badge';

const ROLE_MAP = {
  admin: { label: 'Administrator', icon: ShieldCheck, variant: 'info' },
  vendor: { label: 'Vendor', icon: Store, variant: 'warning' },
  user: { label: 'Member', icon: BookOpen, variant: 'success' },
};

export default function ProfileHeader({ onEdit }) {
  const { data: user, isLoading } = useProfile();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-48 bg-white rounded-2xl animate-pulse mb-8 border border-tan/20" />
    );
  }

  const memberSince = user?.createdAt ? new Date(user.createdAt).getFullYear() : '2026';
  const roleInfo = ROLE_MAP[user?.role] || ROLE_MAP.user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="library-panel p-8 md:p-10 mb-10 overflow-hidden relative"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-burgundy/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar Container */}
        <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-paper flex items-center justify-center border-4 border-shelf/5 shadow-shelf overflow-hidden relative z-10">
            {user?.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
            ) : (
                <User size={48} className="text-shelf/30" />
            )}
            </div>
            {/* Subtle decorative ring */}
            <div className="absolute inset-0 rounded-full border border-burgundy/20 -m-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        {/* Info Column */}
        <div className="flex-grow text-center md:text-left pt-2">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-shelf tracking-tight">
              {user?.name || 'Reader'}
            </h1>
            <Badge variant={roleInfo.variant} className="w-fit mx-auto md:mx-0">
              <roleInfo.icon size={10} className="mr-1.5" />
              {roleInfo.label}
            </Badge>
          </div>
          
          <p className="font-body text-shelf/50 mb-6">{user?.email}</p>
          
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-shelf/5 rounded text-[10px] font-ui font-bold uppercase tracking-widest text-shelf/60">
              <span className="w-1 h-1 rounded-full bg-burgundy"></span>
              Joined in {memberSince}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 md:mt-0 md:pt-4">
          <motion.button
            onClick={() => navigate('/profile/edit')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="library-button bg-shelf text-paper px-8 py-3.5 rounded-sm shadow-shelf flex items-center gap-2 group"
          >
            <Edit2 size={14} className="group-hover:text-burgundy transition-colors" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Edit Profile</span>
          </motion.button>
        </div>
        
      </div>
    </motion.div>
  );
}