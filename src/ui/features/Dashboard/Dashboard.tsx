import { useState } from "react";
import { filterInvoices, formatDate } from "../../utils/helpers";
import SearchBox from "../SearchBox";
import type { Invoice } from "../../hooks/useInvoice";
import { getDashboardTotal, getDashboardTotalOutstanding, getTotals } from "../../utils/invoicer";

function Dashboard({ invoiceList }: { invoiceList: Invoice[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const searchFiltered = filterInvoices(invoiceList, searchQuery);
  const categoryFiltered = searchFiltered.filter((invoice) => {
    if (category === "") return true;

    if (category === "paid") return invoice.isPaid === true;

    if (category === "unpaid") return invoice.isPaid === false;
  });

  return (
    <section className="bg-bg-surface grow h-full p-8 flex flex-col gap-2 overflow-y-auto text-text-primary">
      <div className="border border-border-light rounded-xs px-5 pt-3 py-5">
        <header className="flex justify-between w-full mb-4 gap-2 items-base">
          <div className="flex items-center justify-between flex-1">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="font-light">
              <strong className="font-bold">Date </strong>
              <time>{formatDate(new Date().getTime())}</time>
            </p>
          </div>
        </header>
        {/* Main DashBoard Section */}
        <section className="flex gap-4">
          <div className="grow-4 border rounded-xs border-border-light p-2">
            <h2 className="font-medium text-sm text-text-secondary mb-2">All Invoices</h2>
            <div className="flex gap-2">
              <SearchBox
                id={"searchDashboard"}
                query={searchQuery}
                collapsed={false}
                onSearchBarClick={() => {}}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <label htmlFor="dashboardFilter" className="block rounded-2xs">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name="selectQuery"
                  id="dashboardFilter"
                  className={`appearance-none min-w-36 block h-full bg-white rounded-2xs border border-border-light px-1.5 py-0.5 outline-0 -outline-offset-1 outline-gray-700 focus:outline-1  placeholder:text-gray-400/80 placeholder:font-light "w-full`}
                >
                  <option value="">All</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </label>
            </div>
            <ul className="flex flex-col divide-y divide-bg-sidebar">
              {categoryFiltered.map((invoice) => (
                <li key={invoice.id}>
                  <article className="flex justify-between items-center py-3">
                    <div>
                      <h3 className="font-medium">{invoice.customer.clientName ? invoice.customer.clientName : "-"}</h3>
                      <p className="text-xs font-light flex gap-2">
                        <span className="text-blue-400/90">{invoice.id}</span>
                        <span className="text-text-muted">|</span>
                        <span className="text-text-muted">{formatDate(invoice.date)}</span>
                      </p>
                    </div>
                    <p className="text-lg font-medium">
                      <span className="text-text-muted">₹</span>
                      <strong className="font-medium"> {getTotals(invoice.items).total}</strong>
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
          {/* Stats */}
          <div className="grow flex flex-col border border-border-light p-2">
            <h2 className="font-medium text-sm text-text-secondary mb-2">Stats</h2>
            <div className="flex flex-col gap-2">
              <article className="flex-1 p-4 border border-blue-400 bg-blue-50 text-right">
                <h4 className="uppercase text-xs font-medium text-blue-400">Total</h4>
                <p className="text-lg font-semibold">
                  <span className="text-text-muted">₹ </span>
                  <strong className="">{getDashboardTotal(invoiceList)}</strong>
                </p>
              </article>
              <article className="flex-1 p-4 border border-red-400 bg-red-50 text-right">
                <h4 className="uppercase text-xs font-medium text-red-400">Total Overdue</h4>
                <p className="text-lg font-semibold">
                  <span className="text-text-muted">₹ </span>
                  <strong className="">{getDashboardTotalOutstanding(invoiceList)}</strong>
                </p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Dashboard;
