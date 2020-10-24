const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

// Local imports
const db = require('./db'); // Mongoose connection
const models = require('./models'); // Mongoose models
const typeDefs = require('./schema'); // GraphQL schema/typeDefs
const resolvers = require('./resolvers'); // GraphQL resolvers

// .env vars
const port = process.env.PORT || 4010;
const DB_HOST = process.env.DB_HOST;

// Express, Mongoose
const app = express();
db.connect(DB_HOST);
app.get('/', (req, res) => res.send('Oak Notes API'));

// Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ models })
});
server.applyMiddleware({ app, path: '/api' }); // Inject Express

app.listen({ port }, () => {
  console.log(`--Listening on port ${port}--`);
  console.log(`Express server running at http://localhost:${port}`);
  console.log(
    `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  );
});
