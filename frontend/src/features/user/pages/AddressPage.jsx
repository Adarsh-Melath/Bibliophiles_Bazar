import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, ChevronRight, Home } from 'lucide-react';
import ProfileSidebar from '../components/ProfileSidebar';
import { AddressCard } from '../components/AddressCard';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../../../components/ui/PageTransition';
import { useDeleteAddress } from '../hooks/useDeleteAddress';
import { useSetDefaultAddress } from '../hooks/useSetDefaultAddress'
import { useAddresses } from '../hooks/useAddresses';


export default function AddressPage() {
  const navigate = useNavigate();

  const { data: addresses } = useAddresses();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setDefault } = useSetDefaultAddress();

  const handleEdit = (id) => {
    navigate(`/profile/addresses/new?mode=edit&id=${id}`)
  }

  const handleSetDefault = (id) => {
    const address = addresses.find(address => address.id === id);
    if (address) setDefault({ id, address })
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper relative overflow-hidden font-ui selection:bg-gold/20">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none p-20">
        <MapPin size={400} className="text-ink rotate-12" />
      </div>

      <main className="flex-grow section-container pt-40 pb-32 z-10">
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
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink">Delivery Points</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Sidebar */}
          <div className="lg:w-80 w-full shrink-0 lg:sticky lg:top-40">
            <ProfileSidebar activeSection="addresses" />
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
              <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-4 mb-2"
                >
                    <div className="h-[1px] w-8 bg-gold" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold">Logistics Registry</span>
                </motion.div>
                <h1 className="text-5xl md:text-6xl font-bold text-ink tracking-tighter">
                  My <span className="italic font-heading">Addresses</span>
                </h1>
                <p className="text-ink/30 text-lg">Manage your curated delivery destinations.</p>
              </div>

              <motion.button
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/profile/addresses/new')}
                className="px-10 py-5 bg-ink text-white font-bold uppercase tracking-[0.4em] text-[11px] shadow-2xl shadow-ink/20 hover:bg-gold transition-all duration-700 flex items-center gap-4 group"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                Add New Record
              </motion.button>
            </div>

            {addresses && addresses.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {addresses.map((address, index) => (
                  <AddressCard
                    key={address.id}
                    id={address.id}
                    index={index}
                    name={address.fullName}
                    phone={address.phone}
                    addressLines={[address.addressLine, address.addressLine2].filter(Boolean).join(', ')}
                    cityStatePin={`${address.city}, ${address.state} - ${address.pincode}`}
                    country={address.country}
                    isDefault={address.isDefault}
                    onDelete={deleteAddress}
                    onEdit={handleEdit}
                    onSetPrimary={handleSetDefault}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="editorial-card p-24 flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-md border border-ink/[0.03]"
              >
                <div className="w-24 h-24 bg-ink/[0.02] rounded-full flex items-center justify-center mb-10 border border-ink/[0.05] shadow-inner group overflow-hidden">
                  <MapPin className="w-10 h-10 text-ink/10 group-hover:text-gold transition-colors duration-700 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-3xl font-bold text-ink mb-4 tracking-tight">
                  No Destinations Recorded
                </h3>
                <p className="text-ink/40 mb-12 max-w-sm text-lg leading-relaxed">
                  Your delivery registry is currently empty. Begin by adding your primary residence or office.
                </p>
                <motion.button
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/profile/addresses/new')}
                  className="px-12 py-5 border-2 border-gold text-gold font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-gold hover:text-white transition-all duration-700"
                >
                  Create First Record
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}