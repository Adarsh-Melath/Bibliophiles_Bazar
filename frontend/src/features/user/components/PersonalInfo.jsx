import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2 } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import ManageProfileModal from './ManageProfileModal';

export default function PersonalInfo() {
  const { data: user, isLoading } = useProfile();
  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 animate-pulse border border-tan/20 mb-8 h-64" />
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-tan/20 mb-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading font-bold text-xl text-teal">
          Personal Information
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-sage hover:text-teal font-ui text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Edit2 size={16} />
          Edit Details
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {infoFields.map((field, index) => (
          <div
            key={index}
            className="group relative border-b border-tan/20 pb-4 last:border-0 md:[&:nth-last-child(-n+2)]:border-0 md:[&:nth-last-child(-n+2)]:pb-0"
          >
            <p className="font-ui text-xs text-teal/60 uppercase tracking-wider mb-1">
              {field.label}
            </p>
            <div className="flex justify-between items-start">
              <p className="font-body text-teal font-medium capitalize">{field.value}</p>
            </div>
          </div>
        ))}
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
