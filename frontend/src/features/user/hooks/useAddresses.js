import { useQuery } from '@tanstack/react-query'
import api from '../../../lib/axios'

export const useAddresses = () =>
    useQuery({
        queryKey: ['addresses'],
        queryFn: () => api.get('/user/addresses').then(r => r.data),
    })
