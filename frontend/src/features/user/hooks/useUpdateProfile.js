import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../lib/axios';

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => api.put('/user/profile', data),
        onSuccess: (data) => {
            queryClient.setQueryData(['profile'], data.data);
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });
};
