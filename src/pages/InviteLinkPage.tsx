import React from "react";
import PendingAccessModal from "../components/modals/PendingAccessModal";

const InviteLinkPage: React.FC = () => {
  return (
    <div className=" w-full h-[calc(100vh-56px)] flex items-center justify-center">
      <PendingAccessModal />
    </div>
  );
};

export default InviteLinkPage;
