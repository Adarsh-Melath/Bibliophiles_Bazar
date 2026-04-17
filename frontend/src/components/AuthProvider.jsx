import { useAuthInit } from '../features/auth/hooks/useAuthInit'
import { Outlet } from 'react-router-dom'

// This wraps all routes and ensures the access token is restored
// from the refresh cookie before any protected page renders
export default function AuthProvider() {
    const { isReady } = useAuthInit()

    if (!isReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return <Outlet />
}
