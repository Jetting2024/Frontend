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
import axios from "axios";
import { webSocketClientState } from "../../global/recoil/webSocketAtom";
import { initializeWebSocketClient } from "../../global/recoil/webSocketSelector";

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

  const [client, setClient] = useRecoilState(webSocketClientState);
  const initializedClient = useRecoilValue(initializeWebSocketClient);

  const roomId = "5"; // Room ID를 고정값으로 설정

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = (newMessage: string) => {
    if (!roomId) {
      console.error("roomId is null. Cannot send a message.");
      return;
    }

    const chatMessage: ChatMessage = {
      roomId: roomId,
      userId: readAuthInfo.id,
      message: newMessage,
    };

    if (client?.connected) {
      client.publish({
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
    if (!client) {
      console.log("Initializing WebSocket client...");
      setClient(initializedClient); // WebSocket 클라이언트 초기화
      return;
    }

    if (!client.connected) {
      console.log("Waiting for WebSocket connection...");
      return;
    }

    const subscription = client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
      try {
        const receivedMessage = JSON.parse(message.body);
        console.log("[STOMP] JSON Message received:", receivedMessage);
        setMessages((prev) => [...prev, receivedMessage]);
      } catch (error) {
        console.warn("[STOMP] Non-JSON Message received:", message.body);
        setMessages((prev) => [
          ...prev,
          { roomId: roomId, userId: readAuthInfo.id, message: message.body },
        ]);
      }
    });

    return () => {
      subscription.unsubscribe();
      console.log(`[STOMP] Unsubscribed from /sub/chat/room/${roomId}`);
    };
  }, [roomId, client, readAuthInfo.id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/chat/${roomId}/getMessages`,
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
  }, [roomId, client, initializedClient, setClient, readAuthInfo.accessToken]);

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
            <IoPersonAddOutline />
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
      )}
    </section>
  );
};

export default ChatWindow;
