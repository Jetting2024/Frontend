import React from 'react';
import LoginForm from '../components/signin/LoginForm';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.03);
`;

const SigninPage: React.FC = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default SigninPage;
