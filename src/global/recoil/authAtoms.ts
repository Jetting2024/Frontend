import { atom } from "recoil";

interface AuthState {
    isAuthenticated: boolean;
    id: number | null;
    accessToken: string | null;
    refreshToken: string | null;
    image: string | null
}

export const authState = atom<AuthState>({
    key: "authState",
    default: {
        isAuthenticated: !!sessionStorage.getItem("accessToken"),
        id: sessionStorage.getItem("id") ? parseInt(sessionStorage.getItem("id") || "0") : null,
        accessToken: sessionStorage.getItem("accessToken") || null,
        refreshToken: sessionStorage.getItem("refreshToken") || null,
        image: sessionStorage.getItem("image") || null,
    },
});