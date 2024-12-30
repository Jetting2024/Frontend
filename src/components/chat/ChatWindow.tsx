import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import ChatInfo from "./ChatInfo";
import FriendMessageItem from "./MessageContainer/FriendMessageItem";
import './custom.css';
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import TodayDate from "./TodayDate";
import "./custom.css";
import { Client } from "@stomp/stompjs";

interface ChatMessage {
  id: string;
  userId: string | null;
  roomId: string;
  content: string | null;
  timestamp: string;
}

const currentUserId = localStorage.getItem("userId") || "defaultUserId"; // "5" 이런식으로 저장됨

const dummyChatData: ChatMessage[] = [
  {
    id: "1",
    userId: "1",
    roomId:"101",
    content: "안녕! 오늘 뭐해?",
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "2",
    roomId:"101",
    content: "안녕! 나는 영화 보러 갈 거야.",
    timestamp: new Date().toISOString(),
  },
  {
    id: "3",
    userId: "6",
    roomId:"101",
    content: "좋겠다! 무슨 영화 볼 건데?",
    timestamp: new Date().toISOString(),
  },
  {
    id: "4",
    userId: "5",
    roomId:"101",
    content: "안녕! 나도 영화 보고 싶다 ㅎㅎ",
    timestamp: new Date().toISOString(),
  },
];

const ChatWindow: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [roomId, setRoomId] = useState<number>(1);

  const [myId, setMyId] = useState<number | undefined>(undefined);
  const [friendId, setFriendId] = useState<number[]>([]);

  // const [messages, setMessages] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>(dummyChatData);

  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<string | null>(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // const handleSendMessage = (newMessage: string) => {
  //   const chatMessage: ChatMessage = {
  //     id: `${messages.length + 1}`,
  //     userId: currentUserId,
  //     friendId: null,
  //     content: newMessage,
  //     timestamp: new Date().toISOString(),
  //   };

  //   setMessages((prev) => [...prev, chatMessage]); // 메시지 추가
  // };

  const handleSendMessage = (newMessage: string) => {
    const chatMessage: ChatMessage = {
      id: `${Date.now()}`,
      userId: currentUserId,
      roomId: roomId.toString(),
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    // WebSocket 연결 상태 확인 후 메시지 전송
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: `/pub/sendMessage/${roomId}`,
        body: JSON.stringify(chatMessage),
      });
      setMessages((prev) => [...prev, chatMessage]);
    } else {
      console.log("WebSocket is not connected.");
    }
  };

  const switchRoom = (newRoomId: number) => {
    if (clientRef.current && clientRef.current.connected) {
      if (subscriptionRef.current) {
        clientRef.current.unsubscribe(subscriptionRef.current); // 현재 구독 해제
        subscriptionRef.current = null;
      }

      const subscription = clientRef.current.subscribe(
        `/sub/chat/room/${newRoomId}`,
        (message) => {
          const receivedMessage: ChatMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, receivedMessage]);
        }
      );
      
      subscriptionRef.current = subscription.id;
    }

    setRoomId(newRoomId);
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, receivedMessages]);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      onConnect: () => {
        console.log("connected to websocket");

        switchRoom(roomId);
        setIsConnected(true);

      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
        setIsConnected(false);
      },
      onStompError: (error) => {
        console.error("STOMP ERROR: ", error);
      },
    });
  
    stompClient.activate(); // 클라이언트 활성화
    clientRef.current = stompClient;

    return () => {
      stompClient.deactivate(); // 컴포넌트 언마운트 시 WebSocket 비활성화
    };
  }, []);

  return (
    <section
      className={`bg-white fixed z-40 bottom-0 right-0 w-[78rem] max-w-full min-w-[40rem] border-2 border-lightgray rounded-tr-3xl rounded-tl-3xl shadow-md transition-all duration-300 ease-in-out`}
      style={{
        height: isChatOpen ? "53rem" : "3rem",
      }}
    >
      {/* 채팅창 헤더 */}
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
            <div className=" mt-1 text-gray">멤버 초대하기</div>
            <IoPersonAddOutline fill="#959595" />
          </button>
        )}
      </div>

      {/* 채팅창 본문 */}
      {isChatOpen && (
        <div className="h-[calc(50rem)] flex flex-col">
          {/* 채팅 정보 */}
          <div className="w-full h-[6rem] px-16 py-2 flex justify-center items-center border-b-2 border-lightgray">
            <ChatInfo />
          </div>

          {/* 채팅 내용 */}
          <div className="h-[38rem] flex flex-col-reverse overflow-y-auto gap-2 custom-scrollbar">
            <div className="flex flex-col px-20">
              <TodayDate />
              <div className=" flex flex-col overflow-y-auto">
                {messages.map((message) =>
                  <MessageItem
                    key={message.id}
                    message={message.content || ""}
                    isMine={message.userId === currentUserId} />
                )}
              <div ref={messagesEndRef} />

              </div>
            </div>
          </div>

          {/* 메시지 입력 */}
          <div className="h-[6rem] px-20 py-2 flex justify-center items-center">
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ChatWindow;
