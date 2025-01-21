import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

interface Region {
  name: string;
  category: string;
}

// 지역 데이터 추가
const regionData: Region[] = [
  { name: "경주", category: "경주" },
  { name: "강릉", category: "강릉, 속초, 양양" },
  { name: "가평", category: "가평, 양평" },
  { name: "부산", category: "부산" },
  { name: "인천", category: "인천, 강화도" },
  { name: "제주", category: "제주, 서귀포" },
];

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "지역을 검색하세요",
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filteredRegions, setFilteredRegions] = useState<Region[]>(regionData);
  const [showSuggestions, setShowSuggestions] = useState(false); // 추천 목록 표시 여부
  const searchBarRef = useRef<HTMLDivElement>(null); // 검색창 외부 클릭 감지를 위한 ref
  const [travelName, setTravelName] = useState("");
  const navigate = useNavigate();

  const SelectRegion = (region: string) => {
    setTravelName(region);
    navigate("/select-date", { state: { travelName: region } });
    console.log("선택된 지역", region);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = regionData.filter((region) =>
        region.name.startsWith(value)
      );
      setFilteredRegions(filtered);
    } else {
      setFilteredRegions(regionData);
    }
  };

  const handleSearch = (searchTerm?: string) => {
    const searchQuery = searchTerm || query;
    if (searchQuery) {
      setRecentSearches([
        searchQuery,
        ...recentSearches.filter((term) => term !== searchQuery),
      ]);
      onSearch(searchQuery);
      setShowSuggestions(false);
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

  const handleFocus = () => {
    setFilteredRegions(regionData);
    setShowSuggestions(true);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-1/2" ref={searchBarRef}>
      {/* 검색창 */}
      <div className="flex items-center border border-[#B3B3B3] rounded-3xl py-2 px-6 bg-white">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus} // 검색창 클릭 시 전체 추천 지역 표시
          placeholder={placeholder}
          className="w-full px-2 py-1 focus:outline-none"
        />
        <button onClick={() => handleSearch()} className="ml-2">
          <FiSearch size={20} />
        </button>
      </div>

      {/* 추천 지역 목록 */}
      {showSuggestions && filteredRegions.length > 0 && (
        <div className="absolute w-1/2 border border-[#B3B3B3] rounded-2xl bg-white shadow-lg z-40">
          {filteredRegions.map((region, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-8 py-4 cursor-pointer"
            >
              {/* 지역과 카테고리 */}
              <div>
                <span className="">{region.name}</span>
                <span className="text-gray text-xs ml-2">
                  {region.category}
                </span>
              </div>

              {/* 선택 버튼 */}
              <button
                onClick={() => SelectRegion(region.name)}
                className="px-4 py-2 bg-lightgray  text-xs rounded-2xl hover:bg-black hover:text-white"
              >
                선택
              </button>
            </div>
          ))}
        </div>
      )}

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
