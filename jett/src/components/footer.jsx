import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 5rem;
    background-color: rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    transform: translateY(0%);
`;

const Footer = () => {
  return (
    <Wrapper />
  )
}

export default Footer;