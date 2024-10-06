import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="w-full h-14 flex justify-between items-center sticky top-0 border-b border-lightgray bg-white px-8 z-50">
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

      {/* 화면 눌러서 사이드바 닫음 */}
      {isSidebarOpen && (
        <div className="fixed inset-0" onClick={closeSidebar}></div>
      )}

      {/* 사이드바 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-white transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
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

          <Link
            to="/"
            className="block border-b border-lightgray px-6 py-4 hover:bg-lightgray text-base"
            onClick={toggleSidebar}
          >
            내 친구
          </Link>
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
    </div>
  );
};

export default Navbar;
