import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

import NoteFeed from '../components/NoteFeed';

const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { notes, hasNextPage, cursor } = data.noteFeed;

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
    <div style={{ marginBottom: '20px' }}>
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
                      ...fetchMoreResult.noteFeed.notes,
                    ],
                    __typename: 'noteFeed',
                  },
                };
              },
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
