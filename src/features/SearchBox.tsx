import { LuSearch } from "react-icons/lu";

function SearchBox() {
  return (
    <form action="#" noValidate>
      <label htmlFor="search">
        <div className="flex gap-1 items-center justify-between bg-white px-3 py-2 rounded-md border-2 border-border-medium transition-all ease-out hover:border-gray-400 outline-border-light focus-within:outline-3">
          <input
            className="block w-full outline-0 font-body flex-1 text-sm"
            type="text"
            id="search"
            name="search"
            placeholder="Search"
          />
          <LuSearch className="block text-lg shrink-0" />
        </div>
      </label>
    </form>
  );
}

export default SearchBox;
