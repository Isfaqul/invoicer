import type { ChangeEvent } from "react";
import { LuSearch } from "react-icons/lu";

function SearchBox({ query, onChange }: { query: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <form action="#" noValidate>
      <label htmlFor="search">
        <div className="flex gap-1 items-center justify-between bg-white px-3 py-2 rounded-2xs border border-border-medium transition-all ease-out hover:border-gray-700 outline-border-light focus-within:outline-2 focus-within:border-gray-700">
          <input
            className="block w-full outline-0 font-body flex-1 text-sm"
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            value={query}
            onChange={onChange}
          />
          <LuSearch className="block text-lg shrink-0" />
        </div>
      </label>
    </form>
  );
}

export default SearchBox;
