import React from 'react';
import LoginForm from '../components/signin/LoginForm';

const SigninPage: React.FC = () => {
  return (
    <div className=' flex justify-center items-center h-screen bg-black bg-opacity-0.3'>
        <LoginForm />
    </div>
  );
};

export default SigninPage;
