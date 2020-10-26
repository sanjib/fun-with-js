# API

## Birds Eye View of App and Components

- Express
- dotenv
- GraphQL
  - Schema/typeDefs (schema.js)
    - Note
    - User
    - Query
    - Mutation
  - Resolvers (resolvers/index.js)
    - Query (resolvers/query.js)        -> connects to -> Models 
    - Mutation (resolvers/mutation.js)  -> connects to -> Models
    - DateTime
- Mongoose
  - Mongoose Connection (db.js)
    - connect
    - close
  - Mongoose Models (models/index.js)
    - Note (models/note.js)
      - schema
      - model
    - User (models/user.js)
      - schema
      - model
- Apollo
  - typeDefs (GraphQL)
  - resolvers (GraphQL)
  - context
    - models (Mongoose)
    - user (via JWT)

## Adding New Feature Pattern

1. GraphQL schema (schema.js)
2. Database model (models/*)
3. Resolver functions (resolvers/*)

