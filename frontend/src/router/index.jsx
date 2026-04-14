import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Signup from '../features/auth/pages/Signup'
import LoginPage from '../features/auth/pages/LoginPage'

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <LoginPage /> },
])
