import FeaturedCategoriesLogic from './logic'
import AstrumProductsLogic from '../product/logic'

const Resolver = {
    FeaturedCategory:{
        async products(root, args, context){
            const query = {id:{$in:root.products}}
            return AstrumProductsLogic.products(root, {query}, context);    
        }
    }
}

export default Resolver