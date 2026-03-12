import { useEffect, useState } from "react";
import { createEmptyInvoiceItem } from "../utils/invoicer";
import type { ItemType } from "../components/Item";
import db from "../db/index2";

export type Invoice = {
  id: string;
  customer: Customer;
  status: "draft" | "final";
  items: ItemType[];
  date: number;
};

export type Customer = {
  clientName: string;
  clientAddress: string;
  clientRefId: string;
};

export default function useInvoice() {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>({
    id: "",
    status: "draft",
    date: Date.now(),
    customer: {
      clientName: "",
      clientAddress: "",
      clientRefId: "",
    },
    items: [createEmptyInvoiceItem()],
  });
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);

  useEffect(() => {
    async function init() {
      const response = await getAllInvoices();
      setInvoiceList(response);

      const newInvoice = await createBlankInvoiceTemplate();
      setCurrentInvoice(newInvoice);
    }

    init();
  }, []);

  async function createNewInvoice() {
    const newInvoice = await createBlankInvoiceTemplate();

    setCurrentInvoice(newInvoice);
  }

  async function createBlankInvoiceTemplate(): Promise<Invoice> {
    return {
      id: "",
      status: "draft",
      date: Date.now(),
      customer: {
        clientName: "",
        clientAddress: "",
        clientRefId: "",
      },
      items: [createEmptyInvoiceItem()],
    };
  }

  function updateInvoiceItems(id: string, field: string, value: string | number) {
    const itemsCopy = [...currentInvoice.items].map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      } else {
        return item;
      }
    });

    setCurrentInvoice((prev) => {
      return { ...prev, items: itemsCopy };
    });
  }

  function updateCustomerInfo(field: string, value: string) {
    setCurrentInvoice((prev) => {
      return { ...prev, customer: { ...prev.customer, [field]: value } };
    });
  }

  function addItemRow() {
    const itemsCopy = [...currentInvoice.items, createEmptyInvoiceItem()];

    setCurrentInvoice((prev) => {
      return { ...prev, items: itemsCopy };
    });
  }

  function deleteItemRow(id: string) {
    const itemsCopy = currentInvoice.items.filter((item) => item.id !== id);

    setCurrentInvoice((prev) => {
      return { ...prev, items: itemsCopy };
    });
  }

  async function saveInvoice() {
    let invoiceToSave = currentInvoice;

    // Generate invoice ID only when saving for the first time
    if (!invoiceToSave.id) {
      const newId = await db.getNextInvoiceId();
      invoiceToSave = { ...invoiceToSave, id: newId };
      setCurrentInvoice(invoiceToSave);
    }

    setInvoiceList((prev) => {
      const index = prev.findIndex((i) => i.id === invoiceToSave.id);

      if (index < 0) return [...prev, invoiceToSave];

      const copy = [...prev];
      copy[index] = invoiceToSave;

      return copy;
    });

    await db.saveInvoice(invoiceToSave);
  }

  async function findInvoice(id: string) {
    return await db.findInvoice(id);
  }

  function getAllInvoices() {
    return db.loadInvoiceList();
  }

  function deleteInvoice(id: string) {
    setInvoiceList((prev) => prev.filter((i) => i.id !== id));

    db.deleteInvoice(id);
  }

  return {
    currentInvoice,
    updateInvoiceItems,
    updateCustomerInfo,
    addItemRow,
    deleteItemRow,
    createNewInvoice,
    saveInvoice,
    findInvoice,
    setCurrentInvoice,
    deleteInvoice,
    invoiceList,
    setInvoiceList,
  };
}
