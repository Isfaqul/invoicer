import { LuFilePlus2, LuLayoutDashboard, LuFish } from "react-icons/lu";
import Button from "../components/Button";
import Divider from "../components/Divider";
import SearchBox from "../features/SearchBox";
import type { Invoice } from "../hooks/useInvoice";

type SideBarProps = {
  onCreateNewInvoice: () => void;
  invoiceList: Invoice[];
  onSelectInvoice: (id: string) => void;
};

function SideBar({ onCreateNewInvoice, invoiceList, onSelectInvoice }: SideBarProps) {
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
          {invoiceList.map((invoice) => (
            <li
              onClick={() => {
                onSelectInvoice(invoice.id);
              }}
              className="text-center bg-bg-sidebar py-1 px-2 cursor-pointer transition-colors ease-out rounded-sm hover:bg-gray-200 active:bg-gray-300"
              key={invoice.id}
            >
              {invoice.id}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
