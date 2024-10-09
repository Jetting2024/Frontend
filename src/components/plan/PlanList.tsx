import React from "react";
import Owner from "./Owner";
import { FaArrowCircleRight } from "react-icons/fa";

const PlanList: React.FC = () => {

  return (
    <div className="w-full flex gap-4 mb-4">
      <div className="w-48 h-48 rounded-lg bg-gray"></div>

      <div className="flex flex-grow flex-col justify-center">
        <div className="mb-2">후쿠오카</div>

        <div className="flex items-center gap-2 mb-1">
          <div className="text-[1.5rem] font-bold tracking-wide">두근두근 후꾸까가까</div>
          <Owner />
        </div>

        <div className="text-[0.85rem] text-[#959595] tracking-wide mb-4">
          2024년 09월 09일 ~ 2024년 09월 16일
        </div>

        <div className="flex gap-4">
          <div className="w-12 h-6 flex justify-center items-center bg-black rounded-sm text-white text-[0.8rem]">
            멤버
          </div>
          <div className="text-[0.8rem]">김하은, 유지원, 조윤주, 김홍석</div>
        </div>
      </div>

      <button className="flex items-center">
        <FaArrowCircleRight
          size={36}
          className="text-gray-500 hover:fill-[#509FE8]"
        />
      </button>
    </div>
  );
};

export default PlanList;
