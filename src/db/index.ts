import type { Invoice } from "../hooks/useInvoice";

class Storage {
  private INVOICE_LIST_KEY = "invoices";

  saveInvoice(invoice: Invoice) {
    const invoiceList: Invoice[] = this.loadInvoiceList();
    const existingIndex = invoiceList.findIndex((i) => i.id === invoice.id);

    if (existingIndex === -1) {
      invoiceList.push(invoice);
    } else {
      invoiceList[existingIndex] = invoice;
    }

    localStorage.setItem(this.INVOICE_LIST_KEY, JSON.stringify(invoiceList));
  }

  loadInvoiceList(): Invoice[] {
    const invoiceList = JSON.parse(localStorage.getItem(this.INVOICE_LIST_KEY) || "[]") as Invoice[];
    return invoiceList;
  }

  findInvoice(id: string) {
    const invoiceList = this.loadInvoiceList();
    if (!invoiceList.length) return null;

    const findInvoice = invoiceList.find((invoice) => invoice.id === id);

    if (findInvoice) return findInvoice;

    return null;
  }

  loadLastInvoice() {
    const invoiceList = this.loadInvoiceList();
    if (!invoiceList.length) return null;

    console.log(invoiceList);

    return invoiceList[invoiceList.length - 1];
  }
}

const storage = new Storage();

export default storage;
