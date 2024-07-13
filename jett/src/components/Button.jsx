import React from "react";
import styled from "styled-components";

const Container = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 380px;
    height: 48px;
    border-radius: 10px;
    background-color: rgba(153, 175, 255, 0.8);
    border: none;
    outline: none;
    font-size: 1rem;

    &:hover {
        background-color: rgba(153, 175, 255, 0.5);
    }
`;

const IconWrapper = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px; /* 아이콘과 텍스트 사이의 간격 조정 */
`;

const Button = ({ children, icon: Icon, size: iconSize }) => {

    return (
        <>
        <Container>
            {Icon && (
                <IconWrapper>
                    <Icon size={iconSize} />
                </IconWrapper>
            )}
            {children}
        </Container>
        </>
    );
};

export default Button;
