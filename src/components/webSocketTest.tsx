import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useRecoilValue } from "recoil";
import { chatRoomState } from "../global/recoil/atoms";
import { authState } from "../global/recoil/authAtoms";

const WebSockectTest: React.FC = () => {
  const readRoomInfo = useRecoilValue(chatRoomState);
  const readAuthInfo = useRecoilValue(authState);
  const clientRef = useRef<Client | null>(null);

  const [messages, setMessages] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected");
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    // if (!5) return;

    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {
        Authorization: `Bearer ${readAuthInfo.accessToken}`,
      },
      debug: (str) => console.log(`[STOMP DEBUG]: ${str}`), // 디버그 로그
      onConnect: () => {
        console.log(`[STOMP] Connected to room ${5}`);
        setConnectionStatus("Connected");

        // 메시지 구독
        stompClient.subscribe(`/sub/chat/room/${5}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log(`[STOMP] Received message: `, receivedMessage);
          setMessages((prev) => [...prev, receivedMessage]);
        });
      },
      onDisconnect: () => {
        console.log("[STOMP] Disconnected");
        setConnectionStatus("Disconnected");
      },
      onStompError: (error) => {
        console.error("[STOMP] Error: ", error);
        setConnectionStatus("Error");
      },
    });

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
      console.log("[STOMP] Connection closed");
    };
  }, [5, readAuthInfo.accessToken]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return; // 공백 메시지 방지

    if (clientRef.current && clientRef.current.connected) {
      const chatMessage = {
        userId: readAuthInfo.id,
        roomId: 5,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };

      clientRef.current.publish({
        destination: `/pub/sendMessage/${5}`,
        body: JSON.stringify(chatMessage),
      });

      setMessages((prev) => [...prev, newMessage]);
      setNewMessage(""); // 입력 필드 초기화
    } else {
      console.error("[STOMP] WebSocket is not connected");
    }
  };

  return (
    <div>
      <h1>Chat Room: {5}</h1>
      <h2>Connection Status: {connectionStatus}</h2>
      <div>
        <h3>Messages</h3>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default WebSockectTest;
