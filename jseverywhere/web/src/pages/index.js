import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';
import Home from './home';
import MyNotes from './note_my';
import Favorites from './favorites';
import NotePage from './note';
import NewNote from './note_new';
import EditNote from './note_edit';
import DeleteNote from './note_delete';
import SignIn from './signin';
import SignUp from './signup';
import SignUpThankYou from './signup_thankyou';
import Layout from '../components/Layout';
import Loading from '../components/Loading';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <Loading />;
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
          <PrivateRoute path='/note/new' component={NewNote} />
          <PrivateRoute path='/note/edit/:id' component={EditNote} />
          <PrivateRoute path='/note/delete/:id' component={DeleteNote} />
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
