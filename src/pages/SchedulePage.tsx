import React, { useEffect, useRef, useState } from "react";
import NaverMap from "../components/NaverMap/NaverMap";
import Schedule from "../components/Schedule";
import ChatWindow from "../components/chat/ChatWindow";
import InviteResponseModal from "../components/modals/InviteResponseModal";

import { Client } from "@stomp/stompjs";
import { useRecoilValue } from "recoil";
import { chatRoomState } from "../global/recoil/atoms";
import connectWebSocket from "../socket/connectWebSocket";

const SchedulePage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchInput, setIsSearchInput] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null); // 선택된 날짜 인덱스 관리
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false); // 모달 표시 상태
  const [inviteData, setInviteData] = useState<{
    travelId: number | undefined;
    inviteeId: number | undefined;
    invitationLink: string | undefined;
    invitedPerson: string | undefined;
  } | null>(null);
  const [inviteStatus, setInviteStatus] = useState<string | null>(null);

  const clientRef = useRef<Client | null>(null);
  const readRoomState = useRecoilValue(chatRoomState);

  const toggleChat = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
    setIsChatOpen(!isChatOpen);
  };

  const toggleSearch = (dayIndex: number) => {
    if (isChatOpen) {
      setIsChatOpen(false);
    }
    setIsSearchOpen(!isSearchOpen);
    setSelectedDayIndex(dayIndex); // 선택된 날짜 저장
  };

  const closeInviteModal = () => {
    setIsInviteModalVisible(false); // 모달 닫기
  };

  const handleSearchInputClose = () => {
    setIsSearchInput(false); // 기존으로 복귀
  };

  useEffect(() => {
    const client = connectWebSocket((stompClient) => {
      stompClient.subscribe(
        `/sub/alert/${readRoomState.travelId}`,
        (message) => {
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
        }
      );

      clientRef.current = client;

      return () => {
        // subscription.unsubscribe();
        if (clientRef.current) {
          clientRef.current.deactivate();
        }
      };
    });
  }, []);

  const handleInviteResponse = (
    status: "ACCEPT" | "REFUSE",
    travelId?: number | null,
    inviteeId?: number | null
  ) => {
    console.log(`✅ 초대 응답: ${status}, travelId: ${travelId}, inviteeId: ${inviteeId}`);
  
    setInviteStatus(() => {
      if (clientRef.current) {
        clientRef.current.publish({
          destination: "/pub/inviteResponse",
          body: JSON.stringify({
            travelId: readRoomState.travelId,
            inviteeId: 2,
            status: status,
          }),
        });
        console.log(`📩 초대 응답 WebSocket 메시지 전송됨: ${status}`);
      } else {
        console.error("❌ WebSocket client is not initialized.");
      }
      
      return status; // 상태 업데이트
    });
  
    setIsInviteModalVisible(false);
  };
  
  

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      <div className="flex flex-1">
        {/* 일정 짜기 세션 */}
        <div className="w-1/2 h-screen border border-lightgray p-4 relative">
          <div>
            <Schedule isOwner={true} />
            {/* {isSearchOpen && selectedDayIndex !== null && (
                <Search
                  dayIndex={selectedDayIndex} // 선택된 날짜 전달
                  addLocation={addLocation} // 장소 추가
                />
              )} */}
          </div>

          {/* 검색 세션 */}
          {/* {!isSearchOpen && <div id="search-session" /> && (
              <button
                onClick={toggleSearchHandler}
                className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white hover:bg-lightgray p-3 z-10  rounded-2xl border border-lightgray flex justify-center items-center"
                style={{ width: "40px", height: "40px", fontSize: "20px" }}
              >
                <FaChevronRight />
              </button>
            )}
          </div> */}

          {/* 검색 세션 (열고 닫기 가능, 슬라이드 애니메이션 추가) */}
          {/* <div
            className={`p-4 relative transition-all duration-300 ease-in-out ${
              isSearchOpen ? "w-1/3" : "w-0 overflow:hidden"
            }`}
          >
            {isSearchOpen && selectedDayIndex !== null && (
              <>
                <Search
                  dayIndex={selectedDayIndex} // 선택된 날짜 인덱스 전달
                  addLocation={addLocation} // 장소 추가 함수 전달
                />
                <button
                  onClick={toggleSearchHandler}
                  className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white hover:bg-lightgray p-3 z-10 rounded-2xl border border-lightgray flex justify-center items-center"
                  style={{ width: "40px", height: "40px", fontSize: "21px" }}
                >
                  <FaChevronLeft />
                </button>
              </>
            )}
          </div> */}

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
            inviteeId={inviteData?.inviteeId}
            invitedPerson={inviteData?.invitedPerson}
            onClose={closeInviteModal}
            onResponse={handleInviteResponse}
          />
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
