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

## Heroku Deployment

**CLI Installation Link**

https://devcenter.heroku.com/articles/heroku-cli#download-and-install


**HTTP Git authentication Troubleshooting**
https://devcenter.heroku.com/articles/git#http-git-authentication

Heroku login kept going in a loop. Had to delete entries in ~/_netrc.

**Git & Test**

```console
$ heroku git:remote -a <YOUR_APP_NAME>
$ git add .
$ git commit -am "application ready for production"
$ git push heroku master

$ curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "{ notes { id } }" }' \
  https://YOUR_APP_NAME.herokuapp.com/api
```