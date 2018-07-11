import FeaturedCategoriesLogic from './logic'

const Query = {
    featuredCategory (root, args, context){
        const {id} = args
        return FeaturedCategoriesLogic.category(root, {query:{id}}, context)
    },
    featuredCategories(root, args, context){
       const sort = { name_rus : 1}
       return FeaturedCategoriesLogic.categories(root, {query:{}, sort:sort},context) 
    }
}

export default Query
