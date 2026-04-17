import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function AdminRoute({ children }) {
    const user = useAuthStore((s) => s.user);
    const token = useAuthStore((s) => s.accessToken);

    if (!token || !user) return <Navigate to="/admin/login" replace />;
    if (user.role !== 'ADMIN') return <Navigate to="/" replace />;

    return children;
}
