import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center bg-transparent p-2 border-b border-black/80">
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        className="border-none outline-none p-2 text-base rounded-l-full flex-1"
      />
      <button className="bg-white border-none p-2 cursor-pointer hover:bg-black/10 rounded-full">
        <IoIosSearch size={16} />
      </button>
    </div>
  );
};

export default SearchBar;
