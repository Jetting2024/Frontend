import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './search/SearchBar';
import { CgProfile } from 'react-icons/cg';

const Navbar: React.FC = () => {
  return (
    <div className="w-full h-20 flex flex-row justify-center items-center sticky top-0">
      <div className="w-[9.625rem] h-20 text-gray-700 text-center text-2xl font-black tracking-tight flex justify-center items-center">
        JETT.
      </div>
      <div className="inline-flex py-[0.3125rem] px-7 items-center gap-[67px] mr-8">
        <Link
          to="/"
          className="py-1 px-2 no-underline text-inherit text-base hover:border-b hover:border-gray-500"
        >
          홈
        </Link>
        <Link
          to="/"
          className="py-1 px-2 no-underline text-inherit text-base hover:border-b hover:border-gray-500"
        >
          인기 여행지
        </Link>
        <Link
          to="/"
          className="py-1 px-2 no-underline text-inherit text-base hover:border-b hover:border-gray-500"
        >
          여행 코스
        </Link>
        <Link
          to="/"
          className="py-1 px-2 no-underline text-inherit text-base hover:border-b hover:border-gray-500"
        >
          내 일정
        </Link>
      </div>
      <SearchBar />
      <div className="flex justify-center items-center ml-8">
        <CgProfile size={28} color="#797979" />
      </div>
    </div>
  );
};

export default Navbar;
