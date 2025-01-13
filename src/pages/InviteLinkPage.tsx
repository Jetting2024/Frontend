import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PendingAccessModal from "../components/modals/PendingAccessModal";
import { Client } from "@stomp/stompjs";

const InviteLinkPage: React.FC = () => {
  const { travelId, invitation } = useParams<{
    travelId: string;
    invitation: string;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    const notifyHost = async () => {
      const client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        onConnect: () => {
          console.log("Connected to WebSocket");

          client.publish({
            destination: "/inviteClick",
            body: JSON.stringify({
              travelId: Number(travelId),
              inviteeid: sessionStorage.getItem("id"),
              invitation,
            }),
          });
        },
      });
      // 호스트에게 알림 후 /loading 화면으로 이동
      navigate("/loading");
    };

    notifyHost();
  }, [travelId, invitation, navigate]);

  return (
    <div className=" w-full h-[calc(100vh-56px)] flex items-center justify-center">
      <PendingAccessModal />
    </div>
  );
};

export default InviteLinkPage;
