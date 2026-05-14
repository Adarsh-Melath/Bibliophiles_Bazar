import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../lib/axios';

export const useAdminUsers = ({
    search = '',
    role = '',
    page = 0,
    size = 10,
} = {}) => {

    return useQuery({
        queryKey: ['admin-users', search, role, page, size],
        queryFn: () =>
            api
                .get('/admin/users', {
                    params: {
                        search: search || undefined,
                        role: role || undefined,
                        page,
                        size,
                    },
                })
                .then((r) => {
                    console.log(r.data);
                    return r.data;
                }),
    });
};

export const useToggleBlock = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.put(`/admin/users/${id}/toggle-block`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
    });
};

export const useUpdateUser = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => api.put(`/admin/users/${id}`, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
    });
};
