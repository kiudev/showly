import { Navigate } from "react-router";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: {children: ReactNode}) => {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children
}
