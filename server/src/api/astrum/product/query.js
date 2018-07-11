import AstrumProductLogic from './logic'

const Query = {
  astrumProduct(root, { id }, context) {
    return AstrumProductLogic.product(root, { query: { id } }, context)
  },
  astrumProducts(root, { search, limit, offset}, context) {
    //const {limit, offset} = search
    return AstrumProductLogic.products(root, { query: { $text: { $search: search } }, skip:offset, limit }, context)
  }
  // categories(root, args, context) {
  //   const { parentId } = args
  //   if (parentId) {
  //     return Categories.find({ parentId })
  //   } else {
  //     return Categories.find({ parentId: { $exists: false }, $or:[{ isFeatured: false }, { isFeatured: { $exists: false } }] })
  //   }
  // }
}

export default Query