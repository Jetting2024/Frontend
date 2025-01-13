// recoil/mapState.ts
import { atom } from "recoil";

export const centerState = atom({
  key: "centerState", // 유니크한 키
  default: { lat: 37.5665, lng: 126.978 }, // 초기값: 서울
});

export const markersState = atom({
  key: "markersState", // 유니크한 키
  default: [] as { lat: number; lng: number; title?: string }[], // 마커 초기값
});
