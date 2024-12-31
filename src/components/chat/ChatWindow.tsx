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
  id: string;
  userId: string | null;
  roomId: string;
  content: string | null;
  timestamp: string;
}

const ChatWindow: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);

  const readRoomInfo = useRecoilValue(chatRoomState);
  const readAuthInfo = useRecoilValue(authState);

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

    if (newMessage === "") {
      return;
    }

    const chatMessage: ChatMessage = {
      id: `${Date.now()}`,
      userId: readAuthInfo.id,
      roomId: readRoomInfo.roomId,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: `/pub/sendMessage/${readRoomInfo.roomId}`,
        body: JSON.stringify(chatMessage),
      });
      setMessages((prev) => [...prev, chatMessage]);
    } else {
      console.log("WebSocket is not connected.");
    }
  };

  const subscriber = (newRoomId: string | null) => {
    if (clientRef.current && clientRef.current.connected) {
      if (subscriptionRef.current) {
        clientRef.current.unsubscribe(subscriptionRef.current);
        subscriptionRef.current = null;
      }

      if (newRoomId) {
        const subscription = clientRef.current.subscribe(
          `/sub/chat/room/${newRoomId}`,
          (message) => {
            const receivedMessage: ChatMessage = JSON.parse(message.body);
            setMessages((prev) => [...prev, receivedMessage]);
          }
        );
        subscriptionRef.current = subscription.id;
      }
    } else {
      console.error("WebSocket is not connected. Cannot switch rooms.");
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
      onConnect: () => {
        console.log("connected to websocket");
        subscriber(readRoomInfo.roomId);
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
      onStompError: (error) => {
        console.error("STOMP ERROR: ", error);
      },
    });

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [readRoomInfo.roomId]);

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
                    key={message.id}
                    message={message.content || ""}
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
