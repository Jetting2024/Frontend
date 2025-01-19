import React from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = (e.target as HTMLInputElement).value;
      onSearch(query);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="장소를 검색하세요"
        className="border p-2 rounded w-full"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchInput;
