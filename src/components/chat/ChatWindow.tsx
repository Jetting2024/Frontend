import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import ChatInfo from "./ChatInfo";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import TodayDate from "./TodayDate";
import { useRecoilState, useRecoilValue } from "recoil";
import { chatRoomState } from "../../global/recoil/atoms";
import { authState } from "../../global/recoil/authAtoms";
import { Client } from "@stomp/stompjs";
import InviteModal from "../modals/InviteModal";
import connectWebSocket from "../../socket/connectWebSocket";
import { messagesState } from "../../global/recoil/chatAtom";
import { fetchChatInfo, fetchMessages } from "./chatAPI";

interface ChatMessage {
  roomId: number | null;
  userId: number | null;
  message: string | null;
  createAt: string | null;
}

const ChatWindow: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [roomState, setRoomState] = useRecoilState(chatRoomState);
  const readAuthInfo = useRecoilValue(authState);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // WebSocket 객체를 useRef로 관리
  const clientRef = useRef<Client | null>(null);
  const [messages, setMessages] = useRecoilState(messagesState);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const client = connectWebSocket((stompClient) => {
      stompClient.subscribe(`/sub/chat/room/${roomState.roomId}`, (message) => {
        try {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, receivedMessage]);
          console.log("Received message:", receivedMessage);
        } catch (err) {
          setMessages((prev) => [
            ...prev,
            {
              roomId: roomState.roomId,
              userId: readAuthInfo.id,
              message: message.body,
              createAt: new Date().toISOString(),
            },
          ]);
        }
      });
    });

    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [roomState.roomId, readAuthInfo.id]);

  
  const handleSendMessage = (newMessage: string) => {
    if (!roomState.roomId) {
      console.error("roomId is null. Cannot send a message.");
      return;
    }

    const chatMessage: ChatMessage = {
      roomId: roomState.roomId,
      userId: readAuthInfo.id,
      message: newMessage,
      createAt: new Date().toISOString(),
    };

    if (clientRef.current) {
      clientRef.current.publish({
        destination: `/pub/sendMessage`,
        body: JSON.stringify(chatMessage),
      });
      console.log("Message sent:", JSON.stringify(chatMessage));
    } else {
      console.log("WebSocket is not connected.");
    }
  };

  useEffect(() => {
    (async () => {
      if(!roomState.roomId || !readAuthInfo.accessToken) return;
      const fetchedMessages = await fetchMessages(roomState.roomId, readAuthInfo.accessToken);
      setMessages(fetchedMessages);

      const fetchedChatInfo = await fetchChatInfo(roomState.roomId, readAuthInfo.accessToken);
      setRoomState({
        ...roomState,
        roomName: fetchedChatInfo.roomName,
        member: fetchedChatInfo.members,
      });
    })();

  }, [roomState.roomId, readAuthInfo.accessToken, setMessages]);

  const handleInviteModalOpen = () => {
    setIsInviteModalOpen(true);
    document.body.style.overflow = "hidden"; // 스크롤 방지
  };

  const handleInviteModalClose = () => {
    setIsInviteModalOpen(false);
    document.body.style.overflow = "auto"; // 스크롤 다시 활성화
  };

  return (
    <>
      {/* ✅ 초대 모달 - ChatWindow 밖에서 fixed로 설정하여 항상 보이도록 수정 */}
      {isInviteModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleInviteModalClose} // 모달 외부 클릭 시 닫기
        >
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={handleInviteModalClose}
            >
              ✕
            </button>
            <InviteModal />
          </div>
        </div>
      )}

      {/* ✅ 채팅 창 */}
      <section
        className={`bg-white fixed z-40 bottom-4 right-4 transition-all duration-300 ease-in-out ${
          isChatOpen
            ? "w-2/3 max-w-full min-w-[40rem] rounded-lg shadow-md"
            : "w-16 h-16 rounded-full flex justify-center items-center shadow-lg cursor-pointer hover:bg-sky-200"

        }`}
        style={{
          height: isChatOpen ? "50rem" : "4rem",
        }}
      >
        {isChatOpen ? (
          <>
            {/* 채팅창 내용 */}
            <div className="h-10 flex items-center justify-between px-4">
              <div className="flex-grow flex justify-center">
                <button
                  onClick={toggleChat}
                  className="flex items-center absolute left-1/2 top-3 transform -translate-x-1/2"
                >
                  <FaAngleDown className="text-gray-400" size={24} />
                </button>
              </div>
              <button
                className="flex items-center gap-2"
                onClick={handleInviteModalOpen}
              >
                <div className="mt-1 text-gray">멤버 초대하기</div>
                <IoPersonAddOutline />
              </button>
            </div>

            <div className="h-[calc(47.5rem)] flex flex-col">
              <div className="w-full h-[6rem] px-16 py-2 flex justify-center items-center border-b-2 border-lightgray">
                <ChatInfo />
              </div>

              <div className="h-[38rem] flex flex-col-reverse overflow-y-auto gap-2 custom-scrollbar">
                <div className="flex flex-col px-20">
                  <TodayDate />
                  <div className="flex flex-col overflow-y-auto">
                    {messages.map((message, index) => (
                      <MessageItem
                        key={index}
                        message={message.message || ""}
                        isMine={message.userId === readAuthInfo.id}
                      />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>

              <div className="h-[6rem] px-20 py-2 flex justify-center items-center">
                <MessageInput onSendMessage={handleSendMessage} />
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={toggleChat}
            className="w-16 h-16 bg-purple rounded-full flex justify-center items-center shadow-lg"
          >
            <FaAngleUp className="text-white" size={24} />
          </button>
        )}
      </section>
    </>
  );
};

export default ChatWindow;
