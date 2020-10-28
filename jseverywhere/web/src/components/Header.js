import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';

const HeaderTag = styled.header`
  display: flex;
  margin: 20px;
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
      <Logo>
        <img src={logo} alt="Notes Logo" height="40" />
      </Logo>
      <AppName>Oak Notes</AppName>
    </HeaderTag>
  );
};

export default Header;
