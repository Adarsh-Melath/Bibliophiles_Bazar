import { useQuery } from '@tanstack/react-query'
import api from '../../../lib/axios'

export const useVendorApplicationStatus = () => {
  return useQuery({
    queryKey: ['vendor-application-status'],
    queryFn: () => api.get('/vendor/application').then((r) => r.data),
    enabled: false, // Don't auto-fetch, only fetch when explicitly called
  })
}
