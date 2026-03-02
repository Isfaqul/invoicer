import { useState } from "react";
import { createEmptyInvoiceItem, generateNewInvoiceID } from "../utils/invoicer";
import type { ItemType } from "../components/Item";
import storage from "../db";

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
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>(createBlankInvoiceTemplate());

  function createNewInvoice() {
    const newInvoice = createBlankInvoiceTemplate();

    setCurrentInvoice(newInvoice);
  }

  function createBlankInvoiceTemplate(): Invoice {
    const lastInvoice = storage.loadLastInvoice();
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
    console.log(`${field} : ${value}`);
    const customerCopy = { ...currentInvoice.customer, [field]: value };

    setCurrentInvoice((prev) => {
      return { ...prev, customer: customerCopy };
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

  function saveInvoice() {
    storage.saveInvoice(currentInvoice);
  }

  function findInvoice(id: string) {
    return storage.findInvoice(id);
  }

  function getAllInvoices() {
    return storage.loadInvoiceList();
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
    getAllInvoices,
    setCurrentInvoice,
  };
}
