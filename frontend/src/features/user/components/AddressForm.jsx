import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Home, Briefcase, MapPin, ShieldCheck, ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressFormSchema } from '../schemas/userSchema';
import { useAddAddress } from '../hooks/useAddAddress';
import { useUpdateAddress } from '../hooks/useUpdateAddress';
import { useAuthStore } from '../../../store/authStore';
import { Navigate, useNavigate } from 'react-router-dom';

export function AddressForm({
  isEditing = false,
  onSuccess,
  onCancel
}) {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const { mutate: addAddress, isPending: isAdding,
  } = useAddAddress();
  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress();

  const form = useForm({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      fullName: isEditing ? user.fullName : '',
      phone: isEditing ? user.phone : '',
      addressLine: isEditing ? user.addressLine : '',
      addressLine2: isEditing ? user.addressLine2 : '',
      city: isEditing ? user.city : '',
      state: isEditing ? user.state : '',
      pincode: isEditing ? user.pincode : '',
      country: isEditing ? user.country : 'India',
      addressType: isEditing ? user.addressType : 'HOME',
      isDefault: false
    }
  });

  const { register, handleSubmit, formState: { errors }, watch, setValue } = form;

  const addressType = watch('addressType');

  const onSubmit = (data) => {
    addAddress({
      fullName: data.fullName,
      phone: data.phone,
      addressLine: data.addressLine,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      country: data.country,
      addressType: data.addressType,
      isDefault: data.isDefault
    }, {
      onSuccess: () => navigate("/profile/addresses")
    })
  }

  return (
    <div className="bg-white rounded-sm shadow-shelf border border-shelf/10 overflow-hidden relative selection:bg-burgundy/10">
      {/* Decorative Ornament */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none p-6">
        <ShieldCheck size={180} className="text-shelf" />
      </div>

      <div className="p-10 md:p-12 relative z-10">
        <div className="mb-12">
          <h1 className="font-heading text-3xl text-shelf font-bold mb-3">
            {isEditing ? 'Edit Address' : 'Add New Address'}
          </h1>
          <p className="font-ui text-[10px] font-bold text-shelf/40 uppercase tracking-widest">
            Enter your delivery address
          </p>
          <div className="h-0.5 w-12 bg-burgundy mt-4" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60">
                Full Name
              </label>
              <input
                type="text"
                {...register('fullName')}
                placeholder="The Recipient's Name"
                className={`w-full px-5 py-4 bg-paper border-b-2 font-body text-sm text-shelf placeholder:text-shelf/10 outline-none transition-all duration-300 ${errors.fullName ? 'border-burgundy' : 'border-shelf/10 focus:border-burgundy'
                  }`}
              />
              {errors.fullName && <p className="text-burgundy text-[9px] font-bold uppercase tracking-widest mt-2">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60">
                Contact Number
              </label>
              <input
                type="tel"
                {...register('phone')}
                placeholder="Primary Voice Line"
                className={`w-full px-5 py-4 bg-paper border-b-2 font-body text-sm text-shelf placeholder:text-shelf/10 outline-none transition-all duration-300 ${errors.phone ? 'border-burgundy' : 'border-shelf/10 focus:border-burgundy'
                  }`}
              />
              {errors.phone && <p className="text-burgundy text-[9px] font-bold uppercase tracking-widest mt-2">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Row 2: Address Line 1 */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60">
              Street Address (Primary)
            </label>
            <input
              type="text"
              {...register('addressLine')}
              placeholder="Building, Street, Sector"
              className={`w-full px-5 py-4 bg-paper border-b-2 font-body text-sm text-shelf placeholder:text-shelf/10 outline-none transition-all duration-300 ${errors.addressLine ? 'border-burgundy' : 'border-shelf/10 focus:border-burgundy'
                }`}
            />
            {errors.addressLine && <p className="text-burgundy text-[9px] font-bold uppercase tracking-widest mt-2">{errors.addressLine.message}</p>}
          </div>

          {/* Row 3: Address Line 2 */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60">
              Street Address (Secondary) <span className="opacity-30 italic">(Optional)</span>
            </label>
            <input
              type="text"
              {...register('addressLine2')}
              placeholder="Apt, Suite, Unit Number"
              className="w-full px-5 py-4 bg-paper border-b-2 border-shelf/10 focus:border-burgundy font-body text-sm text-shelf placeholder:text-shelf/10 outline-none transition-all duration-300"
            />
          </div>

          {/* Row 4: City, State, PIN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60">City</label>
              <input
                type="text"
                {...register('city')}
                className={`w-full px-5 py-4 bg-paper border-b-2 font-body text-sm text-shelf outline-none transition-all duration-300 ${errors.city ? 'border-burgundy' : 'border-shelf/10 focus:border-burgundy'}`}
              />
              {errors.city && <p className="text-burgundy text-[9px] font-bold uppercase tracking-widest mt-2">{errors.city.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60">State</label>
              <input
                type="text"
                {...register('state')}
                className={`w-full px-5 py-4 bg-paper border-b-2 font-body text-sm text-shelf outline-none transition-all duration-300 ${errors.state ? 'border-burgundy' : 'border-shelf/10 focus:border-burgundy'}`}
              />
              {errors.state && <p className="text-burgundy text-[9px] font-bold uppercase tracking-widest mt-2">{errors.state.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60">PIN Code</label>
              <input
                type="text"
                {...register('pincode')}
                className={`w-full px-5 py-4 bg-paper border-b-2 font-body text-sm text-shelf outline-none transition-all duration-300 ${errors.pincode ? 'border-burgundy' : 'border-shelf/10 focus:border-burgundy'}`}
              />
              {errors.pincode && <p className="text-burgundy text-[9px] font-bold uppercase tracking-widest mt-2">{errors.pincode.message}</p>}
            </div>
          </div>

          {/* Row 5: Country */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60">Country</label>
            <div className="relative">
              <select
                {...register('country')}
                className="w-full px-5 py-4 bg-shelf/5 border-b-2 border-shelf/10 text-shelf font-ui text-[11px] font-bold outline-none focus:border-burgundy transition-colors appearance-none cursor-pointer"
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-shelf/20 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Row 6: Address Type */}
          <div className="space-y-4 pt-4">
            <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-shelf/60">Address Type</label>
            <div className="flex flex-wrap gap-4">
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'work', icon: Briefcase, label: 'Work' },
                { id: 'other', icon: MapPin, label: 'Other' }
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setValue('addressType', type.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-sm font-ui text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${addressType === type.id
                    ? 'bg-shelf text-paper shadow-shelf scale-105'
                    : 'bg-paper text-shelf/40 border border-shelf/5 hover:border-shelf/20'
                    }`}
                >
                  <type.icon size={14} /> {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 7: Default Checkbox */}
          <div className="pt-6">
            <label className="flex items-center gap-4 cursor-pointer group select-none">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  {...register('isDefault')}
                  className="peer appearance-none w-5 h-5 border-2 border-shelf/10 rounded-sm bg-white checked:bg-burgundy checked:border-burgundy transition-all duration-300"
                />
                <span className="absolute text-paper opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none text-xs font-bold">✓</span>
              </div>
              <span className="font-ui text-[10px] font-bold uppercase tracking-widest text-shelf/40 group-hover:text-shelf transition-colors">
                Set as primary address
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-10 border-t border-shelf/5 flex flex-col-reverse md:flex-row gap-6 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-10 py-4 border border-shelf/10 text-shelf/40 font-ui text-[11px] font-bold uppercase tracking-[0.2em] hover:text-burgundy transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding || isUpdating}
              className="px-12 py-4 bg-shelf text-paper font-ui font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-burgundy shadow-shelf transition-all duration-500 disabled:opacity-30 group relative overflow-hidden"
            >
              {(isAdding || isUpdating) ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                'Save Address'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
