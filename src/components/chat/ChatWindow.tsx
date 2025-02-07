import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import ChatInfo from "./ChatInfo";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import TodayDate from "./TodayDate";
import { useRecoilValue } from "recoil";
import { chatRoomState } from "../../global/recoil/atoms";
import { authState } from "../../global/recoil/authAtoms";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import InviteModal from "../modals/InviteModal";

interface ChatMessage {
  roomId: string | null;
  userId: string | null;
  message: string | null;
}

const ChatWindow: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const readRoomInfo = useRecoilValue(chatRoomState);
  const readAuthInfo = useRecoilValue(authState);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // WebSocket 객체를 useRef로 관리
  const clientRef = useRef<Client | null>(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = (newMessage: string) => {
    if (!readRoomInfo.roomId) {
      console.error("roomId is null. Cannot send a message.");
      return;
    }

    const chatMessage: ChatMessage = {
      roomId: readRoomInfo.roomId,
      userId: readAuthInfo.id,
      message: newMessage,
    };

    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: `/pub/sendMessage`,
        body: JSON.stringify(chatMessage),
      });
      console.log("Message sent:", chatMessage);
    } else {
      console.log("WebSocket is not connected.");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!clientRef.current) {
      console.log("Initializing WebSocket client...");

      const stompClient = new Client({
        brokerURL: "ws://localhost:8080/ws",
        debug: (str: string) => console.log(str),
        reconnectDelay: 5000,
      });

      stompClient.activate(); // WebSocket 활성화
      clientRef.current = stompClient; // WebSocket 객체를 useRef에 저장
    }

    if (!clientRef.current.connected) {
      console.log("Waiting for WebSocket connection...");
      return;
    }

    const subscription = clientRef.current.subscribe(
      `/sub/chat/room/${readRoomInfo.roomId}`,
      (message) => {
        try {
          const receivedMessage = JSON.parse(message.body);
          console.log("[STOMP] JSON Message received:", receivedMessage);
          setMessages((prev) => [...prev, receivedMessage]);
        } catch (error) {
          console.warn("[STOMP] Non-JSON Message received:", message.body);
          setMessages((prev) => [
            ...prev,
            {
              roomId: readRoomInfo.roomId,
              userId: readAuthInfo.id,
              message: message.body,
            },
          ]);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
      console.log(
        `[STOMP] Unsubscribed from /sub/chat/room/${readRoomInfo.roomId}`
      );
    };
  }, [readRoomInfo.roomId, readAuthInfo.id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/chat/${readRoomInfo.roomId}/getMessages`,
          {
            headers: {
              Authorization: `Bearer ${readAuthInfo.accessToken}`,
            },
          }
        );

        if (response.data && response.data.length > 0) {
          console.log("Fetched messages:", response.data);
          setMessages(response.data);
        } else {
          console.log("No previous messages found.");
          setMessages([]);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        setMessages([]);
      }
    };

    fetchMessages();
  }, [readRoomInfo.roomId, readAuthInfo.accessToken]);

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
        className={`bg-white fixed z-40 bottom-0 right-0 w-[78rem] max-w-full min-w-[40rem] border-2 border-lightgray rounded-tr-3xl rounded-tl-3xl shadow-md transition-all duration-300 ease-in-out`}
        style={{
          height: isChatOpen ? "53rem" : "3rem",
        }}
      >
        <div className="h-12 flex items-center justify-between px-4">
          <div className="flex-grow flex justify-center">
            <button
              onClick={toggleChat}
              className="flex items-center absolute left-1/2 top-3 transform -translate-x-1/2"
            >
              {isChatOpen ? (
                <FaAngleDown className="text-gray-400" size={24} />
              ) : (
                <FaAngleUp className="text-gray-400" size={24} />
              )}
            </button>
          </div>
          {isChatOpen && (
            <button
              className="flex items-center gap-2"
              onClick={handleInviteModalOpen}
            >
              <div className="mt-1 text-gray">멤버 초대하기</div>
              <IoPersonAddOutline />
            </button>
          )}
        </div>

        <div className="h-[calc(50rem)] flex flex-col">
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
      </section>
    </>
  );
};

export default ChatWindow;
