import BillTo from "../components/BillTo";
import Button from "../components/Button";
import Divider from "../components/Divider";
import Item from "../components/Item";
import { GrAdd } from "react-icons/gr";
import { getTotals } from "../utils/invoicer";
import { LuCheckCheck, LuEye, LuMenu, LuNotebookPen, LuSave } from "react-icons/lu";
import type { Invoice } from "../hooks/useInvoice";
import { formatDateForInput, getMetKeyPerOS } from "../utils/helpers";
import { useEffect, useRef, useState } from "react";

type InvoiceWrapperProps = {
  currentInvoice: Invoice;
  updateInvoiceItems: (id: string, field: string, value: string | number) => void;
  updateCustomerInfo: (field: string, value: string) => void;
  updateInvoiceField: (field: keyof Invoice, value: string | number | boolean) => void;
  addItemRow: () => void;
  deleteItemRow: (id: string) => void;
  onPrintInvoice: () => void;
  onPrintPreview: () => void;
  onSave: () => void;
  invoiceList: Invoice[];
};

function InvoiceWrapper({
  currentInvoice,
  deleteItemRow,
  addItemRow,
  updateInvoiceItems,
  updateCustomerInfo,
  onPrintPreview,
  onSave,
  updateInvoiceField,
  invoiceList,
}: InvoiceWrapperProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const menuRef = useRef(null);
  const showMenuBtnRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("#menu") !== menuRef.current && target.closest("#showMenuBtn") !== showMenuBtnRef.current) {
        setShowMenu(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showMenu]);

  return (
    <section className="bg-bg-surface grow h-full p-8 flex flex-col gap-2 overflow-y-auto">
      <div className="border border-border-light rounded-xs px-5 pt-3 py-5">
        <header className="flex justify-between w-full mb-2 gap-2 items-base">
          <div className="flex items-center justify-between flex-1">
            <label htmlFor="dateInput" className="font-light">
              <strong className="font-bold">Date </strong>
              <input
                name="date"
                type="date"
                id="dateInput"
                value={formatDateForInput(currentInvoice.date)}
                onChange={(e) => {
                  const value = e.target.value;
                  const timestamp = new Date(value).getTime();
                  updateInvoiceField("date", timestamp);
                }}
              />
            </label>
            {/* Payment Badge */}
            {currentInvoice.id && (
              <p
                className={`border text-2xs uppercase font-medium px-2 rounded-2xs transition-all duration-400 linear ${currentInvoice.isPaid ? "border-emerald-600 bg-emerald-50" : "border-red-600 bg-red-50"}`}
              >
                {currentInvoice.isPaid ? "Paid" : "Due"}
              </p>
            )}
            {/*  */}
            <p className="font-light">
              <strong className="font-bold">Invoice # </strong>
              {currentInvoice.id}
            </p>
          </div>
          <div>
            <div className="relative">
              <button
                ref={showMenuBtnRef}
                id="showMenuBtn"
                className="cursor-pointer text-lg relative translate-y-0.5 group"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <LuMenu className="transition-all ease-out group-hover:text-gray-600" />
              </button>
              {showMenu && (
                <ul
                  ref={menuRef}
                  id="menu"
                  className="absolute right-0 z-30 w-40 rounded-xs origin-top-right animate-expandDown"
                >
                  <li>
                    <Button
                      onClick={() => {
                        setShowNote((prev) => !prev);
                        setShowMenu(false);
                      }}
                      variant="secondary"
                      type="button"
                      className="w-full"
                    >
                      <LuNotebookPen /> {showNote ? "Hide Note" : "View Note"}
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => {
                        setShowMenu(false);
                        currentInvoice.id && updateInvoiceField("isPaid", !currentInvoice.isPaid);
                      }}
                      variant="secondary"
                      type="button"
                      className="w-full"
                    >
                      <div className="flex gap-2 items-center">
                        <LuCheckCheck /> {currentInvoice.isPaid ? "Mark UnPaid" : "Mark Paid"}
                      </div>
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => {
                        onSave();
                        setShowMenu(false);
                      }}
                      variant="secondary"
                      type="button"
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        <LuSave /> Save
                      </div>
                      <span className="block ml-auto text-2xs font-medium uppercase">{getMetKeyPerOS()} + S</span>
                    </Button>
                  </li>
                  <li>
                    <Button onClick={() => onPrintPreview()} variant="secondary" type="button" className="w-full">
                      <div className="flex gap-2 items-center">
                        <LuEye /> Preview
                      </div>
                      <span className="block ml-auto text-2xs font-medium uppercase">{getMetKeyPerOS()} + P</span>
                    </Button>
                  </li>
                </ul>
              )}
            </div>
          </div>
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
            <div className="flex gap-2"></div>
          </div>
        </section>
        {/* Total Section */}
        <section className={`w-full h-32 flex items-start gap-2 ${showNote ? "justify-between" : "justify-end"}`}>
          {showNote && (
            <div className="flex-1 pt-2 flex flex-col h-full">
              <label htmlFor="note" className="text-text-secondary block">
                Notes
              </label>
              <textarea
                className="resize-none block flex-1 w-full max-w-150 rounded-2xs border border-border-light px-1.5 py-0.5 outline-0 -outline-offset-1 outline-gray-700 focus:outline-1  placeholder:text-gray-400/80 placeholder:font-light"
                placeholder="Add your notes here..."
                name="note"
                id="note"
                value={currentInvoice.note}
                onChange={(e) => updateInvoiceField("note", e.target.value)}
              ></textarea>
            </div>
          )}

          <div className="bg-bg-sidebar rounded-2xs px-3 py-2 mt-2 space-y-2 w-60">
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
          </div>
        </section>
      </div>
    </section>
  );
}

export default InvoiceWrapper;
