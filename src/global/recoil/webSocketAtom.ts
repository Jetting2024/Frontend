import { atom } from "recoil";
import { Client } from "@stomp/stompjs";

export const webSocketClientState = atom<Client | null>({
  key: "webSocketClientState",
  default: null,
});
