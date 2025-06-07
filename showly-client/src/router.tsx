import { createBrowserRouter } from "react-router";
import { Main } from "./pages/Main";
import { Serie } from "./pages/Serie";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
