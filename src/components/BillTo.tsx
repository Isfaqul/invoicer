import Input from "./Input";
import Divider from "./Divider";
import type { Customer } from "../hooks/useInvoice";
import type { ChangeEvent } from "react";

type BillToProps = {
  customer: Customer;
  updateCustomerInfo: (field: string, value: string) => void;
};

function BillTo({ customer, updateCustomerInfo }: BillToProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    updateCustomerInfo(name, value);
  }

  return (
    <section className="bill-to-section p-4 bg-bg-sidebar rounded-md">
      <h2 className="font-bold text-md">Bill To</h2>

      <Divider className="border-border-medium mt-2 mb-4" />

      <div className="flex items-center mb-1">
        <label className="block w-20" htmlFor="clientName">
          Name
        </label>
        <Input
          type="text"
          onChange={handleChange}
          id="clientName"
          name="clientName"
          value={customer.clientName}
          placeholder="Enter Name"
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
