import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const handleSearch = async () => {
    if (!query.trim) {
      alert("검색어를 입력하세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8080/api/search`, {
        params: {
          query,
          display: 5, // 최대 5개의 결과
        },
      });

      if (response.status === 200) {
        const items = response.data.items.map((item: any) => ({
          title: item.title.replace(/<\/?b>/g, ""), // HTML 태그 제거
          address: item.roadAddress,
          category: item.category,
          telephone: item.telephone || "없음",
          lat: parseFloat(item.mapy), // 위도
          lng: parseFloat(item.mapx), // 경도
        }));

        setResults(items);
      } else {
        setError("API 요청 실패");
        console.error("API 요청 실패:", response);
      }
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
