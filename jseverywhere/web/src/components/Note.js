import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';
import { IS_LOGGED_IN, GET_ME, GET_MY_FAVORITES } from '../gql/query';
import { TOGGLE_FAVORITE } from '../gql/mutation';
import NoteUser from './NoteUser';
import Loading from './Loading';
import Error from './Error';

const StyledNote = styled.article`
  max-width: 800px;
  background: #eee;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 3px;
`;
const MetaData = styled.div`
  display: flex;
  align-items: center;
`;
const MetaDataImage = styled.div`
  margin-right: 10px;
`;
const MetaDataText = styled.div``;
const UserActionsEditDelete = styled.div`
  text-align: right;
`;
const UserActionsLikeUnlike = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const Note = ({ note }) => {
  // Query
  const { data: isLoggedIndata, loading, error } = useQuery(IS_LOGGED_IN);
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  const isUserLoggedIn = isLoggedIndata.isLoggedIn;

  let canShowEditDeleteLink = false;
  let didILikeThis = false;
  if (isUserLoggedIn) {
    const {
      data: meData,
      loading: loadingUserData,
      error: errorUserData
    } = useQuery(GET_ME);
    if (loadingUserData) return <Loading />;
    if (errorUserData) return <Error error={errorUserData} />;
    if (meData.me.id === note.author.id) {
      canShowEditDeleteLink = true;
    }
    didILikeThis =
      meData.me.favorites.filter(userNote => userNote.id === note.id).length >
      0;
  }

  // State
  const [favoriteCount, setFavoriteCount] = useState(note.favoriteCount);
  const [favorited, setFavorited] = useState(didILikeThis);
  // console.log('favoriteCount', favoriteCount);
  // console.log('favorited', favorited);

  // Mutation
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: note.id
    },
    refetchQueries: [{ query: GET_MY_FAVORITES }]
  });

  // Like / Unlike
  const UnLike = ({ favorited, favoriteCount }) => {
    return (
      <>
        <div>You liked this:</div>
        <div style={{ fontSize: '30px' }}>
          <a
            href='#'
            onClick={() => handleUnlike(favorited, favoriteCount)}
            style={{ color: 'red', textDecoration: 'none', padding: '0 5px' }}
          >
            ♥
          </a>
        </div>
      </>
    );
  };

  const Like = ({ favorited, favoriteCount }) => {
    return (
      <>
        <div>Do you like this?</div>
        <div style={{ fontSize: '30px' }}>
          <a
            href='#'
            onClick={() => handleLike(favorited, favoriteCount)}
            style={{ color: '#ccc', textDecoration: 'none', padding: '0 5px' }}
          >
            ♥
          </a>
        </div>
      </>
    );
  };

  const handleLike = (favorited, favoriteCount) => {
    toggleFavorite();
    setFavorited(true);
    setFavoriteCount(favoriteCount + 1);
  };

  const handleUnlike = (favorited, favoriteCount) => {
    toggleFavorite();
    setFavorited(false);
    setFavoriteCount(favoriteCount - 1);
  };

  return (
    <div>
      <h1>Note</h1>
      <StyledNote>
        <MetaData>
          <MetaDataImage>
            <img
              src={note.author.avatar}
              alt={`${note.author.username} avatar`}
              height='50px'
            />
          </MetaDataImage>
          <MetaDataText>
            <div>
              {note.author.username} wrote on{' '}
              {format(parseISO(note.createdAt), 'MMM dd, yyyy')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>Favorites: {favoriteCount}</div>
              {isUserLoggedIn && (
                <UserActionsLikeUnlike>
                  {favorited ? (
                    <UnLike
                      favorited={favorited}
                      favoriteCount={favoriteCount}
                    />
                  ) : (
                    <Like favorited={favorited} favoriteCount={favoriteCount} />
                  )}
                </UserActionsLikeUnlike>
              )}
            </div>
          </MetaDataText>
        </MetaData>
        <ReactMarkdown source={note.content} />
        {canShowEditDeleteLink ? (
          <UserActionsEditDelete>
            <NoteUser note={note} />
          </UserActionsEditDelete>
        ) : (
          ''
        )}
      </StyledNote>
    </div>
  );
};

export default Note;
