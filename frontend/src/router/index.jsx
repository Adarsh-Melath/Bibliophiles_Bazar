import { createBrowserRouter } from 'react-router-dom'
import AuthProvider from '../components/AuthProvider'
import App from '../App'
import HomePage from '../features/home/pages/HomePage'
import Signup from '../features/auth/pages/Signup'
import LoginPage from '../features/auth/pages/LoginPage'
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage'
import VerifyResetOtpPage from '../features/auth/pages/VerifyResetOtpPage'
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage'
import ProfilePage from '../features/user/pages/ProfilePage'
import ProtectedRoute from './ProtectedRoute'
import AddressPage from '../features/user/pages/AddressPage'
import EditProfilePage from '../features/user/pages/EditProfilePage'
import AddEditAddressPage from '../features/user/pages/AddEditAddressPage'
import SecurityPage from '../features/user/pages/SecurityPage'
import AdminLoginPage from '../features/admin/pages/AdminLoginPage'
import AdminUsersPage from '../features/admin/pages/AdminUserPage'
import AdminRoute from '../router/AdminRoute'
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage'
import OAuthCallbackPage from '../features/auth/pages/OAuth2CallbackPage'
import AdminForgotPasswordPage from '../features/admin/pages/AdminForgotPasswordPage'
import AdminVerifyResetOtpPage from '../features/admin/pages/AdminVerifyResetOtpPage'
import AdminResetPasswordPage from '../features/admin/pages/AdminResetPasswordPage'
import AdminVendorsPage from '../features/admin/pages/AdminVendorsPage'
import VendorApplyPage from '../features/vendor/pages/VendorApplyPage'
import VendorLayout from '../features/vendor/layouts/VendorLayout'
import VendorDashboardPage from '../features/vendor/pages/VendorDashboardPage'
import VendorBooksPage from '../features/vendor/pages/VendorBooksPage'
import AddBookPage from '../features/vendor/pages/AddBookPage'
import EditBookPage from '../features/vendor/pages/EditBookPage'
import VendorRoute from './VendorRoute'

export const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
    
    //user side 
      { path: '/', element: <HomePage /> },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/oauth2/callback', element: <OAuthCallbackPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/verify-reset-otp', element: <VerifyResetOtpPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
      { path: '/profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: '/profile/edit', element: <ProtectedRoute><EditProfilePage /></ProtectedRoute> },
      { path: '/profile/addresses', element: <ProtectedRoute><AddressPage /></ProtectedRoute> },
      { path: '/profile/addresses/new', element: <ProtectedRoute><AddEditAddressPage /></ProtectedRoute> },
      { path: '/profile/security', element: <ProtectedRoute><SecurityPage /></ProtectedRoute> },

      //admin side 
      { path: '/admin/login', element: <AdminLoginPage /> },
      { path: '/admin/forgot-password', element: <AdminForgotPasswordPage /> },
      { path: '/admin/verify-reset-otp', element: <AdminVerifyResetOtpPage /> },
      { path: '/admin/reset-password', element: <AdminResetPasswordPage /> },
      { path: '/admin/dashboard', element: <AdminRoute><AdminDashboardPage /></AdminRoute> },
      { path: '/admin/users', element: <AdminRoute><AdminUsersPage /></AdminRoute> },
      { path: '/admin/vendors', element: <AdminRoute><AdminVendorsPage /></AdminRoute> },
      
      
      
      //vendor side 
      { path: '/vendor/apply', element: <VendorApplyPage /> },
      {
        path: '/vendor',
        element: <VendorRoute><VendorLayout /></VendorRoute>,
        children: [
          { path: 'dashboard', element: <VendorDashboardPage /> },
          { path: 'books', element: <VendorBooksPage /> },
          { path: 'books/new', element: <AddBookPage /> },
          { path: 'books/:id/edit', element: <EditBookPage /> },
        ]
      },
      // {
      //   path: '/vendor/dashboard',
      //   element: <VendorDashboardPage />
      // },
     
    ]
  }
])

export default router
