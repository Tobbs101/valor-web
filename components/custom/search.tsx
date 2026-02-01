/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useCallback } from "react";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// custom debounce fn
const useDebounce = (fn: any, delay: number) => {
  let timeout: any;

  // return function that takes arg and apply to the function
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const Search = ({
  search,
  setSearch,
  className,
  setPageNo,
  setPerPage,
}: {
  search: any;
  setSearch: any;
  className?: string;
  setPageNo?: any;
  setPerPage?: any;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce((value: any) => {
    setPageNo && setPageNo(1);
    setPerPage && setPerPage(5);
    setSearch(value);
  }, 1000); // Adjust the delay as needed (in milliseconds)

  const handleSearch = useCallback(
    (e: any) => {
      const value = e.target.value;

      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  return (
    <div className="h-fit rounded-sm relative">
      <SearchIcon className="absolute w-4 text-gray-400 left-[8px] top-[8px]" />
      <input
        defaultValue={search}
        type="search"
        placeholder="Search..."
        className={cn(
          "border border-gray-300 h-10 text-xs w-full focus:border-primary rounded-md duration-200 pl-7 pr-3 focus:ring-0 outline-none focus:pl-8 focus:bg-transparent",
          className
        )}
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
