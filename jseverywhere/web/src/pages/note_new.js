import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';
import { CREATE_NOTE } from '../gql/mutation';
import NoteForm from '../components/NoteForm';

const NewNote = props => {
  useEffect(() => {
    document.title = 'New Note';
  });

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
      <NoteForm data={data} />
    </div>
  );
};

export default NewNote;
