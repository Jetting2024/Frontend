import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../global/authAtoms";
import axios from "axios";

const OAuth2RedirectHandler: React.FC = () => {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [isRequestSent, setIsRequestSent] = useState(false); // 요청 중복 방지 상태

  const setAuth = useSetRecoilState(authState);

  const navigator = useNavigate();

  useEffect(() => {
    // URL에서 인증 코드 추출
    const code = new URL(window.location.href).searchParams.get("code");
    setAuthCode(code);
  }, []);

  useEffect(() => {
    if (!authCode || isRequestSent) return; // 중복 호출 방지

    const handleLogin = async () => {
      try {
        setIsRequestSent(true); // 요청 시작 표시
        const response = await axios.get(
          `http://localhost:8080/member/kakao/callback?code=${authCode}`
        );

        const { accessToken, refreshToken } = response.data.result.jwtToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Recoil 상태 설정 (로그인 상태로 설정)
        setAuth({ isAuthenticated: true, accessToken, refreshToken });

        console.log("카카오 로그인 성공:", response.data);

        navigator("/");
        
      } catch (error) {
        console.error("카카오 로그인 실패:", error);
      }
    };

    handleLogin();
  }, [authCode, isRequestSent]);

  return <div>카카오 인증 중 ..............</div>;
};

export default OAuth2RedirectHandler;
