import { styled } from 'styled-components';
import React from 'react';

const Wrapper = styled.div`
    width: 364px;
    height: 48px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #c7c7c7;
    padding-left: 16px;
    font-size: 1rem;
    outline: none;

    &:focus-within {
        border-color: rgba(153, 175, 255, 0.9);
    }
    
    &:hover {
        border-color: rgba(153, 175, 255, 0.9);
    }
`;

const Field = styled.input`
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    background-color: transparent;

    ::placeholder {
        font-size: 1rem;
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
`;

const TextField = ({ type, icon: Icon, placeholder, value, onChange, name }) => {
    return (
        <Wrapper>
            {Icon && (
                <IconWrapper>
                    <Icon size={20} />
                </IconWrapper>
            )}
            <Field
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
            />
        </Wrapper>
    );
}

export default TextField;
