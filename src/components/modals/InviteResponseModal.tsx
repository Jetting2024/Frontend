import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { authState } from "../../global/recoil/authAtoms";
import { Client } from "@stomp/stompjs";
import connectWebSocket from "../../socket/connectWebSocket";
import { chatRoomState } from "../../global/recoil/atoms";

interface InviteResponseModalProps {
  travelId: number | undefined;
  inviteeId: number | undefined;
  invitedPerson: string | undefined;
  onClose: () => void;
  onResponse: (status: "ACCEPT" | "REFUSE", travelId?: number | null, inviteeId?: number | null) => void;
}


interface InviteStatusDto {
  travelId: number | null;
  inviteeId: number | null;
  status: string | null;
}

const InviteResponseModal: React.FC<InviteResponseModalProps> = ({
  inviteeId,
  invitedPerson,
  onClose,
  onResponse,
}) => {
  const readRoomState = useRecoilValue(chatRoomState);

  const handleResponse = (status: "ACCEPT" | "REFUSE") => {
    // ✅ 상위 컴포넌트(SchedulePage)로 응답 전달
    onResponse(status, readRoomState.travelId, inviteeId);
  };
  

  return (
    <div className="w-[26rem] h-20 flex items-center justify-center bg-zinc-800 rounded-xl p-4 gap-4">
      <IoPersonCircleOutline size={28} fill="#fff" />

      <div className="w-auto flex flex-col flex-1 max-w-[12rem]">
        <span className="text-white text-[0.8rem] whitespace-nowrap overflow-hidden text-ellipsis block">
          "{invitedPerson}"
        </span>
        <span className="text-white text-[0.8rem]">님을 초대하시겠습니까?</span>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <button
          className="text-red-300 text-[0.8rem] hover:text-red-400"
          onClick={() => handleResponse("REFUSE")}
        >
          거부
        </button>
        <button
          className="px-4 py-1 text-white text-[0.8rem] rounded-lg border border-gray hover:bg-gray"
          onClick={() => handleResponse("ACCEPT")}
        >
          수락
        </button>
        <IoCloseOutline
          size={24}
          stroke="#fff"
          className="cursor-pointer"
          onClick={onClose}
          aria-label="Close Modal"
        />
      </div>
    </div>
  );
};

export default InviteResponseModal;
