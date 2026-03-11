import type { ChangeEvent } from "react";
import { LuSearch } from "react-icons/lu";

function SearchBox({
  query,
  onChange,
  collapsed,
  onSearchBarClick,
}: {
  query: string;
  collapsed: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchBarClick: (e: React.MouseEvent) => void;
}) {
  return (
    <form action="#" noValidate>
      <label htmlFor="search">
        <div
          onClick={onSearchBarClick}
          className={`flex gap-1 items-center justify-between bg-white ${collapsed ? "px-1" : "px-2"} py-1.75 rounded-2xs border border-border-medium transition-all ease-out hover:border-gray-700 outline-border-light focus-within:outline-2 focus-within:border-gray-700`}
        >
          <input
            className={`block outline-0 font-body text-sm ${collapsed ? "w-0" : "w-full"}`}
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            value={query}
            onChange={onChange}
          />
          <LuSearch className={`block text-lg shrink-0 relative ${collapsed && "-translate-x-0.5"}`} />
        </div>
      </label>
    </form>
  );
}

export default SearchBox;
