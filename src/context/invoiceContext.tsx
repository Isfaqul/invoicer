import { createContext, type ReactNode } from "react";
import useInvoice from "../hooks/useInvoice";

export const InvoiceContext = createContext<ReturnType<typeof useInvoice> | null>(null);

function InvoiceProvider({ children }: { children: ReactNode }) {
  const invoicer = useInvoice();

  return <InvoiceContext value={{ ...invoicer }}>{children}</InvoiceContext>;
}

export default InvoiceProvider;
