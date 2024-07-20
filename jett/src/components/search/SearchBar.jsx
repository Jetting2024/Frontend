import React from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 1rem 0 0 1rem;
  flex: 1;
`;

const Button = styled.button`
  background-color: #fff;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
  }
`;

const SearchBar = () => {
  return (
    <SearchBarWrapper>
      <Input type="text" placeholder="검색어를 입력하세요..." />
      <Button>
        <IoIosSearch size={16} />
      </Button>
    </SearchBarWrapper>
  );
};

export default SearchBar;
