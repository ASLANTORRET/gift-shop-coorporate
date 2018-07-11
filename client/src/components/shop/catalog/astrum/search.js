import React from 'react'
import Astrum from '../../cart/_astrum'
import {ASTRUM_PRODUCTS_QUERY} from '../../../../queries/astrum'
import {graphql} from 'react-apollo'
import {connect, history} from 'react-router-dom'
import Pagination, {getOffset, getPage, getPagination} from '../../pagination'
import Product from '../astrum/_product'

export const Search = (...args) => {
    const {data: { loading, astrumProducts }, pagination, history, keyword} = args[0]
    if (loading) {
      return <p>loading ...</p>
    }
    return (
        <section className="container">
            <h1 className="main-ttl">Поиск товаров</h1>
            <div className="row">
                <form onSubmit={(e)=>{
                    console.log("submit clicked", e)
                    history.push(`search?search=${e.target.search.value}`)
                }}>
                    <div className="input-group">
                        <input type="text" className="form-control" name="search" placeholder="Enter your search here..."/>
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-submit">Поиск</button>                        
                        </span>
                    </div>                    
                </form>
            </div>
            <h2 className="sub-title">Результаты поиска:</h2>
            <h4>Вы искали "{keyword}"</h4>
            <Pagination pagination={pagination}/>
            <div className="prod-items section-items">
                { astrumProducts.map(product => <Product astrumProduct={product} key={product._id} />)}
            </div>
            <Pagination pagination={pagination}/>            
        </section>    
    )
}

const ITEMS_PER_PAGE=12

const withData = graphql(ASTRUM_PRODUCTS_QUERY,{
  options({ location: { search }}) {
    const page = getPage(search)
    const keyword = getKeyword(search)
    const offset = getOffset(ITEMS_PER_PAGE,page)
    return { variables: { 
      search:keyword,
      limit:ITEMS_PER_PAGE,
      offset
    } }
  },
  props({ data, ownProps: { location, history } }) {
      const { pathname, search } = location
      let pagination
      const keyword = getKeyword(search)
      if (!data.loading) {
        const page = getPage(search)
        const offset = getOffset(ITEMS_PER_PAGE,page)
        pagination = getPagination({location, history}, data.astrumProducts.length, ITEMS_PER_PAGE, offset)
      }
    return {data, pagination, history, keyword}
  }
}) (Search)

const getKeyword = (search, getVar="search") => {
    const urlSearchParams = new URLSearchParams(search)
    let keyword = ""
    if(urlSearchParams.has(getVar)){
        keyword =  urlSearchParams.get(getVar)
    }
    return keyword
}

export default withData