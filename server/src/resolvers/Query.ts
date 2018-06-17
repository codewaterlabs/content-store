import { getUserId, Context } from '../utils'

export const Query = {
  feed(parent, args, ctx: Context, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  posts(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    const where = {}
    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx: Context, info) {
    return ctx.db.query.post({ where: { id: id } }, info)
  },

  images(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    console.log(id);
    return ctx.db.query.images({}, info)
  },

  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },

  users(parent, args, ctx: Context, info) {
    return ctx.db.query.users({}, info)
  }
}
