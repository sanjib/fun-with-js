const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');
const port = process.env.PORT || 4010;
const DB_HOST = process.env.DB_HOST;

// GraphQL
const typeDefs = gql`
  type Note {
    id: ID
    content: String
    author: String
  }
  type Query {
    hello: String
    notes: [Note]
    note(id: ID!): Note
  }
  type Mutation {
    newNote(content: String!, author: String!): Note
  }
`;
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: async () => await models.Note.find(),
    note: async (parent, args) => await models.Note.findById(args.id)
  },
  Mutation: {
    newNote: async (parent, args) =>
      await models.Note.create({ content: args.content, author: args.author })
  }
};

// Express, Mongoose
const app = express();
db.connect(DB_HOST);
app.get('/', (req, res) => res.send('Hello, World from Oak Notes API!!!'));

// Apollo
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () => {
  console.log(`Listening on port ${port}...`);
  console.log(`Server running at http://localhost:${port}`);
  console.log(
    `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  );
});
