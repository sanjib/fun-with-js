import React, { useState } from 'react';

const NoteForm = ({ data, content, id }) => {
  // State management
  const [values, setValues] = useState({
    content: content || '',
    id: id || null
  });
  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
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
        placeholder='Note content'
        onChange={onChange}
        value={values.content}
      ></textarea>
      <button type='submit'>Save Note</button>
    </form>
  );
};

export default NoteForm;
