import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Home, Briefcase, MapPin, ShieldCheck, ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressFormSchema } from '../schemas/userSchema';
import { useAddAddress } from '../hooks/useAddAddress';
import { useUpdateAddress } from '../hooks/useUpdateAddress';
import { useSetDefaultAddress } from '../hooks/useSetDefaultAddress'
import { useAuthStore } from '../../../store/authStore';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAddresses } from '../hooks/useAddresses';

export function AddressForm({
  isEditing = false,
  onSuccess,
  onCancel
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const addressId = searchParams.get('id');
  
  const user = useAuthStore(state => state.user);
  const { data: addresses } = useAddresses();
  const { mutate: addAddress, isPending: isAdding } = useAddAddress();
  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress();
  const { mutate: setDefaultAddress } = useSetDefaultAddress();

  // Find the address to edit
  const address = isEditing && addressId && addresses 
    ? addresses.find(addr => addr.id === parseInt(addressId))
    : null;

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      addressLine: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      addressType: 'home',
      isDefault: false
    }
  });

  useEffect(() => {
    if (isEditing && address) {
      reset({
        fullName: address.fullName || '',
        phone: address.phone || '',
        addressLine: address.addressLine || '',
        addressLine2: address.addressLine2 || '',
        city: address.city || '',
        state: address.state || '',
        pincode: address.pincode || '',
        country: address.country || 'India',
        addressType: address.addressType || 'home',
        isDefault: address.isDefault || false
      });
    }
  }, [address, isEditing, reset]);

  const addressType = watch('addressType');

  const onSubmit = (data) => {
    if (isEditing && addressId) {
      updateAddress({ id: parseInt(addressId), data }, {
        onSuccess: () => navigate("/profile/addresses")
      });
    } else {
      addAddress(data, {
        onSuccess: () => navigate("/profile/addresses")
      });
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-md border border-ink/[0.03] overflow-hidden relative selection:bg-gold/20 shadow-2xl shadow-ink/5">
      {/* Decorative Ornament */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none p-10">
        <MapPin size={240} className="text-ink rotate-12" />
      </div>

      <div className="p-12 md:p-16 relative z-10">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold">Registry Detail</span>
          </motion.div>
          <h1 className="text-4xl font-bold text-ink tracking-tighter">
            {isEditing ? 'Modify Destination' : 'Record New Destination'}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 ml-1">
                Full Name
              </label>
              <input
                type="text"
                {...register('fullName')}
                placeholder="Recipient Identity"
                className={`w-full px-1 py-4 bg-transparent border-b border-ink/10 font-body text-base text-ink placeholder:text-ink/10 outline-none transition-all duration-500 ${errors.fullName ? 'border-velvet' : 'focus:border-gold'
                  }`}
              />
              {errors.fullName && <p className="text-velvet text-[9px] font-bold uppercase tracking-widest mt-2">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 ml-1">
                Contact Number
              </label>
              <input
                type="tel"
                {...register('phone')}
                placeholder="Secure Voice Line"
                className={`w-full px-1 py-4 bg-transparent border-b border-ink/10 font-body text-base text-ink placeholder:text-ink/10 outline-none transition-all duration-500 ${errors.phone ? 'border-velvet' : 'focus:border-gold'
                  }`}
              />
              {errors.phone && <p className="text-velvet text-[9px] font-bold uppercase tracking-widest mt-2">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Row 2: Address Line 1 */}
          <div className="space-y-3">
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 ml-1">
              Primary Street Address
            </label>
            <input
              type="text"
              {...register('addressLine')}
              placeholder="Building, Street, Sector Identification"
              className={`w-full px-1 py-4 bg-transparent border-b border-ink/10 font-body text-base text-ink placeholder:text-ink/10 outline-none transition-all duration-500 ${errors.addressLine ? 'border-velvet' : 'focus:border-gold'
                }`}
            />
            {errors.addressLine && <p className="text-velvet text-[9px] font-bold uppercase tracking-widest mt-2">{errors.addressLine.message}</p>}
          </div>

          {/* Row 3: Address Line 2 */}
          <div className="space-y-3">
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 ml-1">
              Secondary Identifier <span className="opacity-30 font-normal italic lowercase">(optional)</span>
            </label>
            <input
              type="text"
              {...register('addressLine2')}
              placeholder="Apt, Suite, or Private Unit"
              className="w-full px-1 py-4 bg-transparent border-b border-ink/10 focus:border-gold font-body text-base text-ink placeholder:text-ink/10 outline-none transition-all duration-500"
            />
          </div>

          {/* Row 4: City, State, PIN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 ml-1">City</label>
              <input
                type="text"
                {...register('city')}
                className={`w-full px-1 py-4 bg-transparent border-b border-ink/10 font-body text-base text-ink outline-none transition-all duration-500 ${errors.city ? 'border-velvet' : 'focus:border-gold'}`}
              />
              {errors.city && <p className="text-velvet text-[9px] font-bold uppercase tracking-widest mt-2">{errors.city.message}</p>}
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 ml-1">State</label>
              <input
                type="text"
                {...register('state')}
                className={`w-full px-1 py-4 bg-transparent border-b border-ink/10 font-body text-base text-ink outline-none transition-all duration-500 ${errors.state ? 'border-velvet' : 'focus:border-gold'}`}
              />
              {errors.state && <p className="text-velvet text-[9px] font-bold uppercase tracking-widest mt-2">{errors.state.message}</p>}
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 ml-1">PIN Code</label>
              <input
                type="text"
                {...register('pincode')}
                className={`w-full px-1 py-4 bg-transparent border-b border-ink/10 font-body text-base text-ink outline-none transition-all duration-500 ${errors.pincode ? 'border-velvet' : 'focus:border-gold'}`}
              />
              {errors.pincode && <p className="text-velvet text-[9px] font-bold uppercase tracking-widest mt-2">{errors.pincode.message}</p>}
            </div>
          </div>

          {/* Row 5: Country */}
          <div className="space-y-3">
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 ml-1">Country</label>
            <div className="relative">
              <select
                {...register('country')}
                className="w-full px-1 py-4 bg-ink/[0.02] border-b border-ink/10 text-ink font-ui text-[11px] font-bold tracking-widest uppercase outline-none focus:border-gold transition-all duration-500 appearance-none cursor-pointer"
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/20 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Row 6: Address Type */}
          <div className="space-y-6 pt-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 ml-1">Archive Classification</label>
            <div className="flex flex-wrap gap-4">
              {[
                { id: 'home', icon: Home, label: 'Residential' },
                { id: 'work', icon: Briefcase, label: 'Professional' },
                { id: 'other', icon: MapPin, label: 'Other Registry' }
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setValue('addressType', type.id)}
                  className={`flex items-center gap-4 px-8 py-4 rounded-full font-ui text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-700 ${addressType === type.id
                    ? 'bg-ink text-white shadow-2xl shadow-ink/20 scale-105'
                    : 'bg-ink/[0.03] text-ink/30 border border-transparent hover:border-ink/10 hover:text-ink'
                    }`}
                >
                  <type.icon size={14} className={addressType === type.id ? 'text-gold' : ''} /> {type.label}
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
                  className="peer appearance-none w-6 h-6 border border-ink/10 rounded-sm bg-white checked:bg-ink checked:border-ink transition-all duration-500"
                />
                <span className="absolute text-gold opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none text-xs font-bold">✓</span>
              </div>
              <span className="font-ui text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 group-hover:text-ink transition-colors duration-500">
                Establish as primary destination
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-12 border-t border-ink/[0.05] flex flex-col-reverse md:flex-row gap-8 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-10 py-5 text-ink/20 font-bold uppercase tracking-[0.4em] text-[10px] hover:text-ink transition-all duration-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding || isUpdating}
              className="px-16 py-5 bg-ink text-white font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-gold shadow-2xl shadow-ink/20 transition-all duration-700 disabled:opacity-20 group relative overflow-hidden"
            >
              {(isAdding || isUpdating) ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                'Commit to Registry'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
