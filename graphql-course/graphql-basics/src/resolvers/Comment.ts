import { User } from './User'
import { Post } from './Post'

export interface Comment {
  id: string
  text: string
  author: string
  post: string
}

export const Comment = {
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
  post: (
    parent: { post: string },
    _args: object,
    { db: { posts } }: { db: { posts: Post[] } },
    _info: object
  ) => {
    if (parent.post) {
      return posts.find((post: Post): boolean => post.id === parent.post)
    }
  },
}
