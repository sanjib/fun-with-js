import React from 'react';
import styled from 'styled-components';

const FooterTag = styled.footer`
  background: #ccc;
  padding: 20px 20px 40px 20px;
`;

const Footer = () => {
  const year = new Date().getFullYear().toString();
  return <FooterTag>&copy; {year} Oak Notes</FooterTag>;
};

export default Footer;
