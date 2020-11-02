import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_NOTE, GET_MY_NOTES, GET_NOTES, GET_ME } from '../gql/query';
import { DELETE_NOTE } from '../gql/mutation';
import Loading from '../components/Loading';
import Error from '../components/Error';
import NoteForm from '../components/NoteForm';

const EditNote = props => {
  useEffect(() => {
    document.title = 'Delete Note';
  });

  // Query
  const id = props.match.params.id;
  const { data, loading, error } = useQuery(GET_NOTE, { variables: { id } });
  const {
    data: userdata,
    loading: loadingUserData,
    error: errorUserData
  } = useQuery(GET_ME);

  // Guards
  if (loading || loadingUserData) return <Loading />;
  if (error) return <Error error={error} />;
  if (errorUserData) return <Error error={errorUserData} />;

  if (userdata.me.id !== data.note.author.id) {
    return (
      <div>
        <h1>Delete Note</h1>
        <p>Sorry, you can't delete this note as it's not yours.</p>
      </div>
    );
  }

  // Mutation
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id
    },
    refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
    onCompleted: data => {
      props.history.push('/my');
    }
  });
  deleteNote();

  return <></>;
};

export default EditNote;
