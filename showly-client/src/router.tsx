import { createBrowserRouter } from "react-router";
import { Index } from "./pages/Index";
import { Serie } from "./pages/Serie";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Catalog } from "./components/Catalog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Catalog />
      </ProtectedRoute>
    ),
  },
  {
    path: "/serie",
    element: <Serie />,
  },
]);
