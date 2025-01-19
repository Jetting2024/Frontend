import React, { useState } from "react";
import InviteModal from "../components/modals/InviteModal";
import HostPage from "./HostPage";

const InviteFriendsPage: React.FC = () => {
  const [isHostPageVisible, setHostPageVisible] = useState(false);
  const [inviteData, setInviteData] = useState<{
      travelId: number;
      invitationLink: string;
      invitedPerson: string;
    } | null>(null);

  const showHostPage = (invitationLink: string) => {
    setHostPageVisible(true);
    setInviteData({
      travelId: 5,
      invitationLink: invitationLink,
      invitedPerson: "유지원, 조윤주",
    });
  };

  return (
    <div className="w-full h-screen relative bg-gray bg-opacity-30">
      <div className="absolute inset-0 flex justify-center items-center">
        {isHostPageVisible ? (
          <HostPage travelId={inviteData?.travelId} invitationLink={inviteData?.invitationLink} invitedPerson={inviteData?.invitedPerson} />
        ) : (
          <InviteModal onShowHostPage={showHostPage} />
        )}
      </div>
    </div>
  );
};

export default InviteFriendsPage;
