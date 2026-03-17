import type { InvoiceData } from "../hooks/useInvoice";

class Storage {
  private INVOICE_LIST_KEY = "invoices";

  saveInvoice(invoice: InvoiceData) {
    const invoiceList: InvoiceData[] = this.loadInvoiceList();
    const existingIndex = invoiceList.findIndex((i) => i.id === invoice.id);

    if (existingIndex === -1) {
      invoiceList.push(invoice);
    } else {
      invoiceList[existingIndex] = invoice;
    }

    localStorage.setItem(this.INVOICE_LIST_KEY, JSON.stringify(invoiceList));
  }

  deleteInvoice(id: string) {
    let invoiceList: InvoiceData[] = this.loadInvoiceList();
    const invoiceExist = invoiceList.findIndex((i) => i.id === id);
    if (invoiceExist < 0) return;

    invoiceList = invoiceList.filter((i) => i.id !== id);

    localStorage.setItem(this.INVOICE_LIST_KEY, JSON.stringify(invoiceList));
  }

  loadInvoiceList(): InvoiceData[] {
    const invoiceList = JSON.parse(localStorage.getItem(this.INVOICE_LIST_KEY) || "[]") as InvoiceData[];
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

    return invoiceList[invoiceList.length - 1];
  }
}

const storage = new Storage();

export default storage;
