import { HiMapPin } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";
import { MdPermContactCalendar } from "react-icons/md";
import Divider from "../../components/Divider";
import logo from "../../assets/logo.svg";
import type { Invoice } from "../../hooks/useInvoice";
import { getRowPrice, getTotals, RUPEES_IN_WORDS } from "../../utils/invoicer";
import qrCode from "../../assets/qr-code.png";
import { formatDate } from "../../utils/helpers";
import { BiPrinter, BiX } from "react-icons/bi";

type PrintProps = React.ComponentPropsWithRef<"div"> & {
  currentInvoice: Invoice;
  onPreviewClose: () => void;
  onPrint: () => void;
  isVisible: boolean;
};

function PrintableInvoice({ currentInvoice, onPreviewClose, onPrint, isVisible, ...props }: PrintProps) {
  const { subTotal, rounding, total } = getTotals(currentInvoice.items);
  const amountInWords = RUPEES_IN_WORDS(total);

  return (
    <div
      {...props}
      id="print-area"
      className={`bg-bg-sidebar print:bg-white p-2 print:p-0 print:h-auto fixed print:relative inset-y-0 right-0 z-40 flex items-start gap-2 ${isVisible ? "animate-slide-in" : "animate-slide-out"}`}
    >
      <div className="flex flex-col gap-2 print:hidden">
        <button
          onClick={onPreviewClose}
          type="button"
          className="text-lg bg-text-primary text-text-inverse px-1 py-1 cursor-pointer rounded-2xs hover:bg-gray-700"
        >
          <BiX />
        </button>
        <button
          onClick={onPrint}
          type="button"
          className="text-lg bg-yellow-400 text-text-primary px-1 py-1 cursor-pointer rounded-2xs hover:bg-yellow-500"
        >
          <BiPrinter />
        </button>
      </div>
      <section className="h-full print:h-auto overflow-y-auto print:overflow-visible border bg-white p-4 rounded-2xs border-border-medium w-2xl print:w-full print:border-0 print:p-0">
        {/* Invoice Header */}
        <div className="flex justify-between">
          <div className="flex gap-4">
            <img className="block w-14 print:w-16" src={logo} alt="adarsha printers logo" />
            <div>
              <h2 className="text-lg text-text-primary uppercase font-bold tracking-wide leading-5">
                Adarsha Printers
              </h2>
              <p className="text-xs font-light leading-3 print:text-sm">
                (A Unit of PMEGP | A Govt. of Assam Regd. SSI Unit)
              </p>
              <p className="text-xs flex items-center gap-1 print:text-sm">
                <HiMapPin />
                Cube Complex, GNB Road, Guwahati Club, Guwahati - 3
              </p>
              <p className="text-xs flex items-center gap-1 leading-3 print:text-sm">
                <MdPermContactCalendar /> 70029-00436, 98640-35212
              </p>
              <p className="text-xs flex items-center gap-1 leading-3 print:text-sm">
                <IoMdMail /> adarshaprinters@gmail.com
              </p>
            </div>
          </div>
          <div>
            <h3 className="uppercase font-bold text-2xs text-right print:text-sm">Invoice</h3>
            <p className="text-xs text-right print:text-sm">
              <span className="font-semibold">GSTIN</span> 18ABPPH1875E1ZH
            </p>
          </div>
        </div>
        <Divider className="border-border-light my-3" />
        {/* Bill to Section */}
        <div className="flex text-xs gap-2 print:text-sm">
          <div className="grow border border-border-light p-2 pb-3 rounded-md">
            <section className="space-y-2">
              <div className="flex">
                <p className="w-20">
                  <strong className="font-medium">Name</strong>
                </p>
                <p className="bg-white w-full">{currentInvoice.customer.clientName}</p>
              </div>
              <div className="flex">
                <p className="w-20">
                  <strong className="font-medium">Address</strong>
                </p>
                <p className="bg-white w-full">{currentInvoice.customer.clientAddress}</p>
              </div>
              <div className="flex">
                <p className="w-20">
                  <strong className="font-medium">Ref ID</strong>
                </p>
                <p className="w-full bg-white">{currentInvoice.customer.clientRefId}</p>
              </div>
            </section>
          </div>
          {/* ----------------------- */}
          <div className="border border-border-light p-2 rounded-md shrink-0">
            <p className="text-right">
              <strong className="font-semibold">Date </strong>
              <time dateTime={formatDate(currentInvoice.date)}>{formatDate(currentInvoice.date)}</time>
              {/* <span className="font-semibold">Date</span> {currentInvoice.date.toLocaleDateString()} */}
            </p>
            <p className="text-right">
              <span className="font-semibold">Invoice #</span> {currentInvoice.id}
            </p>
          </div>
          {/* <div className="flex items-center justify-between w-full mt-2">
            <p className="text-xl font-semibold">Due </p>
            <h2 className="text-xl font-semibold text-right">
              <span className="text-gray-400 text-sm">₹</span> 3000.00
            </h2>
          </div> */}
        </div>
        {/* Items Table */}
        <table className="table-auto border-collapse mt-3 text-xs w-full">
          <thead>
            <tr className="bg-bg-sidebar print:text-sm">
              <th className="px-1 py-1 border text-center border-border-light font-medium uppercase">Sl</th>
              <th className="px-1 py-1 border text-left border-border-light font-medium uppercase">Items</th>
              <th className="px-1 py-1 border text-center border-border-light font-medium uppercase">HSN</th>
              <th className="px-1 py-1 border text-right border-border-light font-medium uppercase">Rate</th>
              <th className="px-1 py-1 border text-center border-border-light font-medium uppercase">Qty</th>
              <th className="px-1 py-1 border text-right border-border-light font-medium uppercase">Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentInvoice.items.map((item, index) => {
              const rate = item.rate === "" ? 0 : item.rate;
              const qty = item.quantity === "" ? 0 : item.quantity;
              const amount = getRowPrice(rate, qty);

              return (
                <tr className="print:text-sm" key={item.id}>
                  <td className="px-1 py-1 border text-center border-border-light">{index + 1}</td>
                  <td className="px-1 py-1 border text-left border-border-light">{item.name}</td>
                  <td className="px-1 py-1 border text-center border-border-light">{item.HSN ?? ""}</td>
                  <td className="px-1 py-1 border text-right border-border-light">{item.rate}</td>
                  <td className="px-1 py-1 border text-center border-border-light">{item.quantity}</td>
                  <td className="px-1 py-1 border text-right border-border-light">₹ {amount}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="print:text-sm">
              <td colSpan={4}></td>
              <td className="px-1 py-1 border text-right border-border-light text-nowrap">Sub Total</td>
              <td className="px-1 py-1 border text-right border-border-light text-nowrap">₹ {subTotal}</td>
            </tr>
            <tr className="print:text-sm">
              <td colSpan={4} className="px-1 py-1 text-left font-semibold uppercase text-nowrap">
                Amount in words :
              </td>
              <td className="px-1 py-1 border text-right border-border-light text-nowrap">Rounding (+/-)</td>
              <td className="px-1 py-1 border text-right border-border-light text-nowrap">₹ {rounding}</td>
            </tr>
            <tr>
              <td colSpan={4} className="px-1 py-1 text-left print:text-sm text-nowrap">
                {amountInWords}
              </td>
              <td className="px-1 py-1 border text-right border-border-light font-semibold print:text-base uppercase text-nowrap">
                Total
              </td>
              <td className="px-1 py-1 border text-right border-border-light font-semibold print:text-base text-nowrap">
                ₹ {total}
              </td>
            </tr>
          </tfoot>
        </table>
        {/* Bank Details Section */}
        <div className="grow border border-border-light p-2 pb-3 rounded-md mt-3 flex gap-3">
          <div>
            <h3 className="uppercase text-xs font-semibold mb-1 print:text-sm">Bank details : </h3>
            <div className="text-xs print:text-sm">
              <p>
                <span className="inline-block w-20">Name</span>
                <span>Adarsha Printers</span>
              </p>
              <p>
                <span className="inline-block w-20">A/c</span>
                <span>0568050010654</span>
              </p>
              <p>
                <span className="inline-block w-20">Bank Name</span>
                <span>Punjab National Bank</span>
              </p>
              <p>
                <span className="inline-block w-20">IFSC</span>
                <span>PUNB0056820</span>
              </p>
              <p>
                <span className="inline-block w-20">Branch</span>
                <span>Silpukhuri</span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="uppercase text-xs font-semibold mb-1 print:text-sm">QR Code : </h3>
            <img className="block size-20 print:size-25" src={qrCode} alt="upi-QR-code" />
          </div>
        </div>
        {/* Declaration Section */}
        <div className="text-xs mt-3">
          <h4 className="font-semibold">Declaration:</h4>
          <p className="text-xs">Composition taxable person, not eligible to collect tax on supplies</p>
        </div>
        {/* Signature Section */}
        <div className="h-16 flex justify-end items-end">
          <p className="text-text-primary font-semibold text-xs print:text-sm text-right">Signature</p>
        </div>
      </section>
    </div>
  );
}

export default PrintableInvoice;
