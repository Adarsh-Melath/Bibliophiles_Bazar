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
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -6 }}
      className={`relative bg-white/70 backdrop-blur-md p-10 border transition-all duration-700 group selection:bg-gold/10 ${isDefault ? 'border-gold shadow-2xl shadow-gold/10' : 'border-ink/[0.05] hover:border-gold/30 hover:bg-white'
        }`}
    >
      {isDefault && (
        <div className="absolute top-0 right-0 bg-gold text-white text-[9px] font-bold uppercase tracking-[0.3em] py-2 px-6">
          Primary
        </div>
      )}

      <div className="mb-10 pr-12">
        <div className="flex items-center gap-5 mb-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${isDefault ? 'bg-gold text-white shadow-xl shadow-gold/20' : 'bg-ink/[0.03] text-ink/20 group-hover:bg-gold/10 group-hover:text-gold'}`}>
            <MapPin size={20} />
          </div>
          <h3 className="text-2xl font-bold text-ink tracking-tight group-hover:text-gold transition-colors duration-500">
            {name}
          </h3>
        </div>

        <p className="text-[11px] font-bold text-ink/30 mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
          <span className="w-6 h-[1px] bg-ink/10" />
          {phone}
        </p>

        <div className="text-base text-ink/60 leading-relaxed space-y-2">
          <p className="italic font-heading text-xl">"{addressLines}"</p>
          <p className="font-ui text-[11px] uppercase tracking-widest font-bold opacity-40">{cityStatePin}</p>
          <p className="font-bold uppercase tracking-[0.4em] text-[9px] text-gold pt-2">{country}</p>
        </div>
      </div>

      <div className="flex items-center gap-8 pt-8 border-t border-ink/[0.05] mt-auto">
        <button 
          onClick={()=>onEdit(id)} 
          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-ink/30 hover:text-ink transition-all duration-500 group/btn"
        >
          <Pencil size={14} className="group-hover/btn:scale-110 transition-transform duration-500" />
          Edit Registry
        </button>
        <button 
          onClick={()=>onDelete(id)} 
          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-ink/30 hover:text-velvet transition-all duration-500 group/btn"
        >
          <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform duration-500" />
          Remove
        </button>

        {!isDefault && (
          <button 
            onClick={()=>onSetPrimary(id)} 
            className="ml-auto flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold hover:text-ink transition-all duration-500"
          >
            <Check size={14} />
            Set Primary
          </button>
        )}
      </div>
    </motion.div>
  );
}