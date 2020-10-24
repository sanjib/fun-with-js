# API

## Birds Eye View of App and Components

- Express
- dotenv
- GraphQL
  - Schema/typeDefs (schema.js)
    - Note
    - Query
    - Mutation
  - Resolvers (resolvers/index.js)
    - Query     -> Mongoose Models (resolvers/query.js)
    - Mutation  -> Mongoose Models (resolvers/mutation.js)
- Mongoose
  - Mongoose Connection (db.js)
    - connect
    - close
  - Mongoose Models (models/index.js)
    - Note (models/note.js)
      - schema
      - model
- Apollo
  - typeDefs (GraphQL)
  - resolvers (GraphQL)
  - models (Mongoose)
