import React, { useEffect, useRef, useState } from "react";
import NaverMap from "../components/NaverMap/NaverMap";
import Schedule from "../components/Schedule";
import ChatWindow from "../components/chat/ChatWindow";
import InviteResponseModal from "../components/modals/InviteResponseModal";

import { Client } from "@stomp/stompjs";

const SchedulePage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchInput, setIsSearchInput] = useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false); // 모달 표시 상태
  const [inviteData, setInviteData] = useState<{
    travelId: number | undefined;
    invitationLink: string | undefined;
    invitedPerson: string | undefined;
  } | null>(null);

  const clientRef = useRef<Client | null>(null);

  const toggleChat = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
    setIsChatOpen(!isChatOpen);
  };

  const closeInviteModal = () => {
    setIsInviteModalVisible(false); // 모달 닫기
  };

  const handleSearchInputClose = () => {
    setIsSearchInput(false); // 기존으로 복귀
  };

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      onConnect: () => {
        console.log("Connected to WebSocket.");

        // 구독 설정
        client.subscribe(`/sub/alert/5`, (message) => {
          const invite = JSON.parse(message.body);
          console.log("Message received:", invite);

          // 상태 업데이트
          setIsInviteModalVisible(true);
          setInviteData({
            travelId: invite.travelId,
            invitationLink: invite.invitation,
            invitedPerson: "초대받은 사람 이름", // 필요시 수정
          });
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <NaverMap />
      </div>
      <div className="flex flex-1">
        {/* 일정 짜기 세션 */}
        <div className="w-1/2 h-screen relative">
          <div>
            <Schedule isOwner={true} />
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
      {/* 초대 응답 모달 */}
      {isInviteModalVisible && (
        <div className="absolute top-4 right-4 z-50">
          <InviteResponseModal
            travelId={inviteData?.travelId}
            inviteeId={2}
            onClose={closeInviteModal}
          />
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
