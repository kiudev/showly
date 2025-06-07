import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { LanguageProvider } from "./context/LanguageContext";
import "./i18n.config";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </LanguageProvider>
  </StrictMode>
);
