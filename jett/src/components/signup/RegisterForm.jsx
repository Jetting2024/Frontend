import React, { useState } from "react";
import styled from "styled-components";
import TextField from "../TextField";
import Button from "../Button";
import { FaGoogle } from "react-icons/fa6";
import { SiKakao } from "react-icons/si";
import { CiLock, CiUser, CiMail } from "react-icons/ci";
import { DivideLine } from "../DivideLine";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../global/axios';

const Container = styled.section`
  width: 500px;
  height: 700px;
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  align-self: flex-start;
`;

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    emailCheckHandler(emailValue);
  }

  const onChangePasswordHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
      const valid = passwordCheckHandler(value, confirm);
      setIsPasswordValid(valid);
    } else if (name === 'confirm') {
      setConfirm(value);
      passwordCheckHandler(password, value);
    }
  }

  const emailCheckHandler = async (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === '') {
      setEmailError('이메일을 입력해주세요.');
      setIsEmailAvailable(false);
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('이메일 주소 형식이 올바르지 않습니다.');
      setIsEmailAvailable(false);
      return false;
    } else {
      setEmailError('사용 가능한 이메일입니다.');
      setIsEmailCheck(true);
      setIsEmailAvailable(true);
      return true;
    }
  }

  const passwordCheckHandler = (password, confirm) => {
    const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
    if (password === '') {
      setPasswordError('비밀번호를 입력해주세요.');
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
      return false;
    } else if (confirm && confirm !== password) {
      setPasswordError('');
      setConfirmError('비밀번호가 일치하지 않습니다.');
      return false;
    } else {
      setPasswordError('');
      setConfirmError('');
      return true;
    }
  }

  const signupHandler = async (e) => {
    e.preventDefault();

    const emailCheckresult = await emailCheckHandler(email);
    if (emailCheckresult) setEmailError('');
    else return;

    if (!isEmailCheck || !isEmailAvailable) {
      alert('아이디 중복 검사를 해주세요.');
      return;
    }

    const passwordCheckResult = passwordCheckHandler(password, confirm);
    if (passwordCheckResult) {
      setPasswordError('');
      setConfirmError('');
    } else return;

    try {
      const response = await axios.post('/member/signUp', {
        name,
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem('loginEmail', email);
        console.log(response);
        navigate('/');
      } else {
        alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      if (error.response) {
        const { errorCode } = error.response.data;
        if (errorCode === 501) {
          setEmailError('이미 사용중인 이메일입니다.');
        } else {
          alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
        }
        setIsEmailAvailable(false);
        setIsEmailCheck(false);
      } else {
        alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
        console.error(error);
      }
    }
  }

  return (
    <Container>
      <TopContainer>
        <h2>계정 만들기</h2>
        <TextField 
          type="text" 
          icon={CiUser} 
          placeholder="이름" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <TextField 
          type="email" 
          icon={CiMail} 
          placeholder="이메일" 
          value={email} 
          onChange={onChangeHandler} 
          name="email"
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        <TextField 
          type="password" 
          icon={CiLock} 
          placeholder="비밀번호" 
          name="password" 
          value={password} 
          onChange={onChangePasswordHandler} 
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        {isPasswordValid && (
          <>
            <TextField 
              type="password" 
              placeholder="비밀번호 확인" 
              name="confirm" 
              value={confirm} 
              onChange={onChangePasswordHandler} 
            />
            {confirmError && <ErrorMessage>{confirmError}</ErrorMessage>}
          </>
        )}
        <Button type="submit" onClick={signupHandler} disabled={!isEmailAvailable}>가입하기</Button>
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
