import { gql, graphql } from 'react-apollo'

import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import ToCart from './cart/link'
import _ from 'lodash'
global.jQuery = require('jquery')
require('bootstrap')
const $ = global.jQuery
// import { ToWishlist } from '/imports/ui/containers/shop/wishlist'

// const Header = ({ data: { astrumCategories, currentUser, oasisCategories, loading }}) => {
//   if (loading) {
//     return <p>loading...</p>
//   }
//   const user = currentUser
//   $('.dropdown-toggle').dropdown()
//   // $(document).ready(function(){
//   //   console.log("events ready")
//   //   $('.add-mark').on( "click", function(e) {
//   //     $(this).closest('.header').find('.has-mark').addClass('show-mark');
//   //     return false;
//   //   });
//   //   $('.remove-mark').on( "click", function(e) {
//   //       $(this).closest('.header').find('.has-mark').removeClass('show-mark');
//   //       return false;
//   //   });
//   //   $('.show-content').on( "click", function(e) {
//   //     console.log("clicked")
//   //       $(this).closest('.parent-content').find('.inner-content').addClass('show');
//   //       return false;
//   //   });
//   //   $('.hidden-content').on( "click", function(e) {
//   //       $(this).closest('.inner-content').removeClass('show');
//   //       return false;
//   //   });
//   //   $('.toggle-submenu').on( "click", function(e) {
//   //       $(this).closest('.menu-item-has-children').toggleClass('show-submenu');
//   //       return false;
//   //   });
//   //   $('.toggle-button').on( "click", function(e) {
//   //       $(this).closest('.parent-content').find('.toggle-content').toggleClass('show');
//   //       return false;
//   //   });
//   // })
    
//   return (
//     <header className="header">

//       <div className="header_top hidden-print">
//         <div className="container">
//           <ul className="contactinfo nav nav-pills">
//             { user 
//               ? <li>
//                   {/* <i className="fa fa-envelope"></i> */}
//                   Клиент:
//                   {user.email}
//                 </li>
//               : null
//             }

//           </ul>
//           {user && (
//             <ul className="sign-icons nav navbar-nav pull-right">
//             <li>
//               <a href="#" onClick={this.handleLogout}>
//                 <i className='fa fa-sign-out'></i>
//                 Выход
//               </a>
//             </li>
//           </ul>
//           )}    
          
//         </div>
//       </div>

//       <div className="header-middle">
//         <div className="container header-middle-cont">
//           <div className="toplogo">
//             <Link to={`/shop`}><img src="/shop/img/logo.png" alt="Empire"/></Link>
//           </div>
//           <div className="shop-menu hidden-print">
//             <ul>

//               <li>
//                 {/* <ToWishlist /> */}
//               </li>
//               <li>
//                 <Link to={`/shop/profile`}>
//                   <i className="fa fa-user"></i>
//                   <span className="shop-menu-ttl">Профиль</span>
//                 </Link>
//               </li>
//               <li>
//                 <ToCart />
//               </li>

//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="header-bottom hidden-print">
//         <div className="container">

//           <nav className="navbar navbar-default">
//             <div className="navbar-header">
//               <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".js-navbar-collapse">
//                 <span className="sr-only">Toggle navigation</span>
//                 <span className="icon-bar"></span>
//                 <span className="icon-bar"></span>
//                 <span className="icon-bar"></span>
//               </button>
//               {/* <a className="navbar-brand" href="#">MegaMenu</a> */}
//             </div>
//             <div className="collapse navbar-collapse js-navbar-collapse">
//               <ul className="nav navbar-nav">
//                 <li className="dropdown mega-dropdown">
//                   <a href="#" className="dropdown-toggle" data-toggle="dropdown">Каталог продукции <span className="glyphicon glyphicon-chevron-down pull-right"></span></a>

