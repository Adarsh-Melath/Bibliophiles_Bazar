import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function VendorRoute({ children }) {
  const user = useAuthStore((state) => state.user)

  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'VENDOR') return <Navigate to="/" replace />

  return children
}
