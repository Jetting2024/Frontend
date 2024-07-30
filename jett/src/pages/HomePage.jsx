import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const FullWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: aqua;
    display: flex;
    flex-direction: column;
`;

const HomePage = () => {
  return (
    <FullWrapper>
        <Navbar />
    </FullWrapper>
  )
}

export default HomePage;