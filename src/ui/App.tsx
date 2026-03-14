import { useEffect, useRef, useState } from "react";
import Print from "./features/PrintableInvoice/PrintableInvoice";
import useInvoice from "./hooks/useInvoice";
import InvoiceWrapper from "./layout/InvoiceWrapper";
import SideBar from "./layout/SideBar";
import Dashboard from "./features/Dashboard/Dashboard";
import useView from "./hooks/useView";
import { listen } from "@tauri-apps/api/event";
import { exit } from "@tauri-apps/plugin-process";

function App() {
  const [showPreview, setShowPreview] = useState(false);
  const [renderPreview, setRenderPreview] = useState(false);
  const {
    currentInvoice,
    createNewInvoice,
    setCurrentInvoice,
    findInvoice,
    deleteInvoice,
    invoiceList,
    updateInvoiceField,
    ...rest
  } = useInvoice();
  const { currentView, setCurrentView } = useView();
  const printInvoiceRef = useRef(null);

  useEffect(() => {
    const listeners = Promise.all([
      listen("menu-save", async () => {
        await rest.saveInvoice();
      }),

      listen("menu-preview", () => {
        setShowPreview(true);
      }),
    ]);

    return () => {
      listeners.then((unlisteners) => {
        unlisteners.forEach((unlisten) => unlisten());
      });
    };
  }, [rest.saveInvoice]);

  useEffect(() => {
    async function handleKeydown(e: KeyboardEvent) {
      const isModifier = e.ctrlKey || e.metaKey;

      if (!isModifier) return; // Do nothing if ctrl/cmd not pressed

      switch (e.key.toLowerCase()) {
        case "s":
          e.preventDefault();
          await rest.saveInvoice();
          break;

        case "p":
          e.preventDefault();
          setShowPreview(true);
          break;

        case "q":
          e.preventDefault();
          await exit(0);
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [rest.saveInvoice]);

  useEffect(() => {
    if (showPreview) setRenderPreview(true);
  }, [showPreview]);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as Element;
      if (target.closest("#print-area") !== printInvoiceRef.current) {
        setShowPreview(false);
      }
    }

    function handleOutsideKeyDown(e: KeyboardEvent) {
      const escape = e.key === "Escape";
      if (showPreview && escape) setShowPreview(false);
    }

    document.addEventListener("click", handleOutsideClick);
    window.addEventListener("keydown", handleOutsideKeyDown);

    // Clean up before next effect runs
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("keydown", handleOutsideKeyDown);
    };
  });

  function printInvoice() {
    window.print();
  }

  async function handleSelectInvoice(id: string) {
    const invoice = await findInvoice(id);

    if (!invoice) return;

    setCurrentInvoice(invoice);
  }

  function handleDeleteInvoice(id: string) {
    deleteInvoice(id);
  }

  return (
    <main className="h-full font-body flex justify-center gap-2 relative overflow-x-hidden print:block print:h-auto print:overflow-visible">
      <div className="h-full flex w-full overflow-hidden print:hidden">
        <SideBar
          onCreateNewInvoice={createNewInvoice}
          invoiceList={invoiceList}
          onSelectInvoice={handleSelectInvoice}
          onDeleteInvoice={handleDeleteInvoice}
          currentInvoiceId={currentInvoice.id}
          setView={setCurrentView}
          currentView={currentView}
        />
        {currentView === "Invoice" ? (
          <InvoiceWrapper
            updateInvoiceField={updateInvoiceField}
            invoiceList={invoiceList}
            onPrintInvoice={printInvoice}
            currentInvoice={currentInvoice}
            updateInvoiceItems={rest.updateInvoiceItems}
            updateCustomerInfo={rest.updateCustomerInfo}
            addItemRow={rest.addItemRow}
            deleteItemRow={rest.deleteItemRow}
            onPrintPreview={() => setShowPreview(!showPreview)}
            onSave={rest.saveInvoice}
          />
        ) : (
          <Dashboard />
        )}
      </div>
      {renderPreview && (
        <Print
          ref={printInvoiceRef}
          onAnimationEnd={(e) => {
            if (e.animationName === "slideOut") setRenderPreview(false);
          }}
          onPreviewClose={() => setShowPreview(false)}
          isVisible={showPreview}
          onPrint={printInvoice}
          currentInvoice={currentInvoice}
        />
      )}
    </main>
  );
}

export default App;
