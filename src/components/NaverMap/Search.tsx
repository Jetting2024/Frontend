import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../global/recoil/authAtoms";

interface SearchResult {
  title: string;
  address: string;
  category: string;
  telephone: string;
  lat: number;
  lng: number;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const readAuthState = useRecoilValue(authState);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("검색어를 입력하세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!readAuthState.accessToken) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/travel/kakao/searchKeyword`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${readAuthState.accessToken}`,
          },
          params: { query },
        }
      );

      // 응답 데이터 확인
      console.log("API 전체 응답 데이터:", response.data);

      const rawResult = response.data.result;

      const fixedResult = rawResult
        .replace(/=/g, ":") // '='를 ':'로 변환
        .replace(/([a-zA-Z0-9_]+):/g, '"$1":') // 키를 큰따옴표로 감싸기
        .replace(/:\s*([^,\}\]]+)/g, (match: any, p1: any) => {
          if (["null", "true", "false"].includes(p1)) return `: ${p1}`;
          return /^[-+]?\d+(\.\d+)?$/.test(p1) ? `: ${p1}` : `: "${p1}"`;
        })
        .replace(/,\s*(?=[}\]])/g, "") // 닫는 괄호 앞의 쉼표 제거
        .replace(/,\s*$/g, "") // 문자열 끝의 쉼표 제거
        .replace(/:\s*,/g, ": null,") // 빈 값을 null로 대체
        .replace(/"place_url": ""http":/g, '"place_url": "http:') // 잘못된 따옴표 수정
        .replace(/[^"]+>[^"]+/g, "") // 잘못된 텍스트 제거
        .replace(/"category_group_code":.*?,/g, "") // 불필요한 필드 제거
        .replace(/"category_group_name":.*?,/g, "")
        .replace(/"category_name":.*?,/g, "")
        .replace(/"distance":.*?,/g, "")
        .replace(/"phone":.*?,/g, "") // phone 필드 제거
        .replace(/"road_address_name":.*?,/g, ""); // road_address_name 필드 제거
      console.log("수정된 JSON 문자열:", fixedResult);

      // JSON 파싱
      const parsedResult = JSON.parse(fixedResult);
      console.log("파싱된 result 데이터:", parsedResult);

      // 필요한 데이터만 추출
      const items = parsedResult.map((item: any) => ({
        address_name: item.address_name || "주소 없음",
        id: item.id || "알 수 없음",
        place_name: item.place_name || "알 수 없음",
        place_url: item.place_url || "없음",
        lat: parseFloat(item.y),
        lng: parseFloat(item.x),
      }));

      setResults(items);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      setError("API 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* 검색 바 */}
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="border p-2 rounded w-full mb-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          검색
        </button>
      </div>

      {loading && <p>검색 중입니다...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {/* 검색 결과 */}
      <div>
        <h2 className="text-lg font-bold mb-2">검색 결과:</h2>
        <ul className="list-disc pl-4">
          {results.map((result, index) => (
            <li key={index} className="mb-4 border p-2 rounded shadow">
              <h3 className="font-bold">{result.title}</h3>
              <p>주소: {result.address}</p>
              <p>카테고리: {result.category}</p>
              <p>전화번호: {result.telephone}</p>
              <p>
                위도: {result.lat}, 경도: {result.lng}
              </p>
            </li>
          ))}
        </ul>
        {results.length === 0 && !loading && !error && (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
