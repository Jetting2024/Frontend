import React, { useState } from "react";
import TextField from "../TextField";
import { CiLock, CiMail } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../global/axios";
import { useSetRecoilState } from "recoil";
import { authState } from "../../global/recoil/authAtoms";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string): boolean => emailRegex.test(email);

  const signInHandler = async () => {
    const { email, password } = credentials;

    if (!validateEmail(email)) {
      setErrorMessage("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/member/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data.result.jwtToken;
      const id = response.data.result.idx; // 추후에 수정 될 부분

      sessionStorage.setItem("id", id);
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      const memberInfo = await axios.get(
        `http://localhost:8080/member/getInfo`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const userName = memberInfo.data.result.name;
      const image = memberInfo.data.result.image;

      sessionStorage.setItem("name", userName);
      sessionStorage.setItem("image", image);

      setAuth({ isAuthenticated: true, id, accessToken, refreshToken, image });

      navigate("/");
      alert("로그인에 성공하였습니다!");
    } catch (error: any) {
      const errorCode = error?.response?.data?.errorCode;

      const errorMessages: Record<number, string> = {
        501: "존재하지 않는 이메일입니다.",
        502: "잘못된 비밀번호입니다.",
      };

      setErrorMessage(
        errorMessages[errorCode] ||
          "로그인에 실패하였습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <section className="w-[500px] h-auto flex flex-col justify-between items-center">
      <form className="flex-1 w-[380px] flex flex-col justify-center items-center gap-5">
        <h2 className="mt-5">시작하기</h2>
        <TextField
          type="email"
          name="email"
          icon={CiMail}
          placeholder="이메일"
          value={credentials.email}
          onChange={handleInputChange}
        />
        <TextField
          type="password"
          name="password"
          icon={CiLock}
          placeholder="비밀번호"
          value={credentials.password}
          onChange={handleInputChange}
        />
        {errorMessage && (
          <div className="text-red-500 text-sm self-start">{errorMessage}</div>
        )}
        <div className="mt-2 text-sm">
          <Link to="/recover" className="text-gray hover:underline">
            비밀번호를 잊어버리셨나요?
          </Link>
        </div>

        <div
          className="w-[364px] h-10 flex justify-center items-center rounded-lg bg-black mb-5 hover:bg-gray"
          onClick={(e) => {
            e.preventDefault();
            signInHandler();
          }}
        >
          <button
            className="text-sm text-white"
            disabled={!credentials.email || !credentials.password}
          >
            로그인
          </button>
        </div>
      </form>
      <div className=" text-sm text-gray">
        아직 계정이 없으신가요?{" "}
        <Link to="/signup" className="text-black hover:underline">
          회원가입
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
