import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../lib/axios'

// Fetch vendor's books
export const useBooks = (search = '', page = 0, size = 10) => {
  return useQuery({
    queryKey: ['vendor-books', search, page, size],
    queryFn: () =>
      api.get('/vendor/books', { params: { search, page, size } }).then((r) => r.data),
  })
}

// Fetch single book
export const useBook = (id) => {
  return useQuery({
    queryKey: ['vendor-book', id],
    queryFn: () => api.get(`/vendor/books/${id}`).then((r) => r.data),
    enabled: !!id,
  })
}

// Add book
export const useAddBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.post('/vendor/books', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vendor-books'] }),
  })
}

// Update book
export const useUpdateBook = (id) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.put(`/vendor/books/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-books'] })
      queryClient.invalidateQueries({ queryKey: ['vendor-book', id] })
    },
  })
}

// Delete book
export const useDeleteBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.delete(`/vendor/books/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vendor-books'] }),
  })
}
