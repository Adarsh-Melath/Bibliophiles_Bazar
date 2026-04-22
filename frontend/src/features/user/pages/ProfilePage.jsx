import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../home/components/Navbar';
import { Footer } from '../../home/components/Footer';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileHeader from '../components/ProfileHeader';
import AccountStats from '../components/AccountStats';
import RecentOrders from '../components/RecentOrders';
import WishlistPreview from '../components/WishlistPreview';
import { useProfile } from '../hooks/useProfile';
import PageTransition from '../../../components/ui/PageTransition';

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const { data: user } = useProfile();

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <ProfileHeader onEdit={() => setShowEditModal(true)} />
            <AccountStats />
            <RecentOrders />
            <WishlistPreview />
          </motion.div>
        );
      case 'addresses':
        return (
          <motion.div
            key="addresses"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="library-panel p-12 flex flex-col items-center justify-center text-center min-h-[400px]"
          >
            <h2 className="font-heading font-bold text-3xl text-shelf mb-3">Saved Addresses</h2>
            <p className="font-body text-shelf/60 max-w-sm">Manage your shipping and billing addresses for a faster checkout experience.</p>
            <button className="library-button mt-8">Add New Address</button>
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="other"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="library-panel p-12 flex flex-col items-center justify-center text-center min-h-[400px]"
          >
            <div className="w-20 h-20 bg-shelf text-paper rounded-full flex items-center justify-center mb-6 shadow-soft">
              <span className="font-heading text-3xl capitalize">
                {activeSection[0]}
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl text-shelf mb-3 capitalize">
              {activeSection}
            </h2>
            <p className="font-body text-shelf/60 max-w-md">
              This section is currently being updated. Please check
              back later to manage your {activeSection}.
            </p>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navbar />

      {/* Page Content */}
      <PageTransition>
        <main className="flex-grow pt-32 pb-20">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
              {/* Sidebar Column */}
              <div className="lg:w-80 flex-shrink-0">
                <ProfileSidebar
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                />
              </div>

              {/* Content Column Area */}
              <div className="flex-grow min-w-0">
                <AnimatePresence mode="wait">
                  {renderContent()}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>

      <Footer />
    </div>
  );
}