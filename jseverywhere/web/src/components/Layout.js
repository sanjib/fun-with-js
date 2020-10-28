import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

const Main = styled.main`
  margin: 20px 20px 10px;
  @media (max-width: 450px) {
    margin: 20px;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Navigation />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