//                   <ul className="dropdown-menu mega-dropdown-menu row">
//                     { astrumCategories && astrumCategories.length
//                       ? <li className="col-sm-3">
//                           <ul>
//                             {/* <li className="dropdown-header"><Link to={`/shop/catalog`}>Empire</Link></li> */}
//                             <li className="dropdown-header"><a>Empire</a></li>
//                             { astrumCategories.map(category => (
//                               <li key={category._id}>
//                                 <ul>
//                                   <li><Link to={`/shop/astrum/category/${category.astrum_id}`}>{category.name}</Link></li>
//                                 </ul>
//                               </li>
//                             ))}
//                           </ul>
//                         </li>
//                       : null
//                     }
//                     { oasisCategories && oasisCategories.length
//                       ? <li className="col-sm-9">
//                           <ul>
//                             {/* <li className="dropdown-header"><Link to={`/shop/oasis`}>Бизнес</Link></li> */}
//                             <li className="dropdown-header"><a>Бизнес</a></li>
//                             <li className="row">
//                               { oasisCategories.map(category => (
//                                 <div className="col-sm-4" key={category._id}>
//                                   <ul>
//                                     <li className="dropdown-header"><Link to={`/shop/oasis/category/${category.path}`}>{category.name}</Link></li>
//                                     { category.children
//                                       ? category.children.map(child => (
//                                           <li key={child._id}><Link to={`/shop/oasis/category/${child.path}`}>{child.name}</Link></li>
//                                         ))
//                                       : null
//                                     }
//                                   </ul>
//                                 </div>
//                               ))}
//                                 <div className="col-sm-4">
//                                   <ul>
//                                       <li className="dropdown-header"><Link to={`/shop/suggested`}>Рекомендуемые товары</Link></li>
//                                   </ul>
//                                 </div>  
//                             </li>
//                           </ul>
//                         </li>
//                       : null
//                     }
//                   </ul>

//                 </li>
//                 {/* <li>
//                   <Link to={`/latest`}>
//                     Новинки
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to={`/offers`}>
//                     Акции
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to={`/bestsellers`}>
//                     Популярное
//                   </Link>
//                 </li> */}
//                 {/* <li className="mainmenu-more">
//                   <span>...</span>
//                   <ul className="mainmenu-sub"></ul>
//                 </li> */}
//               </ul>
//               {/* <ul className="nav navbar-nav navbar-right">
//                 <li><a href="../navbar-fixed-top/">Fixed top</a></li>
//               </ul> */}
//             </div>
//             {/* <ul className="mainmenu sections-show">
//               <li>
//                 <a href="index.html" className="active">
//                   Home
//                 </a>
//               </li>
//               <li className="menu-item-has-children">
//                 <a href="catalog-list.html">
//                   Catalog <i className="fa fa-angle-down"></i>
//                 </a>
//                 <ul className="sub-menu">
//                   <li>
//                     <a href="catalog-list.html">
//                       Catalog List - Style 1
//                     </a>
//                   </li>
//                   <li>
//                     <a href="catalog-list-2.html">
//                       Catalog List - Style 2
//                     </a>
//                   </li>
//                   <li>
//                     <a href="catalog-gallery.html">
//                       Catalog Gallery - Style 1
//                     </a>
//                   </li>
//                   <li>
//                     <a href="catalog-gallery-2.html">
//                       Catalog Gallery - Style 2
//                     </a>
//                   </li>
//                   <li>
//                     <a href="catalog-table.html">
//                       Catalog Table
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li className="menu-item-has-children">
//                 <a href="product.html">
//                   Product <i className="fa fa-angle-down"></i>
//                 </a>
//                 <ul className="sub-menu">
//                   <li>
//                     <a href="product.html">
//                       Product - Style 1 (Slider)
//                     </a>
//                   </li>
//                   <li>
//                     <a href="product-2.html">
//                       Product - Style 2 (Scroll)
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <a href="elements.html">
//                   Elements
//                 </a>
//               </li>


