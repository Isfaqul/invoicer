import { useState } from "react";

type Toast = {
  id: string;
  message: string;
};

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(message: string) {
    let newId = crypto.randomUUID();

    setToasts((prev) => [...prev, { id: newId, message }]);

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
