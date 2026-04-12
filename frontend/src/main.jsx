import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,  // if a request fails, try once more then give up 
      staleTime: 1000 * 60 * 5,  //data will stay fresh for 5 minutes
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
