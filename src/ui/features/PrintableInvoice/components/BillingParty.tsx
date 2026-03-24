import type { Customer } from "../../../hooks/useInvoice";

function BillingParty({ customer }: { customer: Customer }) {
  return (
    <div className="grow border border-border-light p-2 pb-3 rounded-md">
      <section className="space-y-2">
        <div className="flex">
          <p className="w-20">
            <strong className="font-medium">Name</strong>
          </p>
          <p className="bg-white w-full">{customer.clientName}</p>
        </div>
        <div className="flex">
          <p className="w-20">
            <strong className="font-medium">Address</strong>
          </p>
          <p className="bg-white w-full">{customer.clientAddress}</p>
        </div>
        <div className="flex">
          <p className="w-20">
            <strong className="font-medium">Ref ID</strong>
          </p>
          <p className="w-full bg-white">{customer.clientRefId}</p>
        </div>
      </section>
    </div>
  );
}

export default BillingParty;
