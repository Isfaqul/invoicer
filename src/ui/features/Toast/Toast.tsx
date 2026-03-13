import { createPortal } from "react-dom";
import { useToastContext } from "./ToastProvider";

function Toast() {
  const { toasts } = useToastContext();

  return (
    <>
      {createPortal(
        toasts.length && (
          <div className="fixed top-0 right-0 z-50 space-y-2 justify-end p-2">
            {toasts.map((toast) => (
              <article
                key={toast.id}
                className="bg-gray-100 border text-sm text-text-primary border-r-5 border-gray-700 rounded-xs px-3 py-2 max-w-50 h-max shadow-md animate-slide-in"
              >
                <h2>{toast.message}</h2>
              </article>
            ))}
          </div>
        ),
        document.body,
      )}
    </>
  );
}

export default Toast;
