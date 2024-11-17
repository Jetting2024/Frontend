import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import ChatInfo from "./ChatInfo";
import MessageInput from "./InputField/MessageInput";
import MessageItem from "./MessageContainer/MyMessageItem";
import TodayDate from "./TodayDate";
import FriendMessageItem from "./MessageContainer/FriendMessageItem";
import './custom.css';

const ChatWindow: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section
      className={`fixed bottom-0 right-0 w-[83rem] max-w-full min-w-[40rem] border-2 border-lightgray rounded-tr-3xl rounded-tl-3xl shadow-md transition-all duration-300 ease-in-out`}
      style={{
        height: isChatOpen ? "53rem" : "3rem",
      }}
    >
      {/* 채팅창 내용 */}
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
          <button className="flex items-center gap-2 text-gray-200">
            멤버 초대하기
            <IoPersonAddOutline />
          </button>
        )}
      </div>

      {isChatOpen && (
        <div className="h-[calc(50rem)] flex flex-col">
          {/* 여기에 채팅 내용 추가 */}
          <div className="w-full h-[6rem] px-16 py-2 flex justify-center items-center border-b-2 border-lightgray">
            <ChatInfo />
          </div>

          <div className="h-[38rem] flex flex-col-reverse overflow-y-auto gap-2 custom-scrollbar">
            <div className="flex flex-col px-20">
              {/* 메시지 시작 날짜 들어갈 부분 */}
              <div>
                <TodayDate />
              </div>

              {/* 메시지 내용 들어갈 부분 */}
              <div className="flex flex-col overflow-y-auto">
                {/* 상대방에 보낸 메시지 부분 */}
                <div className="w-full flex flex-col items-start">
                  <FriendMessageItem message="안녕" />
                </div>

                {/* 내가 보낸 메시지 부분 */}
                <div className="w-full flex flex-col items-end">
                  {messages.map((message, index) => (
                    <MessageItem key={index} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
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
