import { Client } from "@stomp/stompjs";
import React, { useState, useEffect } from "react";

const WebSocketTest: React.FC = () => {
    const [roomId, setRoomId] = useState<number>(1);
    const [userId, setUserId] = useState<number>(4);
    const [message, setMessage] = useState<string>("");
    const [client, setClient] = useState<Client | null>(null);
    const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    

    useEffect(() => {
        const stompClient = new Client({
        brokerURL: "http://localhost:8080/ws",
        onConnect: () => {
            console.log("connected to websocket");

            stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
            console.log("Received:", message.body);
            setReceivedMessages((prev) => [...prev, message.body]);
            });

            setIsConnected(true);
        },
        onDisconnect: () => {
            console.log("Disconnected from WebSocket");
            setIsConnected(false);
        },
        onStompError: (error) => {
            console.error("STOMP ERROR: ", error);
        },
        });

        stompClient.activate(); // 클라이언트 활성화
        setClient(stompClient);

        return () => {
        stompClient.deactivate();
        };
    }, []);

    const sendMessage = () => {
        const chatMessage = {
        roomId: roomId,
        userId: userId,
        message: message,
        };
        if (client && client.connected) {
        client.publish({
            destination: `/pub/sendMessage`,
            body: JSON.stringify(chatMessage), // 객체를 문자열로 변환
        });
        console.log("Message sent: ", message);
        } else {
        console.log("STOMP client is not connected");
        }
    };

    return (
            <div>
                <h2>WebSocket Test</h2>

                {/* 방 ID와 사용자 ID 설정 */}
                <div>
                    <label>
                    Room ID:
                    <input
                        type="number"
                        value={roomId}
                        onChange={(e) => setRoomId(Number(e.target.value))}
                    />
                    </label>
                    <label>
                    User ID:
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(Number(e.target.value))}
                    />
                    </label>
                </div>

                {/* 연결 상태 표시 */}
                <div>
                    {isConnected ? (
                    <p>Connected to WebSocket server</p>
                    ) : (
                    <p>Not connected</p>
                    )}
                </div>

                {/* 메시지 전송 */}
                <div>
                    <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message"
                    />
                    <button onClick={sendMessage}>Send Message</button>
                </div>

                {/* 받은 메시지 표시 */}
                <div>
                    <h3>Received Messages:</h3>
                    <ul>
                    {receivedMessages.map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                    ))}
                    </ul>
                </div>
            </div>
    );
};

export default WebSocketTest;
