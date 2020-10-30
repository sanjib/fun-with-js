import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

const Main = styled.main``;

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
