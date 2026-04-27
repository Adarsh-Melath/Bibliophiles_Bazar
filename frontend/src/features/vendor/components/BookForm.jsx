import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { bookFormSchema } from '../schemas/vendorSchemas'

const categories = [
  'Fiction', 'Non-Fiction', 'Science', 'Technology',
  'Self-Help', 'Business', 'History', 'Children', 'Academic', 'Comics',
]

export default function BookForm({ defaultValues, onSubmit, isPending, submitLabel }) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: defaultValues || {},
  })

  const field = (label, name, type = 'text', placeholder = '') => (
    <div className="space-y-2">
      <label className="block text-[10px] font-ui font-bold uppercase tracking-[0.2em] text-shelf/40">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full bg-shelf/[0.02] border border-shelf/10 rounded-sm px-5 py-4 text-sm font-body text-shelf placeholder:text-shelf/20 focus:outline-none focus:border-burgundy/30 focus:bg-white transition-all shadow-inner"
      />
      {errors[name] && (
        <p className="text-burgundy text-[9px] font-bold uppercase tracking-widest mt-1">{errors[name].message}</p>
      )}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* Row 1 — Title + Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {field('Title *', 'title', 'text', 'e.g. The Shadow of the Wind')}
        {field('Author *', 'author', 'text', 'e.g. Carlos Ruiz Zafón')}
      </div>

      {/* Row 2 — ISBN + Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {field('ISBN *', 'isbn', 'text', 'e.g. 978-0143034902')}
        <div className="space-y-2">
          <label className="block text-[10px] font-ui font-bold uppercase tracking-[0.2em] text-shelf/40">
            Category *
          </label>
          <div className="relative">
              <select
                {...register('category')}
                className="w-full bg-shelf/[0.02] border border-shelf/10 rounded-sm px-5 py-4 text-sm font-body text-shelf focus:outline-none focus:border-burgundy/30 focus:bg-white transition-all shadow-inner appearance-none appearance-none cursor-pointer"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-shelf/20">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
          </div>
          {errors.category && (
            <p className="text-burgundy text-[9px] font-bold uppercase tracking-widest mt-1">{errors.category.message}</p>
          )}
        </div>
      </div>

      {/* Row 3 — Price + Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {field('Price (₹) *', 'price', 'number', 'e.g. 499')}
        {field('Stock *', 'stock', 'number', 'e.g. 10')}
      </div>

      {/* Row 4 — Language + Pages + Published Date */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {field('Language', 'language', 'text', 'e.g. English')}
        {field('Pages', 'pages', 'number', '320')}
        {field('Published Date', 'publishedDate', 'date')}
      </div>

      {/* Cover Image URL */}
      {field('Cover Image URL', 'coverImageUrl', 'url', 'https://...')}

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-[10px] font-ui font-bold uppercase tracking-[0.2em] text-shelf/40">
          Synopsis *
        </label>
        <textarea
          {...register('description')}
          rows={5}
          placeholder="Enter a brief synopsis of the work..."
          className="w-full bg-shelf/[0.02] border border-shelf/10 rounded-sm px-5 py-4 text-sm font-body text-shelf placeholder:text-shelf/20 focus:outline-none focus:border-burgundy/30 focus:bg-white transition-all shadow-inner resize-none italic"
        />
        {errors.description && (
          <p className="text-burgundy text-[9px] font-bold uppercase tracking-widest mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-6 border-t border-shelf/5">
        <button
          type="button"
          onClick={() => navigate('/vendor/books')}
          className="flex-1 py-4 border border-shelf/10 rounded-sm font-ui text-[10px] font-bold uppercase tracking-widest text-shelf/40 hover:bg-shelf hover:text-white transition-all shadow-soft"
        >
          Discard
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-[2] py-4 bg-burgundy text-white rounded-sm font-ui text-[10px] font-bold uppercase tracking-widest hover:bg-shelf transition-all shadow-shelf disabled:opacity-50"
        >
          {isPending ? 'Registry Process...' : `Complete ${submitLabel}`}
        </button>
      </div>
    </form>
  )
}
