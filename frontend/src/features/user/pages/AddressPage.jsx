import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, ChevronRight, Home } from 'lucide-react';
import { Navbar } from '../../home/components/Navbar';
import { Footer } from '../../home/components/Footer';
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
  console.log(addresses);

  return (
    <div className="min-h-screen flex flex-col bg-paper relative overflow-hidden selection:bg-burgundy/10">
      {/* Decorative Background Concept */}
      <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none p-10">
        <Home size={600} className="text-shelf" />
      </div>

      <Navbar />

      <PageTransition>
        <main className="flex-grow container mx-auto px-6 md:px-12 pt-32 pb-20 z-10">

          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10 hidden md:flex items-center gap-2"
          >
            <Link to="/" className="text-[10px] font-bold uppercase tracking-widest text-shelf/40 hover:text-burgundy transition-colors">Home</Link>
            <ChevronRight size={10} className="text-shelf/20" />
            <Link to="/profile" className="text-[10px] font-bold uppercase tracking-widest text-shelf/40 hover:text-burgundy transition-colors">Profile</Link>
            <ChevronRight size={10} className="text-shelf/20" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-shelf">My Addresses</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <ProfileSidebar
                activeSection="addresses"
                onSectionChange={(s) => s !== 'addresses' && navigate('/profile')} // Logic to handle section switches
              />
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                <div className="space-y-2">
                  <h1 className="font-heading text-4xl font-bold text-shelf tracking-tight">
                    My Addresses
                  </h1>
                  <p className="font-ui text-[10px] font-bold text-shelf/40 uppercase tracking-widest">
                    Manage your delivery addresses
                  </p>
                  <div className="h-0.5 w-12 bg-burgundy mt-4" />
                </div>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/profile/addresses/new')}
                  className="library-button bg-shelf text-paper font-ui font-bold uppercase tracking-[0.2em] text-[11px] px-8 py-4 shadow-shelf hover:bg-burgundy transition-all duration-500 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add New Address
                </motion.button>
              </div>

              {addresses ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-sm border border-shelf/10 p-20 flex flex-col items-center justify-center text-center shadow-shelf"
                >
                  <div className="w-24 h-24 bg-paper rounded-full flex items-center justify-center mb-10 shadow-inner border border-shelf/5">
                    <MapPin className="w-10 h-10 text-shelf/20" />
                  </div>
                  <h3 className="font-heading text-2xl text-shelf font-bold mb-4">
                    No Addresses Found
                  </h3>
                  <p className="font-body text-shelf/40 mb-10 max-w-sm text-sm">
                    You haven't added any addresses to your profile yet.
                  </p>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/profile/addresses/new')}
                    className="library-button-secondary border-burgundy text-burgundy font-bold uppercase tracking-widest text-[11px] px-10 py-4"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add your first address
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </PageTransition>

      <Footer />
    </div>
  );
}