//               <li className="mainmenu-more">
//                 <span>...</span>
//                 <ul className="mainmenu-sub"><li className="menu-item-has-children mainmenu-other">
//                 <a href="blog.html">
//                   Blog <i className="fa fa-angle-down"></i>
//                 </a>
//                 <ul className="sub-menu">
//                   <li>
//                     <a href="blog.html">
//                       Blog - Style 1
//                     </a>
//                   </li>
//                   <li>
//                     <a href="blog-2.html">
//                       Blog - Style 2
//                     </a>
//                   </li>
//                   <li>
//                     <a href="post.html">
//                       Single Post
//                     </a>
//                   </li>
//                 </ul>
//               </li><li className="menu-item-has-children mainmenu-other">
//                 <a href="#">
//                   Pages <i className="fa fa-angle-down"></i>
//                 </a>
//                 <ul className="sub-menu">
//                   <li>
//                     <a href="contacts.html">
//                       Contacts
//                     </a>
//                   </li>
//                   <li>
//                     <a href="cart.html">
//                       Cart
//                     </a>
//                   </li>
//                   <li>
//                     <a href="auth.html">
//                       Authorization
//                     </a>
//                   </li>
//                   <li>
//                     <a href="compare.html">
//                       Compare
//                     </a>
//                   </li>
//                   <li>
//                     <a href="wishlist.html">
//                       Wishlist
//                     </a>
//                   </li>
//                   <li>
//                     <a href="404.html">
//                       Error 404
//                     </a>
//                   </li>
//                 </ul>
//               </li></ul>
//               </li>
//             </ul> */}
//             <div className="topsearch">
//               <button className="topsearch-btn" type="button" data-toggle="collapse" data-target=".js-search-collapse">
//                 <i className="fa fa-search"></i>
//               </button>
//               {/* <a id="topsearch-btn" className="topsearch-btn" href="#"><i className="fa fa-search"></i></a> */}
//               {/* <form className="topsearch-form collapse navbar-collapse js-search-collapse" onSubmit={(e) => {
//                 e.preventDefault()
//                 const fields = $(e.target).serializeArray()
//                 const params = {}
//                 fields.forEach(field => {
//                   params[field.name] = field.value
//                 })
//                 browserHistory.push(`/${ language }/shop/search/${params.search}`)
//               }}>
//                 <input type="text" name="search" placeholder="Поиск по каталогу" />
//                 <button type="submit"><i className="fa fa-search"></i></button>
//               </form> */}
//             </div>
//           </nav>
//         </div>
//       </div>

//     </header>
//   )
// }

