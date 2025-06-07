import { Navigate } from "react-router";
import { ReactNode, useEffect, useState } from "react";
import App from "@/App";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/auth/user`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => setIsAuth(response.ok))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return null;

  return isAuth ? <App>{children}</App> : <Navigate to="/" replace />;
};
