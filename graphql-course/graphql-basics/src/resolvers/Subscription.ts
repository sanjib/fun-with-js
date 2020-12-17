import { PubSub } from 'graphql-yoga'
import { Post } from './Post'

export const Subscription = {
  comment: {
    subscribe: (
      _parent: {},
      { postId }: { postId: string },
      { db: { posts }, pubsub }: { db: { posts: Post[] }; pubsub: PubSub },
      _info: {}
    ) => {
      const post = posts.find(
        (post: Post): boolean => post.id === postId && post.published
      )
      if (!post) throw new Error('Post not found or published')
      // All good, continue
      return pubsub.asyncIterator(`Comment for postId ${postId}`)
    },
  },
  post: {
    subscribe: (
      _parent: {},
      _args: {},
      { pubsub }: { pubsub: PubSub },
      _info: {}
    ) => pubsub.asyncIterator('Post'),
  },
}
