import React from 'react';
import styled from 'styled-components';
import TextBox from '../TextBox';
import Button from '../Button';
import { FaGoogle } from "react-icons/fa6";
import { SiKakao } from "react-icons/si";
import { DivideLine } from '../DivideLine';

const Container = styled.section`
    width: 500px;
    height: 600px;
    border-radius: 10px;
    border: 2px solid rgba(237, 237, 237, 0.8);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const TopContainer = styled.section`
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

const BottomTitle = styled.text`
  font-size: 1rem;
`;

const Register = () => {
  return (
    <>
      <Container>
        <TopContainer>
          <h2>계정 만들기</h2>
          <TextBox text='아이디' />
          <TextBox text='비밀번호' />
          <TextBox text='비밀번호 확인' />
          <Button>가입하기</Button>
        </TopContainer>
        <BottomContainer>
          <DivideLine />
          <BottomTitle>간편 회원가입</BottomTitle>
          <Button icon={SiKakao} size={40}>카카오톡으로 시작하기</Button>
          <Button icon={FaGoogle} size={16}>구글로 시작하기</Button>
        </BottomContainer>
      </Container>
    </>
  )
}

export default Register;