import React, { useState } from 'react';
import ProfileSidebar from '../components/ProfileSidebar';
import { AddressForm } from '../components/AddressForm';
import PageTransition from '../../../components/ui/PageTransition';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function AddEditAddressPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isEditing = searchParams.get('mode') === 'edit';

  return (
    <div className="min-h-screen bg-paper flex flex-col font-ui selection:bg-gold/20">
      <main className="flex-grow section-container pt-40 pb-32">

        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16 hidden md:flex items-center gap-4"
        >
          <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 hover:text-gold transition-all duration-500">Archive</Link>
          <div className="h-[1px] w-4 bg-ink/10" />
          <Link to="/profile" className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 hover:text-gold transition-all duration-500">Registry</Link>
          <div className="h-[1px] w-4 bg-ink/10" />
          <Link to="/profile/addresses" className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 hover:text-gold transition-all duration-500">Delivery Points</Link>
          <div className="h-[1px] w-4 bg-ink/10" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink">
            {isEditing ? 'Modify Record' : 'New Entry'}
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          <div className="lg:w-80 w-full shrink-0 lg:sticky lg:top-40">
            <ProfileSidebar activeSection="addresses" />
          </div>

          <div className="flex-grow min-w-0 w-full max-w-4xl">
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-4 mb-4"
              >
                <div className="h-[1px] w-8 bg-gold" />
                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold">Logistics Protocol</span>
              </motion.div>
              <h1 className="text-5xl font-bold text-ink tracking-tighter">
                {isEditing ? 'Modify Destination' : 'Register New Address'}
              </h1>
            </div>

            <div className="editorial-card p-12 bg-white/50 backdrop-blur-md border border-ink/[0.03]">
              <AddressForm
                isEditing={isEditing}
                onSuccess={() => navigate('/profile/addresses')}
                onCancel={() => navigate('/profile/addresses')}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
