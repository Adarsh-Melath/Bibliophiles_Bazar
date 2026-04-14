import App from '../App'
import { createBrowserRouter } from 'react-router-dom'
import Signup from '../features/auth/pages/Signup'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>
    }
    , {
        path: '/signup',
        element: <Signup />
    }
])