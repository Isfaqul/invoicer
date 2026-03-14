import { useState } from "react";

export type ToastType = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastVariant = "info" | "warn" | "error";

function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  function addToast(message: string, variant: ToastVariant = "info") {
    let newId = crypto.randomUUID();

    setToasts((prev) => [...prev, { id: newId, message, variant }]);

    setTimeout(() => {
      removeToast(newId);
    }, 3000);
  }

  function removeToast(id: string) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return { toasts, addToast };
}

export default useToast;
