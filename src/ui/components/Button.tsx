import type { ComponentPropsWithoutRef } from "react";

type Button = ComponentPropsWithoutRef<"button"> & {
  className?: string;
  variant: "primary" | "secondary" | "clear" | "icon";
};

function Button({ children, variant, className, ...props }: Button) {
  const baseStyle = `text-sm rounded-2xs flex items-center justify-center gap-2 cursor-pointer font-body transition-all ease-out 100ms`;
  const primaryStyle = `px-3 py-2 bg-btn-primary-base text-btn-primary-text hover:bg-btn-primary-hover active:bg-btn-primary-active`;
  const secondaryStyle = `px-3 py-2 bg-btn-secondary-base text-btn-secondary-text hover:bg-btn-secondary-hover active:bg-btn-secondary-active`;
  const iconStyle = `px-2 py-2 bg-btn-secondary-base text-btn-secondary-text hover:bg-btn-secondary-hover active:bg-btn-secondary-active`;
  const clearStyle = ``;

  let applyStyle: string;

  if (variant === "primary") applyStyle = primaryStyle;
  else if (variant === "secondary") applyStyle = secondaryStyle;
  else if (variant === "icon") applyStyle = iconStyle;
  else applyStyle = clearStyle;

  return (
    <button className={`${baseStyle} ${applyStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
