import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  margin: 10px 20px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const Item = styled.li`
  line-height: 1.5;
`;

const Navigation = () => {
  return (
    <Nav>
      <List>
        <Item>
          <span area-hidden="true" role="img">
            🏠
          </span>
          &nbsp;<Link to="/">Home</Link>
        </Item>
        <Item>
          <span area-hidden="true" role="img">
            📓
          </span>
          &nbsp;<Link to="/my">My Notes</Link>
        </Item>
        <Item>
          <span area-hidden="true" role="img">
            🌟
          </span>
          &nbsp;<Link to="/favs">My Favorites</Link>
        </Item>
      </List>
    </Nav>
  );
};

export default Navigation;
