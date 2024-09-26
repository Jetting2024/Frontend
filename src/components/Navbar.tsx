import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi"; // 햄버거 메뉴 아이콘 사용
import SearchBar from "./search/SearchBar";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
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
        <button
          className="text-black absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          x
        </button>

        <nav className="h-full mt-14 border border-lightgray">
          <div className="h-64 bg-lightgray"></div>
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
