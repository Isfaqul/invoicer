import Input from "./Input";
import Divider from "./Divider";
import type { Customer, Invoice } from "../hooks/useInvoice";
import { type ChangeEvent } from "react";
import Combobox from "./Combobox/Combobox";

type BillToProps = {
  customer: Customer;
  invoiceList: Invoice[];
  currentInvoice: Invoice;
  updateCustomerInfo: (field: string, value: string) => void;
};

function BillTo({ customer, updateCustomerInfo, invoiceList }: BillToProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    updateCustomerInfo(name, value);

    if (name === "clientName") {
      updateCustomerInfo("clientAddress", "");
      updateCustomerInfo("clientRefId", "");
    }
  }

  function handleCustomeSelection(customer: Customer) {
    console.log("SELECTED CUSTOMER:", customer);

    updateCustomerInfo("clientName", customer.clientName);
    updateCustomerInfo("clientAddress", customer.clientAddress);
    updateCustomerInfo("clientRefId", customer.clientRefId);
  }

  const autoSuggestions = invoiceList
    .filter((invoice) => invoice.customer.clientName !== "")
    .map((invoice) => invoice.customer);

  return (
    <section className="bill-to-section p-4 bg-bg-sidebar rounded-md">
      <h2 className="font-bold text-md">Bill To</h2>

      <Divider className="border-border-medium mt-2 mb-4" />

      <div className="flex items-center mb-1">
        <label className="block w-20" htmlFor="clientName">
          Name
        </label>
        <Combobox
          name="clientName"
          inputId="clientName"
          placeholder="Enter customer name"
          items={autoSuggestions}
          onSelect={handleCustomeSelection}
          currentCustomer={customer}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center mb-1">
        <label className="block w-20" htmlFor="clientAddress">
          Address
        </label>
        <Input
          type="text"
          onChange={handleChange}
          id="clientAddress"
          name="clientAddress"
          value={customer.clientAddress}
          placeholder="Enter Address"
        />
      </div>

      <div className="flex items-center">
        <label className="block w-20" htmlFor="clientRefId">
          Ref Id
        </label>
        <Input
          onChange={handleChange}
          type="text"
          id="clientRefId"
          name="clientRefId"
          value={customer.clientRefId}
          placeholder="Enter Ref Id"
        />
      </div>
    </section>
  );
}

export default BillTo;
