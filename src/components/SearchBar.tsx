import React, { useState } from "react";
import { FiSearch, FiXCircle } from "react-icons/fi"; // 돋보기, 엑스 아이콘

interface SearchBarProps {
  placeholder?: string; // 검색창에 표시될 플레이스홀더
  onSearch: (query: string) => void; // 검색 실행 시 호출할 함수
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "검색어를 입력하세요",
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query) {
      setRecentSearches([query, ...recentSearches]);
      onSearch(query); // 검색 실행
    }
  };

  const handleRemoveSearch = (term: string) => {
    setRecentSearches(recentSearches.filter((item) => item !== term)); // 특정 검색어 삭제
  };

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-1/2">
      <div className="flex items-center border border-[#B3B3B3] rounded-3xl py-2 px-6">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full px-2 py-1 focus:outline-none"
        />
        <button onClick={handleSearch} className="ml-2">
          <FiSearch size={20} />
        </button>
      </div>

      {/* 최근 검색어 */}
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm">최근 검색어</h3>
          <button onClick={handleClearAll} className="text-sm hover:underline">
            전체 삭제
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((term, index) => (
            <div
              key={index}
              className="flex mt-2 items-center border border-gray rounded-full px-3 py-1 text-sm"
            >
              <span>{term}</span>
              <button
                onClick={() => handleRemoveSearch(term)}
                className="ml-2 text-gray"
              >
                <FiXCircle size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
