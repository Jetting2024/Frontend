import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import ChatInfo from "./ChatInfo";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import TodayDate from "./TodayDate";
import { Client } from "@stomp/stompjs";
import { useRecoilValue } from "recoil";
import { chatRoomState } from "../../global/recoil/atoms";
import { authState } from "../../global/recoil/authAtoms";
import axios from "axios";

interface ChatMessage {
  roomId: string | null;
  userId: string | null;
  message: string | null;
}

const ChatWindow: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  
  const readRoomInfo = useRecoilValue(chatRoomState);
  const readAuthInfo = useRecoilValue(authState);
  const roomId = readRoomInfo.roomId;

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<string | null>(null);

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

    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: `/pub/sendMessage`,
        body: JSON.stringify(chatMessage),
      });

    } else {
      console.log("WebSocket is not connected.");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!readRoomInfo.roomId) {
      return;
    }

    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      debug: (str) => console.log(`[STOMP DEBUG]: ${str}`),
      onConnect: () => {
        console.log(`[STOMP] Connected to room ${readRoomInfo.roomId}.`);


        // 메시지 구독
        const subscription = stompClient.subscribe(
          `/sub/chat/room/${readRoomInfo.roomId}`,
          (message) => {
            try {
              // 메시지가 JSON인지 확인하고 파싱
              const receivedMessage = JSON.parse(message.body);
              console.log("[STOMP] JSON Message received:", receivedMessage);
              setMessages((prev) => [...prev, receivedMessage]);
            } catch (error) {
              // JSON 파싱 실패 시 메시지를 문자열로 처리
              console.warn("[STOMP] Non-JSON Message received:", message.body);
              setMessages((prev) => [
                ...prev,
                { roomId: readRoomInfo.roomId, userId: readAuthInfo.id, message: message.body },
              ]);
            }
          }
        );

        subscriptionRef.current = subscription.id;
      },
      onDisconnect: () => {
        console.log("[STOMP] Disconnected.");
      },
      onStompError: (error) => {
        console.error("[STOMP] ERROR: ", error);
      },
    });

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
      console.log("[STOMP] Connection closed.");
    };
  }, [readRoomInfo.roomId, readAuthInfo.accessToken]);

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

  return (
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
          <button className="flex items-center gap-2">
            <div className="mt-1 text-gray">멤버 초대하기</div>
            <IoPersonAddOutline fill="#959595" />
          </button>
        )}
      </div>

      {isChatOpen && (
        <div className="h-[calc(50rem)] flex flex-col">
          <div className="w-full h-[6rem] px-16 py-2 flex justify-center items-center border-b-2 border-lightgray">
            <ChatInfo />
          </div>

          <div className="h-[38rem] flex flex-col-reverse overflow-y-auto gap-2 custom-scrollbar">
            <div className="flex flex-col px-20">
              <TodayDate />
              <div className="flex flex-col overflow-y-auto">
                {messages.map((message) => (
                  <MessageItem
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
      )}
    </section>
  );
};

export default ChatWindow;
