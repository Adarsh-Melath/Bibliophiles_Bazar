import axios from 'axios'; // Import base axios
import { API_BASE_URL } from '../../../lib/config'; // Import your base URL
import { useAuthStore } from '../../../store/authStore';
import { useEffect, useState } from 'react';

export const useAuthInit = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const hasHydrated = useAuthStore((state) => state._hasHydrated);
    const user = useAuthStore((state) => state.user);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!hasHydrated || isReady) return;

        if (!user) {
            console.log('No user found in storage, skipping refresh.');
            setIsReady(true);
            return;
        }
        const refresh = async () => {
            try {
                const res = await axios.post(
                    `${API_BASE_URL}/auth/refresh`,

                    {},
                    { withCredentials: true },
                );
                console.log('Session restored successfully!');
                // Sync reality: Use res.data.user instead of the stale 'user' from storage
                setAuth(res.data.accessToken, res.data.user);
            } catch (err) {
                if (
                    err.response?.status === 401 ||
                    err.response?.status === 403
                ) {
                    clearAuth();
                }
            } finally {
                setIsReady(true);
            }
        };

        refresh();
    }, [hasHydrated]);

    return { isReady };
};
