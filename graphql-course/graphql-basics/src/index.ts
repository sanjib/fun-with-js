import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuid4 } from 'uuid'

let demoUserData: User[] = [
  { id: 'uuu1', name: 'Sanjib', email: 'sanjib@sanjib.org', age: 45 },
  { id: 'uuu2', name: 'Notch', email: 'no@mojang.com', age: 32 },
  { id: 'uuu3', name: 'Gray', email: 'gray@grays', age: 3000 },
]
let demoPostsData: Post[] = [
  {
    id: 'aaa1',
    title: 'GraphQL 101',
    body: 'How to use GraphQL',
    published: true,
    author: 'uuu1',
  },
  {
    id: 'aaa2',
    title: 'GraphQL 201',
    body: 'Advanced GraphQL',
    published: false,
    author: 'uuu1',
  },
  {
    id: 'aaa3',
    title: 'Programming Music',
    body: 'b3',
    published: true,
    author: 'uuu2',
  },
  {
    id: 'aaa4',
    title: 'Asterix Books I Read Last Week',
    body: 'Lisft of Asterix books',
    published: true,
    author: 'uuu2',
  },
]
let demoCommentsData: Comment[] = [
  { id: 'comm-asdf-1', text: 'Asterix in Spain', author: 'uuu3', post: 'aaa4' },
  {
    id: 'comm-asdf-2',
    text: 'Asterix in Switzerland',
    author: 'uuu1',
    post: 'aaa4',
  },
  {
    id: 'comm-asdf-3',
    text: 'Asterix in Britain',
    author: 'uuu2',
    post: 'aaa4',
  },
  {
    id: 'comm-asdf-4',
    text: 'Asterix and the Goths',
    author: 'uuu1',
    post: 'aaa4',
  },
]

interface User {
  id: string
  name: string
  email: string
  age: number
}
interface Post {
  id: string
  title: string
  body: string
  published: boolean
  author: string
}
interface Comment {
  id: string
  text: string
  author: string
  post: string
}

