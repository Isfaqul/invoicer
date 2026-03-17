import { format } from "date-fns";
import type { Invoice } from "../hooks/useInvoice";

export function formatDate(date: number) {
  return format(new Date(date), "d-MMM-yyy");
}

export function formatDateForInput(date: number) {
  return format(new Date(date), "yyyy-MM-dd");
}

function getOS() {
  if (navigator.userAgent) {
    if (navigator.platform.startsWith("Mac")) return "MacOS";
    else if (navigator.platform.startsWith("Win")) return "Windows";
  }
}

export function getMetKeyPerOS() {
  let platform = getOS();

  if (platform === "MacOS") return "⌘";
  else if (platform === "Windows") return "Ctrl";
}

export function filterInvoices(invoiceList: Invoice[], queryStr: string): Invoice[] {
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
