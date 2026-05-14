import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import AuthProvider from '../components/AuthProvider'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from '../router/AdminRoute'
import VendorRoute from './VendorRoute'
import VendorLayout from '../features/vendor/layouts/VendorLayout'
import MainLayout from '../features/user/layouts/MainLayout'
import AdminLayout from '../features/admin/layouts/AdminLayout'


import HomePage from '../features/home/pages/HomePage'
import LoginPage from '../features/auth/pages/LoginPage'
import Signup from '../features/auth/pages/Signup'
import PublishersPage from '../features/home/pages/PublishersPage'

// public
const ForgotPasswordPage = lazy(() => import('../features/auth/pages/ForgotPasswordPage'))
const VerifyResetOtpPage = lazy(() => import('../features/auth/pages/VerifyResetOtpPage'))
const ResetPasswordPage = lazy(() => import('../features/auth/pages/ResetPasswordPage'))
const OAuthCallbackPage = lazy(() => import('../features/auth/pages/OAuth2CallbackPage'))

// user
const ProfilePage = lazy(() => import('../features/user/pages/ProfilePage'))
const AddressPage = lazy(() => import('../features/user/pages/AddressPage'))
const EditProfilePage = lazy(() => import('../features/user/pages/EditProfilePage'))
const AddEditAddressPage = lazy(() => import('../features/user/pages/AddEditAddressPage'))
const SecurityPage = lazy(() => import('../features/user/pages/SecurityPage'))

// admin
const AdminLoginPage = lazy(() => import('../features/admin/pages/AdminLoginPage'))
const AdminUsersPage = lazy(() => import('../features/admin/pages/AdminUserPage'))
const AdminDashboardPage = lazy(() => import('../features/admin/pages/AdminDashboardPage'))
const AdminForgotPasswordPage = lazy(() => import('../features/admin/pages/AdminForgotPasswordPage'))
const AdminVerifyResetOtpPage = lazy(() => import('../features/admin/pages/AdminVerifyResetOtpPage'))
const AdminResetPasswordPage = lazy(() => import('../features/admin/pages/AdminResetPasswordPage'))
const AdminVendorsPage = lazy(() => import('../features/admin/pages/AdminVendorsPage'))
// vendor
const VendorApplyPage = lazy(() => import('../features/vendor/pages/VendorApplyPage'))
const VendorDashboardPage = lazy(() => import('../features/vendor/pages/VendorDashboardPage'))
const VendorBooksPage = lazy(() => import('../features/vendor/pages/VendorBooksPage'))
const AddBookPage = lazy(() => import('../features/vendor/pages/AddBookPage'))
const EditBookPage = lazy(() => import('../features/vendor/pages/EditBookPage'))
const VendorLoginPage = lazy(() => import('../features/vendor/pages/VendorLoginPage'))
const VendorForgotPasswordPage = lazy(() => import('../features/vendor/pages/VendorForgotPasswordPage'))
const VendorVerifyResetOTPPage = lazy(() => import('../features/vendor/pages/VendorVerifyResetOTPPage'))
const VendorResetPasswordPage = lazy(() => import('../features/vendor/pages/VendorResetPasswordPage'))

const publicRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/publishers', element: <PublishersPage /> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/oauth2/callback', element: <OAuthCallbackPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/verify-reset-otp', element: <VerifyResetOtpPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },

  // admin public
  { path: '/admin/login', element: <AdminLoginPage /> },
  { path: '/admin/forgot-password', element: <AdminForgotPasswordPage /> },
  { path: '/admin/verify-reset-otp', element: <AdminVerifyResetOtpPage /> },
  { path: '/admin/reset-password', element: <AdminResetPasswordPage /> },

  // vendor public
  { path: '/vendor/login', element: <VendorLoginPage /> },
  { path: '/vendor/apply', element: <VendorApplyPage /> },
  { path: '/vendor/forgot-password', element: <VendorForgotPasswordPage /> },
  { path: '/vendor/verify-reset-otp', element: <VendorVerifyResetOTPPage /> },
  { path: '/vendor/reset-password', element: <VendorResetPasswordPage /> },
];

const protectedRoutes = [
  {
    element: <AuthProvider />, // 👈 only here
    children: [
      // User routes with MainLayout
      {
        element: <MainLayout />,
        children: [
          { path: '/profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
          { path: '/profile/edit', element: <ProtectedRoute><EditProfilePage /></ProtectedRoute> },
          { path: '/profile/addresses', element: <ProtectedRoute><AddressPage /></ProtectedRoute> },
          { path: '/profile/addresses/new', element: <ProtectedRoute><AddEditAddressPage /></ProtectedRoute> },
          { path: '/profile/security', element: <ProtectedRoute><SecurityPage /></ProtectedRoute> },
        ]
      },

      // Admin routes with AdminLayout
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin/dashboard', element: <AdminRoute><AdminDashboardPage /></AdminRoute> },
          { path: '/admin/users', element: <AdminRoute><AdminUsersPage /></AdminRoute> },
          { path: '/admin/vendors', element: <AdminRoute><AdminVendorsPage /></AdminRoute> },
        ]
      },

      // Vendor routes with VendorLayout (unchanged)
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
    ]
  }
];
const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes
]);
export default router
