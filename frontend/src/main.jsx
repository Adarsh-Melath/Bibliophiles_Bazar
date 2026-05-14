import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import router from "./router";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 1,
    }
  }
});

function AppProviders() {
  return (
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </QueryClientProvider>
    // </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AppProviders />);
