import { atom } from "recoil";

interface AuthState {
    isAuthenticated: boolean;
    id: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    image: string | null
}

export const authState = atom<AuthState>({
    key: "authState",
    default: {
        isAuthenticated: !!sessionStorage.getItem("accessToken"),
        id: sessionStorage.getItem("id") || null,
        accessToken: sessionStorage.getItem("accessToken") || null,
        refreshToken: sessionStorage.getItem("refreshToken") || null,
        image: sessionStorage.getItem("image") || null,
    },
});