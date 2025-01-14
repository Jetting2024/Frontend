import React, { useState, useEffect } from "react";

interface MessageItemProps {
  message: string;
  isMine: boolean; // 내가 보낸 메시지 여부
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isMine }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [truncatedMessage, setTruncatedMessage] = useState(""); // 축약된 메시지
  const [isTruncated, setIsTruncated] = useState(false); // 메시지가 축약되었는지 여부

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours >= 12 ? "오후" : "오전"} ${
      hours % 12 || 12
    }시 ${minutes < 10 ? `0${minutes}` : minutes}분`;
    setCurrentTime(formattedTime);

    // 메시지가 300자를 넘으면 축약 처리
    if (message.length > 300) {
      setTruncatedMessage(message.slice(0, 50) + "..."); // 300자 이상일 경우 축약
      setIsTruncated(true);
    } else {
      setTruncatedMessage(message);
      setIsTruncated(false);
    }
  }, [message]);

  // 새로운 윈도우 창을 열어 메시지를 보여주는 함수
  const openNewWindow = () => {
    const newWindow = window.open("", "_blank", "width=400,height=400");
    newWindow?.document.write(`
      <html>
        <head>
          <title>전체 메시지</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { font-size: 20px; margin-bottom: 10px; }
            p { font-size: 16px; line-height: 1.5; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h2>전체 메시지</h2>
          <p>${message}</p>
        </body>
      </html>
    `);
    newWindow?.document.close();
  };

  return (
    <div
      className={`flex flex-col mb-2 ${
        isMine ? "items-end" : "items-start"
      }`} // 메시지 방향 조정
    >
      <div className="text-[10px] text-[#3d3d3d] text-opacity-80 min-w-16 mb-1">
        {currentTime}
      </div>
      <div
        className={`px-4 py-2 m-2 border-[1px] border-[#3d3d3d] border-opacity-10 shadow-sm rounded-3xl max-w-xs relative ${
          isMine ? "bg-white" : "bg-[#C2DDF7]"
        }`}
      >
        <div className="whitespace-pre-wrap break-all">
          {isTruncated ? truncatedMessage : message}
        </div>
        {isTruncated && (
          <button
            onClick={openNewWindow}
            className="absolute bottom-2 right-4 text-xs text-[#3d3d3d] text-opacity-50 underline"
          >
            전체보기
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
