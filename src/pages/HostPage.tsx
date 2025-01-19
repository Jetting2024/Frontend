import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import InviteResponseModal from "../components/modals/InviteResponseModal";

interface HostProps {
    travelId: number | undefined;
    invitationLink: string | undefined;
    invitedPerson: string | undefined;
}

const HostPage: React.FC<HostProps> = ({ travelId, invitationLink, invitedPerson}) => {
  const [inviteData, setInviteData] = useState<{
    travelId: number | undefined;
    invitationLink: string | undefined;
    invitedPerson: string | undefined;
  } | null>(null);

  useEffect(() => {

    setInviteData({
        travelId: travelId,
        invitationLink: invitationLink,
        invitedPerson: invitedPerson
    });

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      onConnect: () => {
        console.log("Connected to WebSocket");

        console.log(inviteData);

        client.subscribe(`/sub/alert/${inviteData?.travelId}`, (message) => {
          const inviteClickData = JSON.parse(message.body);
          console.log("Received invitation:", inviteClickData);

          setInviteData({
            travelId: inviteClickData.travelId,
            invitationLink: inviteClickData.invitation,
            invitedPerson: `사용자 ${inviteClickData.inviteeId}`, // 예시: ID로 이름 변환
          });
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const closeModal = () => {
    setInviteData(null);
  };

  return (
    <div>
      <h1>호스트 화면</h1>
      {inviteData && (
        <InviteResponseModal
          travelId={inviteData.travelId}
          invitationLink={inviteData.invitationLink}
          invitedPerson={inviteData.invitedPerson}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default HostPage;
