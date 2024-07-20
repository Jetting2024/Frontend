import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineMail } from "react-icons/ai";
import { CiPhone, CiMail  } from "react-icons/ci";
import { Link } from "react-router-dom";
import TextField from "../TextField";
import Button from "../Button";

const Container = styled.section`
  width: 500px;
  height: 360px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.div`
  margin: 1rem 0;
  padding: 0.4rem;
  border-radius: 0.25rem;
  display: flex;
  gap: 0.5rem;
  list-style: none;
  background-color: rgba(0,0,0,0.05);
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: ${({ isActive }) => isActive ? 'rgba(153, 175, 255, 0.8)' : 'transparent'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: rgba(153, 175, 255, 0.8);
  }
  &:active {
    background-color: rgb(153, 175, 255);
    color: #ebe7ef;
  }
`;

const TopContainer = styled.div`
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

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Blank = styled.div`
  width: inherit;
  height: 1.25rem;
`;

const RecoverAccount = () => {
  const [recoverWhat, setRecoverWhat] = useState("이메일로 찾기");

  return (
    <Container>
      <TopContainer>
        <h2>비밀번호를 잃어버리셨나요?</h2>
        <Tab>
          <TabButton
            isActive={recoverWhat === "이메일로 찾기"}
            onClick={() => setRecoverWhat("이메일로 찾기")}
          >
            이메일로 찾기
          </TabButton>
          <TabButton
            isActive={recoverWhat === "전화번호로 찾기"}
            onClick={() => setRecoverWhat("전화번호로 찾기")}
          >
            전화번호로 찾기
          </TabButton>
        </Tab>

        {recoverWhat === "이메일로 찾기" ? (
          <div>
            <TextField type="email" icon={CiMail} placeholder="이메일" />
            <Blank />
            <Button>인증메일 발송</Button>
          </div>
        ) : (
          <div>
            <TextField type="tel" icon={CiPhone} placeholder="전화번호" />
            <Blank />
            <Button>인증 코드 발송</Button>
          </div>
        )}
      </TopContainer>
      <BottomContainer>
        <LoginLink>
          <Link to="/signin">로그인 페이지로 가기</Link>
        </LoginLink>
      </BottomContainer>
    </Container>
  );
};

export default RecoverAccount;
