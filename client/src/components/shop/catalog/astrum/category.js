import { gql, graphql } from 'react-apollo'
import React from 'react'
// import { Link } from 'react-router'

// import { Category } from './category'
import AstrumLeft from './left'
import { Filter } from './_filter'
import { Sort } from './_sort'
import Product from './_product'
import Pagination, { getPagination, getOffset, getPage } from '../../pagination'

// import _ from 'lodash'
// export const AstrumCategory = ({data: { loading, category }, pagination}) => {
export const AstrumCategory = (...args) => {
  const {data: { loading, astrumCategory }, pagination} = args[0]
  if (loading) {
    return <p>loading ...</p>
  }
  return <section className="container">  
    <h1 className="main-ttl uppercase">{ astrumCategory.name }</h1>
    <div className="section-sb">
      <AstrumLeft astrumCategory={ astrumCategory } />

      <Filter />

    </div>

    <div className="section-cont">

      <Sort />
      <Pagination pagination={pagination}/>

      <div className="prod-items section-items">
        {console.log("products:", astrumCategory.products)}
        { astrumCategory.products.map(product => <Product astrumProduct={product} key={product._id} />)}
      </div>

      <Pagination pagination={pagination}/>

    </div>
  </section>
}


const query = gql`
  query astrumCategory($astrum_id: Int!, $offset: Int, $limit: Int) {
    astrumCategory(astrum_id: $astrum_id) {
      _id
      astrum_id
      name
      productCount
      parent {
        _id
        name
      }
      products (offset: $offset, limit: $limit)  {
        _id
        id
        astrum_id
        name_rus
        price
        code
        pictures
      }
      children {
        _id
        astrum_id
        name
      }
    }
  }
`

const ITEMS_PER_PAGE=12

const withData = graphql(query,{
  options({ match: { params: { astrum_id } }, location: { search }}) {
    const page = getPage(search)
    const offset = getOffset(ITEMS_PER_PAGE,page)
    return { variables: { 
      astrum_id,
      limit: ITEMS_PER_PAGE,
      offset,
    } }
  },
  props({ data, ownProps: { location, history } }) {
    const { pathname, search } = location
    let pagination
    if (!data.loading) {
      const page = getPage(search)
      const offset = getOffset(ITEMS_PER_PAGE,page)
      pagination = getPagination({location, history}, data.astrumCategory.productCount, ITEMS_PER_PAGE, offset)
    }
    return {data, pagination}
  }
}) (AstrumCategory)

export default withData
