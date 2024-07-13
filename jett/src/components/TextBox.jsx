import { styled } from 'styled-components'
import React from 'react'

const Box = styled.input`
    width: 364px;
    height: 48px;
    padding-left: 16px;
    border-radius: 10px;
    border: 1px solid #ededed;
    font-size: 1rem;
    outline: none;
    ::placeholder {
        font-size: 1rem;
    }
    &:focus {
        border-color: rgba(153, 175, 255, 0.9);
    }
`;

const TextBox = (props) => {
  return (
    <>
        <Box placeholder={props.text}>
        </Box>
    </>
  )
}

export default TextBox