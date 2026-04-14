import axios from 'axios';
import { useAuthStore } from '../store/authStore';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
            error.config._retry = true;
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
                    {},
                    { withCredentials: true },
                );

                const newToken = res.data.accessToken;
                useAuthStore
                    .getState()
                    .setAuth(newToken, useAuthStore.getState().user);

                error.config.headers.Authorization = `Bearer ${newToken}`;

                return api(error.config);
            } catch {
                useAuthStore.getState().clearAuth();
            }
        }
        return Promise.reject(error);
    },
);
export default api;
