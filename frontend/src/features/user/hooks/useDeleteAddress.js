import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../lib/axios';

export const useDeleteAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.delete(`/user/addresses/${id}`),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['addresses'] }),
    });
};
