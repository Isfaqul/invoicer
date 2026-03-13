import { useEffect, useState } from "react";
import Print from "./features/PrintableInvoice/PrintableInvoice";
import useInvoice from "./hooks/useInvoice";
import InvoiceWrapper from "./layout/InvoiceWrapper";
import SideBar from "./layout/SideBar";
import Dashboard from "./features/Dashboard/Dashboard";
import useView from "./hooks/useView";
import { listen } from "@tauri-apps/api/event";

function App() {
  const [showPreview, setShowPreview] = useState(false);
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

  useEffect(() => {
    const unlisten = listen("menu-save", async () => await rest.saveInvoice());

    return () => {
      unlisten.then((fn) => fn());
    };
  }, [rest.saveInvoice]);

  function printInvoice() {
    window.print();
  }

  async function handleSelectInvoice(id: string) {
    const invoice = await findInvoice(id);

    if (!invoice) return;

    setCurrentInvoice(invoice);
  }

  async function handleDeleteInvoice(id: string) {
    await deleteInvoice(id);
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
      {showPreview && (
        <Print onPreviewClose={() => setShowPreview(false)} onPrint={printInvoice} currentInvoice={currentInvoice} />
      )}
    </main>
  );
}

export default App;
