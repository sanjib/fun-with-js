import { User } from './resolvers/User'
import { Post } from './resolvers/Post'
import { Comment } from './resolvers/Comment'

const users: User[] = [
  { id: 'uuu1', name: 'Sanjib', email: 'sanjib@sanjib.org', age: 45 },
  { id: 'uuu2', name: 'Notch', email: 'no@mojang.com', age: 32 },
  { id: 'uuu3', name: 'Gray', email: 'gray@grays', age: 3000 },
]
const posts: Post[] = [
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
const comments: Comment[] = [
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

export const db = {
  users,
  posts,
  comments,
}
