import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import BookForm from '../components/BookForm'
import { useBook, useUpdateBook } from '../hooks/useBooks'

export default function EditBookPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: book, isLoading, isError } = useBook(id)
  const { mutate: updateBook, isPending, error } = useUpdateBook(id)

  const handleSubmit = (data) => {
    const payload = {
      ...data,
      pages: data.pages || null,
      publishedDate: data.publishedDate || null,
      coverImageUrl: data.coverImageUrl || null,
      language: data.language || null,
    }
    updateBook(payload, {
      onSuccess: () => navigate('/vendor/books'),
    })
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-3xl space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 rounded-xl bg-tan/30 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex-1 p-8">
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
          Failed to load book. Please go back and try again.
        </div>
      </div>
    )
  }

  // Map book data to form default values
  const defaultValues = {
    title: book?.title || '',
    author: book?.author || '',
    isbn: book?.isbn || '',
    category: book?.category || '',
    description: book?.description || '',
    price: book?.price || '',
    stock: book?.stock || '',
    coverImageUrl: book?.coverImageUrl || '',
    language: book?.language || '',
    pages: book?.pages || '',
    publishedDate: book?.publishedDate || '',
  }

  return (
    <div className="flex-1 overflow-y-auto bg-offwhite">
      <div className="p-8 max-w-3xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/vendor/books')}
            className="p-2 text-teal/60 hover:text-teal hover:bg-tan/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-heading font-bold text-teal">Edit Book</h1>
            <p className="text-sm font-body text-teal/60 mt-1">
              Update the details for <span className="font-semibold">{book?.title}</span>
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error.response?.data?.error || 'Failed to update book. Please try again.'}
          </div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-tan rounded-2xl shadow-soft p-8"
        >
          <BookForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Save Changes"
          />
        </motion.div>
      </div>
    </div>
  )
}
