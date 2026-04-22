import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Search, Edit2, Trash2, BookOpen, AlertCircle } from 'lucide-react'
import { useBooks, useDeleteBook } from '../hooks/useBooks'

const statusStyle = {
  ACTIVE: 'bg-green-100 text-green-800 border-green-200',
  INACTIVE: 'bg-gray-100 text-gray-700 border-gray-200',
  OUT_OF_STOCK: 'bg-red-100 text-red-800 border-red-200',
}

export default function VendorBooksPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [deleteId, setDeleteId] = useState(null)

  const { data, isLoading, isError } = useBooks(search, page, 10)
  const { mutate: deleteBook, isPending: isDeleting } = useDeleteBook()

  const books = data?.content || []
  const totalPages = data?.totalPages || 0

  const handleDelete = (id) => {
    deleteBook(id, {
      onSuccess: () => setDeleteId(null),
    })
  }

  return (
    <div className="flex-1 overflow-y-auto bg-offwhite">
      <div className="p-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-teal">My Books</h1>
            <p className="text-sm font-body text-teal/60 mt-1">
              Manage your book catalog
            </p>
          </div>
          <button
            onClick={() => navigate('/vendor/books/new')}
            className="flex items-center gap-2 px-5 py-2.5 bg-sage hover:bg-sage-dark text-white rounded-lg font-label font-semibold text-sm transition-all shadow-soft"
          >
            <Plus className="w-4 h-4" />
            Add New Book
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal/50" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0) }}
            className="w-full bg-white border border-tan rounded-lg py-2.5 pl-9 pr-4 text-sm font-body text-teal placeholder:text-teal/50 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
          />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-tan/30 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            Failed to load books. Please try again.
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && books.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookOpen className="w-16 h-16 text-teal/20 mb-4" />
            <h3 className="text-lg font-heading font-semibold text-teal mb-2">
              {search ? 'No books found' : 'No books yet'}
            </h3>
            <p className="text-sm font-body text-teal/60 mb-6">
              {search ? 'Try a different search term' : 'Add your first book to get started'}
            </p>
            {!search && (
              <button
                onClick={() => navigate('/vendor/books/new')}
                className="flex items-center gap-2 px-5 py-2.5 bg-sage text-white rounded-lg font-label font-semibold text-sm"
              >
                <Plus className="w-4 h-4" /> Add New Book
              </button>
            )}
          </div>
        )}

        {/* Books table */}
        {!isLoading && books.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-offwhite border border-tan rounded-xl shadow-soft overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-tan/20">
                    {['Cover', 'Title', 'Author', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-5 py-4 text-xs font-label font-semibold text-teal uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-tan/50">
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-white/50 transition-colors">
                      {/* Cover */}
                      <td className="px-5 py-3">
                        {book.coverImageUrl ? (
                          <img
                            src={book.coverImageUrl}
                            alt={book.title}
                            className="w-10 h-14 object-cover rounded-md shadow-sm"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                        ) : (
                          <div className="w-10 h-14 bg-tan/40 rounded-md flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-teal/40" />
                          </div>
                        )}
                      </td>
                      {/* Title */}
                      <td className="px-5 py-3">
                        <p className="text-sm font-body font-semibold text-teal max-w-[180px] truncate">{book.title}</p>
                        <p className="text-xs text-teal/50 mt-0.5">{book.isbn}</p>
                      </td>
                      {/* Author */}
                      <td className="px-5 py-3 text-sm font-body text-teal/80 whitespace-nowrap">{book.author}</td>
                      {/* Category */}
                      <td className="px-5 py-3">
                        <span className="px-2.5 py-1 bg-sage/10 text-sage text-xs font-label font-medium rounded-full">
                          {book.category}
                        </span>
                      </td>
                      {/* Price */}
                      <td className="px-5 py-3 text-sm font-label font-bold text-teal whitespace-nowrap">
                        ${book.price}
                      </td>
                      {/* Stock */}
                      <td className="px-5 py-3">
                        <span className={`text-sm font-label font-semibold ${book.stock <= 5 ? 'text-red-600' : book.stock <= 20 ? 'text-amber-600' : 'text-teal'}`}>
                          {book.stock}
                        </span>
                      </td>
                      {/* Status */}
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 text-xs font-label font-semibold rounded-full border ${statusStyle[book.status] || statusStyle.ACTIVE}`}>
                          {book.status}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/vendor/books/${book.id}/edit`)}
                            className="p-1.5 text-teal/60 hover:text-sage hover:bg-sage/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(book.id)}
                            className="p-1.5 text-teal/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-tan">
                <p className="text-xs font-body text-teal/60">
                  Page {page + 1} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="px-3 py-1.5 text-xs font-label font-medium border border-tan rounded-lg text-teal disabled:opacity-40 hover:bg-tan/20 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="px-3 py-1.5 text-xs font-label font-medium border border-tan rounded-lg text-teal disabled:opacity-40 hover:bg-tan/20 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full"
          >
            <h3 className="text-lg font-heading font-bold text-teal mb-2">Delete Book</h3>
            <p className="text-sm font-body text-teal/70 mb-6">
              Are you sure you want to delete this book? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-tan rounded-lg text-sm font-label font-semibold text-teal hover:bg-tan/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-label font-semibold transition-colors disabled:opacity-60"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
