import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import BookForm from '../components/BookForm'
import { useAddBook } from '../hooks/useBooks'

export default function AddBookPage() {
  const navigate = useNavigate()
  const { mutate: addBook, isPending, error } = useAddBook()

  const handleSubmit = (data) => {
    // Clean up empty optional fields
    const payload = {
      ...data,
      pages: data.pages || null,
      publishedDate: data.publishedDate || null,
      coverImageUrl: data.coverImageUrl || null,
      language: data.language || null,
    }
    addBook(payload, {
      onSuccess: () => navigate('/vendor/books'),
    })
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
            <h1 className="text-3xl font-heading font-bold text-teal">Add New Book</h1>
            <p className="text-sm font-body text-teal/60 mt-1">
              Fill in the details to add a book to your catalog
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error.response?.data?.error || 'Failed to add book. Please try again.'}
          </div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-tan rounded-2xl shadow-soft p-8"
        >
          <BookForm
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Add Book"
          />
        </motion.div>
      </div>
    </div>
  )
}
