import React from "react";
import InviteModal from "../components/modals/InviteModal";

const InviteFriendsPage: React.FC = () => {

  return (
    <div className="w-full h-[calc(100vh-56px)] relative bg-gray bg-opacity-30">
      <div className="absolute inset-0 flex justify-center items-center">
          <InviteModal />
      </div>
    </div>
  );
};

export default InviteFriendsPage;
