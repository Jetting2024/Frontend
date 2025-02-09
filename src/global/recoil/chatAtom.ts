import { atom } from "recoil";

export const messagesState = atom({
    key: "messagesState",
    default: [] as {
        roomId: number | null;
        userId: number | null;
        message: string | null;
        createAt: string | null;
    }[],

});