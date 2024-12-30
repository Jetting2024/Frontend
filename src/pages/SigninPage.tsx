import React from "react";
import { useNavigate } from "react-router-dom";
import { SiKakaotalk } from "react-icons/si";
import teamworkImage from "../assets/teamwork.png";
import { KAKAO_AUTH_URL } from "../auth/OAuth";

const SigninPage: React.FC = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      // 백엔드에 인가 코드를 보내고 accessToken, refreshToken을 받음
      axios
        .get(`http://localhost:8080/member/kakao/callback?code=${code}`)
        .then((response) => {
          const { accessToken, refreshToken } = response.data.data; // TokenResponseDto에서 data 추출

          // 로컬 스토리지에 토큰 저장
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Recoil 상태 설정 (로그인 상태로 설정)
          setAuth({ isAuthenticated: true, accessToken, refreshToken });

          // 토큰이 잘 저장되었는지 확인
          console.log("accessToken:", localStorage.getItem("accessToken"));
          console.log("refreshToken:", localStorage.getItem("refreshToken"));

          // 홈 화면으로 리디렉션
          navigate("/");
        })
        .catch((error) => {
          console.error("카카오 로그인 실패:", error);
        });
    }
  }, [navigate, setAuth]);

  const KakaoLogin = async () => {
    // window.location.href = "http://localhost:8080/member/kakao";
    window.open(
      "http://localhost:8080/member/kakao",
      "_blank",
      "width=500,height=700"
    );
  };

  const LoginClick = () => {
    navigate("/login");
  };

  const SignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)]">
      <h1 className="text-2xl font-extrabold mb-4">
        친구들과 여행 일정을 한 번에!
      </h1>
      <h2 className="text-2xl font-extrabold mb-4">JETTING</h2>
      <img src={teamworkImage} alt="Teamwork" className="w-52 h-52 mb-4" />

      <button
        onClick={() => {window.location.href = KAKAO_AUTH_URL;}}
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
