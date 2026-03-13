import { createContext, useContext, type ReactNode } from "react";
import useToast from "./useToast";

type ToastContextType = ReturnType<typeof useToast>;

const ToastContext = createContext<ToastContextType | null>(null);

export default function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, addToast } = useToast();

  return <ToastContext value={{ toasts, addToast }}>{children}</ToastContext>;
}

export function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext must be used inside Invoice Provider");
  }

  return context;
}
