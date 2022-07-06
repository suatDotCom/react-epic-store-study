import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, children }: any) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };