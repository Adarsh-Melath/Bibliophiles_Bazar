import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../lib/axios';

export const useAdminUsers = ({ search, page, size }) =>
    useQuery({
        queryKey: ['admin-users', search, page, size],
        queryFn: () =>
            api
                .get('/admin/users', {
                    params: { search: search || undefined, page, size },
                })
                .then((r) => r.data),
    });

export const useToggleBlock = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.put(`/admin/users/${id}/toggle-block`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
    });
};
