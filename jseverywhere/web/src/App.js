import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';
import { IS_LOGGED_IN } from './gql/query';

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem('token') || ''
  }
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

const data = { isLoggedIn: !!localStorage.getItem('token') };
cache.writeQuery({ query: IS_LOGGED_IN, data });
// client.onResetStore(() => cache.writeQuery({ query: IS_LOGGED_IN, data }));

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Pages />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
