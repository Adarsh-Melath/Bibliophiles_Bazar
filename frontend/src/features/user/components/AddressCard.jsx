import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Check, MapPin } from 'lucide-react';

export function AddressCard({
  id,
  name,
  phone,
  addressLines,
  cityStatePin,
  country,
  isDefault,
  index,
  onEdit,
  onDelete,
  onSetPrimary
}) {

  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, shadow: '0 10px 25px -5px rgba(44, 30, 17, 0.05)' }}
      className={`relative bg-white rounded-sm p-8 border transition-all duration-300 group selection:bg-burgundy/10 ${isDefault ? 'border-burgundy shadow-shelf' : 'border-shelf/5 hover:border-shelf/20'
        }`}
    >
      {isDefault && (
        <div className="absolute top-0 right-0 bg-burgundy text-paper text-[9px] font-bold uppercase tracking-[0.2em] py-1.5 px-4">
          Main Address
        </div>
      )}

      <div className="mb-6 pr-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-sm ${isDefault ? 'bg-burgundy/10 text-burgundy' : 'bg-shelf/5 text-shelf/40'}`}>
            <MapPin size={16} />
          </div>
          <h3 className="font-heading font-bold text-shelf text-xl">
            {name}
          </h3>
        </div>

        <p className="font-ui text-[10px] font-bold text-shelf/40 mb-4 uppercase tracking-widest px-1 border-l-2 border-shelf/5">
          {phone}
        </p>

        <div className="font-body text-sm text-shelf/60 leading-relaxed space-y-1">
          <p className="italic">{addressLines}</p>
          <p>{cityStatePin}</p>
          <p className="font-bold uppercase tracking-widest text-[10px] opacity-30 pt-1">{country}</p>
        </div>
      </div>

      <div className="flex items-center gap-6 pt-6 border-t border-shelf/5 mt-auto">
        <button onClick={()=>onEdit(id)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-shelf/40 hover:text-burgundy transition-all group/btn">
          <Pencil size={12} className="group-hover/btn:scale-110 transition-transform" />
          Edit
        </button>
        <button onClick={()=>onDelete(id)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-shelf/40 hover:text-burgundy transition-all group/btn">
          <Trash2 size={12} className="group-hover/btn:scale-110 transition-transform" />
          Remove
        </button>

        {!isDefault && (
          <button onClick={()=>onSetPrimary(id)} className="ml-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-shelf/30 hover:text-burgundy transition-all">
            <Check size={12} />
            Set Primary
          </button>
        )}
      </div>
    </motion.div>
  );
}