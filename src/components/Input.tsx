import { type ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  className?: string;
  fullWidth?: boolean;
};

function Input({ className, fullWidth = true, ...props }: InputProps) {
  return (
    <input
      className={`block bg-white rounded-sm border border-border-light px-2 py-1 placeholder:text-gray-400/80 ${fullWidth && "w-full"} ${className}`}
      {...props}
    />
  );
}

export default Input;
