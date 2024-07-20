import React from "react";
import styled from "styled-components";
import TextField from "../TextField";
import Button from "../Button";
import { FaGoogle } from "react-icons/fa6";
import { SiKakao } from "react-icons/si";
import { CiLock, CiUser } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { DivideLine } from "../DivideLine";
import { Link } from "react-router-dom";

const Container = styled.section`
  width: 500px;
  height: 600px;
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

const RegisterForm = () => {
  return (
    <Container>
      <TopContainer>
        <h2>계정 만들기</h2>
        <TextField type="text" icon={CiUser} placeholder="이름" />
        <TextField type="email" icon={AiOutlineMail} placeholder="이메일" />
        <TextField type="password" icon={CiLock} placeholder="비밀번호" />
        <Button>가입하기</Button>
        <LoginLink>
          이미 계정이 존재하신가요? <Link to="/signin">로그인</Link>
        </LoginLink>
      </TopContainer>
      <BottomContainer>
        <DivideLine />
        <BottomTitle>간편 회원가입</BottomTitle>
        <Button icon={SiKakao} size={40} color="#FAE100">
          카카오톡으로 시작하기
        </Button>
        <Button icon={FaGoogle} size={16} color="#FFFFFF">
          구글로 시작하기
        </Button>
      </BottomContainer>
    </Container>
  );
};

export default RegisterForm;
