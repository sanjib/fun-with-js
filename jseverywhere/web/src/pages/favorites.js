import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_FAVORITES } from '../gql/query';
import Loading from '../components/Loading';
import Error from '../components/Error';
import NoteFeed from '../components/NoteFeed';

const MyNotes = () => {
  useEffect(() => {
    document.title = 'Favorites';
  });

  // Query
  const { data, loading, error } = useQuery(GET_MY_FAVORITES);
  let content = '';
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  if (data.me.favorites.length === 0)
    return (
      <div>
        <h1>Favorites</h1>
        <p>Sorry, no favorites yet.</p>
      </div>
    );

  return (
    <div>
      <h1>Favorites</h1>
      <NoteFeed notes={data.me.favorites} />
    </div>
  );
};

export default MyNotes;
