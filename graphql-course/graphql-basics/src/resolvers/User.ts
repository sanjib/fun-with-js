import { Post } from './Post'
import { Comment } from './Comment'

export interface User {
  id: string
  name: string
  email: string
  age: number
}

export const User = {
  posts: (
    parent: { id: string },
    _args: object,
    { db: { posts } }: { db: { posts: Post[] } },
    _info: object
  ) => {
    if (parent.id) {
      return posts.filter((post: Post): boolean => post.author === parent.id)
    }
  },
  comments: (
    parent: { id: string },
    _args: object,
    { db: { comments } }: { db: { comments: Comment[] } },
    _info: object
  ) => {
    if (parent.id) {
      return comments.filter(
        (comment: Comment): boolean => comment.author === parent.id
      )
    }
  },
}
