import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, BookCheck } from 'lucide-react'
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
      <div className="flex-1 bg-paper p-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-20 w-1/3 bg-shelf/5 rounded-sm animate-pulse" />
          <div className="h-[600px] w-full bg-shelf/[0.02] border border-shelf/5 rounded-sm animate-pulse" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex-1 bg-paper p-10 flex items-center justify-center">
        <div className="p-8 bg-burgundy/5 border border-burgundy/10 text-burgundy text-[10px] font-bold uppercase tracking-widest rounded-sm">
          Connection lost. Please return to the catalog and re-verify.
          <button onClick={() => navigate('/vendor/books')} className="block mt-4 text-shelf border-b border-shelf/30 hover:text-burgundy transition-colors">Catalog Entry</button>
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
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
                <BookCheck size={14} className="text-burgundy" />
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.4em] text-burgundy">Catalog Revision</span>
            </div>
            <h1 className="text-4xl font-heading font-bold text-shelf tracking-tight truncate">Entry: {book?.title}</h1>
            <p className="text-sm font-body text-shelf/40 mt-2 italic leading-relaxed">
              Amend the metadata or collection status for this specific work.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-5 bg-burgundy/5 border-l-4 border-burgundy text-burgundy text-[10px] font-bold uppercase tracking-widest"
            >
                {error.response?.data?.error || 'Update failed. Registry entry integrity check required.'}
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
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Amend Entry"
          />
        </motion.div>
      </div>
    </div>
  )
}
