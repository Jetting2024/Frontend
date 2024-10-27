import React, { useState } from "react";
import {
  FaChevronRight,
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa"; // 아이콘 추가
import Schedule from "../components/Schedule";

const SchedulePage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleChat = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
    setIsChatOpen(!isChatOpen);
  };

  const toggleSearch = () => {
    if (isChatOpen) {
      setIsChatOpen(false);
    }
    setIsSearchOpen(!isSearchOpen);
  };

  const scheduleData = [
    {
      id: 1,
      title: "이치란 본점",
      time: "AM 10:00~ AM 11:00",
      location: "5 Chome-3-2 Nakasu, Hakata Ward, Fukuoka",
      photo: "",
    },
    {
      id: 2,
      title: "이치란 본점",
      time: "AM 10:00~ AM 11:00",
      location: "5 Chome-3-2 Nakasu, Hakata Ward, Fukuoka",
      photo: "",
    },
    {
      id: 3,
      title: "이치란 본점",
      time: "AM 10:00~ AM 11:00",
      location: "5 Chome-3-2 Nakasu, Hakata Ward, Fukuoka",
      photo: "",
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* 일정 짜기 세션 */}
        <div className="w-1/3 h-screen border border-lightgray p-4 relative">
          <div>
            <Schedule
              isOwner={true}
              scheduleData={scheduleData}
              addLocation={toggleSearch}
            />
          </div>

          {/* 검색 세션 */}
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

        <div className="flex-1 relative">
          <h2 className="absolute top-4 left-4 text-lg font-bold">지도</h2>
          <div className="w-full h-full">{/* 지도 API */}</div>
        </div>
      </div>
      {/* 채팅 세션 */}
      <div className="flex-1 relative">
        <div className="w-1/3"></div>
        <div
          className={`${
            isChatOpen ? "h-[calc(100vh*4/5)]" : "h-12"
          } w-2/3 absolute bottom-0 right-0 bg-lightgray border-t border-lightgray rounded-t-2xl transition-all duration-300 ease-in-out`}
        >
          <button
            onClick={toggleChat}
            className="w-full text-black py-2 flex justify-center"
          >
            {isChatOpen ? <FaChevronDown /> : <FaChevronUp />}
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

export default SchedulePage;
