import React from 'react';
import styled, { keyframes } from 'styled-components';
import Register from '../components/auth/Register';

const blink = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;

    /* 노트북 & 테블릿 가로 (해상도 1024px ~ 1279px) */ 
    @media screen and (min-width: 1024px) and (max-width: 1279px) { 
        // 스타일 입력
    } 

    /* 테블릿 가로 (해상도 768px ~ 1023px) */ 
    @media screen and (min-width: 768px) and (max-width: 1023px) { 
        // 스타일 입력
    } 

    /* 모바일 가로 & 테블릿 세로 (해상도 480px ~ 767px) */ 
    @media screen and (min-width: 480px) and (max-width: 767px) {
        flex-direction: column;
    } 

    /* 모바일 세로 (해상도 ~ 479px) */ 
    @media all and (max-width: 479px) {
        flex-direction: column;
    }
`;

const LeftContainer = styled.section`
    flex: 0.5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 750px) {
        display: none;
    }
`;

const Title = styled.div`
    display: flex;
    font-size: 2.5rem;
    font-weight: 900;
    font-style: italic;
    color: coral;
    @media screen and (max-width: 750px) {
        display: none;
    }
`;

const RightContainer = styled.section`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 750px) {
        flex: none;
        width: 100%;
        height: 100%;
    }
`;

const RegisterPage = () => {
    return (
        <Container>
            <LeftContainer>
                <Title>Jett <br /> 하나로 여행하세요.</Title>
            </LeftContainer>

            <RightContainer>
                <Register />
            </RightContainer>
        </Container>
    );
}

export default RegisterPage;
