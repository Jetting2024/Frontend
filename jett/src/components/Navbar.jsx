import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './search/SearchBar';
import { CgProfile } from "react-icons/cg";

const Wrapper = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
`;

const Logo = styled.div`
    width: 9.625rem;
    height: 5rem;
    color: #3d3d3d;
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: -0.072125rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Menu = styled.div`
    display: inline-flex;
    padding: 0.3125rem 1.75rem;
    align-items: center;
    gap: 67px;
    margin-right: 2rem;
`;

const MenuItem = styled(Link)`
    padding: 0.25rem 0.5rem;
    text-decoration: none;
    color: inherit;
    font-size: 1rem;
    &:hover{
        border-bottom: 0.025rem solid #797979;
    }
`;

const Profile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2rem;
`;

const Navbar = () => {
  return (
    <Wrapper>
        <Logo>JETT.</Logo>
        <Menu>
            <MenuItem to="/">홈</MenuItem>
            <MenuItem to="/">인기 여행지</MenuItem>
            <MenuItem to="/">여행 코스</MenuItem>
            <MenuItem to="/">내 일정</MenuItem>
        </Menu>
        <SearchBar/>
        <Profile>
            <CgProfile size={28} color='#797979'/>
        </Profile>
    </Wrapper>
  )
}

export default Navbar;