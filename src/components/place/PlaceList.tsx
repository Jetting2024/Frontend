import React from "react";

const PlaceList: React.FC = () => {
  return (
    <div className="relative w-56 h-72 rounded-lg overflow-hidden group border border-black border-opacity-30">
      {/* 이미지 */}
      <img
        src="https://via.placeholder.com/150"
        alt="Place"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 h-0 bg-black bg-opacity-50 text-white transition-all duration-400 ease-in-out group-hover:h-full flex flex-col justify-center items-center">
        <div className="w-full text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 text-center">
          <div className="w-full border-b border-white py-2 text-[1.1rem]">
            {/* 후쿠오카 텍스트 */}
            <span className="text-[1.1rem] tracking-wide text-white">
              후쿠오카
            </span>
          </div>
        </div>
        {/* 설명 텍스트 */}
        <div className="w-full text-[1rem] tracking-wide opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 text-center mt-2 text-white">
          일본 규슈 최대 도시, 역사와 현대 문화가 공존하는 곳.
        </div>
      </div>
    </div>
  );
};

export default PlaceList;
