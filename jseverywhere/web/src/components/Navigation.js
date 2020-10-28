import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <span area-hidden="true" role="img">
            🏠
          </span>
          <Link to="/">Home</Link>
        </li>
        <li>
          <span area-hidden="true" role="img">
            📓
          </span>
          <Link to="/my">My Notes</Link>
        </li>
        <li>
          <span area-hidden="true" role="img">
            🌟
          </span>
          <Link to="/favs">My Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
