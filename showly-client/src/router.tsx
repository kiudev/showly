import { createBrowserRouter } from "react-router";
import App from "./App";
import { Serie } from "./pages/Serie";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/serie",
    element: <Serie />,
  },
]);
