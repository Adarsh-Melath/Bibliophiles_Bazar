import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/authStore"
import api from '../../../lib/axios'

export const useAuthInit = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const user = useAuthStore((state) => state.user);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // No user in store means they haven't logged in — skip refresh entirely
        if (!user) {
            setIsReady(true);
            return;
        }

        const refresh = async () => {
            try {
                const res = await api.post('/auth/refresh')
                setAuth(res.data.accessToken, user);
            } catch {
                // Refresh token expired or invalid — clear auth and send to login
                clearAuth();
            } finally {
                setIsReady(true);
            }
        }

        refresh();
    }, [])

    return { isReady };
}
