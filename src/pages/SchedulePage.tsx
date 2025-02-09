import React, { useEffect, useRef, useState } from "react";
import NaverMap from "../components/NaverMap/NaverMap";
import {
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import Schedule from "../components/Schedule";
import Search from "../components/NaverMap/Search";
import ChatWindow from "../components/chat/ChatWindow";
import InviteResponseModal from "../components/modals/InviteResponseModal";

import { Client } from "@stomp/stompjs";
import { useRecoilValue } from "recoil";
import { chatRoomState } from "../global/recoil/atoms";

const SchedulePage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchInput, setIsSearchInput] = useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false); // 모달 표시 상태
  const [inviteData, setInviteData] = useState<{
    travelId: number | undefined;
    inviteeId: number | undefined;
    invitationLink: string | undefined;
    invitedPerson: string | undefined;
  } | null>(null);

  const clientRef = useRef<Client | null>(null);
  const readRoomState = useRecoilValue(chatRoomState);

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

  const closeInviteModal = () => {
    setIsInviteModalVisible(false); // 모달 닫기
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

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      onConnect: () => {
        console.log("Connected to WebSocket for invite response.");

        // 구독 설정
        client.subscribe(`/sub/alert/${readRoomState.travelId}`, (message) => {
          const invite = JSON.parse(message.body);
          console.log("Message received:", invite);

          // 상태 업데이트
          setIsInviteModalVisible(true);
          setInviteData({
            travelId: invite.travelId,
            inviteeId: invite.inviteeId,
            invitationLink: invite.invitation,
            invitedPerson: "초대받은 사람 이름", // 필요시 수정
          });
          console.log("inviteData", inviteData);
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
      {/* 채팅 세션 */}
      <ChatWindow />

      {/* 초대 응답 모달 */}
      {isInviteModalVisible && (
        <div className="absolute top-4 right-4 z-50">
          <InviteResponseModal
            travelId={inviteData?.travelId}
            inviteeId={inviteData?.inviteeId}
            invitedPerson={inviteData?.invitedPerson}
            onClose={closeInviteModal}
          />
        </div>

      )}
    </div>
  );
};

export default SchedulePage;
