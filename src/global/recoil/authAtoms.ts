import { atom } from "recoil";

interface AuthState {
    isAuthenticated: boolean;
    id: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}

export const authState = atom<AuthState>({
    key: "authState",
    default: {
        isAuthenticated: !!localStorage.getItem("accessToken"),
        id: localStorage.getItem("id") || null,
        accessToken: localStorage.getItem("accessToken") || null,
        refreshToken: localStorage.getItem("refreshToken") || null,
    },
});