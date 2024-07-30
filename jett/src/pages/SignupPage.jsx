import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../components/signup/RegisterForm';

const Container = styled.body`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;

    /* 모바일 세로 (해상도 ~ 479px) */ 
    @media screen and (max-width: 750px) {
        flex-direction: column;
    }
`;

const LeftContainer = styled.section`
    flex: 0.65;
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
    background-color: rgba(0, 0, 0, 0.03);
    
    @media screen and (max-width: 750px) {
        flex: none;
        width: 100%;
        height: 100%;
    }
`;

const SignupPage = () => {
    return (
        <>
            <Container>
                <LeftContainer>
                    <Title>Jett 하나로 여행하세요.</Title>
                </LeftContainer>

                <RightContainer>
                    <RegisterForm />
                </RightContainer>
            </Container>
        </>
    );
}

export default SignupPage;
