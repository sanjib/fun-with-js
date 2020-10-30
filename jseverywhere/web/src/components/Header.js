import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/logo.svg';

const HeaderTag = styled.header`
  background: #333;
  padding: 20px;
`;
const Logo = styled.div`
  margin-right: 5px;
`;
const AppName = styled.div`
  font-size: 1.8em;
`;

const Header = () => {
  return (
    <HeaderTag>
      <Link
        to='/'
        style={{
          display: 'inline-flex',
          textDecoration: 'none',
          color: '#eee'
        }}
      >
        <Logo>
          <img src={logo} alt='Notes Logo' height='40' />
        </Logo>
        <AppName>Oak Notes</AppName>
      </Link>
    </HeaderTag>
  );
};

export default Header;
