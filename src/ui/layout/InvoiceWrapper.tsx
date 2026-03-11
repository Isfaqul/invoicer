import BillTo from "../components/BillTo";
import Button from "../components/Button";
import Divider from "../components/Divider";
import Item from "../components/Item";
import { GrAdd } from "react-icons/gr";
import { getTotals } from "../utils/invoicer";
import { LuPrinter, LuEye } from "react-icons/lu";
import type { Invoice } from "../hooks/useInvoice";
import { formatDate } from "../utils/helpers";
import SaveButton from "../components/SaveButton";

type InvoiceWrapperProps = {
  currentInvoice: Invoice;
  updateInvoiceItems: (id: string, field: string, value: string | number) => void;
  updateCustomerInfo: (field: string, value: string) => void;
  addItemRow: () => void;
  deleteItemRow: (id: string) => void;
  onPrintInvoice: () => void;
  onPrintPreview: () => void;
  onSave: () => void;
  invoiceList: Invoice[];
};

function InvoiceWrapper({
  onPrintInvoice,
  currentInvoice,
  deleteItemRow,
  addItemRow,
  updateInvoiceItems,
  updateCustomerInfo,
  onPrintPreview,
  onSave,
  invoiceList,
}: InvoiceWrapperProps) {
  return (
    <section className="bg-bg-surface grow h-full p-8 flex flex-col gap-2 overflow-y-auto">
      <div className="border border-border-light rounded-xs px-5 pt-3 py-5">
        <header className="flex justify-between w-full mb-2">
          <p className="font-light">
            <strong className="font-bold">Date </strong>
            <time dateTime={formatDate(currentInvoice.date.toString())}>
              {formatDate(currentInvoice.date.toString())}
            </time>
          </p>
          <p className="font-light">
            <strong className="font-bold">Invoice # </strong>
            {currentInvoice.id}
          </p>
        </header>
        <BillTo
          currentInvoice={currentInvoice}
          invoiceList={invoiceList}
          customer={currentInvoice.customer}
          updateCustomerInfo={updateCustomerInfo}
        />
        <Divider className="my-4" />
        {/* Items */}
        <section>
          <h2 className="font-bold text-md mb-2">Items</h2>
          <div className="space-y-2 mb-2">
            {currentInvoice.items.map((item) => (
              <Item
                key={item.id}
                item={item}
                updateInvoiceItems={updateInvoiceItems}
                onDelete={() => deleteItemRow(item.id)}
              />
            ))}
          </div>
          <div className="flex justify-between">
            <Button type="button" variant={"primary"} onClick={addItemRow}>
              <GrAdd /> Add Item
            </Button>
            <div className="flex gap-2">
              <SaveButton onClick={onSave} />
              <Button onClick={() => onPrintPreview()} variant="secondary" type="button">
                <LuEye /> Preview
              </Button>
              {/* <Button
                onClick={() => onPrintInvoice()}
                variant="primary"
                type="button"
                className="bg-yellow-400 text-text-primary hover:bg-yellow-500 active:bg-yellow-500/70"
              >
                <LuPrinter /> Print Invoice
              </Button> */}
            </div>
          </div>
        </section>
        {/* Total Section */}
        <section className="bg-bg-sidebar rounded-2xs px-3 py-2 mt-2 w-60 space-y-2 ml-auto">
          <p className="flex justify-between">
            Sub Total <strong className="font-normal">₹ {getTotals(currentInvoice.items).subTotal}</strong>
          </p>
          <p className="flex justify-between">
            Rounding (+/-) <strong className="font-normal">₹ {getTotals(currentInvoice.items).rounding}</strong>
          </p>
          <Divider className="my-2" />
          <p className="flex justify-between text-lg font-semibold">
            Total <strong className="">₹ {getTotals(currentInvoice.items).total}</strong>
          </p>
        </section>
      </div>
    </section>
  );
}

export default InvoiceWrapper;
