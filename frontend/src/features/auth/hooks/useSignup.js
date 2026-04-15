import { useMutation } from '@tanstack/react-query';
import api from '../../../lib/axios';

export const useSignup = () =>
    useMutation({
        mutationFn: (data) => api.post('/auth/register', data),
    });
