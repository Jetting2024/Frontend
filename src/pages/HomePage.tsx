
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar"; // 검색창 컴포넌트 불러오기
import TravelList from "../components/travellist/TravelList";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const HomePage: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log("검색어:", query);
    // 검색 로직 처리 또는 API 호출
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    const scrollElement = scrollRef.current;

    if (scrollElement) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollElement;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => scrollElement?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <section className="flex flex-col flex-grow justify-center items-center h-1/2 pb-4 bg-gradient-to-b from-[rgba(80,159,232,1)] via-[rgba(80,159,232,0.5)] to-[rgba(80,159,232,0)]">
        <div className="text-white text-[2rem] font-bold tracking-wide mb-4">
          친구들과 여행 일정을 한 번에!
        </div>
        <SearchBar placeholder="어디로 가시나요?" onSearch={handleSearch} />
      </section>

      <section className="flex flex-col justify-center items-center h-1/2 p-10">
        <div className="w-full text-[1.5rem] font-bold px-4">
          국내 인기 여행지
        </div>
        <div className="relative w-full flex items-center">
          {showLeftArrow && (
            <button
              className=" absolute left-0 z-10 p-2 bg-white rounded-full shadow-lg border border-[#3d3d3d] border-opacity-5"
              onClick={scrollLeft}
            >
              <FaChevronLeft size={24} fill="#3d3d3d" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="w-full flex flex-row gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide p-4"
          >
            <TravelList />
            <TravelList />
            <TravelList />
            <TravelList />
            <TravelList />
            <TravelList />
            <TravelList />
            <TravelList />
            <TravelList />
          </div>

          {showRightArrow && (
            <button
              className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-lg border border-[#3d3d3d] border-opacity-5"
              onClick={scrollRight}
            >
              <FaChevronRight size={24} fill="#3d3d3d" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
