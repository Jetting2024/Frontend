import React from "react";
import { useNavigate } from "react-router-dom";
import { SiKakaotalk } from "react-icons/si";
import teamworkImage from "../assets/teamwork.png";

const SigninPage: React.FC = () => {
  const navigate = useNavigate();
  const KakaoLogin = () => {
    //카카오 로그인 로직 추가
    console.log("카카오 로그인 성공");
  };

  const LoginClick = () => {
    navigate("/login");
  };

  const SignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-extrabold mb-4">
        친구들과 여행 일정을 한 번에!
      </h1>
      <h2 className="text-2xl font-extrabold mb-4">JETTING</h2>
      <img src={teamworkImage} alt="Teamwork" className="w-52 h-52 mb-4" />

      <button
        onClick={KakaoLogin}
        className="flex items-center bg-yellow-300 text-black text-base px-10 py-4 mb-4 mt-4 font-extrabold rounded-xl hover:bg-yellow-400 transition"
      >
        <SiKakaotalk className="mr-2" size={24} />
        카카오로 쉬운 시작
      </button>

      <div className="flex space-x-4">
        <button
          onClick={LoginClick}
          className="text-gray hover:underline focus:outline-none"
        >
          로그인
        </button>
        <button
          onClick={SignUpClick}
          className="text-gray hover:underline focus:outline-none"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SigninPage;
