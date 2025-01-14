import React from "react";
import LoginForm from "../components/signin/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <div className=" w-full h-[calc(100vh-56px)] flex justify-center items-center">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
