import React, { useState } from "react";
import { RecoilRoot } from "recoil";
import NaverMap from "../components/NaverMap/NaverMap";
import {
  FaChevronRight,
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Schedule from "../components/Schedule";
import Search from "../components/NaverMap/Search";
import ChatWindow from "../components/chat/ChatWindow";

const SchedulePage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchInput, setIsSearchInput] = useState(false);

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

  const handleSearchInputClose = () => {
    setIsSearchInput(false); // 기존으로 복귀
  };

  const scheduleData = [
    {
      id: 1,
      title: "이치란 본점",
      time: "AM 10:00~ AM 11:00",
      location: "5 Chome-3-2 Nakasu, Hakata Ward, Fukuoka",
      photo: "",
    },
  ];

  return (
    <RecoilRoot>
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
                <Search /> {/* Search 컴포넌트를 렌더링 */}
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

          {/* 지도 영역 */}
          <div className="flex-1">
            <div className="w-full h-full">
              <NaverMap />
            </div>
          </div>
        </div>
      </div>
      {/* 채팅 세션 */}
      <ChatWindow />
      {/* <div className="flex-1 relative">
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
      </div> */}
    </RecoilRoot>
  );
};

export default SchedulePage;
