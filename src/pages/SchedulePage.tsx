import React, { useState } from "react";

const SchedulePage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 상단 큰 영역: 일정 짜기 세션과 지도 영역 */}
      <div className="flex flex-1">
        {/* 왼쪽: 일정 짜기 세션 */}
        <div className="w-1/3 bg-gray-200 p-4">
          <h2 className="text-lg font-bold mb-4">일정 짜기</h2>
          <div>
            {/* 일정 짜기 내용 추가 */}
            <p>여기에 일정 짜기 UI가 들어갑니다.</p>
          </div>
        </div>

        {/* 오른쪽: 지도 배경 */}
        <div className="w-2/3 bg-gray-300 relative">
          <h2 className="absolute top-4 left-4 text-lg font-bold">
            지도 영역 (API 연결 예정)
          </h2>
          <div className="w-full h-full">{/* 지도 API 연결 예정 */}</div>
        </div>
      </div>

      {/* 하단: 열렸다 닫혔다 하는 채팅 세션 */}
      <div
        className={`${
          isChatOpen ? "h-64" : "h-12"
        } bg-gray-500 transition-all duration-300 ease-in-out`}
      >
        <button
          onClick={toggleChat}
          className="w-full bg-gray-700 text-white py-2"
        >
          {isChatOpen ? "채팅 세션 닫기" : "채팅 세션 열기"}
        </button>
        {isChatOpen && (
          <div className="p-4 bg-blue text-white">
            <p>채팅 세션 내용이 여기에 표시됩니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
