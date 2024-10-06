import React from "react";

const ChatInfo: React.FC = () => {
  return (
    <div className=" w-full flex flex-row justify-between items-center">
      <div className=" flex flex-col">
        <div className=" text-gray text-sm mb-2">2024.10.05 ~ 2024.10.10 4박 5일</div>
        <div className=" text-2xl font-bold">두근두근 부산 여행</div>
      </div>
      <div className=" mt-2">멤버: 유지원, 김하은</div>
    </div>
  );
};

export default ChatInfo;
