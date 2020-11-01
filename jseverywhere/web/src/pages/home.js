import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { GET_NOTES } from '../gql/query';
import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';

const Home = () => {
  useEffect(() => {
    document.title = 'Oak Notes - Home';
  });
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) return <Loading />;
  if (error) return <p>Error!</p>;

  const { notes, hasNextPage, cursor } = data.noteFeed;

  // TODO: upgrade updateQuery
  /*
  The updateQuery callback for fetchMore is deprecated, and will be removed
  in the next major version of Apollo Client.

  Please convert updateQuery functions to field policies with appropriate
  read and merge functions, or use/adapt a helper function (such as
  concatPagination, offsetLimitPagination, or relayStylePagination) from
  @apollo/client/utilities.

  The field policy system handles pagination more effectively than a
  hand-written updateQuery function, and you only need to define the policy
  once, rather than every time you call fetchMore.
  */

  return (
    <div>
      <h1>Welcome to Oak Notes!</h1>
      <NoteFeed notes={notes} />
      {hasNextPage && (
        <button
          onClick={() =>
            fetchMore({
              variables: { cursor },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: 'noteFeed'
                  }
                };
              }
            })
          }
        >
          Load more...
        </button>
      )}
    </div>
  );
};

export default Home;
