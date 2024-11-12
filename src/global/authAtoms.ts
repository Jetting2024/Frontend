import { atom } from "recoil";

export const authState = atom({
    key: "authState",
    default: {
        isAuthenticated: !!localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken") || null,
        refreshToken: localStorage.getItem("refreshToken") || null,
    },
});