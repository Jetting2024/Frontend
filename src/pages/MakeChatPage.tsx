import React from "react";
import MakeRoomModal from "../components/modals/MakeRoomModal";

const MakeChatPage: React.FC = () => {
  return (
    <div className="w-full h-screen relative bg-gray bg-opacity-30">
      <div className=" absolute inset-0 flex justify-center items-center">
        <MakeRoomModal />
      </div>
    </div>
  );
};

export default MakeChatPage;
