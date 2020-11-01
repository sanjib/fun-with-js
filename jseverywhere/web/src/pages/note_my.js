import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_NOTES } from '../gql/query';
import Loading from '../components/Loading';
import Error from '../components/Error';
import NoteFeed from '../components/NoteFeed';

const MyNotes = () => {
  useEffect(() => {
    document.title = 'My Notes';
  });

  // Query
  const { data, loading, error } = useQuery(GET_MY_NOTES);
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  if (data.me.notes.length === 0)
    return (
      <div>
        <h1>My Notes</h1>
        <p>Sorry, no notes written yet.</p>
      </div>
    );

  return (
    <div>
      <h1>My Notes</h1>
      <NoteFeed notes={data.me.notes} />
    </div>
  );
};

export default MyNotes;
