import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import Inbox from "./Inbox";
import FriendList from "./FriendsList";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isInboxOpen) setIsInboxOpen(false); // 사이드바가 열리면 수신함은 닫힘
    if (isFriendsListOpen) setIsFriendsListOpen(false);
  };

  const handleBackgroundClick = () => {
    if (isInboxOpen) {
      setIsInboxOpen(false); // 수신함 닫기
    } else if (isFriendsListOpen) {
      setIsFriendsListOpen(false); // 친구목록 닫기
    } else if (isSidebarOpen) {
      setIsSidebarOpen(false); // 사이드바 닫기
    }
  };

  // 수신함 열기/닫기
  const toggleInbox = () => {
    setIsInboxOpen(!isInboxOpen);
  };

  const toggleFriendsList = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(true); // 사이드바 닫고
      setTimeout(() => {
        setIsFriendsListOpen(true); // 사이드바 닫힌 후 친구 목록 슬라이드로 열림
      }, 10); // 사이드바가 닫히는 애니메이션 시간과 일치시킴
    } else {
      setIsFriendsListOpen(!isFriendsListOpen);
    }
  };

  return (
    <div className="w-full h-14 flex justify-between items-center sticky top-0 border-b border-lightgray bg-white px-8">
      <div>
        <Link
          to="/"
          className="text-gray-700 text-md font-black tracking-tight"
        >
          {" "}
          JETTING
        </Link>
      </div>

      <div className="flex items-center gap-8 ml-auto">
        <div className="flex">
          <Link
            to="/signup"
            className="py-1 px-3 text-gray font-sans font-light text-sm hover:text-black"
          >
            로그인/회원가입
          </Link>
        </div>

        <div className="mr-auto">
          <button onClick={toggleSidebar}>
            <FiMenu size={20} color="gray" />
          </button>
        </div>
      </div>

      {/* 화면 눌러서 사이드바/수신함/친구목록 닫음 */}
      {(isInboxOpen || isSidebarOpen || isFriendsListOpen) && (
        <div className="fixed inset-0" onClick={handleBackgroundClick}></div>
      )}

      {/* 사이드바 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-white transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      > */}
        <nav className="h-full border border-lightgray">
          {/* 로그인 기능 구현 후 지울 코드 */}
          <div className="flex flex-col items-center justify-center h-64 bg-lightgray border-b border-lightgray">
            <button className="font-sans font-light absolute top-2 right-2 text-xs bg-blue-500 text-gray px-2 py-1 rounded hover:bg-blue-600">
              프로필 편집
            </button>
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-20 h-20 rounded-full mb-2"
            />
            <h2 className="text-lg">사용자</h2>
            <p className=" text-xs text-gray mt-2">여행을 좋아하는 모험가</p>
          </div>
          {/* 여기까지 */}

          {/* 로그인 기능 구현 후 코드 */}
          {/* {isLoggedIn ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-lightgray border-b border-lightgray">
            <button className="font-sans font-light absolute top-2 right-2 text-xs bg-blue-500 text-gray px-2 py-1 rounded hover:bg-blue-600">
              프로필 편집
            </button>
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-20 h-20 rounded-full shadow-lg mb-2"
            />
            <h2 className="text-lg">사용자</h2>
            <p className=" text-xs text-gray mt-2">여행을 좋아하는 모험가</p>
          </div>
          ) : (

            // 로그인이 안된 상태
            <div className="flex flex-col items-center justify-center h-64 bg-lightgray">
              <img
                src="https://via.placeholder.com/100"
                alt="Default Profile"
                className="w-24 h-24 rounded-full mb-4"
              />
              <p className="text-sm text-gray-600">
                <Link to="/login" className="text-blue-500 hover:underline">
                  로그인
                </Link>{" "}
                후 이용하세요
              </p>
            </div>
          )} */}
          <button
            className="block border-b border-lightgray px-6 py-4 hover:bg-lightgray text-base w-full text-left"
            onClick={toggleInbox}
          >
            내 수신함
          </button>

          <button
            className="block border-b border-lightgray px-6 py-4 hover:bg-lightgray text-base w-full text-left"
            onClick={toggleFriendsList} // 친구 목록 열기/닫기
          >
            내 친구
          </button>
          <Link
            to="/"
            className="block border-b border-lightgray px-6 py-4 hover:bg-lightgray text-base"
            onClick={toggleSidebar}
          >
            내 여행
          </Link>
          <Link
            to="/"
            className="block border-b border-lightgray px-6 py-4 hover:bg-lightgray text-base"
            onClick={toggleSidebar}
          >
            내 계정
          </Link>
          <Link
            to="/"
            className="block border-b border-lightgray px-6 py-4 hover:bg-lightgray text-base"
            onClick={toggleSidebar}
          >
            내 기록
          </Link>
          <Link
            to="/"
            className="block border-b border-lightgray px-6 py-4 hover:bg-lightgray text-base"
            onClick={toggleSidebar}
          >
            내 설정
          </Link>
        </nav>
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-64 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isInboxOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Inbox isOpen={isInboxOpen} toggleInbox={toggleInbox} />
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isFriendsListOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <FriendList
          isOpen={isFriendsListOpen}
          toggleFriendsList={toggleFriendsList}
        />
      </div>
    </div>
  );
};

export default Navbar;
