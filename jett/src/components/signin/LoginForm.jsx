import React, { useState } from "react";
import styled from "styled-components";
import TextField from "../TextField";
import Button from "../Button";
import { FaGoogle } from "react-icons/fa6";
import { SiKakao } from "react-icons/si";
import { CiLock, CiMail } from "react-icons/ci";
import { DivideLine } from "../DivideLine";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../global/axios";
import { Cookies } from 'react-cookies';

const Container = styled.section`
  width: 500px;
  height: 550px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TopContainer = styled.form`
  flex: 1;
  display: flex;
  width: 380px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  h2 {
    margin-top: 20px;
  }
`;

const BottomContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const BottomTitle = styled.div`
  font-size: 1rem;
`;

const LoginLink = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.5);
  a {
    color: rgb(104, 137, 255);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ForgotPasswordLink = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.5);
  a {
    color: rgb(104, 137, 255);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  align-self: flex-start;
`;

// 이메일 정규 표현식
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 비밀번호 강도 검사
const passwordStrength = (password) => {
  if (password.length < 8) return "비밀번호는 최소 8자 이상이어야 합니다.";
  if (!/[A-Z]/.test(password)) return "비밀번호에는 대문자가 포함되어야 합니다.";
  if (!/[a-z]/.test(password)) return "비밀번호에는 소문자가 포함되어야 합니다.";
  if (!/\d/.test(password)) return "비밀번호에는 숫자가 포함되어야 합니다.";
  return "";
};

const cookies = new Cookies();

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const signInHandler = async (e) => {
    e.preventDefault();

    // 유효성 검사
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
      // 비동기 요청 처리
      const response = await axios.post("/member/login", {
        email,
        password,
      });

      // 토큰과 사용자 ID를 로컬 스토리지에 저장
      localStorage.setItem("accessToken", response.data.result.jwtToken.accessToken);
      localStorage.setItem("userId", response.data.result.idx);
      cookies.set('refreshToken', response.data.result.jwtToken.refreshToken);
      
      // 성공적으로 로그인 후 리디렉션
      navigate("/");

    } catch (error) {
      // 에러 처리
      if (error.response) {
        const { errorCode } = error.response.data;
        if (errorCode === 501) {
          setErrorMessage("존재하지 않는 이메일입니다.");
        } else {
          setErrorMessage("로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요.");
        }
      } else {
        setErrorMessage("로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요.");
        console.error(error);
      }
    }
  };

  return (
    <Container>
      <TopContainer>
        <h2>시작하기</h2>
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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <ForgotPasswordLink>
          <Link to="/recover">비밀번호를 잊어버리셨나요?</Link>
        </ForgotPasswordLink>
        <Button onClick={signInHandler}>로그인</Button>
      </TopContainer>
      <BottomContainer>
        <DivideLine />
        <BottomTitle>간편 로그인</BottomTitle>
        <Button icon={SiKakao} size={40} color="#FAE100">
          카카오톡으로 로그인
        </Button>
        <Button icon={FaGoogle} size={16} color="#FFFFFF">
          구글로 로그인
        </Button>
        <LoginLink>
          아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </LoginLink>
      </BottomContainer>
    </Container>
  );
};

export default LoginForm;
