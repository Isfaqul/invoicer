import { type ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"textarea">;

function TextArea({ ...props }: InputProps) {
  return (
    <textarea
      className="resize-none border-b-[1.5px] border-b-border-light border-transparent block w-full outline-0 transition-all ease-out duration-200 focus:border-b-black"
      {...props}
    />
  );
}

export default TextArea;
