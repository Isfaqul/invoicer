import { useState, type ChangeEvent } from "react";
import Button from "./Button";
import Input from "./Input";
import { BiTrash } from "react-icons/bi";
import { getRowPrice } from "../utils/invoicer";

export type ItemProps = {
  item: ItemType;
  onDelete: (id: string) => void;
  updateInvoiceItems: (id: string, field: string, value: string | number) => void;
};

export type ItemType = {
  id: string;
  name: string;
  HSN?: string;
  rate: number | "";
  quantity: number | "";
};

function Item({ item, onDelete, updateInvoiceItems }: ItemProps) {
  const [showDelete, setShowDelete] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;

    const parsedValue = type === "number" ? (value === "" ? "" : Number(value)) : value;

    updateInvoiceItems(item.id, name as keyof ItemType, parsedValue);
  }

  return (
    <section
      className="border border-transparent bg-bg-sidebar p-4 justify-between rounded-xs relative focus-within:border-border-medium focus-within:border"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="flex items-center mb-2 gap-2">
        <label htmlFor={`itemName${item.id}`}>Item</label>
        <div className="w-full flex items-center gap-2">
          <Input
            onChange={handleChange}
            value={item.name}
            type="text"
            id={`itemName${item.id}`}
            name="name"
            placeholder="Enter item name"
          />
          {showDelete && (
            <Button
              className="bg-red-400 transition-all ease-out hover:bg-red-500 active:bg-red-600"
              variant="icon"
              onClick={() => onDelete(item.id)}
            >
              <BiTrash className="text-white text-xs" />
            </Button>
          )}
        </div>
      </div>
      <div className="item-metrics flex gap-5 items-center flex-wrap">
        <div className="flex items-center gap-2.5 flex-1">
          <label htmlFor={`itemHSN${item.id}`}>HSN</label>
          <Input
            onChange={handleChange}
            value={item.HSN}
            type="text"
            id={`itemHSN${item.id}`}
            name="HSN"
            placeholder="HSN number"
          />
        </div>

        <div className="flex items-center gap-2 flex-1">
          <label htmlFor={`itemRate${item.id}`}>Rate</label>
          <Input
            onChange={handleChange}
            value={item.rate}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            id={`itemRate${item.id}`}
            name="rate"
            placeholder="Enter Rate"
          />
        </div>

        <div className="flex items-center gap-2 flex-1">
          <label htmlFor={`itemQty${item.id}`}>Qty</label>
          <Input
            onChange={handleChange}
            value={item.quantity}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            id={`itemQty${item.id}`}
            name="quantity"
            placeholder="Enter Qty"
          />
        </div>

        <div className="flex-1" aria-live="polite">
          <p className="font-semibold text-xl text-gray-400 text-right">
            ₹{" "}
            <strong className="text-text-primary font-semibold">
              {getRowPrice(item.rate === "" ? 0 : item.rate, item.quantity === "" ? 0 : item.quantity)}
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Item;
