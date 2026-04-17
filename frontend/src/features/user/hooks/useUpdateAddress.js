import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../lib/axios';

export const useUpdateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => api.put(`/user/addresses/${id}`, data),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['addresses'] }),
    });
};
