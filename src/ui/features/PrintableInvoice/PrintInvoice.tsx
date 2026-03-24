import type { Invoice } from "../../hooks/useInvoice";
import { BiPrinter, BiX } from "react-icons/bi";

import Divider from "../../components/Divider";
import BillHeader from "./components/BillHeader";
import BillingParty from "./components/BillingParty";
import InvoiceMeta from "./components/InvoiceMeta";
import InvoiceItemTable from "./components/InvoiceItemTable";
import BankDetails from "./components/BankDetails";
import Declaration from "./components/Declaration";
import Signature from "./components/Signature";
import IconButton from "./components/IconButton";

import qrCode from "../../assets/qr-code.png";
import logo from "../../assets/logo.svg";

const BANK_DETAILS = {
  name: "Adarsha Printers",
  accountNumber: "0568050010654",
  bankName: "Punjab National Bank",
  ifsc: "PUNB0056820",
  branchName: "Silpukhuri",
  qrCodeSrc: qrCode,
};

type PrintProps = React.ComponentPropsWithRef<"div"> & {
  currentInvoice: Invoice;
  onPreviewClose: () => void;
  onPrint: () => void;
  isVisible: boolean;
};

function PrintableInvoice({ currentInvoice, onPreviewClose, onPrint, isVisible, ...props }: PrintProps) {
  return (
    <div
      {...props}
      id="print-area"
      className={`bg-bg-sidebar print:bg-white p-2 print:p-0 print:h-auto fixed print:relative inset-y-0 right-0 z-40 flex items-start gap-2 ${isVisible ? "animate-slide-in" : "animate-slide-out"}`}
    >
      <div className="flex flex-col gap-2 print:hidden" id="print-invoic-actions">
        <IconButton onClick={onPreviewClose}>
          <BiX />
        </IconButton>
        <IconButton onClick={onPrint}>
          <BiPrinter />
        </IconButton>
      </div>
      <section className="h-full print:h-auto! overflow-y-auto print:overflow-visible border bg-white p-4 rounded-2xs border-border-medium w-2xl print:w-full! print:border-none! print:p-0!">
        <BillHeader logoSrc={logo} />
        <Divider className="border-border-light my-3" />
        <div className="flex text-xs gap-2 print:text-sm">
          <BillingParty customer={currentInvoice.customer} />
          <InvoiceMeta date={currentInvoice.date} invoiceId={currentInvoice.id} />
        </div>
        <InvoiceItemTable items={currentInvoice.items} />
        <BankDetails bank={BANK_DETAILS} />
        <Declaration />
        <Signature />
      </section>
    </div>
  );
}

export default PrintableInvoice;
