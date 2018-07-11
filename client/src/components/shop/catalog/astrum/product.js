import { gql, graphql } from 'react-apollo'
import React from 'react'
// import HtmlContent from '../../html-content'
// import { Related } from './_related'
// import { wish, unwish, inWishlist } from '/imports/modules/wishlist'
import numeral from 'numeral'
import $ from 'jquery'
import '@fancyapps/fancybox'
import 'bxslider'

import { connect } from 'react-redux'
import { addToCartAstrum } from '../../../../actions/cart'

class AstrumProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 1
    }
  }
  initCarousel() {
    $('.fancy-img').fancybox({
      padding: 0,
      helpers: {
        overlay: {
          locked: false
        },
        thumbs: {
          width: 60,
          height: 60
        }
      }
    })
    if ($('.prod-slider-car').length > 0) {
        $('.prod-slider-car').each(function () {
            $(this).bxSlider({
                pagerCustom: $(this).parents('.prod-slider-wrap').find('.prod-thumbs-car'),
                adaptiveHeight: true,
                infiniteLoop: false,
            })
            $(this).parents('.prod-slider-wrap').find('.prod-thumbs-car').bxSlider({
                slideWidth: 5000,
                slideMargin: 8,
                moveSlides: 1,
                infiniteLoop: false,
                minSlides: 5,
                maxSlides: 5,
                pager: false,
            })
        })
    }
  }
  componentDidMount() {
    this.initCarousel()
  }
  componentDidUpdate() {
    this.initCarousel()
  }
  render() {
    const { data: { astrumProduct, loading }, addToCart} = this.props

    if (loading) {
      return <p>loading ... </p>
    }
    return <section className="container">
      <h1 className="main-ttl">
        <span>
          { astrumProduct.code ? `(${astrumProduct.code}) ` : null }
          { astrumProduct.name }
        </span>
        (Empire)
      </h1>

      <div className="prod-wrap">

        <div className="prod-slider-wrap">
          <div className="prod-slider">
            <ul className="prod-slider-car">
              { astrumProduct.pictures.map(file => {
                return (
                  <li key={file}>
                    <a data-fancybox-group="product" className="fancy-img" href={ file }>
                      <img src={ file } alt=""/>
                    </a>
                  </li>
                )
              }) }
            </ul>
          </div>
          <div className="prod-thumbs">
            <ul className="prod-thumbs-car">
              { astrumProduct.pictures.map((file,index) => {
                return (
                  <li key={index}>
                    <a data-slide-index={index} href="#">
                      <img src={ file } alt=""/>
                    </a>
                  </li>
                )
              }) }
            </ul>
          </div>
        </div>

        <div className="prod-cont">
          <div className="prod-cont-txt">
            { astrumProduct.brief }
          </div>
          <p className="prod-actions">
            {/* { inWishlist(product._id)
              ? <a href="#" className="prod-favorites" role="button" onClick={(e) => { e.preventDefault() unwish(product._id) }}>
                  <i className="fa fa-heart"></i>
                </a>
              : <a href="#" className="prod-favorites" role="button" onClick={ (e) => {
                  e.preventDefault()
                  wish(product._id)
                  // const flyer = $(e.target).closest('.product').find('.card .card-image img')
                  // flyToElement(flyer ,$('#to-wishlist').find('img'))
                } }>
                  <i className="fa fa-heart"></i>
                  В избранное
                </a>
             } */}
            {/* <a href="#" className="prod-favorites">
              <i className="fa fa-heart"></i>
              Wishlist</a> */}
            {/* <a href="#" className="prod-compare">
              <i className="fa fa-bar-chart"></i>
              Compare</a> */}
          </p>
          <div className="prod-info">
            { astrumProduct.oldPrice
              ? <p className="prod-price">
                  <del>{ numeral(astrumProduct.oldPrice).format('0,0') } ₸</del>
                  <b className="item_current_price">{ numeral(astrumProduct.price).format('0,0') } ₸</b>
                </p>
              : <p className="prod-price">
                  <b className="item_current_price">{ numeral(astrumProduct.price).format('0,0') } ₸</b>
                </p>
            }

            <p className="prod-qnt">
              <input value={ this.state.qty } type="text" id="qty"
                onChange = {
                  (e) => {
                    this.setState({ qty: e.target.value })
                  }
                }
              />
              <a href="#" className="prod-plus" onClick={(e) => {
                let { qty } = this.state
                if (qty) {
                  qty ++
                }
                this.setState({qty})
                e.preventDefault()
              }}>
                <i className="fa fa-angle-up"></i>
              </a>
              <a href="#" className="prod-minus" onClick={(e) => {
                let { qty } = this.state
                if (qty && qty > 1) {
                  qty --
                } else {
                  qty = 1
                }
                this.setState({qty})
                e.preventDefault()
              }}>
                <i className="fa fa-angle-down"></i>
              </a>
            </p>
            <p className="prod-addwrap">
              <button className="prod-add" rel="nofollow" onClick={(e) => {
                e.preventDefault()
                let { qty } = this.state
                qty = qty || 1
                addToCart(astrumProduct.astrum_id, qty )
              }}>В корзину</button>
            </p>
            { astrumProduct.qty
              ? <div>
                  <b>Остатки:</b> {astrumProduct.qty}шт.
                </div>
              : null
            }
          </div>
        </div>

        <div className="prod-tabs-wrap">
          <ul className="prod-tabs">
            <li>
              <a data-prodtab-num="1" className="active" href="#" data-prodtab="#description">Описание</a>
            </li>
          </ul>
          <div className="prod-tab-cont">

            <p data-prodtab-num="1" className="prod-tab-mob active" data-prodtab="#description">Описание</p>
            <div className="prod-tab stylization" id="description">
              { astrumProduct.description_rus }
            </div>
          </div>
        </div>

      </div>
      {/* <Related /> */}
    </section>
  }
}

const query = gql`
  query astrumProduct ($id: Int!) {
    astrumProduct (id: $id) {
      _id
      id
      astrum_id
      name_rus
      price
      pictures
      qty
      description_rus
      code
    }
  }
`
const withState = connect(
  null,
  (dispatch) => ({
    addToCart(id, quantity){
      dispatch(addToCartAstrum({ id, quantity }))
    }
  })
)

const withData = graphql(query, {
  options({ match: { params: { id } } }) {
    return { variables: { id } }
  }
})

export default withState(withData(AstrumProduct))
