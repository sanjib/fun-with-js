import React from 'react';
import logo from '../img/logo.svg';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Notes Logo" height="40" />
      <h1>Oak Notes</h1>
    </header>
  );
};

export default Header;
