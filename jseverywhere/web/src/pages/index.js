import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
import SignIn from './signin';
import SignUp from './signup';
import SignUpThankYou from './signup_thankyou';

import Layout from '../components/Layout';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading, please wait...</p>;
  if (error) return <p>Error!</p>;
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <PrivateRoute path='/my' component={MyNotes} />
          <PrivateRoute path='/favs' component={Favorites} />
          <Route path='/note/:id' component={NotePage} />
          <Route path='/signup/thanks' component={SignUpThankYou} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Pages;
