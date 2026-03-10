import type { ComponentPropsWithoutRef } from "react";

type Divider = ComponentPropsWithoutRef<"hr"> & {
  className?: string;
};

function Divider({ className }: Divider) {
  const baseStyle = `w-full border-border-light`;

  return <hr className={`${baseStyle} ${className}`} />;
}

export default Divider;
