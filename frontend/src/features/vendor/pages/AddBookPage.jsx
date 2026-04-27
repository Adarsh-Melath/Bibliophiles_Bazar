import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, BookPlus } from 'lucide-react'
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
    <div className="flex-1 overflow-y-auto bg-paper selection:bg-burgundy/10">
      <div className="p-10 max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-6 mb-12 border-b border-shelf/5 pb-10">
          <button
            onClick={() => navigate('/vendor/books')}
            className="w-12 h-12 rounded-full border border-shelf/10 flex items-center justify-center text-shelf/30 hover:bg-shelf hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
                <BookPlus size={14} className="text-burgundy" />
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.4em] text-burgundy">New Acquisition</span>
            </div>
            <h1 className="text-4xl font-heading font-bold text-shelf tracking-tight">Register Title</h1>
            <p className="text-sm font-body text-shelf/40 mt-2 italic leading-relaxed">
              Enter the bibliographic details to include this work in your curated collection.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-5 bg-burgundy/5 border-l-4 border-burgundy text-burgundy text-[10px] font-bold uppercase tracking-widest"
          >
            {error.response?.data?.error || 'Registration failed. Please verify the entry details.'}
          </motion.div>
        )}

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-shelf/5 rounded-sm shadow-shelf p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-burgundy/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
          
          <BookForm
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Acquisition"
          />
        </motion.div>
      </div>
    </div>
  )
}
