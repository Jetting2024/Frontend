import React, { useState } from "react";
import { Client } from "@stomp/stompjs";

interface InviteClickDto {
  travelId: number;
  inviteeId: number;
  invitation: string;
}

interface InviteStatusDto {
  travelId: number;
  inviteeId: number;
  status: string; // ACCEPT or REJECT
}

const WebSocketClient: React.FC<{ userId: number; travelId: number }> = ({
  userId,
  travelId,
}) => {
  const [invitations, setInvitations] = useState<InviteClickDto[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  React.useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      debug: (str) => {
        console.log(`[STOMP Debug][User ${userId}]:`, str);
      },
      onConnect: () => {
        console.log(`[STOMP][User ${userId}] Connected to room ${travelId}`);

        client.subscribe(`/alert/${travelId}`, (message) => {
          const invite = JSON.parse(message.body) as InviteClickDto;
          setInvitations((prev) => [...prev, invite]);
        });
      },
      onStompError: (error) => {
        console.error(`[STOMP Error][User ${userId}]:`, error);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
      console.log(`[STOMP][User ${userId}] Connection closed.`);
    };
  }, [travelId, userId]);

  const sendTestInvite = () => {
    if (!stompClient || !stompClient.connected) {
      console.error(`[STOMP][User ${userId}] Client is not connected.`);
      return;
    }

    const invite: InviteClickDto = {
      travelId,
      inviteeId: userId === 1 ? 2 : 1, // Send invite to the other user
      invitation: `test-invite-${Date.now()}`,
    };

    stompClient.publish({
      destination: `/pub/sendInvite`,
      body: JSON.stringify(invite),
    });

    console.log(`[STOMP][User ${userId}] Test invite sent:`, invite);
  };

  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h3>User {userId} Notifications</h3>
      <button onClick={sendTestInvite}>Send Test Invite</button>
      <div>
        <h4>Invitations:</h4>
        {invitations.length > 0 ? (
          invitations.map((invite, index) => (
            <div key={index}>
              <p>Invitation from Travel ID: {invite.travelId}</p>
              <p>Invitation: {invite.invitation}</p>
            </div>
          ))
        ) : (
          <p>No invitations yet.</p>
        )}
      </div>
    </div>
  );
};

const TestInvitationNotifications: React.FC = () => {
  const travelId = 123;

  return (
    <div>
      <h2>Test Invitation Notifications</h2>
      <div style={{ display: "flex" }}>
        {/* Simulate two users */}
        <WebSocketClient userId={1} travelId={travelId} />
        <WebSocketClient userId={2} travelId={travelId} />
      </div>
    </div>
  );
};

export default TestInvitationNotifications;
