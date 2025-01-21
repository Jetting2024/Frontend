import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { authState } from "../../global/recoil/authAtoms";
import { Client } from "@stomp/stompjs";
import connectWebSocket from "../../socket/connectWebSocket";

interface InviteResponseModalProps {
  travelId: number | undefined;
  inviteeId: number | undefined;
  onClose: () => void;
}

interface InviteStatusDto {
  travelId: number | null;
  inviteeId: number | null;
  status: string | null;
}

const InviteResponseModal: React.FC<InviteResponseModalProps> = ({
  travelId,
  inviteeId,
  onClose,
}) => {
  const readAuthState = useRecoilValue(authState);
  const invitedPerson = "지원이";

  const clientRef = useRef<Client | null>(null);

  const [status, setStatus] = useState<InviteStatusDto[]>([]);

  useEffect(() => {
    const client = connectWebSocket((stompClient) => {
      stompClient.subscribe("/alert/5", (message) => {
        const result = JSON.parse(message.body) as InviteStatusDto;
        setStatus((prev) => [...prev, result]);
      });
    });

    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  const handleResponse = (status: "ACCEPT" | "REFUSE") => {
    if (!inviteeId) {
      console.error("Invitee ID is undefined.");
      return;
    }

    if (clientRef.current) {
      clientRef.current.publish({
        destination: "/pub/inviteResponse",
        body: JSON.stringify({
          travelId: 5,
          inviteeId: 2,
          status: status,
        }),
      });
      console.log("보냄");
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
