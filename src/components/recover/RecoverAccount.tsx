import React, { useState } from "react";
import { CiLock, CiMail, CiWarning } from "react-icons/ci";
import TextField from "../TextField";
import Button from "../Button";
import { Link } from "react-router-dom";

const RecoverAccount: React.FC = () => {
  const [sendCode, setSendCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [passwordMeetsRequirements, setPasswordMeetsRequirements] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleSendCodeClick = () => {
    setSendCode(true);
    console.log("sendCode: ", sendCode);
  };

  const handleVerifyCodeClick = () => {
    // Code verification logic here
    console.log("Verification code:", verificationCode);
  };

  const onChangeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    emailCheckHandler(emailValue);
  };

  const onChangePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setNewPassword(value);
      const meetsRequirements = passwordCheckHandler(value);
      setPasswordMeetsRequirements(meetsRequirements);
    } else if (name === 'confirm') {
      setConfirm(value);
      confirmPasswordHandler(value);
    }
  };

  const emailCheckHandler = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === '') {
      setEmailError('이메일을 입력해주세요.');
      setIsEmailValid(false);
    } else if (!emailRegex.test(email)) {
      setEmailError('이메일 주소 형식이 올바르지 않습니다.');
      setIsEmailValid(false);
    } else {
      setEmailError('');
      setIsEmailValid(true);
    }
  };

  const passwordCheckHandler = (password: string) => {
    const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
    if (password === '') {
      setPasswordError('비밀번호를 입력해주세요.');
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const confirmPasswordHandler = (confirm: string) => {
    if (confirm !== newPassword) {
      setConfirmError('비밀번호가 일치하지 않습니다.');
      return false;
    } else {
      setConfirmError('');
      return true;
    }
  };

  return (
    <section className="w-[500px] h-[360px] flex flex-col justify-between items-center">
      <h2>비밀번호를 잃어버리셨나요?</h2>
      {!sendCode ? (
        <div className="flex flex-col w-[380px] justify-center items-center gap-5">
          <TextField
            type="email"
            icon={CiMail}
            placeholder="이메일"
            value={email}
            onChange={onChangeEmailHandler}
          />
          {emailError && <div className="text-red-500 text-sm self-start">{emailError}</div>}
          <Button onClick={handleSendCodeClick} disabled={!isEmailValid}>
            인증메일 발송
          </Button>
        </div>
      ) : (
        <div className="flex flex-col w-[380px] justify-center items-center gap-5">
          <TextField
            type="text"
            icon={CiWarning}
            placeholder="인증 코드"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <TextField
            type="password"
            icon={CiLock}
            placeholder="새 비밀번호"
            name="password"
            value={newPassword}
            onChange={onChangePasswordHandler}
          />
          {passwordError && <div className="text-red-500 text-sm self-start">{passwordError}</div>}
          {passwordMeetsRequirements && (
            <>
              <TextField
                type="password"
                icon={CiLock}
                placeholder="비밀번호 확인"
                name="confirm"
                value={confirm}
                onChange={onChangePasswordHandler}
              />
              {confirmError && <div className="text-red-500 text-sm self-start">{confirmError}</div>}
            </>
          )}
          <Button
            onClick={handleVerifyCodeClick}
            disabled={!verificationCode || !passwordMeetsRequirements || !confirm || !newPassword}
          >
            비밀번호 재설정
          </Button>
        </div>
      )}
      <div className="mt-8 text-sm text-gray-500">
        <Link to="/signin" className="text-blue-500 hover:underline">로그인 페이지로 가기</Link>
      </div>
    </section>
  );
};

export default RecoverAccount;
