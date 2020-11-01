import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_NOTE, GET_MY_NOTES, GET_NOTES } from '../gql/query';

const NewNote = props => {
  useEffect(() => {
    document.title = 'New Note';
  });

  // State management
  const [values, setValues] = useState();
  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  // On New Note creation
  const [data, { loading, error }] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: data => {
      props.history.push(`/note/${data.newNote.id}`);
    }
  });

  return (
    <div>
      <h1>New Note</h1>
      <form
        onSubmit={event => {
          event.preventDefault();
          data({ variables: { ...values } });
        }}
      >
        <textarea
          style={{
            display: 'block',
            height: '200px',
            width: '100%',
            maxWidth: '800px'
          }}
          required
          name='content'
          placeholder='New Note'
          onChange={onChange}
        ></textarea>
        <button type='submit'>Create Note</button>
      </form>
    </div>
  );
};

export default NewNote;
