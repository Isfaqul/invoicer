import { useState } from "react";
import Input from "../Input";
import type { Customer } from "../../hooks/useInvoice";

type ComboboxProps = {
  inputId: string;
  name: string;
  placeholder: string;
  items: Customer[];
  onSelect: (customer: Customer) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentCustomer: Customer;
};

function Combobox({ inputId, name, placeholder, items, onSelect, onChange, currentCustomer }: ComboboxProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestion, setShowSuggestions] = useState(false);

  const filtered = items.filter((item) =>
    item.clientName.toLowerCase().includes(currentCustomer.clientName.toLowerCase()),
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => {
        if (prev === 0) {
          return filtered.length - 1;
        } else {
          return prev - 1;
        }
      });
    } else if (e.key === "Enter") {
      if (activeIndex < 0) return;
      setShowSuggestions(false);
      onSelect(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    } else {
      return;
    }
  }

  return (
    <div className="w-full relative">
      <Input
        type="text"
        id={inputId}
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e);
          setActiveIndex(-1);
          setShowSuggestions(true);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setActiveIndex(-1);
          setShowSuggestions(true);
        }}
        onBlur={() => {
          setActiveIndex(-1);
          setShowSuggestions(false);
        }}
        value={currentCustomer.clientName}
      />
      {showSuggestion && <ComboboxList onSelect={onSelect} items={filtered} activeIndex={activeIndex} />}
    </div>
  );
}

type ComboboxListProps = {
  items: Customer[];
  activeIndex: number;
  onSelect: (customer: Customer) => void;
};

function ComboboxList({ items, activeIndex, onSelect }: ComboboxListProps) {
  return (
    <ul className="absolute w-full block bg-white rounded-2xs border top-[110%] border-gray-700 placeholder:text-gray-400/80">
      {items.map((item, index) => (
        <li key={index}>
          <button
            onMouseDown={() => {
              console.log("Click Working");
              onSelect(items[index]);
            }}
            type="button"
            className={`block w-full px-2 py-1 text-left cursor-pointer transition ease-out duration-200 hover:bg-gray-300 active:bg-gray-400 ${activeIndex === index && "bg-gray-300"}`}
          >
            {item.clientName}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Combobox;
