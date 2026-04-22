import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../lib/axios'

export const useVendorApplications = (status = '') => {
  return useQuery({
    queryKey: ['vendor-applications', status],
    queryFn: () => {
      const url = status === 'PENDING'
        ? '/vendor/applications/pending'
        : '/vendor/applications'
      return api.get(url).then((r) => r.data)
    },
  })
}

export const useApproveVendor = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.post(`/vendor/applications/${id}/approve`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vendor-applications'] }),
  })
}

export const useRejectVendor = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }) =>
      api.post(`/vendor/applications/${id}/reject`, { reason }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vendor-applications'] }),
  })
}
