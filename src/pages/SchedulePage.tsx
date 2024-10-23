import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"; // Chevron 아이콘 가져오기

const SchedulePage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleChat = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false); // 검색창이 열려있을 때는 검색창을 닫음
    }
    setIsChatOpen(!isChatOpen); // 채팅 세션 열기/닫기
  };

  const toggleSearch = () => {
    if (isChatOpen) {
      setIsChatOpen(false); // 채팅 세션이 열려있을 때는 채팅창을 닫음
    }
    setIsSearchOpen(!isSearchOpen); // 검색 세션 열기/닫기
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 상단 큰 영역: 일정 짜기 세션과 지도 영역 */}
      <div className="flex flex-1">
        {/* 왼쪽: 일정 짜기 세션 */}
        <div className="w-1/3 border border-lightgray p-4 relative">
          <h2 className="text-lg font-bold mb-4">일정 짜기</h2>
          <div>
            <p>여기에 일정 짜기 UI가 들어갑니다.</p>
          </div>

          {/* 검색 세션 열고 닫는 버튼 */}
          {!isSearchOpen && (
            <button
              onClick={toggleSearch}
              className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white hover:bg-lightgray p-3 z-10  rounded-2xl border border-lightgray flex justify-center items-center"
              style={{ width: "40px", height: "40px", fontSize: "20px" }}
            >
              <FaChevronRight />
            </button>
          )}
        </div>

        {/* 검색 세션 (열고 닫기 가능, 슬라이드 애니메이션 추가) */}
        <div
          className={`p-4 relative transition-all duration-300 ease-in-out ${
            isSearchOpen ? "w-1/3" : "w-0 overflow:hidden"
          }`}
        >
          {isSearchOpen && (
            <>
              <h2 className="text-lg font-bold mb-4">검색</h2>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full p-2 border border-gray rounded"
              />
              {/* 검색 세션 오른쪽에 위치한 닫기 버튼 */}
              <button
                onClick={toggleSearch}
                className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white hover:bg-lightgray p-3 z-10 rounded-2xl border border-lightgray flex justify-center items-center"
                style={{ width: "40px", height: "40px", fontSize: "21px" }}
              >
                <FaChevronLeft />
              </button>
            </>
          )}
        </div>

        {/* 오른쪽: 지도 배경 */}
        <div
          className={`flex-1 relative transition-all duration-300 ease-in-out ${
            isSearchOpen ? "w-1/3" : "w-2/3"
          }`}
        >
          <h2 className="absolute top-4 left-4 text-lg font-bold">
            지도 영역 (API 연결 예정)
          </h2>
          <div className="w-full h-full">{/* 지도 API 연결 예정 */}</div>
        </div>
      </div>

      {/* 하단: 열렸다 닫혔다 하는 채팅 세션 */}
      <div className="flex">
        {/* 왼쪽 일정 짜기 세션을 위한 빈 공간 */}
        <div className="w-1/3"></div>

        {/* 오른쪽 채팅 세션 */}
        <div
          className={`${
            isChatOpen ? "h-64" : "h-12"
          } flex-1 bg-lightgray border border-lightgray rounded-t-2xl transition-all duration-300 ease-in-out`}
        >
          <button
            onClick={toggleChat}
            className="w-full text-black py-2 flex justify-center"
          >
            {isChatOpen ? "∨" : "∧"}
          </button>
          {isChatOpen && (
            <div>
              <p>채팅</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 기본 내보내기 추가
export default SchedulePage;
