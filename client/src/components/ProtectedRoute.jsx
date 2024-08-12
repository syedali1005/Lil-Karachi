import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children; // Render the protected content if authenticated
  } else {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
}
