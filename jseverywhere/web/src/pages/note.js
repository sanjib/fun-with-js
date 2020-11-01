import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_NOTE } from '../gql/query';
import Note from '../components/Note';
import Loading from '../components/Loading';

const NotePage = props => {
  const id = props.match.params.id;
  const { data, error, loading } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) return <Loading />;
  if (error) return <p>Error! Not Found.</p>;

  return <Note note={data.note} />;
};

export default NotePage;
