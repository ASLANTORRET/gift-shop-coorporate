import { getAuthenticatedUser } from '../../logic'
import request from 'request'
import empireApiLogic from '../logic'
import mongoose from '../../mongoose'
const XML = require('xml-js')

const astrumCategorySchema = mongoose.Schema({
  astrum_id: Number,
  name: String,
  category_id: Number,
  name_eng: String,
  name_kaz:String,
  image:String,
  title:String,
  keywords:String,
  about:String
})

export const AstrumCategories = mongoose.model('astrum.categories', astrumCategorySchema)


const Logic = {
  category(root, { query }, context) {
    return AstrumCategories.findOne(query)
  },
  categories(root, { query, sort }, context) {
    return AstrumCategories.find(query).sort(sort)
  },
  // async importCategories(root, args, context) {
  //   const admin = "await getAuthenticatedUser(context, 'admin')"
  //   if (admin) {
  //     console.log('loading astrum categories')
  //     empireApiLogic.oauth((oauth) => {
  //       AstrumCategories.remove({}, (err) => {
  //         if (err)
  //           console.log(err)
  //       })
  //       request.get('http://api.empire.kz/api/categories',
  //         { auth: { bearer:oauth.access_token } },
  //         (error, response, body) => {
  //           const categories = JSON.parse(body)
  
  //           console.log('astrum categories import')
  //           categories.forEach(category => {
  //             AstrumCategories.create(category);
  //           });
  //           console.log(categories.length + ' astrum categories imported')
  //         }
  //       )

  //       console.log('loading astrum subcategories')
  //       request.get('http://api.empire.kz/api/subcategories',
  //         { auth: { bearer:oauth.access_token } },
  //         (error, response, body) => {
  //           const subcategories = JSON.parse(body)
  //           console.log('astrum subcategories import')
  //           subcategories.forEach(subcategory => {
  //             AstrumCategories.create(subcategory);
  //           });
  //           console.log(subcategories.length + ' astrum subcategories imported')
  //         }
  //       )
  //     })
  //     return true
  //   }
  //   return false
  // }

  async importCategories(root, args, context) {
    const admin = "await getAuthenticatedUser(context, 'admin')"
    if (admin) {
      console.log('loading astrum categories')
      AstrumCategories.remove({}, (err) => {
        if (err)
          console.log(err)
      })
      request.get('http://92.46.43.37/shuttle.dll/AstrumService?action=category_list&secret=841188fded3228aca96dc0dad6eaf662',
        (error, response, body) => {
          console.log("body", body)
          const result = XML.xml2js(body, {compact:true})
          const category = result.shuttle.category
          console.log("categories:", category)  
          console.log('astrum categories import')
          
          category.forEach(category => {
            AstrumCategories.create({astrum_id:category.id._text, 
                                      name:category.name._cdata, 
                                      category_id:category.parent && category.parent._text ? category.parent._text : null,
                                      name_eng:category.analit_list && category.analit_list.enggroup ? category.analit_list.enggroup : null,
                                      name_kaz:category.analit_list && category.analit_list.kazgroup ? category.analit_list.kazgroup : null,
                                      image:category.image && category.image._cdata? category.image._cdata : null,
                                      title:category.title && category.title._cdata? category.title._cdata : null,
                                      keywords:category.keywords && category.keywords._cdata? category.keywords._cdata : null,
                                      about:category.about && category.about._cdata? category.about._cdata : null
                                    });
          });
          console.log(category.length + ' astrum categories imported')
        }
      )
      return true
    }
    return false
  }
}

export default Logic