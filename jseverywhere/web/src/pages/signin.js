import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { IS_LOGGED_IN, SIGNIN_USER } from '../gql/query';

const SignIn = props => {
  useEffect(() => {
    document.title = 'Sign In';
  });

  // Is user already signed in?
  const { data, client } = useQuery(IS_LOGGED_IN);
  if (data.isLoggedIn) {
    return (
      <div>
        <h1>Sign In</h1>
        <p>You are already signed in.</p>
      </div>
    );
  }

  // State management
  const [values, setValues] = useState();
  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  // On sign in
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: { isLoggedIn: true }
      });
      props.history.push('/');
    }
  });

  return (
    <div>
      <h1>Sign In</h1>
      <form
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 3fr',
          maxWidth: '800px'
        }}
        onSubmit={event => {
          event.preventDefault();
          signIn({ variables: { ...values } });
        }}
      >
        <label htmlFor='email'>Email:</label>
        <input
          required
          type='email'
          id='email'
          name='email'
          placeholder='email'
          onChange={onChange}
        />
        <div></div>
        <label htmlFor='password'>Password:</label>
        <input
          required
          type='password'
          id='password'
          name='password'
          placeholder='password'
          onChange={onChange}
        />
        <div></div>
        <div></div>
        <button type='submit' style={{ width: '80px' }}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
