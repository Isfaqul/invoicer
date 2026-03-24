import type { ReactNode } from "react";

function IconButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-lg bg-text-primary text-text-inverse px-1 py-1 cursor-pointer rounded-2xs hover:bg-gray-700"
    >
      {children}
    </button>
  );
}

export default IconButton;