class HeaderN extends React.Component{
  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this)
  } 

  onClick(e){
    console.log("e", e.currentTarget.getAttribute('class'))
    e.preventDefault()
    switch(e.currentTarget.classList[0]){      
      case 'show-content':
      $(e.currentTarget).closest('.parent-content').find('.inner-content').addClass('show')
      $(e.currentTarget).closest('.header').find('.has-mark').addClass('show-mark')
      break
      case 'search-button':
      $(e.currentTarget).closest('.parent-content').find('.inner-content').addClass('show')
      $(e.currentTarget).closest('.header').find('.has-mark').addClass('show-mark')
      break
      case 'hidden-content':
      $(e.currentTarget).closest('.inner-content').removeClass('show')
      $(e.currentTarget).closest('.header').find('.has-mark').removeClass('show-mark')
      break
      case 'toggle-submenu':
      $(e.currentTarget).closest('.menu-item-has-children').toggleClass('show-submenu')
      break
      case 'toggle-button':
      $(e.currentTarget).closest('.parent-content').find('.toggle-content').toggleClass('show')
      break
    }
  }

  render(){
    const {data : {astrumCategories, currentUser, loading}} = this.props;
    if(loading){
      return <p>loading...</p>
    }
    const navCategories = ["Каталог", "Коллекции","VIP","Мир Empire","Бутики"]
    const groupedCategories = _.chunk(astrumCategories, 2)
    console.log("cats:", astrumCategories)
    
    return (
      <header className="header">
          <div className="header style1">
            <div className="topbar style1">
              <div className="row">
                <div className="col-sm-12 col-md-5">
                  {/* <div className="header-nav parent-content">
                    <a href="#" className="show-content main-menu-tabbar add-mark"  onClick={this.onClick}><span /><span /><span /></a>
                    <div className="has-mark">
                      <div className="header-nav-inner inner-content left">
                        <a href="#" className="hidden-content remove-mark" onClick={this.onClick}><span className="flaticon-close" /></a>
                        <ul className="main-menu scrollbar mCustomScrollbar _mCS_1 mCS_no_scrollbar"><div id="mCSB_1" className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" tabIndex={0}><div id="mCSB_1_container" className="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style={{position: 'relative', top: 0, left: 0}} dir="ltr">
                              <li className="menu-item menu-item-has-children">
                                <a href="#" className="toggle-submenu">Home</a>
                                <ul className="submenu">
                                  <li className="menu-item submenu-item">
                                    <a href="#">Home 1</a>
                                  </li>                                
                                </ul>
                              </li>
                              <li className="menu-item">
                                <a href="#">Men</a>
                              </li>                            
                            </div><div id="mCSB_1_scrollbar_vertical" className="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical" style={{display: 'none'}}><div className="mCSB_draggerContainer"><div id="mCSB_1_dragger_vertical" className="mCSB_dragger" style={{position: 'absolute', minHeight: 30, height: 0, top: 0}} onContextMenu={(e) => {e.preventDefault()}}><div className="mCSB_dragger_bar" style={{lineHeight: 30}} /></div><div className="mCSB_draggerRail" /></div></div></div></ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="topbar-content left">
                    <ul className="topbar-menu left">
                      {/* <li className="menu-item menu-item-has-children topbar-item language">
                        <a href="#" className="toggle-submenu">KZ</a>
                        <ul className="submenu language">
                          <li className="menu-item  submenu-item ">
                            <a href="#">KZ</a>
                          </li>
                          <li className="menu-item  submenu-item">
                            <a href="#">RU</a>
                          </li>
                          <li className="menu-item submenu-item">
                            <a href="#">EN</a>
                          </li>
                        </ul>
                      </li> */}
                      {/* <li className="menu-item menu-item-has-children topbar-item currency show-submenu">
                        <a href="#" className="toggle-submenu">England <span className="notation"> (GBP)</span></a>
                        <ul className="submenu currency">
                          <li className="menu-item  submenu-item">
                            <a href="#">England <span className="notation">(GBP)</span></a>
                          </li>
                          <li className="menu-item  submenu-item">
                            <a href="#">United State <span className="notation">(USD)</span></a>
                          </li>
                          <li className="menu-item  submenu-item">
                            <a href="#">France <span className="notation">(EUR)</span></a>
                          </li>
                        </ul>
                      </li> }
                    </ul>
                  </div> */}
                </div>
                <div className="col-sm-12 col-md-2">
                  <div className="topbar-content middle">
                    <div className="logo">
                      <Link to={"/"}><img src="img/imgpsh_fullsize.png" alt="Empire" /></Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-5">
                  <div className="topbar-content right">
                    <div className="header-topbar-right">	
                      <div className="menu-item topbar-item parent-content search-form">
                        <a href="#" className="search-button show-content icon" onClick={this.onClick}><i className="flaticon-magnifying-glass" /></a>
                        <div className="search-block inner-content">
                          <a href="#" className="hidden-content remove-mark" onClick={this.onClick}><span className="flaticon-close" /></a>
                          <div className="search-inner">
                            <form action="/search">
                              <input type="text" className="search-info" placeholder="Введите название, описание или код товара.." name="search" />
                              <button type="submit" className="search-button show-content"><i className="flaticon-magnifying-glass" /></button>
                            </form>
                          </div>
                        </div>
                      </div>
                      {<div className="menu-item topbar-item parent-content search-form">
                        <a href="#" className="search-button show-content icon" onClick={(e)=>$(".auth-menu").toggle()}><i className="flaticon-business" /></a>
                      </div>}
                      <div className="menu-item topbar-item minicart parent-content has-mark">
                        <ToCart/>
                      </div>
                      {/* <div className="menu-item topbar-item minicart parent-content has-mark">
                        <div className="box-icon">
                          <a href="#" className="show-content cart-icon icon add-mark" onClick={this.onClick}>
                            <i className="flaticon-shopping-bag"><span className="count">3</span></i>
                          </a>
                        </div>
                        <div className="cart-inner inner-content scrollbar mCustomScrollbar _mCS_2 mCS_no_scrollbar" style={{}}><div id="mCSB_2" className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" tabIndex={0} style={{maxHeight: 925}}><div id="mCSB_2_container" className="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style={{position: 'relative', top: 0, left: 0}} dir="ltr">
                              <a href="#" className="hidden-content remove-mark" onClick={this.onClick}><span className="flaticon-close" /></a>
                              <h4 className="cart-title">Shopping Bag</h4>
                              <h5 className="notify"><span className="count-item">3 items</span> in your bag</h5>
                              <ul className="list-item-in-cart">
                                <li className="item-in-cart">
                                  <div className="thumb">
                                    <a href="#"><img src="images/cart-item1.jpg" alt className="mCS_img_loaded" /></a>
                                  </div>
                                  <div className="cart-item-info">
                                    <a className="product-name" href="#">The Deep-V in Inkwell</a>
                                    <div className="price">
                                      <del>$100.000</del>
                                      <ins>$70.000</ins>
                                    </div>
                                    <h5 className="size">Size:(M)</h5>
                                  </div>
                                  <div className="cart-changes">
                                    <a href="#" className="remove-item">x</a>
                                    <div className="quantity">
                                      <div className="group-quantity-button">
                                        <a className="plus" href="#"><i className="fa fa-angle-up" aria-hidden="true" /></a>
                                        <a className="minus" href="#"><i className="fa fa-angle-down" aria-hidden="true" /></a>
                                      </div>
                                      <input className="input-text qty text" type="text" size={4} title="Qty" defaultValue={1} name="quantity" />
                                    </div>
                                  </div>
                                </li>
                                <li className="item-in-cart">
                                  <div className="thumb">
                                    <a href="#"><img src="images/cart-item2.jpg" alt className="mCS_img_loaded" /></a>
                                  </div>
                                  <div className="cart-item-info">
                                    <a className="product-name" href="#">The Deep-V in Inkwell</a>
                                    <div className="price">
                                      <ins>$120.000</ins>
                                    </div>
                                    <h5 className="size">Size:(L)</h5>
                                  </div>
                                  <div className="cart-changes">
                                    <a href="#" className="remove-item">x</a>
                                    <div className="quantity">
                                      <div className="group-quantity-button">
                                        <a className="plus" href="#"><i className="fa fa-angle-up" aria-hidden="true" /></a>
                                        <a className="minus" href="#"><i className="fa fa-angle-down" aria-hidden="true" /></a>
                                      </div>
                                      <input className="input-text qty text" type="text" size={4} title="Qty" defaultValue={1} name="quantity" />
                                    </div>
                                  </div>
                                </li>
                                <li className="item-in-cart">
                                  <div className="thumb">
                                    <a href="#"><img src="images/cart-item3.jpg" alt className="mCS_img_loaded" /></a>
                                  </div>
                                  <div className="cart-item-info">
                                    <a className="product-name" href="#">The Deep-V in Inkwell</a>
                                    <div className="price">
                                      <del>$120.000</del>
                                      <ins>$75.000</ins>
                                    </div>
                                    <h5 className="size">Size:(S)</h5>
                                  </div>
                                  <div className="cart-changes">
                                    <a href="#" className="remove-item">x</a>
                                    <div className="quantity">
                                      <div className="group-quantity-button">
                                        <a className="plus" href="#"><i className="fa fa-angle-up" aria-hidden="true" /></a>
                                        <a className="minus" href="#"><i className="fa fa-angle-down" aria-hidden="true" /></a>
                                      </div>
                                      <input className="input-text qty text" type="text" size={4} title="Qty" defaultValue={1} name="quantity" />
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <div className="cart-total">
                                <span className="title">Subtotal</span><span className="price-total">$270.000</span>
                              </div>
                              <div className="group-button">
                                <a href="#" className="checkout">Proceed to checkout</a>
                                <a href="#" className="view-cart">Go to Cart</a>
                              </div>
                            </div><div id="mCSB_2_scrollbar_vertical" className="mCSB_scrollTools mCSB_2_scrollbar mCS-light mCSB_scrollTools_vertical" style={{display: 'none'}}><div className="mCSB_draggerContainer"><div id="mCSB_2_dragger_vertical" className="mCSB_dragger" style={{position: 'absolute', minHeight: 30, top: 0}} onContextMenu={(e) => {e.preventDefault()}}><div className="mCSB_dragger_bar" style={{lineHeight: 30}} /></div><div className="mCSB_draggerRail" /></div></div></div></div>
                      </div> */}
                    </div>
                    <ul className="topbar-menu right">
                      <li className="menu-item topbar-item top-links">
                        <a href="tel:+77272777755">+7 /727/ 277 77 55</a>
                      </li>                    
                    </ul>
                    <div className="auth-menu uppercase">
                      <ul>
                        <li><Link to={"signup"}>Создать аккаунт</Link></li>
                        <li><Link to={"login"}>Вход в личный кабинет</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div id="navbar" className="row menu-empire text-center uppercase">
                <ul>
                  <List name={navCategories[0]} list={groupedCategories} link={'/'}/>
                  <List name={navCategories[1]} link={'collections'}/>
                  <List name={navCategories[2]} link={'vip'}/>
                  <List name={navCategories[3]} link={'about'}/>
                  <List name={navCategories[4]} link={'boutiques'}/>                                                
                </ul>
              </div>
            </div>
          </div>
        </header>  
    )
  }
}

