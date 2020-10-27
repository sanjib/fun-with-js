const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Get user from token
const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('--> Session invalid!');
    }
  }
};

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
app.use(helmet());
app.use(cors());
db.connect(DB_HOST);
app.get('/', (req, res) => res.send('Oak Notes API'));

// Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: async ({ req }) => {
    const token = req.headers.authorization;
    const user = await getUser(token);
    return { models, user };
  }
});
server.applyMiddleware({ app, path: '/api' }); // Inject Express

app.listen({ port }, () => {
  console.log(`--Listening on port ${port}--`);
  console.log(`Express server running at http://localhost:${port}`);
  console.log(
    `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  );
});
