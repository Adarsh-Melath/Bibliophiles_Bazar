import { useQuery } from '@tanstack/react-query';
import api from '../../../lib/axios';

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => api.get('/user/profile').then(res => res.data)
    });
};