const DropdownMenu = (props)=>{
  
  return(
      <ul className="dropdown-menu" style={{display: 'none'}}>
      <div className="row-fluid">
        <div className="col-lg-1 dropdown-col hidden-md">
        </div>
        {          
          (props.list && props.list.length) &&
            props.list.map((list, key)=>(
              <div key={key} className="col-lg-2 col-md-3 dropdown-col">
                <ul>
                  <li className="heading"><Link to={`/astrum/category/${list[0].astrum_id}`}  onClick={(e)=>$(e.currentTarget).closest('.dropdown-menu').css('display', 'none')}>{list[0].name}</Link></li>
                  {list[0].children.map((child, key)=>{
                    return child.productCount > 0  
                    ? <li key={key}><Link to={`/astrum/category/${child.astrum_id}`} onClick={(e)=>$(e.currentTarget).closest('.dropdown-menu').css('display', 'none')}>{child.name}</Link></li>
                    : ""
                  }
                  
                  )}              
                </ul>
                <ul>
                  <li className="heading"><Link to={`/astrum/category/${list[1].astrum_id}`} onClick={(e)=>$(e.currentTarget).closest('.dropdown-menu').css('display', 'none')}>{list[1].name}</Link></li>
                  {list[1].children.map((child, key)=>{
                    return child.productCount > 0 
                    ? <li key={key}><Link to={`/astrum/category/${child.astrum_id}`} onClick={(e)=>$(e.currentTarget).closest('.dropdown-menu').css('display', 'none')}>{child.name}</Link></li>
                    : ""
                  }
                  )}              
                </ul>            
              </div>
            )
          )
        }        
        <div className="col-lg-1 dropdown-col hidden-md">
        </div>
      </div>
    </ul>
    )
}

const List = (props)=>{
  
  return(
    <li  
      onMouseEnter={(e)=>{e.preventDefault(); 
        {props.list && 
          $(e.currentTarget).find('.dropdown-menu').css('display', 'table');}}
        }
      onMouseLeave={(e)=>{e.preventDefault(); 
        {props.list && 
          $(e.currentTarget).find('.dropdown-menu').css('display', 'none');}}
        }
        >        
      <Link to={`${props.link}`}>{props.name}</Link>
      {props.list && <DropdownMenu list={props.list}/>}
    </li>
  )
}
const query = gql`
query userAndCategories{
astrumCategories {
      _id
      astrum_id
      name
      children {
        _id
        astrum_id
        name
        productCount
      }
    }   
    currentUser{
      _id
      email
    }    
  }
`
//const withData = graphql(query, {options:({ user }) => ({ variables: { id:user._id } })})(HeaderN)
const withData = graphql(query)(HeaderN)

export default withData

