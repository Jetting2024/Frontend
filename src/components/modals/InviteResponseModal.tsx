import React, { useEffect, useRef } from "react";
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
}

const InviteResponseModal: React.FC<InviteResponseModalProps> = ({
  inviteeId,
  invitedPerson,
  onClose,
}) => {
  const readRoomState = useRecoilValue(chatRoomState);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!readRoomState.travelId) return;

    console.log(`[WebSocket] Connecting to /alert/${readRoomState.travelId}`);

    const client = connectWebSocket(() => {});

    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        console.log("[WebSocket] Disconnected");
      }
    };
  }, [readRoomState.travelId]);

  const handleResponse = (status: "ACCEPT" | "REFUSE") => {
    if (!inviteeId) {
      console.error("Invitee ID is undefined.");
      return;
    }

    if (clientRef.current) {
      clientRef.current.publish({
        destination: "/pub/inviteResponse",
        body: JSON.stringify({
          travelId: readRoomState.travelId,
          inviteeId: inviteeId,
          status: status,
        }),
      });
      console.log(`📩 초대 응답 전송: ${status}`);
    } else {
      console.error("WebSocket client is not initialized.");
    }
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
        <button className="text-red-300 text-[0.8rem] hover:text-red-400" onClick={() => handleResponse("REFUSE")}>
          거부
        </button>
        <button className="px-4 py-1 text-white text-[0.8rem] rounded-lg border border-gray hover:bg-gray" onClick={() => handleResponse("ACCEPT")}>
          수락
        </button>
        <IoCloseOutline size={24} stroke="#fff" className="cursor-pointer" onClick={onClose} aria-label="Close Modal" />
      </div>
    </div>
  );
};

export default InviteResponseModal;
