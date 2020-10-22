const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Data
let notes = [
  {
    id: '1',
    content: 'Be yourself; everyone else is already taken.',
    author: 'Oscar Wilde'
  },
  {
    id: '2',
    content:
      "You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth.",
    author: 'William W. Purkey'
  },
  {
    id: '3',
    content:
      "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    author: 'Dr. Seuss'
  },
  {
    id: '4',
    content: "If you tell the truth, you don't have to remember anything.",
    author: 'Mark Twain'
  },
  {
    id: '5',
    content:
      "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    author: 'Maya Angelou'
  },
  {
    id: '6',
    content:
      'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
    author: 'Ralph Waldo Emerson'
  },
  {
    id: '7',
    content: 'Any man whose errors take ten years to correct is quite a man.',
    author: 'J. Robert Oppenheimer'
  }
];

// Express
const port = process.env.PORT || 4010;
const app = express();
app.get('/', (req, res) => res.send('Hello, World from Oak Notes API!!!'));

// GraphQL
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Mutation {
    newNote(content: String!, author: String!): Note!
  }
`;
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: () => notes,
    note: (parent, args) => notes.find(note => note.id === args.id)
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: args.author
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () => {
  console.log(`Listening on port ${port}...`);
  console.log(`Server running at http://localhost:${port}`);
  console.log(
    `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  );
});
