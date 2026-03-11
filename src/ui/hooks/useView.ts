import { useState } from "react";

export type Views = "Invoice" | "Dashboard";

function useView() {
  const [currentView, setCurrentView] = useState<Views>("Invoice");

  return { currentView, setCurrentView };
}

export default useView;
