import { Client } from "@stomp/stompjs";

const connectWebSocket = (onConnectCallback: (client: Client) => void) => {
  const stompClient = new Client({
    brokerURL: "ws://localhost:8080/ws",
    debug: (str) => console.log(str),
    reconnectDelay: 5000,
  });

  stompClient.onConnect = () => {
    console.log("WebSocket connected");
    onConnectCallback(stompClient); // 연결 완료 후 콜백 실행
  };

  stompClient.onStompError = (frame) => {
    console.error("Broker reported error: " + frame.headers["message"]);
    console.error("Additional details: " + frame.body);
  };

  stompClient.activate();
  return stompClient;
};

export default connectWebSocket;


