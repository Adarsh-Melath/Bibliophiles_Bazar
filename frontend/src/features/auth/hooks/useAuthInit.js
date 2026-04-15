import { useEffect } from "react";
import { useAuthStore } from "../../../store/authStore"
import {api} from '../../../lib/axios'

export const useAuthInit = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    useEffect(() => {
        const refresh = async () => {
            try {
                const res = await api.post('/api/auth/refresh')
                setAuth(res.data.accessToken, res.data.user);
            } catch {
                clearAuth();
            }
         }
        
        refresh();
    },[])
}