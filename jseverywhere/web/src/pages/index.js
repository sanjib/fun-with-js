import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';

const Pages = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/my" component={MyNotes} />
      <Route path="/favs" component={Favorites} />
    </Router>
  );
};

export default Pages;
