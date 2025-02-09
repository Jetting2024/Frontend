import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import connectWebSocket from "../../socket/connectWebSocket";

interface InviteClickDto {
  travelId: number | null;
  inviteeId: number | null;
  invitation: string | null;
}

const PendingAccessModal: React.FC = () => {
  const navigate = useNavigate();
  const { invitationId, travelId } = useParams<{ invitationId: string, travelId: string }>();
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [minimumLoadingTime, setMinimumLoadingTime] = useState(true);
  const [invitations, setInvitations] = useState<InviteClickDto[]>([]);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!invitationId || !travelId) {
      console.error("Invitation ID or travel ID is missing from the URL.");
      setResponseMessage("초대 ID를 확인할 수 없습니다.");
      setLoading(false);
      return;
    }

    const client = connectWebSocket((stompClient) => {
      stompClient.subscribe(`sub/alert/${travelId}`, (message) => {
        const invite = JSON.parse(message.body) as InviteClickDto;
        setInvitations((prev) => [...prev, invite]);
        console.log("invite: ", invite);
      });

      stompClient.publish({
        destination: `/pub/inviteClick`,
        body: JSON.stringify({
          travelId: travelId,
          inviteeId: 2,
          invitation: invitationId,
        }),
      });
    });

    clientRef.current = client;

    // 최소 로딩 시간 설정 (1분)
    const minimumLoadingTimer = setTimeout(() => {
      setMinimumLoadingTime(false);
    }, 180000); // 60초

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        clearTimeout(minimumLoadingTimer);
      }
    };
    

      // const checkHostResponse = async () => {
      //   try {
      //     const response = await axios.get(
      //       `http://localhost:8080/invitation/status/${invitationId}`
      //     );

      //     if (response.data.status === "approved") {
      //       setResponseMessage("호스트가 요청을 허용했습니다.");
      //       if (!minimumLoadingTime) {
      //         setTimeout(() => navigate("/chat-room"), 2000); // 2초 후 채팅방으로 이동
      //       }
      //     } else if (response.data.status === "rejected") {
      //       setResponseMessage("호스트가 요청을 거부했습니다.");
      //       setLoading(false); // 로딩 중지
      //     }
      //   } catch (error) {
      //     console.error("Error fetching host response:", error);
      //     setResponseMessage("호스트의 응답을 확인할 수 없습니다.");
      //     setLoading(false);
      //   }
      // };

    

    // const interval = setInterval(async () => {
    //   await checkHostResponse();
    // }, 3000); // 3초마다 상태 확인

    // return () => {
    //   client.deactivate();
    //   // clearInterval(interval);
    //   clearTimeout(minimumLoadingTimer);
    // };
  }, [invitationId, minimumLoadingTime, navigate]);

  const closeModal = () => {
    setIsVisible(false);
    navigate("/"); // 홈으로 이동
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-[26rem] h-40 flex flex-col items-center justify-center bg-zinc-800 rounded-xl p-6 gap-4 shadow-lg">
      {loading || minimumLoadingTime ? (
        <div className="flex flex-col items-center">
          <p className="text-white text-[1rem] mb-4">
            호스트가 요청을 처리 중입니다...
          </p>
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
