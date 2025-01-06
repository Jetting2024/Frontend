import React, { useEffect } from "react";

// 네이버맵 API 키 설정
const NAVER_MAP_CLIENT_ID = "2kvq7ux5qa";
const NAVER_MAP_CLIENT_SECRET = "zAR0u5JgE3ltJgegogFDlfVfCi2pqiFoEvhEMEp5";

interface NaverMapProps {
  center: { lat: number; lng: number }; // 지도 중심 좌표
  markers?: { lat: number; lng: number; title?: string }[]; // 마커 리스트
  onClickMarker?: (lat: number, lng: number) => void; // 마커 클릭 이벤트
  onMapClick?: (lat: number, lng: number) => void; // 지도 클릭 이벤트
}

const NaverMap: React.FC<NaverMapProps> = ({
  center,
  markers = [],
  onClickMarker,
  onMapClick,
}) => {
  useEffect(() => {
    const initializeMap = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(center.lat, center.lng),
        zoom: 10,
      });

      // 마커 추가
      markers.forEach((marker) => {
        const naverMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(marker.lat, marker.lng),
          map,
          title: marker.title || "",
        });

        if (onClickMarker) {
          naver.maps.Event.addListener(naverMarker, "click", () => {
            onClickMarker(marker.lat, marker.lng);
          });
        }
      });

      // 지도 클릭 이벤트
      if (onMapClick) {
        naver.maps.Event.addListener(map, "click", (e: any) => {
          const { lat, lng } = e.coord;
          onMapClick(lat(), lng());
        });
      }
    };

    // 네이버맵 API 로드
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      // Clean up script
      const scriptTag = document.querySelector(
        `script[src*="openapi.map.naver.com"]`
      );
      if (scriptTag) scriptTag.remove();
    };
  }, [center, markers, onClickMarker, onMapClick]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
