import AstrumCategoryLogic from './logic'
import AstrumProductLogic from '../product/logic'

const Resolver = {
  AstrumCategory: {
    async children(root, args, context) {
      return AstrumCategoryLogic.categories(root, { query: { category_id: root.astrum_id}, sort:{ name:1 } }, context)
    },    
    async products(root, args, context) {
      const { offset, limit } = args
      const query = { astrum_id : root.astrum_id }
      return AstrumProductLogic.products(root, { query, skip: offset, limit }, context)
    },
    async parent(root, args, context) {
      return AstrumCategoryLogic.category(root, {query: {astrum_id: root.category_id}})
    },
    async productCount(root, args, context) {
      const query = { astrum_id: root.astrum_id }
      return AstrumProductLogic.count(root, { query }, context)
    },
  }
}

export default Resolver