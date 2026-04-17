import { createBrowserRouter } from 'react-router-dom'
import AuthProvider from '../components/AuthProvider'
import App from '../App'
import Signup from '../features/auth/pages/Signup'
import LoginPage from '../features/auth/pages/LoginPage'
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage'
import VerifyResetOtpPage from '../features/auth/pages/VerifyResetOtpPage'
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage'
import ProfilePage from '../features/user/pages/ProfilePage'
import ProtectedRoute from './ProtectedRoute'
import AddressPage from '../features/user/pages/AddressPage'
import SecurityPage from '../features/user/pages/SecurityPage'
import AdminLoginPage from '../features/admin/pages/AdminLoginPage'
import AdminUsersPage from '../features/admin/pages/AdminUserPage'
import AdminRoute from '../router/AdminRoute'
export const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      { path: '/', element: <App /> },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/verify-reset-otp', element: <VerifyResetOtpPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
      { path: '/profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: '/profile/addresses', element: <ProtectedRoute><AddressPage /></ProtectedRoute> },
      { path: '/profile/security', element: <ProtectedRoute><SecurityPage /></ProtectedRoute> },



      { path: '/admin/login', element: <AdminLoginPage /> },
      { path: 'admin/users', element: <AdminRoute><AdminUsersPage></AdminUsersPage></AdminRoute> }
    ]
  }
])

export default router
