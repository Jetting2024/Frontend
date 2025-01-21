// recoil/webSocketSelector.ts
import { selector } from "recoil";
import { webSocketClientState } from "./webSocketAtom";
import { Client } from "@stomp/stompjs";

export const initializeWebSocketClient = selector<Client>({
  key: "initializeWebSocketClient",
  get: ({ get }) => {
    const existingClient = get(webSocketClientState);

    if (existingClient) {
      return existingClient; // 이미 초기화된 경우 기존 클라이언트를 반환
    }

    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });

    stompClient.activate();
    return stompClient;
  },
});
