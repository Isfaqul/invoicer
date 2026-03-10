import { LuFilePlus2, LuLayoutDashboard, LuFish, LuEllipsisVertical, LuTrash, LuTrash2 } from "react-icons/lu";
import Button from "../components/Button";
import Divider from "../components/Divider";
import SearchBox from "../features/SearchBox";
import type { Invoice } from "../hooks/useInvoice";
import { useState, type ReactNode } from "react";

type SideBarProps = {
  onCreateNewInvoice: () => void;
  invoiceList: Invoice[];
  onSelectInvoice: (id: string) => void;
  onDeleteInvoice: (id: string) => void;
};

function SideBar({ onCreateNewInvoice, invoiceList, onSelectInvoice, onDeleteInvoice }: SideBarProps) {
  return (
    <aside className="bg-bg-sidebar w-72 h-full shrink-0 p-8 flex flex-col gap-6">
      <hgroup className="mt">
        <h1 className="text-xl text-text-primary uppercase font-bold tracking-wide">Adarsha Printers</h1>
        <p className="text-xs font-light tracking-wide text-text-secondary">Guwahati Club, Guwahati - 781003</p>
      </hgroup>
      <SearchBox />
      <Button onClick={onCreateNewInvoice} variant="primary" type="button" className="text-sm">
        <LuFilePlus2 /> New Invoice
      </Button>

      <Divider className="border-border-medium" />
      <Button variant="secondary" type="button" className="text-sm">
        <LuLayoutDashboard /> Dashboard
      </Button>
      <Button variant="secondary" type="button" className="text-sm">
        <LuFish /> Clients
      </Button>
      <Divider className="border-border-medium" />
      <div>
        <h2 className="font-medium mb-2">All Invoices</h2>
        <ul className="bg-bg-surface rounded-md p-3 border border-border-light space-y-2 overflow-y-auto">
          {!invoiceList.length && (
            <p className="border border-dashed border-border-medium text-center py-1 text-gray-400 rounded-sm">Empty</p>
          )}
          {invoiceList.map((invoice) => (
            <InvoiceListItem
              key={invoice.id}
              onClick={() => onSelectInvoice(invoice.id)}
              onDelete={() => onDeleteInvoice(invoice.id)}
            >
              {invoice.id}
            </InvoiceListItem>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function InvoiceListItem({
  onClick,
  children,
  onDelete,
}: {
  children: ReactNode;
  onClick: () => void;
  onDelete: () => void;
}) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <li className="flex relative">
      <button
        onClick={onClick}
        className="block w-full text-center bg-bg-sidebar py-1 px-2 cursor-pointer transition-colors ease-out rounded-sm hover:bg-gray-200 active:bg-gray-300"
        type="button"
      >
        {children}
      </button>
      {/*  */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        type="button"
        className="cursor-pointer transition ml-2 ease-in hover:text-gray-500"
      >
        <LuEllipsisVertical />
      </button>
      {/* Options */}
      {showOptions && (
        <button
          onClick={onDelete}
          type="button"
          className="bg-red-300  px-2 py-2 absolute right-6 top-0 rounded-md cursor-pointer transition-all ease-out hover:bg-red-400 active:bg-red-500"
        >
          <LuTrash2 />
        </button>
      )}
    </li>
  );
}

{
  /* <li
  onClick={() => {
    onSelectInvoice(invoice.id);
  }}
  className="text-center bg-bg-sidebar py-1 px-2 cursor-pointer transition-colors ease-out rounded-sm hover:bg-gray-200 active:bg-gray-300"
  key={invoice.id}
>
  {invoice.id}
</li>; */
}

export default SideBar;
