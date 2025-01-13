import React, { useState } from "react";
import InviteModal from "../components/modals/InviteModal";
import HostPage from "./HostPage";

const InviteFriendsPage: React.FC = () => {
  const [isHostPageVisible, setHostPageVisible] = useState(false);

  const showHostPage = () => {
    setHostPageVisible(true);
  };

  return (
    <div className="w-full h-screen relative bg-gray bg-opacity-30">
      <div className="absolute inset-0 flex justify-center items-center">
        {isHostPageVisible ? (
          <HostPage />
        ) : (
          <InviteModal onShowHostPage={showHostPage} />
        )}
      </div>
    </div>
  );
};

export default InviteFriendsPage;
