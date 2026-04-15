import { Navigate } from "react-router-dom"
import { useAuthInit } from "./features/auth/hooks/useAuthInit"

function App() {
  useAuthInit();
  return (
    "Welcome User "
  )
}

export default App
