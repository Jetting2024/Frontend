import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import connectWebSocket from "../../socket/connectWebSocket";

interface InviteClickDto {
  travelId: number | null;
  inviteeId: number | null;
  invitation: string | null;
}

interface InviteResponseDto {
  travelId: number | null;
  inviteeId: number | null;
  status: "ACCEPT" | "REFUSE";
}

const PendingAccessModal: React.FC = () => {
  const navigate = useNavigate();
  const { invitationId, travelId } = useParams<{ invitationId: string; travelId: string }>();
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState<string>("초대 대기 중...");
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!invitationId || !travelId) {
      setResponseMessage("초대 ID를 확인할 수 없습니다.");
      setLoading(false);
      return;
    }
  
    console.log(`[WebSocket] 연결 시도: /sub/alert/${travelId}`);
  
    const client = connectWebSocket((stompClient) => {
      stompClient.subscribe(`/sub/alert/${travelId}`, (message) => {
        console.log("[WebSocket] 원본 메시지 수신:", message.body);
  
        try {
          const response = JSON.parse(message.body);
  
          if (!response.status) {
            console.warn("🚨 `status` 필드가 없는 응답:", response);
          } else {
            console.log("[WebSocket] 초대 응답 수신:", response);
          }
  
          if (response.status === "ACCEPT") {
            console.log("✅ 초대가 수락되었습니다!");
            setResponseMessage("초대가 수락되었습니다.");
            setLoading(false);
          } else if (response.status === "REFUSE") {
            console.log("❌ 초대가 거절되었습니다.");
            setResponseMessage("초대가 거절되었습니다.");
            setLoading(false);
          }
        } catch (error) {
          console.error("❌ WebSocket 메시지 파싱 실패:", message.body);
        }
      });
    });
  
    clientRef.current = client;
  
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        console.log("[WebSocket] 연결 해제됨");
      }
    };
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    navigate("/");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-[26rem] h-40 flex flex-col items-center justify-center bg-zinc-800 rounded-xl p-6 gap-4 shadow-lg">
      {loading ? (
        <div className="flex flex-col items-center">
          <p className="text-white text-[1rem] mb-4">{responseMessage}</p>
          <img src="/spinning.svg" alt="로딩 중" className="w-12 h-12" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-white text-[1rem]">{responseMessage}</p>
          <button
            className="text-black text-[1rem] bg-white rounded-full py-1 hover:bg-gray"
            onClick={closeModal}
          >
            화면 나가기
          </button>
        </div>
      )}
    </div>
  );
};

export default PendingAccessModal;
