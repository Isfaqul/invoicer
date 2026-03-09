import { useEffect, useState } from "react";
import Print from "./features/PrintableInvoice/PrintableInvoice";
import useInvoice from "./hooks/useInvoice";
import InvoiceWrapper from "./layout/InvoiceWrapper";
import SideBar from "./layout/SideBar";

function App() {
  const [showPreview, setShowPreview] = useState(false);
  const { currentInvoice, createNewInvoice, setCurrentInvoice, findInvoice, getAllInvoices, ...rest } = useInvoice();

  function printInvoice() {
    window.print();
  }

  function handleSelectInvoice(id: string) {
    const invoice = findInvoice(id);

    if (!invoice) return;

    setCurrentInvoice(invoice);
  }

  return (
    <main className="h-full font-body flex justify-center gap-2">
      <div className="h-full flex w-full overflow-hidden">
        <SideBar
          onCreateNewInvoice={createNewInvoice}
          invoiceList={getAllInvoices()}
          onSelectInvoice={handleSelectInvoice}
        />
        <InvoiceWrapper
          invoiceList={getAllInvoices()}
          onPrintInvoice={printInvoice}
          currentInvoice={currentInvoice}
          updateInvoiceItems={rest.updateInvoiceItems}
          updateCustomerInfo={rest.updateCustomerInfo}
          addItemRow={rest.addItemRow}
          deleteItemRow={rest.deleteItemRow}
          onPrintPreview={() => setShowPreview(!showPreview)}
          onSave={rest.saveInvoice}
        />
      </div>
      {showPreview && <Print currentInvoice={currentInvoice} />}
    </main>
  );
}

export default App;
