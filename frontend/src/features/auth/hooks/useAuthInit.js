import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../store/authStore';
import api from '../../../lib/axios';

let isInitializedGlobal = false;

export const useAuthInit = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const hasHydrated = useAuthStore((state) => state.hasHydrated);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (isInitializedGlobal) {
            setIsReady(true);
            return;
        }

        if (!hasHydrated) {
            return;
        }

        const init = async () => {
            try {
                const currentUser = useAuthStore.getState().user;
                if (!currentUser) {
                    setIsReady(true);
                    isInitializedGlobal = true;
                    return;
                }

                console.log('[useAuthInit] Refreshing token for user:', currentUser.email);
                const res = await api.post(
                    '/auth/refresh',
                    {},
                    { withCredentials: true },
                );

                console.log('[useAuthInit] Token refreshed successfully');
                setAuth(res.data.accessToken, res.data.user);
            } catch (err) {
                console.error('[useAuthInit] Token refresh failed:', err);
                if (
                    err.response?.status === 401 ||
                    err.response?.status === 403
                ) {
                    clearAuth();
                }
            } finally {
                setIsReady(true);
                isInitializedGlobal = true;
            }
        };

        init();
    }, [hasHydrated]);

    return { isReady };
};
