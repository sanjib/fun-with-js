import React, { useEffect } from 'react';

const MyNotes = () => {
  useEffect(() => {
    document.title = 'My Notes';
  });
  return (
    <div>
      <h1>Oak Notes</h1>
      <p>These are my notes</p>
    </div>
  );
};

export default MyNotes;
