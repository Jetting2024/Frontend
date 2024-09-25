import React from 'react';
import RegisterForm from '../components/signup/RegisterForm';

const SignupPage: React.FC = () => {
  return (
    <div className=' w-full h-screen flex flex-row md:flex-col'>
        <section className=' flex-[0.65] flex flex-col justify-center items-center md:flex'>
            <div className=' flex text-[2.5rem] font-bold md:flex'>
                Jetting으로 일정을 만들어보세요!
            </div>
        </section>
        <section className=' flex-1 flex justify-center items-center bg-black bg-opacity-0.03'>
            <RegisterForm />
        </section>
    </div>
  );
};

export default SignupPage;
