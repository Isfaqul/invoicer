import type { Invoice } from "../hooks/useInvoice";
import { invoke } from "@tauri-apps/api/core";

class Storage {
  async saveInvoice(invoice: Invoice) {
    await invoke("save_invoice", { id: invoice.id, data: JSON.stringify(invoice) });
  }

  async deleteInvoice(id: string) {
    await invoke("delete_invoice", { id });
  }

  async loadInvoiceList(): Promise<Invoice[]> {
    const rows = await invoke<string[]>("load_invoices");
    const arr: Invoice[] = rows.map((row) => JSON.parse(row));
    return arr;
  }

  async findInvoice(id: string) {
    const invoice = await invoke<string>("find_invoice", { id });
    return JSON.parse(invoice);
  }

  async loadLastInvoice(): Promise<Invoice | null> {
    const invoice = await invoke<string | null>("get_last_invoice");

    if (!invoice) return null;

    const parsed = JSON.parse(invoice) as Invoice;
    return parsed;
  }

  async getNextInvoiceId(): Promise<string> {
    const currentYear = new Date().getFullYear();
    const number = await invoke<string>("get_next_invoice_id", { year: currentYear });

    const newId = `ADP-${currentYear}-${String(number).padStart(3, "0")}`;
    return newId;
  }
}

const db = new Storage();

export default db;
