import { useEffect, useState } from "react";
import { createEmptyInvoiceItem, generateNewInvoiceID } from "../utils/invoicer";
import type { ItemType } from "../components/Item";
import storage from "../db/index2";

export type Invoice = {
  id: string;
  customer: Customer;
  status: "draft" | "final";
  items: ItemType[];
  date: Date;
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
    date: new Date(),
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
    const lastInvoice = await storage.loadLastInvoice();
    let lastInvoiceId = "";

    if (lastInvoice) {
      lastInvoiceId = lastInvoice.id;
    }

    return {
      id: generateNewInvoiceID(lastInvoiceId),
      status: "draft",
      date: new Date(),
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
    setInvoiceList((prev) => {
      const index = prev.findIndex((i) => i.id === currentInvoice.id);

      if (index < 0) return [...prev, currentInvoice];

      const copy = [...prev];
      copy[index] = currentInvoice;

      return copy;
    });

    await storage.saveInvoice(currentInvoice);
  }

  async function findInvoice(id: string) {
    return await storage.findInvoice(id);
  }

  function getAllInvoices() {
    return storage.loadInvoiceList();
  }

  function deleteInvoice(id: string) {
    setInvoiceList((prev) => prev.filter((i) => i.id !== id));

    storage.deleteInvoice(id);
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
