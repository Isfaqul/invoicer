import { useEffect, useRef, useState } from "react";
import { createEmptyInvoiceItem } from "../utils/invoicer";
import type { ItemType } from "../components/Item";
import db from "../db";
import { useToastContext } from "../features/Toast/ToastProvider";

export type Invoice = {
  id: string;
  customer: Customer;
  items: ItemType[];
  date: number;
  note: string;
  status: "draft" | "final";
  isPaid: boolean;
};

export type Customer = {
  clientName: string;
  clientAddress: string;
  clientRefId: string;
};

export default function useInvoice() {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>({
    id: "",
    date: Date.now(),
    status: "draft",
    customer: {
      clientName: "",
      clientAddress: "",
      clientRefId: "",
    },
    items: [createEmptyInvoiceItem()],
    note: "",
    isPaid: false,
  });
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
  const { addToast } = useToastContext();
  const isDirty = useRef(false);

  useEffect(() => {
    async function init() {
      const response = await getAllInvoices();
      setInvoiceList(response);

      const newInvoice = await createBlankInvoiceTemplate();
      setCurrentInvoice(newInvoice);
    }

    init();
  }, []);

  useEffect(() => {
    if (!currentInvoice.id) return;
    if (!isDirty.current) return;

    const timer = setTimeout(async () => await saveInvoice(), 1000);

    return () => clearTimeout(timer);
  }, [currentInvoice]);

  async function createNewInvoice() {
    const newInvoice = createBlankInvoiceTemplate();
    setCurrentInvoice(newInvoice);
  }

  function createBlankInvoiceTemplate(): Invoice {
    return {
      id: "",
      date: Date.now(),
      status: "draft",
      customer: {
        clientName: "",
        clientAddress: "",
        clientRefId: "",
      },
      items: [createEmptyInvoiceItem()],
      note: "",
      isPaid: false,
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

    // Trigger Auto Save
    isDirty.current = true;
  }

  function updateInvoiceField(field: keyof Invoice, value: string | number | boolean) {
    setCurrentInvoice((prev) => {
      return { ...prev, [field]: value };
    });

    // Trigger Auto Save
    isDirty.current = true;
  }

  function updateCustomerInfo(field: string, value: string) {
    setCurrentInvoice((prev) => {
      return { ...prev, customer: { ...prev.customer, [field]: value } };
    });

    // Dirty Fields
    isDirty.current = true;
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

    // Dirty Fields
    isDirty.current = true;
  }

  // Saves currentlyActive Invoice
  async function saveInvoice() {
    let invoiceToSave = currentInvoice;

    // Generate invoice ID only when saving for the first time
    if (!invoiceToSave.id) {
      const newId = await db.getNextInvoiceId();
      invoiceToSave = { ...invoiceToSave, id: newId };
      setCurrentInvoice(invoiceToSave);
    }

    await db.saveInvoice(invoiceToSave);
    isDirty.current = false;

    setInvoiceList((prev) => {
      const index = prev.findIndex((i) => i.id === invoiceToSave.id);

      if (index < 0) return [...prev, invoiceToSave];

      const copy = [...prev];
      copy[index] = invoiceToSave;

      return copy;
    });

    addToast(`Saved ${invoiceToSave.id && invoiceToSave.id}`);
  }

  async function findInvoice(id: string) {
    return await db.findInvoice(id);
  }

  async function getAllInvoices(): Promise<Invoice[]> {
    return db.loadInvoiceList();
  }

  async function deleteInvoice(id: string) {
    setInvoiceList((prev) => prev.filter((i) => i.id !== id));

    await createNewInvoice();

    await db.deleteInvoice(id);
    addToast(`Removed ${id}`, "warn");
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
    updateInvoiceField,
  };
}
