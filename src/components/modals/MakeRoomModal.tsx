import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

const MakeRoomModal: React.FC = () => {
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const fullDate = location.state?.fullDate;

  const handleComplete = () => {
    if (!roomName.trim()) {
      alert("채팅방 이름을 입력해주세요.");
      return;
    }
    navigate("/invite", { state: { fullDate, roomName } });
  };

  return (
    <div className="w-auto h-auto p-2 bg-white rounded-lg border border-[#3d3d3d] border-opacity-10 shadow-md flex flex-col justify-center items-center">
      <div className="w-full h-auto mx-2 flex justify-end">
        <button>
          <IoCloseCircleOutline size={24} onClick={() => navigate(-1)} />
        </button>
      </div>
      <div className="w-auto h-auto py-10 px-8 flex flex-col items-center">
        <div className="text-[1.3rem] font-bold mb-5">채팅방 이름 짓기</div>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="채팅방 이름을 입력하세요"
          className="w-[90%] h-10 px-4 border border-gray-300 rounded-md mb-6 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleComplete}
          className="w-[90%] h-10 rounded-md bg-blue-500 text-white bg-black font-bold hover:bg-blue-600"
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default MakeRoomModal;
