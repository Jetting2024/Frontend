import { atom } from "recoil";

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
}

export const authState = atom<AuthState>({
    key: "authState",
    default: {
        isAuthenticated: !!localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken") || null,
        refreshToken: localStorage.getItem("refreshToken") || null,
    },
});