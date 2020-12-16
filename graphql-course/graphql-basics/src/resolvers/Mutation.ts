import { v4 as uuid4 } from 'uuid'

import { User } from './User'
import { Post } from './Post'
import { Comment } from './Comment'

export const Mutation = {
  createUser: (
    _parent: object,
    {
      data: { name, email, age },
    }: { data: { name: string; email: string; age: number } },
    { db: { users } }: { db: { users: User[] } },
    _info: object
  ): User => {
    const emailTaken = users.some((user: User): boolean => user.email === email)
    if (emailTaken) throw new Error("Email is already taken, can't create user")

    const user = {
      id: uuid4(),
      name,
      email,
      age,
    }
    users.push(user)
    return user
  },
  deleteUser: (
    _parent: object,
    { id }: { id: string },
    {
      db: { users, posts, comments },
    }: {
      db: {
        users: User[]
        posts: Post[]
        comments: Comment[]
      }
    },
    _info: object
  ) => {
    const userIndex: number = users.findIndex(
      (user: User): boolean => user.id === id
    )
    if (userIndex === -1) throw new Error('User ID not found')
    // 1. Delete proposed user
    const [deletedUser] = users.splice(userIndex, 1)

    posts = posts.filter((post: Post): boolean => {
      // 2. Delete all comments (whether by proposed user or not) for the matching post
      const matchedPosts = post.author === id
      if (matchedPosts) {
        comments = comments.filter(
          (comment: Comment): boolean => comment.post !== post.id
        )
      }
      // 3. Return not matched posts to keep them
      return !matchedPosts
    })
    // 4. Delete all comments by proposed user
    comments = comments.filter(
      (comment: Comment): boolean => comment.author !== id
    )

    return deletedUser
  },
  updateUser: (
    _parent: object,
    {
      id,
      data: { name, email, age },
    }: { id: string; data: { name: string; email: string; age: number } },
    { db: { users } }: { db: { users: User[] } },
    _info: object
  ): User => {
    // 1. User exists?
    const user = users.find((user: User): boolean => user.id === id)
    if (!user) throw new Error('User not found')

    // 2. Validate & Update
    // emmail
    if (typeof email === 'string') {
      const emailTaken = users.some(
        (user: User): boolean => user.email === email
      )
      if (emailTaken) throw new Error('Email already is in use')
      user.email = email
    }
    // name
    if (typeof name === 'string') user.name = name
    // age
    if (typeof age !== 'undefined') user.age = age

    return user
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
    {
      db: { users, posts },
    }: {
      db: {
        users: User[]
        posts: Post[]
      }
    },
    _info: object
  ): Post => {
    const userExists = users.some((user: User): boolean => user.id === author)
    if (!userExists)
      throw new Error("Invalid author (user ID), can't create post")

    const post: Post = {
      id: uuid4(),
      title,
      body,
      published,
      author,
    }
    posts.push(post)
    return post
  },
  deletePost: (
    _parent: object,
    { id }: { id: string },
    {
      db: { posts, comments },
    }: {
      db: {
        posts: Post[]
        comments: Comment[]
      }
    },
    _info: object
  ) => {
    const postIndex: number = posts.findIndex(
      (post: Post): boolean => post.id === id
    )
    if (postIndex === -1) throw new Error('Post ID not found')
    // 1. Delete proposed post
    const [deletedPost] = posts.splice(postIndex, 1)

    // 2. Delete all comments for proposed post
    comments = comments.filter(
      (comment: Comment): boolean => comment.post !== id
    )
    return deletedPost
  },
  updatePost: (
    _parent: object,
    {
      id,
      data: { title, body, published },
    }: {
      id: string
      data: { title: string; body: string; published: boolean }
    },
    { db: { posts } }: { db: { posts: Post[] } },
    _info: object
  ) => {
    // 1. Get post
    const post = posts.find((post: Post): boolean => post.id === id)
    if (!post) throw new Error('Cannot find post')

    // 2. Validate and Update
    if (typeof title === 'string') post.title = title
    if (typeof body === 'string') post.body = body
    if (typeof published === 'boolean') post.published = published
    return post
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
    {
      db: { users, posts, comments },
    }: {
      db: {
        users: User[]
        posts: Post[]
        comments: Comment[]
      }
    },
    _info: object
  ): Comment => {
    const userExists = users.some((user: User): boolean => user.id === author)
    if (!userExists)
      throw new Error("Invalid author (user ID), can't create comment")
    const postExists = posts.some(
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
    comments.push(comment)
    return comment
  },
  deleteComment: (
    _parent: object,
    { id }: { id: string },
    { db: { comments } }: { db: { comments: Comment[] } },
    _info: object
  ) => {
    const commentIndex: number = comments.findIndex(
      (comment: Comment): boolean => comment.id === id
    )
    if (commentIndex === -1) throw new Error('Comment ID not found')
    // 1. Delete proposed comment
    const [deletedComment] = comments.splice(commentIndex, 1)
    return deletedComment
  },
  updateComment: (
    _parent: object,
    {
      id,
      data: { text },
    }: {
      id: string
      data: { text: string }
    },
    { db: { comments } }: { db: { comments: Comment[] } },
    _info: object
  ): Comment => {
    // 1. Find comment
    const comment = comments.find(
      (comment: Comment): boolean => comment.id === id
    )
    if (!comment) throw new Error('Cannot find comment to update')

    // 2. Validate & Update
    if (typeof text === 'string') comment.text = text

    return comment
  },
}
