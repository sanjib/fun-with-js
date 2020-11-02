import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_NOTE, GET_MY_NOTES, GET_NOTES, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';
import Loading from '../components/Loading';
import Error from '../components/Error';
import NoteForm from '../components/NoteForm';

const EditNote = props => {
  useEffect(() => {
    document.title = 'Edit Note';
  });

  // Query
  const id = props.match.params.id;
  const { data, loading, error } = useQuery(GET_NOTE, { variables: { id } });
  const {
    data: userdata,
    loading: loadingUserData,
    error: errorUserData
  } = useQuery(GET_ME);

  // Mutation
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });

  // Guards
  if (loading || loadingUserData) return <Loading />;
  if (error) return <Error error={error} />;
  if (errorUserData) return <Error error={errorUserData} />;

  if (userdata.me.id !== data.note.author.id) {
    return (
      <div>
        <h1>Edit Note</h1>
        <p>Sorry, you can't edit this note as it's not yours.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Note</h1>
      <NoteForm id={id} content={data.note.content} data={editNote} />
    </div>
  );
};

export default EditNote;
