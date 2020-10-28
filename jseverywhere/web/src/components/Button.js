import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  padding: 8px 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  background-color: #0077cc;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    background-color: #005fa3;
  }
`;

export default Button;
