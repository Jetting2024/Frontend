import React from "react";
import LoginForm from "../components/signup/RegisterForm";
import RegisterForm from "../components/signup/RegisterForm";

const SignupPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <RegisterForm />
      <h1 className="text-xl font-extrabold">친구들과 여행 일정을 한 번에!</h1>
      <h2 className="text-xl font-extrabold">JETTING</h2>
      <div>그림</div>
      <div>카카오로 쉬운 시작</div>
      <div></div>
    </div>
  );
};

export default SignupPage;
