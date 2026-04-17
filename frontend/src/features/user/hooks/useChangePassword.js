import { useMutation } from '@tanstack/react-query';
import api from '../../../lib/axios';

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data) => api.put('/user/change-password', data),
    });
};
