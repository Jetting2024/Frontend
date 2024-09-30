import React, { useState, useEffect, useRef } from "react";
import { AiOutlineInbox } from "react-icons/ai";

interface InboxProps {
  isOpen: boolean;
  toggleInbox: () => void;
}

interface Alert {
  id: number;
  message: string;
  time: string;
  isRead: boolean;
}

const alerts: Alert[] = [
  {
    id: 1,
    message: "하은님이 당신을 초대했습니다.",
    time: "5분 전",
    isRead: false,
  },
  {
    id: 2,
    message: "하은님이 새로운 댓글을 남겼습니다.",
    time: "9월 30일",
    isRead: false,
  },
  {
    id: 3,
    message: "하은님이 새로운 일정을 공유했습니다.",
    time: "9월 20일",
    isRead: true,
  },
];

const Inbox: React.FC<InboxProps> = ({ isOpen, toggleInbox }) => {
  const [alertList, setAlertList] = useState(alerts);
  const inboxRef = useRef<HTMLDivElement>(null);

  const handleAlertClick = (id: number) => {
    setAlertList(
      alertList.map((alert) =>
        alert.id === id ? { ...alert, isRead: true } : alert
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inboxRef.current &&
        !inboxRef.current.contains(event.target as Node)
      ) {
        toggleInbox(); // 외부 클릭 시 수신함 닫기
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleInbox]);

  return (
    <>
      {isOpen && (
        <div
          ref={inboxRef}
          className={`fixed top-0 right-64 h-full w-80 bg-white border-l border-lightgray shadow-sm transform transition-transform duration-300 ease-in-out z-50 `}
        >
          <div className="flex p-4 border-b border-gray">
            <AiOutlineInbox className="text-xl mr-2" />
            <h2 className="text-base font-semibold">내 수신함</h2>
            <button onClick={toggleInbox} className="ml-auto text-gray text-sm">
              닫기
            </button>
          </div>

          <div className="p-4 mt-4">
            {alertList.map((alert, index) => (
              <div key={alert.id}>
                <div className="flex justify-between items-center mb-3 ">
                  {!alert.isRead && (
                    <span className="w-3 h-3 bg-blue rounded-full"></span>
                  )}

                  {/* 읽은 알림일 경우 날짜, 읽지 않은 알림일 경우 지금 */}
                  <p className="text-xs text-gray">
                    {alert.isRead ? alert.time : "지금"}
                  </p>
                </div>
                <div className="text-start">
                  <p className="text-sm font-base border border-gray p-6 rounded-2xl ">
                    {alert.message}
                  </p>
                </div>
                {index < alertList.length - 1 && (
                  <hr className="border-t border-lightgray m-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Inbox;
