import React, { useState } from "react";
import TextField from "../TextField";
import { CiLock, CiMail } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../global/axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../global/recoil/authAtoms";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const setAuth = useSetRecoilState(authState);

  const signInHandler = async () => {
    if (!emailRegex.test(email)) {
      setErrorMessage("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/member/login", {
        email: email,
        password: password,
      });

      const { accessToken, refreshToken } = response.data.result.jwtToken;
      const id = response.data.result.idx; // 추후에 수정 될 부분

      localStorage.setItem("id", id);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAuth({ isAuthenticated: true, id, accessToken, refreshToken });

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
    <section className="w-[500px] h-auto flex flex-col justify-between items-center">
      <form className="flex-1 w-[380px] flex flex-col justify-center items-center gap-5">
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
        <div className="mt-2 text-sm">
          <Link to="/recover" className="text-gray hover:underline">
            비밀번호를 잊어버리셨나요?
          </Link>
        </div>

        <div
          className="w-[364px] h-10 flex justify-center items-center rounded-lg bg-black mb-5 hover:bg-gray"
          onClick={signInHandler}
        >
          <button className="text-sm text-white" disabled={!email || !password}>
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
