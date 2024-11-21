import { atom } from "recoil";

export const roomState = atom({
    key: "roomState",
    default: {
        roomid: 1 // 나중에 수정 필요
    }
});

