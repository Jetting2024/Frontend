import React, { useState } from "react";
import TextField from "../TextField";
import Button from "../Button";
import { FaGoogle } from "react-icons/fa6";
import { SiKakao } from "react-icons/si";
import { CiLock, CiMail } from "react-icons/ci";
import { DivideLine } from "../DivideLine";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../global/axios";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordStrength = (password: string) => {
  if (password.length < 8) return "비밀번호는 최소 8자 이상이어야 합니다.";
  if (!/[A-Z]/.test(password))
    return "비밀번호에는 대문자가 포함되어야 합니다.";
  if (!/[a-z]/.test(password))
    return "비밀번호에는 소문자가 포함되어야 합니다.";
  if (!/\d/.test(password)) return "비밀번호에는 숫자가 포함되어야 합니다.";
  return "";
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const signInHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setErrorMessage("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    const passwordError = passwordStrength(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    try {
      const response = await axios.post("/member/login", {
        email,
        password,
      });

      localStorage.setItem(
        "accessToken",
        response.data.result.jwtToken.accessToken
      );
      localStorage.setItem("userId", response.data.result.idx);

      navigate("/");
    } catch (error: any) {
      if (error.response) {
        const { errorCode } = error.response.data;
        if (errorCode === 501) {
          setErrorMessage("존재하지 않는 이메일입니다.");
        } else {
          setErrorMessage(
            "로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요."
          );
        }
      } else {
        setErrorMessage(
          "로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요."
        );
        console.error(error);
      }
    }
  };

  return (
    <section className="w-[500px] h-[550px] flex flex-col justify-between items-center">
      <form
        className="flex-1 w-[380px] flex flex-col justify-center items-center gap-5"
        onSubmit={signInHandler}
      >
        <h2 className="mt-5">시작하기</h2>
        <TextField
          type="email"
          icon={CiMail}
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          icon={CiLock}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
          <div className="text-red-500 text-sm self-start">{errorMessage}</div>
        )}
        <div className="mt-2 text-sm text-gray-500">
          <Link to="/recover" className="text-blue-500 hover:underline">
            비밀번호를 잊어버리셨나요?
          </Link>
        </div>
        <Button disabled={!email || !password}>로그인</Button>
      </form>
      <section className="flex-1 flex flex-col justify-center items-center gap-4">
        <DivideLine />
        <div className="text-base">간편 로그인</div>
        <Button icon={SiKakao} size={40} color="#FAE100">
          카카오톡으로 로그인
        </Button>
        <div className="mt-2 text-sm text-gray-500">
          아직 계정이 없으신가요?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </div>
      </section>
    </section>
  );
};

export default LoginForm;
