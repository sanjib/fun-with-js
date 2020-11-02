import React from 'react';
import { useQuery } from '@apollo/client';
import { Link, Redirect, withRouter } from 'react-router-dom';

const deleteNoteConfirm = (id, history) => {
  const confirmDelete = confirm('Are you sure you want to delete this note?');
  if (confirmDelete) {
    history.push(`/note/delete/${id}`);
  }
};

const NoteUser = props => {
  return (
    <>
      <Link to={`/note/edit/${props.note.id}`}>Edit</Link>{' '}
      <a
        href='#'
        onClick={() => deleteNoteConfirm(props.note.id, props.history)}
        style={{ color: 'red' }}
      >
        Delete
      </a>
    </>
  );
};

export default withRouter(NoteUser);
