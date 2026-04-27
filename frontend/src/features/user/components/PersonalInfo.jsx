import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Shield } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import ManageProfileModal from './ManageProfileModal';

export default function PersonalInfo() {
  const { data: user, isLoading } = useProfile();
  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-white rounded-sm p-10 animate-pulse border border-shelf/5 mb-8 h-80" />
    );
  }

  const infoFields = [
    { label: 'Full Name', value: user?.name || 'Not provided' },
    { label: 'Email Address', value: user?.email || 'Not provided' },
    { label: 'Phone Number', value: user?.phone ? `+91 ${user.phone}` : 'Not provided' },
    { label: 'Account Type', value: user?.role || 'User' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="library-panel p-8 md:p-12 mb-8 relative group border-shelf/5 shadow-soft"
    >
      <div className="flex items-center justify-between mb-12 border-b border-shelf/5 pb-6">
        <div>
            <h2 className="font-heading font-bold text-2xl text-shelf">
                Member Profile
            </h2>
            <div className="h-0.5 w-8 bg-burgundy mt-2"></div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="text-burgundy hover:text-shelf font-ui text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 group/btn"
        >
          <div className="w-8 h-8 rounded-full bg-burgundy/5 flex items-center justify-center group-hover/btn:bg-burgundy group-hover/btn:text-white transition-all">
            <Edit2 size={12} />
          </div>
          Edit Record
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {infoFields.map((field, index) => (
          <div
            key={index}
            className="group relative border-b border-shelf/[0.03] pb-6 last:border-0 md:[&:nth-last-child(-n+2)]:border-0 md:[&:nth-last-child(-n+2)]:pb-0"
          >
            <p className="font-ui text-[9px] text-shelf/30 font-bold uppercase tracking-[0.3em] mb-2">
              {field.label}
            </p>
            <div className="flex justify-between items-start">
              <p className="font-body text-shelf font-semibold capitalize text-base italic leading-none">{field.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative Security Seal */}
      <div className="absolute bottom-10 right-10 text-shelf/[0.02] pointer-events-none group-hover:text-shelf/[0.04] transition-colors">
        <Shield size={120} strokeWidth={1} />
      </div>

      {showModal && (
        <ManageProfileModal
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </motion.div>
  );
}
