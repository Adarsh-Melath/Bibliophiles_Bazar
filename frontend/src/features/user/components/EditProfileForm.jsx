import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle2,
  User,
  Mail,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useAuthStore } from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfile } from '../hooks/useUpdateProfile'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { editProfileSchema } from '../schemas/userSchema';
import api from '../../../lib/axios';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

export default function EditProfileForm() {
  const [countryCode, setCountryCode] = useState('+91');
  const { data: profileUser, isLoading } = useProfile();
  const { user: authUser } = useAuthStore();
  const activeUser = profileUser || authUser;
  const [preview, setPreview] = useState(activeUser?.profileImage || null);
  const [removed, setRemoved] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    if (activeUser?.profileImage && !removed) {
      setPreview(activeUser.profileImage);
    }
  }, [activeUser?.profileImage, removed]);


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: activeUser?.name || '',
      phone: activeUser?.phone || '',
    }
  })

  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { mutate: removePhoto, isPending: isRemoving } = useUpdateProfile();

  const onSubmit = (data) => {
    updateProfile(
      {
        name: data.name, phone: data.phone, profileImage: removed ? null : preview
      },
      {
        onSuccess: () => navigate('/profile')
      }
    )
  }

  const handleClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData();
    formData.append("file", file);

    setPreview(URL.createObjectURL(file));

    try {
      const res = await api.post('/user/profile/image', formData)

      setPreview(res.data.url)

    } catch (err) {
      setPreview(null);//revert on error 
    }
  }

  const onClick = () => {
    removePhoto(
      { name: activeUser.name, phone: activeUser.phone || '', profileImage: null },
      {
        onSuccess: () => {
          setPreview(null);
          setRemoved(true);
        }
      }
    )
  }

  if (isLoading) {
    return <div className="p-12 text-center text-shelf/40 font-ui animate-pulse">Loading profile...</div>;
  }

  return (
    <div className="flex-grow bg-white border border-shelf/10 shadow-shelf rounded-sm p-6 md:p-10 relative overflow-hidden selection:bg-burgundy/10">

      {/* Subtle Background Ornament */}
      <div className="absolute -right-12 -bottom-12 opacity-[0.03] pointer-events-none">
        <ShieldCheck size={300} className="text-shelf" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <h1 className="font-heading text-4xl font-bold text-shelf tracking-tight mb-2">
            Edit Profile
          </h1>
          <p className="text-shelf/40 font-body text-sm uppercase tracking-widest font-bold">
            Manage your details
          </p>
          <div className="h-0.5 w-12 bg-burgundy mt-4" />
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Photo Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pb-10 border-b border-shelf/5"
          >
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-paper flex items-center justify-center border-4 border-shelf/5 shadow-shelf overflow-hidden relative z-10 transition-transform group-hover:scale-105 duration-500">
                {preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-shelf/20" />
                )}
              </div>
              <div className="absolute inset-0 rounded-full border border-burgundy/20 -m-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>

            <div className="flex-grow space-y-4">
              <div className="flex flex-wrap gap-4">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => handleClick()}
                  className="px-6 py-2.5 bg-shelf text-paper rounded-sm font-ui text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-burgundy transition-all duration-300 shadow-shelf flex items-center gap-2"
                >
                  <Upload size={14} />
                  Upload New
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 text-shelf/40 hover:text-burgundy rounded-sm font-ui text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-300 flex items-center gap-2"
                  onClick={() => onClick()}
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>

              <div className="border-2 border-dashed border-shelf/10 rounded-sm p-4 text-center bg-paper/50 transition-colors hover:bg-shelf/5 cursor-pointer">
                <p className="text-[9px] text-shelf/40 font-bold uppercase tracking-widest leading-relaxed">
                  Click or drag image file here<br />
                  (Optimal: 800x800px High-Res)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form Fields */}
          <div className="space-y-6">

            {/* Full Name */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register('name')} className={`w-full px-5 py-4 bg-paper border-b-2 font-body text-sm text-shelf 
  placeholder:text-shelf/20 outline-none transition-all duration-300
  ${errors.name ? 'border-burgundy' : 'border-shelf/10 hover:border-shelf/30 focus:border-burgundy'}`}
                />
              </div>
              {errors.name && (
                <p className="text-burgundy text-[10px] font-bold uppercase tracking-widest mt-2">{errors.name.message}</p>
              )}
            </motion.div>
            {/* Phone Number */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60">
                Contact Number
              </label>
              <div className="flex gap-4">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-24 px-4 py-4 bg-shelf/5 border-b-2 border-shelf/10 text-shelf font-ui text-[11px] font-bold outline-none focus:border-burgundy transition-colors appearance-none cursor-pointer"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <div className="relative flex-grow">
                  <input
                    type="tel"
                    {...register('phone')}
                    className={`w-full px-5 py-4 bg-paper border-b-2 font-body text-sm text-shelf 
  placeholder:text-shelf/20 outline-none transition-all duration-300
  ${errors.phone ? 'border-burgundy' : 'border-shelf/10 hover:border-shelf/30 focus:border-burgundy'}`}

                  />
                </div>
                {errors.phone && (
                  <p className="text-burgundy text-[10px] font-bold uppercase tracking-widest mt-2">{errors.phone.message}</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Submission Actions */}
          <motion.div
            variants={itemVariants}
            className="pt-10 flex flex-col sm:flex-row gap-6 sm:justify-end"
          >
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="px-10 py-4 border border-shelf/10 text-shelf/40 font-ui text-[11px] font-bold uppercase tracking-[0.2em] hover:text-burgundy transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-12 py-4 bg-shelf text-paper font-ui font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-burgundy shadow-shelf transition-all duration-500 disabled:opacity-30 group relative overflow-hidden"
            >
              <span className={isPending ? 'opacity-0' : 'opacity-100'}>Save Changes</span>
              {isPending && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                </div>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
