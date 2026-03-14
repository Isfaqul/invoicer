import { createPortal } from "react-dom";
import { useToastContext } from "./ToastProvider";
import type { ToastType } from "./useToast";

function Toast() {
  const { toasts } = useToastContext();

  return (
    <>
      {createPortal(
        toasts.length > 0 && (
          <div className="fixed top-0 right-0 z-50 space-y-2 justify-end p-2">
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} />
            ))}
          </div>
        ),
        document.body,
      )}
    </>
  );
}

function ToastItem({ toast }: { toast: ToastType }) {
  const base =
    "bg-white border text-sm text-text-primary border-r-5 px-3 py-2 rounded-xs max-w-50 h-max shadow-md animate-slide-in";

  const style: Record<string, string> = {
    info: "border-gray-700",
    warn: "border-yellow-500",
    error: "border-red-500",
  };

  return (
    <article className={`${base} ${style[toast.variant]}`}>
      <h2>{toast.message}</h2>
    </article>
  );
}

export default Toast;
