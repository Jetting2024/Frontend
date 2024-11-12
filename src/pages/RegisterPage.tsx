import React from 'react'
import RegisterForm from '../components/signup/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className='w-full h-[calc(100vh-56px)] flex justify-center items-center'>
        <RegisterForm />
    </div>
  )
}

export default RegisterPage;