import type { ItemType } from "../../../components/Item";
import { getRowPrice } from "../../../utils/invoicer";

type InvoiceItemTableProps = {
  items: ItemType[];
  invoiceSummary: InvoiceSummary;
  amountInWords: string;
};

type InvoiceSummary = {
  subTotal: number;
  rounding: number;
  total: number;
};

function InvoiceItemTable({ items, invoiceSummary, amountInWords }: InvoiceItemTableProps) {
  return (
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
        {items.map((item, index) => {
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
          <td className="px-1 py-1 border text-right border-border-light text-nowrap">₹ {invoiceSummary.subTotal}</td>
        </tr>
        <tr className="print:text-sm">
          <td colSpan={4} className="px-1 py-1 text-left font-semibold uppercase text-nowrap">
            Amount in words :
          </td>
          <td className="px-1 py-1 border text-right border-border-light text-nowrap">Rounding (+/-)</td>
          <td className="px-1 py-1 border text-right border-border-light text-nowrap">₹ {invoiceSummary.rounding}</td>
        </tr>
        <tr>
          <td colSpan={4} className="px-1 py-1 text-left print:text-sm text-nowrap">
            {amountInWords}
          </td>
          <td className="px-1 py-1 border text-right border-border-light font-semibold print:text-base uppercase text-nowrap">
            Total
          </td>
          <td className="px-1 py-1 border text-right border-border-light font-semibold print:text-base text-nowrap">
            ₹ {invoiceSummary.total}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default InvoiceItemTable;
