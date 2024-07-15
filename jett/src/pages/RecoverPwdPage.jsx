import React from 'react';
import styled from "styled-components";
import { FaGoogle } from "react-icons/fa6";
import { SiKakao } from "react-icons/si";
import { CiLock, CiUser } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import TextField from '../components/TextField';
import Button from '../components/Button';
import { DivideLine } from '../components/DivideLine';
import RecoverAccount from '../components/recover/RecoverAccount';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.03);
`;

const RecoverPwdPage = () => {
  return (
    <>
        <Wrapper>
            <RecoverAccount />
        </Wrapper>
    </>
  );
};

export default RecoverPwdPage;
