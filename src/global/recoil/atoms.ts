import { atom } from "recoil";

interface ChatRoomState {
    roomId : number | null;
    travelId : number | null;
    userId : number | null;
    member : string[] | null;   
    roomName : string | null;
    startDate: string | null;
    endDate: string | null;
    nightCount: string | null;
}

export const chatRoomState = atom<ChatRoomState>({
    key: "chatRoomState",
    default: {
        roomId: null,
        travelId: null,
        userId: null,
        member: [],
        roomName : null,
        startDate: null,
        endDate: null,
        nightCount: null,
    },
});
