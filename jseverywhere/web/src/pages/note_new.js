import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_NOTE } from '../gql/query';

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

  // On signup
  const [data, { loading, error }] = useMutation(CREATE_NOTE, {
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
