import React from 'react';
import styled from "styled-components";
import TextField from "../TextField";
import Button from "../Button";
import { FaGoogle } from "react-icons/fa6";
import { SiKakao } from "react-icons/si";
import { CiLock, CiMail } from "react-icons/ci";
import { DivideLine } from "../DivideLine";
import { Link } from "react-router-dom";

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
  color: rgba(0,0,0,0.5);
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
  color: rgba(0,0,0,0.5);
  a {
    color: rgb(104, 137, 255);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginForm = () => {
  return (
    <Container>
      <TopContainer>
        <h2>시작하기</h2>
        <TextField type="email" icon={CiMail} placeholder="이메일" />
        <TextField type="password" icon={CiLock} placeholder="비밀번호" />
        <ForgotPasswordLink>
          <Link to="/recover">비밀번호를 잊어버리셨나요?</Link>
        </ForgotPasswordLink>
        <Button>로그인</Button>
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
