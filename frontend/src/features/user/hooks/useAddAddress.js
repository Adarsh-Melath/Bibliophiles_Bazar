import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../lib/axios';

export const useAddAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => api.post('/user/addresses', data),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['addresses'] }),
    });
};
