import { Query } from './Query'
import { auth } from './Mutation/auth'
import { post } from './Mutation/post'
import { image } from './Mutation/image'
import { AuthPayload } from './AuthPayload'

export default {
  Query,
  Mutation: {
    ...auth,
    ...post,
    ...image
  },
  AuthPayload,
}
