import { User } from './User'
import { Comment } from './Comment'

export interface Post {
  id: string
  title: string
  body: string
  published: boolean
  author: string
}

export const Post = {
  author: (
    parent: { author: string },
    _args: object,
    { db: { users } }: { db: { users: User[] } },
    _info: object
  ) => {
    if (parent.author) {
      return users.find((user: User): boolean => user.id === parent.author)
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
        (comment: Comment): boolean => comment.post === parent.id
      )
    }
  },
}
