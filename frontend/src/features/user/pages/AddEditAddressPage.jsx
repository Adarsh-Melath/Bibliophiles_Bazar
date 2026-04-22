import React from 'react';
import { Navbar } from '../../home/components/Navbar';
import { Footer } from '../../home/components/Footer';
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
    <div className="min-h-screen bg-paper flex flex-col font-body selection:bg-burgundy/10">
      <Navbar />

      <PageTransition>
        <main className="flex-grow container mx-auto px-6 md:px-12 pt-32 pb-20">
          
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
            <Link to="/profile/addresses" className="text-[10px] font-bold uppercase tracking-widest text-shelf/40 hover:text-burgundy transition-colors">Addresses</Link>
            <ChevronRight size={10} className="text-shelf/20" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-shelf">
              {isEditing ? 'Edit Address' : 'Add Address'}
            </span>
          </motion.div>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            <div className="lg:w-80 flex-shrink-0">
                <ProfileSidebar
                    activeSection="addresses"
                    onSectionChange={() => navigate('/profile')} 
                />
            </div>
            
            <div className="flex-grow min-w-0 w-full max-w-4xl">
                <AddressForm 
                    isEditing={isEditing} 
                    onSuccess={() => navigate('/profile/addresses')}
                    onCancel={() => navigate('/profile/addresses')}
                />
            </div>
          </div>
        </main>
      </PageTransition>

      <Footer />
    </div>
  );
}
