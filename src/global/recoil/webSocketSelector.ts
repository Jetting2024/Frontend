import { atom } from "recoil";
import { Client } from "@stomp/stompjs";

export const webSocketClientState = atom<Client | null>({
  key: "webSocketClientState",
  default: null, // 초기값을 null로 설정
});
