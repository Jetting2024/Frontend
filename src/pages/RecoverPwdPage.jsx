import React from 'react';
import styled from "styled-components";
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
    <Wrapper>
      <RecoverAccount />
    </Wrapper>
  );
};

export default RecoverPwdPage;
