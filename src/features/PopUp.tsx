import type { ReactNode } from "react";
import { createPortal } from "react-dom";

function PopUp({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(<p>This child is placed in the document body.</p>, document.body)}
      {/* {createPortal(
        <div className="absolute top-0 left-0 w-full h-full border-red-500 border ">
          <article className="bg-red-500 text-white ">
            <h2>{children}</h2>
          </article>
        </div>,
        // document.querySelector("#root")!,
      )} */}
    </>
  );
}

export default PopUp;
