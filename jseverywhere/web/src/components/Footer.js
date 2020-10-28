import React from 'react';
import styled from 'styled-components';

const FooterTag = styled.footer`
  margin: 10px 20px;
`;

const Footer = () => {
  const year = new Date().getFullYear().toString();
  return <FooterTag>&copy; {year} Oak Notes</FooterTag>;
};

export default Footer;
