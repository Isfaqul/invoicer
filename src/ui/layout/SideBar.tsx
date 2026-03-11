import {
  LuFilePlus2,
  LuLayoutDashboard,
  LuEllipsisVertical,
  LuPanelLeftOpen,
  LuPanelLeftClose,
  LuUsers,
  LuFileText,
} from "react-icons/lu";
import Button from "../components/Button";
import Divider from "../components/Divider";
import SearchBox from "../features/SearchBox";
import type { Invoice } from "../hooks/useInvoice";
import { useState, type ReactNode } from "react";
import { BiTrash } from "react-icons/bi";
import logo from "../assets/logo.svg";
import type { Views } from "../hooks/useView";

type SideBarProps = {
  onCreateNewInvoice: () => void;
  invoiceList: Invoice[];
  onSelectInvoice: (id: string) => void;
  onDeleteInvoice: (id: string) => void;
  currentInvoiceId: string;
  setView: (view: Views) => void;
  currentView: Views;
};

function SideBar({
  onCreateNewInvoice,
  invoiceList,
  onSelectInvoice,
  onDeleteInvoice,
  currentInvoiceId,
  setView,
  currentView,
}: SideBarProps) {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState(true);

  function filterInvoices(queryStr: string): Invoice[] {
    queryStr = queryStr.toLowerCase();
    if (!queryStr) return invoiceList;

    return invoiceList.filter((invoice) => {
      const idMatch = invoice.id.toLowerCase().includes(queryStr);

      const customerNameMatch = invoice.customer.clientName.toLowerCase().includes(queryStr);

      const addressMatch = invoice.customer.clientAddress.toLowerCase().includes(queryStr);

      const itemMatch = invoice.items.some((i) => i.name.toLowerCase().includes(queryStr));

      return idMatch || customerNameMatch || addressMatch || itemMatch;
    });
  }

  function handleView(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const view = target.getAttribute("data-view-btn") as Views;

    if (!view) return;

    setView(view);
  }

  let filteredInvoice = filterInvoices(query);

  return (
    <aside
      className={`h-full bg-bg-sidebar shrink-0 flex flex-col transition-all 400ms ease-glide gap-6 py-8 relative ${collapsed ? "w-16 px-4" : "w-72 px-8"}`}
    >
      {/* SideBar Toggle Button */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        type="button"
        className="absolute -right-7 top-0 z-10 text-xl bg-bg-sidebar text-text-muted px-1 py-1 cursor-pointer rounded-2xs transition ease-out hover:text-text-primary"
      >
        {collapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
      </button>

      <hgroup className="h-10">
        {collapsed ? (
          <img src={logo} className="block w-8" />
        ) : (
          <>
            <h1 className="text-xl text-text-primary uppercase font-bold tracking-wide">Adarsha Printers</h1>
            <p className="text-xs font-light tracking-wide text-text-secondary">Guwahati Club, Guwahati - 781003</p>
          </>
        )}
      </hgroup>

      {/*  */}
      <Divider className="border-border-medium" />
      <div className="flex flex-col gap-3">
        <SearchBox
          onSearchBarClick={() => collapsed && setCollapsed(false)}
          onChange={(e) => setQuery(e.target.value)}
          query={query}
          collapsed={collapsed}
        />
        {currentView === "Invoice" && (
          <Button
            onClick={onCreateNewInvoice}
            variant="primary"
            type="button"
            className={`text-sm h-9 relative ${collapsed && "justify-center"}`}
          >
            <LuFilePlus2 className={`pointer-events-none shrink-0 text-base ${collapsed && "text-lg"}`} />{" "}
            {!collapsed && "New Invoice"}
          </Button>
        )}

        {currentView !== "Invoice" && (
          <Button
            data-view-btn="Invoice"
            onClick={handleView}
            variant="secondary"
            type="button"
            className={`text-sm h-9 relative ${collapsed && "justify-center"}`}
          >
            <LuFileText className={`pointer-events-none shrink-0 text-base ${collapsed && "text-lg"}`} />{" "}
            {!collapsed && "Invoice"}
          </Button>
        )}

        {/* <Divider className="border-border-medium" /> */}
        <Button
          data-view-btn="Dashboard"
          onClick={handleView}
          variant="secondary"
          type="button"
          className={`text-sm h-9 relative ${collapsed && "justify-center"}`}
        >
          <LuLayoutDashboard className={`pointer-events-none shrink-0 text-base ${collapsed && "text-lg"}`} />{" "}
          {!collapsed && "Dashboard"}
        </Button>
        {/* <Button
          data-view-btn="Clients"
          onClick={handleView}
          variant="secondary"
          type="button"
          className={`text-sm h-9 relative ${collapsed && "justify-center"} `}
        >
          <LuUsers className={`pointer-events-none shrink-0 text-base ${collapsed && "text-lg"}`} />{" "}
          {!collapsed && "Clients"}
        </Button> */}
      </div>
      <Divider className="border-border-medium" />

      {/* Invoice List */}
      {!collapsed && currentView === "Invoice" && (
        <div>
          <h2 className="font-medium mb-2">{query ? "Search Results" : "All Invoices"} </h2>
          <ul className="bg-bg-surface rounded-xs p-3 border border-border-light space-y-2 overflow-y-auto">
            {!filteredInvoice.length && (
              <p className="border border-dashed border-border-medium text-center py-1 text-gray-400 rounded-2xs">
                Empty
              </p>
            )}
            {filteredInvoice.map((invoice) => (
              <InvoiceListItem
                active={currentInvoiceId === invoice.id}
                key={invoice.id}
                onClick={() => onSelectInvoice(invoice.id)}
                onDelete={() => onDeleteInvoice(invoice.id)}
              >
                {invoice.id}
              </InvoiceListItem>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

function InvoiceListItem({
  onClick,
  children,
  onDelete,
  active,
}: {
  children: ReactNode;
  onClick: () => void;
  onDelete: () => void;
  active: boolean;
}) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <li className="flex relative">
      <button
        onClick={onClick}
        className={`block w-full text-center ${active && "border-l-5 border-gray-700"} bg-bg-sidebar py-1 px-2 cursor-pointer transition-colors ease-out rounded-2xs hover:bg-gray-200 active:bg-gray-300`}
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
        <LuEllipsisVertical className="pointer-events-none" />
      </button>
      {/* Options */}
      {showOptions && (
        <button
          onClick={onDelete}
          type="button"
          className="bg-red-400 text-white px-2.5 py-2.5 absolute right-6 rounded-2xs cursor-pointer transition-all ease-out hover:bg-red-500 active:bg-red-600"
        >
          <BiTrash className="text-white text-xs" />
        </button>
      )}
    </li>
  );
}

export default SideBar;
