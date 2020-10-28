import React, { useEffect } from 'react';

const Favorites = () => {
  useEffect(() => {
    document.title = 'My Favorites';
  });
  return (
    <div>
      <h1>Oak Notes</h1>
      <p>These are my favorites</p>
    </div>
  );
};

export default Favorites;
