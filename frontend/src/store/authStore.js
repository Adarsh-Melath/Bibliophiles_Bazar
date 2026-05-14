import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setToken } from '../lib/axios';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            accessToken: null,
            user: null,
            hasHydrated: false,
            setAuth: (token, user) => {
                set({ accessToken: token, user });
                setToken(token);
            },
            clearAuth: () => {
                set({ accessToken: null, user: null, hasHydrated: true });
                useAuthStore.persist.clearStorage();

                setToken(null);
            },
            setHydrated: () => set({ hasHydrated: true }),
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.log(
                        '[onRehydrate] an error happened during hydration',
                        error,
                    );
                } else {
                    state.setHydrated(true);
                    console.log(
                        '[onRehydate] hydration finished, hasHydrated set to true',
                    );
                }
            },
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
            }),
        },
    ),
);
