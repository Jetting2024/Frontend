import React from "react";
import { useRecoilValue } from "recoil";
import { chatRoomState } from "../../global/recoil/atoms";

const ChatInfo: React.FC = () => {

  const readChatRoomInfo = useRecoilValue(chatRoomState);

  return (
    <div className=" w-full flex flex-row justify-between items-center">
      <div className=" flex flex-col">
        <div className=" text-gray text-sm mb-2">{readChatRoomInfo.date}</div>
        <div className=" text-2xl font-bold">{readChatRoomInfo.roomName}</div>
      </div>
      <div className=" mt-2">멤버: {readChatRoomInfo.member}</div>
    </div>
  );
};

export default ChatInfo;
