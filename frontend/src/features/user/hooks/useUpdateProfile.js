import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../lib/axios';
import { useAuthStore } from '../../../store/authStore';

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const setAuth = useAuthStore((state) => state.setAuth);
    return useMutation({
        mutationFn: (data) =>
            api.put('/user/profile', data).then((r) => r.data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            const store = useAuthStore.getState();
            store.setAuth(store.accessToken, data);
        },
    });
};
