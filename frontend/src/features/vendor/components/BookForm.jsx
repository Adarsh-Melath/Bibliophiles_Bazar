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
    <div>
      <label className="block text-xs font-label font-semibold text-teal mb-1.5">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full bg-white border border-tan rounded-lg px-4 py-2.5 text-sm font-body text-teal placeholder:text-teal/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Row 1 — Title + Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {field('Title *', 'title', 'text', 'e.g. The Great Gatsby')}
        {field('Author *', 'author', 'text', 'e.g. F. Scott Fitzgerald')}
      </div>

      {/* Row 2 — ISBN + Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {field('ISBN *', 'isbn', 'text', 'e.g. 978-0-7432-7356-5')}
        <div>
          <label className="block text-xs font-label font-semibold text-teal mb-1.5">
            Category *
          </label>
          <select
            {...register('category')}
            className="w-full bg-white border border-tan rounded-lg px-4 py-2.5 text-sm font-body text-teal focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
          )}
        </div>
      </div>

      {/* Row 3 — Price + Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {field('Price ($) *', 'price', 'number', 'e.g. 14.99')}
        {field('Stock *', 'stock', 'number', 'e.g. 100')}
      </div>

      {/* Row 4 — Language + Pages + Published Date */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {field('Language', 'language', 'text', 'e.g. English')}
        {field('Pages', 'pages', 'number', 'e.g. 320')}
        {field('Published Date', 'publishedDate', 'date')}
      </div>

      {/* Cover Image URL */}
      {field('Cover Image URL', 'coverImageUrl', 'url', 'https://...')}

      {/* Description */}
      <div>
        <label className="block text-xs font-label font-semibold text-teal mb-1.5">
          Description *
        </label>
        <textarea
          {...register('description')}
          rows={4}
          placeholder="Write a short description of the book..."
          className="w-full bg-white border border-tan rounded-lg px-4 py-2.5 text-sm font-body text-teal placeholder:text-teal/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all resize-none"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/vendor/books')}
          className="flex-1 py-3 border border-tan rounded-lg text-sm font-label font-semibold text-teal hover:bg-tan/20 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 py-3 bg-sage hover:bg-sage-dark text-white rounded-lg text-sm font-label font-semibold transition-all disabled:opacity-60"
        >
          {isPending ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
