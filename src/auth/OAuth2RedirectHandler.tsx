import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useKakaoLogin } from "./useKakaoLogin";

const OAuth2RedirectHandler: React.FC = () => {
  const navigate = useNavigate();
  const { kakaoLogin } = useKakaoLogin();

  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const handleLogin = async () => {
      console.log("OAUTH code: ", code);
      if (code) {
        const isSuccess = await kakaoLogin(code);
        console.log('sccess: ', isSuccess)
        if (isSuccess) {
          navigate('/');
        } else {
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      }
    }

    handleLogin();
  }, [code, kakaoLogin, navigate]);

  return (
    <div>
      카카오 인증 중 ..............
    </div>
  )
}

export default OAuth2RedirectHandler;