import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Signup from '../features/auth/pages/Signup'
import LoginPage from '../features/auth/pages/LoginPage'
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage'
import VerifyResetOtpPage from '../features/auth/pages/VerifyResetOtpPage'
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage'

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/verify-reset-otp', element: <VerifyResetOtpPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
])
