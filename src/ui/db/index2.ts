import type { Invoice } from "../hooks/useInvoice";
import { invoke } from "@tauri-apps/api/core";

class Storage {
  async saveInvoice(invoice: Invoice) {
    await invoke("save_invoice", { id: invoice.id, data: JSON.stringify(invoice) });
  }

  async deleteInvoice(id: string) {
    await invoke("delete_invoice", { id });
  }

  async loadInvoiceList() {
    const rows = await invoke<string[]>("load_invoices");
    let arr: Invoice[] = rows.map((row) => JSON.parse(row));
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
}

const storage = new Storage();

export default storage;
