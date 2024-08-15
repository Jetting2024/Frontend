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
    background-color: ${({ color, disabled }) => 
        disabled ? 'rgba(0, 0, 0, 0.4)' : (color || 'rgba(153, 175, 255, 0.8)')};
    border: none;
    outline: none;
    font-size: 1rem;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

    &:hover {
        opacity: ${({ disabled }) => (disabled ? 0.5 : 0.8)};
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
`;

const Button = ({ children, icon: Icon, size: iconSize, color, onClick, disabled }) => {
    return (
        <Container color={color} onClick={onClick} disabled={disabled}>
            {Icon && (
                <IconWrapper>
                    <Icon size={iconSize} />
                </IconWrapper>
            )}
            {children}
        </Container>
    );
};

export default Button;
