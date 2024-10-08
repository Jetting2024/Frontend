import React from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar"; // 검색창 컴포넌트 불러오기

const HomePage: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log("검색어:", query);
    // 검색 로직 처리 또는 API 호출
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow justify-center items-center">
        <SearchBar placeholder="어디로 가시나요?" onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default HomePage;
