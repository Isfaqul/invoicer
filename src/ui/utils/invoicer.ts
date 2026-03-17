import type { ItemType } from "../components/Item";
import type { Invoice } from "../hooks/useInvoice";

export function RUPEES_IN_WORDS(amount: number) {
  if (amount === 0) return "";

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function numToWords(num: number): string {
    if (num < 20) return ones[num];
    if (num < 100) {
      return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
    }
    if (num < 1000) {
      return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + numToWords(num % 100) : "");
    }
    if (num < 100000) {
      return numToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + numToWords(num % 1000) : "");
    }
    if (num < 10000000) {
      return numToWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + numToWords(num % 100000) : "");
    }
    return numToWords(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? " " + numToWords(num % 10000000) : "");
  }

  const rupees = Math.floor(amount);
  return "Rupees " + numToWords(rupees) + " Only";
}

export function getTotals(items: ItemType[]) {
  const subTotal = +items
    .reduce(
      (total, item) =>
        total +
        (typeof item.quantity === "number" ? item.quantity : 0) * (typeof item.rate === "number" ? item.rate : 0),
      0,
    )
    .toFixed(2);

  const rounding = +Math.abs(subTotal - Math.round(subTotal)).toFixed(2);
  const total = Math.round(subTotal);
  return { subTotal, rounding, total };
}

export function getRowPrice(rate: number, quantity: number) {
  const total = rate * quantity;

  return Math.round(total * 100) / 100;
}

export function getDashboardTotal(invoices: Invoice[]) {
  const total = invoices.reduce((acc, invoice) => acc + getTotals(invoice.items).total, 0);
  return total;
}

export function getDashboardTotalOutstanding(invoices: Invoice[]) {
  const total = invoices
    .filter((invoice) => !invoice.isPaid)
    .reduce((acc, invoice) => acc + getTotals(invoice.items).total, 0);
  return total;
}

// export function generateNewInvoiceID(lastInvoiceId: string) {
//   if (!lastInvoiceId) return `ADP-${new Date().getFullYear()}-001`;

//   const [_, year, serial] = lastInvoiceId.split("-");

//   let nextYear = parseInt(year);
//   let nextSerial = 1;

//   const currentYear = new Date().getFullYear();
//   if (currentYear > parseInt(year)) {
//     nextYear = currentYear;
//     nextSerial = 1;
//   } else {
//     nextSerial = parseInt(serial) + 1;
//   }

//   return `ADP-${nextYear}-${String(nextSerial).padStart(3, "0")}`;
// }

export function createEmptyInvoiceItem(): ItemType {
  return {
    id: crypto.randomUUID(),
    name: "",
    HSN: "",
    rate: "",
    quantity: "",
  };
}
