import { atom } from "recoil";

interface ChatRoomState {
    roomId : string | null;
    travelId : string | null;
    userId : string | null;
    member : string | null;
    roomName : string | null;
    startDate: string | null;
    endDate: string | null;
}

export const chatRoomState = atom<ChatRoomState>({
    key: "chatRoomState",
    default: {
        roomId: null,
        travelId: null,
        userId: null,
        member: null,
        roomName : null,
        startDate: null,
        endDate: null,
    },
});
