import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ToastProvider from "./features/Toast/ToastProvider.tsx";
import Toast from "./features/Toast/Toast.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <App />
      <Toast />
    </ToastProvider>
  </StrictMode>,
);
