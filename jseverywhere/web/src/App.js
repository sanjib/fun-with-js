import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';

const client = new ApolloClient({
  uri: process.env.API_URI,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Pages />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
