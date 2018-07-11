import React from 'react'
import { Link } from 'react-router-dom'
// import { wish, unwish, inWishlist } from '/imports/modules/wishlist'
import numeral from 'numeral'

import { connect } from 'react-redux'
import { addToCartAstrum } from '../../../../actions/cart'

import HtmlContent from '../../../html-content'

const Product = ({ astrumProduct, addToCart} ) => {
  // const language = TAPi18n.getLanguage()
  return (
    <div className="prod-i">    
     
      <div className="product-item">
        <div className="product-inner">
          <div className="product-thumb">
          <Link className="thumb-link" to={`/astrum/product/${astrumProduct.id}`}>
            {/* <img src="img/catalog-gallery/1/1.jpg"/> */}
            <img src={astrumProduct.pictures[0]} alt={astrumProduct.name_rus}/>
          </Link>           
            <div className="group-button">
              <a className="add-to-cart" href="#" onClick={(e) => {
                e.preventDefault()
                console.log("clicked")
                addToCart(astrumProduct.id)
              }}/>
              <a className="add-to-wishlist" href="#" />
              <a className="compare" href="#" />
            </div>            
          </div>
          <div className="product-info">
          <Link  className="propduct-name" to={`/astrum/product/${astrumProduct.id}`}>
            { astrumProduct.name_rus ? `${astrumProduct.name_rus}` : null }
          </Link>
          {astrumProduct.oldPrice
            ? <div className="price">
                <del>{ numeral(astrumProduct.oldPrice).format('0,0') } ₸</del>
                &nbsp
                <b>{ numeral(astrumProduct.price).format('0,0') } ₸</b>
              </div>
            : <div className="price">
                <b>{ numeral(astrumProduct.price).format('0,0') } ₸</b>
              </div>
          }
          </div>
        </div>
      </div>
      

      {/* <div className="prod-i-skuwrapcolor">
        <ul className="prod-i-skucolor">
          <li className="bx_active"><img src="img/color/red.jpg" alt="Red"/></li>
          <li><img src="img/color/blue.jpg" alt="Blue"/></li>
        </ul>
      </div> */}
    </div>
  )
}

// export default Product

const withState = connect(
  null,
  (dispatch) => ({
    addToCart(id){
      dispatch(addToCartAstrum({ id, quantity: 1 }))
    }
  })
)(Product)

export default withState