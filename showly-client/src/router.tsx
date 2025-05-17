import { createBrowserRouter } from "react-router";
import App from "./App";
import { Serie } from "./pages/Serie";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/serie",
    element: <Serie />,
  },
]);
