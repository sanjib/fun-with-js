import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';

const StyledNote = styled.article`
  max-width: 800px;
  background: #eee;
  padding: 20px;
  margin-bottom: 20px;
`;
const MetaData = styled.div`
  display: flex;
  align-items: center;
`;
const MetaDataImage = styled.div`
  margin-right: 10px;
`;
const MetaDataText = styled.div``;

const Note = ({ note }) => {
  return (
    <StyledNote>
      <MetaData>
        <MetaDataImage>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />
        </MetaDataImage>
        <MetaDataText>
          <div>
            {note.author.username} wrote on{' '}
            {format(parseISO(note.createdAt), 'MMM dd, yyyy')}
          </div>
          <div>Favorites: {note.favoriteCount}</div>
        </MetaDataText>
      </MetaData>

      <ReactMarkdown source={note.content} />
    </StyledNote>
  );
};

export default Note;
