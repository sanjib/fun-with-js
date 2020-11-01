import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { IS_LOGGED_IN, SIGNUP_USER } from '../gql/query';

const SignUp = props => {
  // console.log('--> props', props);
  useEffect(() => {
    document.title = 'Sign Up';
  });

  // Is user already signed in?
  const { data, client } = useQuery(IS_LOGGED_IN);
  if (data.isLoggedIn) {
    return (
      <div>
        <h1>Sign Up</h1>
        <p>You are already signed in and don't need to sign up again.</p>
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

  // On signup
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp);
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: { isLoggedIn: true }
      });
      props.history.push('signup/thanks');
    }
  });

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 3fr',
          maxWidth: '800px'
        }}
        onSubmit={event => {
          event.preventDefault();
          signUp({ variables: { ...values } });
        }}
      >
        <label htmlFor='username'>Username:</label>
        <input
          required
          type='text'
          id='username'
          name='username'
          placeholder='username'
          onChange={onChange}
        />
        <div></div>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
