import React, { useState, useEffect } from "react";

const WebSocketTest: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState<string>('');
    const [receivedMessage, setReceivedMessage] = useState<string>('');
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080/ws/chat');

        ws.onopen = () => {
            setIsConnected(true);
            console.log('WebSocket connection established');
        };

        ws.onclose = () => {
            setIsConnected(false);
            console.log('WebSocket connection closed');
        };

        ws.onmessage = (event: MessageEvent) => {
            console.log('Received message: ', event.data);
            setReceivedMessage(event.data);
        };

        setSocket(ws);

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        } else {
            console.log('WebSocket is not connected');
        }
    };

    return (
        <div>
            <h2>WebSocket Test</h2>
            <div>
                {isConnected ? (
                    <p>Connected to WebSocket server</p>
                ) : (
                    <p>Not connected</p>
                )}
            </div>

            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message"
                />
                <button onClick={sendMessage}>Send Message</button>
            </div>

            <div>
                <h3>Received Message:</h3>
                <p>{receivedMessage}</p>
            </div>
        </div>
    );
};

export default WebSocketTest;
