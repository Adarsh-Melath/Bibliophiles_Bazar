import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// Store token separately to avoid circular dependency with Zustand
let currentToken = null;

export const setToken = (token) => {
    currentToken = token;
    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.Authorization;
    }
};

api.interceptors.request.use((config) => {
    if (currentToken) config.headers.Authorization = `Bearer ${currentToken}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const status = error.response?.status;
        
        // Check if redirected to OAuth2 login (session expired)
        if (error.request?.responseURL?.includes('/oauth2/authorization')) {
            setToken(null);
            // Clear auth storage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth-storage');
            }
            const authError = new Error('Session expired. Please log in again.');
            authError.isAuthError = true;
            return Promise.reject(authError);
        }
        
        if ((status === 401 || status === 403) && !error.config._retry) {
            error.config._retry = true;
            try {
                const res = await api.post(
                    '/auth/refresh',
                    {},
                    { withCredentials: true },
                );

                const newToken = res.data.accessToken;
                setToken(newToken);

                error.config.headers.Authorization = `Bearer ${newToken}`;

                return api(error.config);
            } catch (refreshError) {
                setToken(null);
                // Clear auth storage on refresh failure
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth-storage');
                }
                const authError = new Error('Session expired. Please log in again.');
                authError.isAuthError = true;
                return Promise.reject(authError);
            }
        }
        return Promise.reject(error);
    },
);

export default api;
