import React, { useState } from "react";
import NaverMap from "./NaverMap"; // 경로를 정확히 지정

const NAVER_MAP_CLIENT_ID = "2kvq7ux5qa";

const Search: React.FC = () => {
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 }); // 초기 지도 중심 (서울)
  const [markers, setMarkers] = useState<
    { lat: number; lng: number; title?: string }[]
  >([]);

  // 검색 처리 함수
  const handleSearch = (query: string) => {
    if (!query) return;

    naver.maps.Service.geocode({ query }, (status: string, response: any) => {
      if (status === naver.maps.Service.Status.OK) {
        const result = response.v2.addresses[0]; // 첫 번째 검색 결과 사용
        if (result) {
          const lat = parseFloat(result.y); // 위도
          const lng = parseFloat(result.x); // 경도

          console.log(lat, lng); // 확인

          // 지도 중심 및 마커 업데이트
          setCenter({ lat, lng });
          setMarkers([{ lat, lng, title: query }]);
        } else {
          alert("검색 결과가 없습니다.");
        }
      } else {
        alert("검색 중 오류가 발생했습니다.");
      }
    });
  };

  return (
    <div>
      {/* 검색 바 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="장소를 검색하세요"
          className="border p-2 rounded w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch((e.target as HTMLInputElement).value); // 검색어로 검색
            }
          }}
        />
      </div>

      {/* 지도 */}
      <div style={{ width: "100%", height: "500px" }}>
        <NaverMap center={center} markers={markers} />
      </div>
    </div>
  );
};

export default Search;

// 빈 export 추가
export {};
