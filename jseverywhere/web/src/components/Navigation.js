import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';

const Nav = styled.nav`
  padding: 10px 20px;
  background: #eee;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const Item = styled.li`
  line-height: 1.6;
`;

const Home = () => {
  return (
    <Item>
      <span
        area-hidden='true'
        role='img'
        style={{ width: '22px', display: 'inline-block' }}
      >
        🏠
      </span>
      &nbsp;<Link to='/'>Home</Link>
    </Item>
  );
};
const NewNote = () => {
  return (
    <Item>
      <span
        area-hidden='true'
        role='img'
        style={{ width: '22px', display: 'inline-block' }}
      >
        ➕
      </span>
      &nbsp;<Link to='/note/new'>New Note</Link>
    </Item>
  );
};
const MyNotes = () => {
  return (
    <Item>
      <span
        area-hidden='true'
        role='img'
        style={{ width: '22px', display: 'inline-block' }}
      >
        📓
      </span>
      &nbsp;<Link to='/my'>My Notes</Link>
    </Item>
  );
};
const MyFavs = () => {
  return (
    <Item>
      <span
        area-hidden='true'
        role='img'
        style={{ width: '22px', display: 'inline-block' }}
      >
        🌟
      </span>
      &nbsp;<Link to='/favs'>My Favorites</Link>
    </Item>
  );
};
const SignUp = () => {
  return (
    <Item>
      <span
        area-hidden='true'
        role='img'
        style={{ width: '22px', display: 'inline-block' }}
      >
        🌞
      </span>
      &nbsp;<Link to='/signup'>Sign Up</Link>
    </Item>
  );
};
const SignIn = () => {
  return (
    <Item>
      <span
        area-hidden='true'
        role='img'
        style={{ width: '22px', display: 'inline-block' }}
      >
        🔑
      </span>
      &nbsp;<Link to='/signin'>Sign In</Link>
    </Item>
  );
};
const Logout = ({ client, history }) => {
  // console.log('-->', client, history);
  // return <div>x</div>;
  return (
    <Item>
      <button
        type='button'
        onClick={() => {
          localStorage.removeItem('token');
          client.writeQuery({
            query: IS_LOGGED_IN,
            data: { isLoggedIn: false }
          });
          history.push('/');
        }}
      >
        Logout
      </button>
    </Item>
  );
};

const Navigation = props => {
  // console.log('--> props', props);

  const { data, client } = useQuery(IS_LOGGED_IN);
  // console.log('--> is logged in:', data);

  return (
    <Nav>
      <List>
        {data.isLoggedIn ? (
          <>
            <Item>Hello registered user!</Item>
            <Home />
            <NewNote />
            <MyNotes />
            <MyFavs />
            <Logout client={client} history={props.history} />
          </>
        ) : (
          <>
            <Item>Hello guest!</Item>
            <Home />
            <SignUp />
            <SignIn />
          </>
        )}
      </List>
    </Nav>
  );
};

export default withRouter(Navigation);
