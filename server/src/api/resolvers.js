import User from './user'
import Category from './category'
import Product from './product'
import AstrumCategory from './astrum/category'
import AstrumProduct from './astrum/product'
import Cart from './cart'
import Order from './order'
import Slide from './slide'
import FeaturedCategory from './astrum/featured'
import Statistics from './statistics'
import Setting from './setting'

import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export const resolvers = {
  Query: {
    ...User.Query,
    ...Category.Query,
    ...Product.Query,
    ...AstrumCategory.Query,
    ...AstrumProduct.Query,

    ...Cart.Query,
    ...Order.Query,
    
    ...Slide.Query,
    ...FeaturedCategory.Query,
    ...Statistics.Query,
    ...Setting.Query,
  },
  Mutation: {
    ...User.Mutation,
    ...Order.Mutation,
    ...Slide.Mutation,
    ...FeaturedCategory.Mutation,
    ...Statistics.Mutation,

    ...AstrumProduct.Mutation,
    ...AstrumCategory.Mutation,
    ...Setting.Mutation,
  },
  ...User.Resolver,
  ...Category.Resolver,
  ...Product.Resolver,
  ...Cart.Resolver,

  ...AstrumCategory.Resolver,
  ...AstrumProduct.Resolver,
  ...FeaturedCategory.Resolver,
  ...Order.Resolver,
  ...Slide.Resolver,
  ...Statistics.Resolver,

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }
      return null
    },
  }),
}
