import { formatDate } from "../../../utils/helpers";

function InvoiceMeta({ date, invoiceId }: { date: number; invoiceId: string }) {
  return (
    <div className="border border-border-light p-2 rounded-md shrink-0">
      <p className="text-right">
        <strong className="font-semibold">Date </strong>
        <time dateTime={formatDate(date)}>{formatDate(date)}</time>
      </p>
      <p className="text-right">
        <span className="font-semibold">Invoice #</span> {invoiceId}
      </p>
    </div>
  );
}

export default InvoiceMeta;