const typeDefs = `
  type Query {
    me: User!
    users(query: String): [User!]!
    post: Post!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput): Post!
    deletePost(id: ID!): Post!
    createComment(data: CreateComment): Comment!
    deleteComment(id: ID!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateComment {
    text: String!
    author: ID!
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

const resolvers = {
  Query: {
    me: (): User => ({
      id: 'ABC123',
      name: 'Sanjib',
      email: 'sanjib@sanjib.org',
      age: 45,
    }),
    users: (
      _parent: undefined,
      args: { query: string },
      _context: object,
      _info: object
    ): User[] => {
      if (!args.query) return demoUserData
      return demoUserData.filter((user: User): boolean =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      )
    },
    post: (): Post => ({
      id: 'keiyu-3sv2-as39',
      title: 'Test Post 1 Title',
      body: 'Test Post 1 Body xxx xxx xxx xxx',
      published: true,
      author: 'xxx',
    }),
    posts: (
      _parent: undefined,
      args: { query: string },
      _context: object,
      _info: object
    ): Post[] => {
      if (!args.query) return demoPostsData
      return demoPostsData.filter(
        (post: Post): boolean =>
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
      )
    },
    comments: (): Comment[] => demoCommentsData,
  },
  Mutation: {
    createUser: (
      _parent: object,
      {
        data: { name, email, age },
      }: { data: { name: string; email: string; age: number } },
      _context: object,
      _info: object
    ): User => {
      const emailTaken = demoUserData.some(
        (user: User): boolean => user.email === email
      )
      if (emailTaken)
        throw new Error("Email is already taken, can't create user")

      const user = {
        id: uuid4(),
        name,
        email,
        age,
      }
      demoUserData.push(user)
      return user
    },
    deleteUser: (
      _parent: object,
      { id }: { id: string },
      _context: object,
      _info: object
    ) => {
      const userIndex: number = demoUserData.findIndex(
        (user: User): boolean => user.id === id
      )
      if (userIndex === -1) throw new Error('User ID not found')
      // 1. Delete proposed user
      const [deletedUser] = demoUserData.splice(userIndex, 1)

      demoPostsData = demoPostsData.filter((post: Post): boolean => {
        // 2. Delete all comments (whether by proposed user or not) for the matching post
        const matchedPosts = post.author === id
        if (matchedPosts) {
          demoCommentsData = demoCommentsData.filter(
            (comment: Comment): boolean => comment.post !== post.id
          )
        }
        // 3. Return not matched posts to keep them
        return !matchedPosts
      })
      // 4. Delete all comments by proposed user
      demoCommentsData = demoCommentsData.filter(
        (comment: Comment): boolean => comment.author !== id
      )

      return deletedUser
    },
    createPost: (
      _parent: object,
      {
        data: { title, body, published, author },
      }: {
        data: {
          title: string
          body: string
          published: boolean
          author: string
        }
      },
      _context: object,
      _info: object
    ): Post => {
      const userExists = demoUserData.some(
        (user: User): boolean => user.id === author
      )
      if (!userExists)
        throw new Error("Invalid author (user ID), can't create post")

      const post: Post = {
        id: uuid4(),
        title,
        body,
        published,
        author,
      }
      demoPostsData.push(post)
      return post
    },
    deletePost: (
      _parent: object,
      { id }: { id: string },
      _context: object,
      _info: object
    ) => {
      const postIndex: number = demoPostsData.findIndex(
        (post: Post): boolean => post.id === id
      )
      if (postIndex === -1) throw new Error('Post ID not found')
      // 1. Delete proposed post
      const [deletedPost] = demoPostsData.splice(postIndex, 1)

      // 2. Delete all comments for proposed post
      demoCommentsData = demoCommentsData.filter(
        (comment: Comment): boolean => comment.post !== id
      )
      return deletedPost
    },
    createComment: (
      _parent: object,
      {
        data: { text, author, post },
      }: {
        data: {
          text: string
          author: string
          post: string
        }
      },
      _context: object,
      _info: object
    ): Comment => {
      const userExists = demoUserData.some(
        (user: User): boolean => user.id === author
      )
      if (!userExists)
        throw new Error("Invalid author (user ID), can't create comment")
      const postExists = demoPostsData.some(
        (postRecord: Post): boolean =>
          postRecord.id === post && postRecord.published === true
      )
      if (!postExists)
        throw new Error(
          "Invalid post (post ID) or post not published yet, can't create comment"
        )

      const comment: Comment = {
        id: uuid4(),
        text,
        author,
        post,
      }
      demoCommentsData.push(comment)
      return comment
    },
    deleteComment: (
      _parent: object,
      { id }: { id: string },
      _context: object,
      _info: object
    ) => {
      const commentIndex: number = demoCommentsData.findIndex(
        (comment: Comment): boolean => comment.id === id
      )
      if (commentIndex === -1) throw new Error('Comment ID not found')
      // 1. Delete proposed comment
      const [deletedComment] = demoCommentsData.splice(commentIndex, 1)
      return deletedComment
    },
  },
  Post: {
    author: (
      parent: { author: string },
      _args: object,
      _context: object,
      _info: object
    ) => {
      if (parent.author) {
        return demoUserData.find(
          (user: User): boolean => user.id === parent.author
        )
      }
    },
    comments: (
      parent: { id: string },
      _args: object,
      _context: object,
      _info: object
    ) => {
      if (parent.id) {
        return demoCommentsData.filter(
          (comment: Comment): boolean => comment.post === parent.id
        )
      }
    },
  },
  User: {
    posts: (
      parent: { id: string },
      _args: object,
      _context: object,
      _info: object
    ) => {
      if (parent.id) {
        return demoPostsData.filter(
          (post: Post): boolean => post.author === parent.id
        )
      }
    },
    comments: (
      parent: { id: string },
      _args: object,
      _context: object,
      _info: object
    ) => {
      if (parent.id) {
        return demoCommentsData.filter(
          (comment: Comment): boolean => comment.author === parent.id
        )
      }
    },
  },
  Comment: {
    author: (
      parent: { author: string },
      _args: object,
      _context: object,
      _info: object
    ) => {
      if (parent.author) {
        return demoUserData.find(
          (user: User): boolean => user.id === parent.author
        )
      }
    },
    post: (
      parent: { post: string },
      _args: object,
      _context: object,
      _info: object
    ) => {
      if (parent.post) {
        return demoPostsData.find(
          (post: Post): boolean => post.id === parent.post
        )
      }
    },
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start()
