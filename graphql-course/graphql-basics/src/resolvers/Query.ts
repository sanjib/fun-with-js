import { User } from './User'
import { Post } from './Post'
import { Comment } from './Comment'

export const Query = {
  me: (): User => ({
    id: 'ABC123',
    name: 'Sanjib',
    email: 'sanjib@sanjib.org',
    age: 45,
  }),
  users: (
    _parent: undefined,
    { query }: { query: string },
    { db: { users } }: { db: { users: User[] } },
    _info: object
  ): User[] => {
    if (!query) return users
    return users.filter((user: User): boolean =>
      user.name.toLowerCase().includes(query.toLowerCase())
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
    { query }: { query: string },
    { db: { posts } }: { db: { posts: Post[] } },
    _info: object
  ): Post[] => {
    if (!query) return posts
    return posts.filter(
      (post: Post): boolean =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase())
    )
  },
  comments: (
    _parent: undefined,
    { postId }: { postId: string },
    { db: { comments } }: { db: { comments: Comment[] } },
    _info: object
  ): Comment[] => {
    if (postId) {
      const filteredComments = comments.filter(
        (comment: Comment): boolean => comment.post === postId
      )
      if (!filteredComments) throw new Error('Comment not found')
      return filteredComments
    }
    return comments
  },
}
