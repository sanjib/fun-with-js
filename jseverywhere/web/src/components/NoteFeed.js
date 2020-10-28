import React from 'react';
import Note from './Note';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const NoteFeed = ({ notes }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {notes.map((note) => (
        <div key={note.id} style={{ margin: '6px 0' }}>
          <Link to={`/note/${note.id}`}>
            {note.id} by {note.author.username} on{' '}
            {format(parseISO(note.createdAt), 'MMM dd, yyyy')}
            {/* <Note note={note} /> */}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NoteFeed;
