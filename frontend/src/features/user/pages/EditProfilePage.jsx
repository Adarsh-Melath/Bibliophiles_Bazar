import React from 'react';
import { Navbar } from '../../home/components/Navbar';
import { Footer } from '../../home/components/Footer';
import ProfileSidebar from '../components/ProfileSidebar';
import EditProfileForm from '../components/EditProfileForm';
import PageTransition from '../../../components/ui/PageTransition';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EditProfilePage() {
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
            <span className="text-[10px] font-bold uppercase tracking-widest text-shelf">Edit Profile</span>
          </motion.div>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            <div className="lg:w-80 flex-shrink-0">
              <ProfileSidebar
                activeSection="edit-archives"
                onSectionChange={() => { }} // Placeholder as we are on a dedicated page
              />
            </div>

            <div className="flex-grow min-w-0 w-full">
              <EditProfileForm />
            </div>
          </div>
        </main>
      </PageTransition>

      <Footer />
    </div>
  );
}
