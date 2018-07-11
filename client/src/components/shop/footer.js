import React from 'react'
import {Link} from 'react-router-dom'


const Footer = () => {
  return (
    <footer>
        <div className="footer layout1">
          <div className="col-xs-12 col-md-12 col-lg-3 left-content">
            <div className="coppy-right">
              <h3 className="content"><span className="site-name">© Empire Group</span> Copyright 2017</h3>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 middle-content">
            <ul className="other-links">
              <li><a href="#" data-text="Contact">Контакты</a></li>
              <li><a href="#" data-text="Policies">Политика</a></li>
              <li><a href="#" data-text="Terms & Privacy">ТЕРМИНЫ</a></li>
              <li><Link to={'about'} data-text="About">О нас </Link></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-3 right-content">
            <ul className="riverside-social">
              <li><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
              <li><a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a></li>
              <li><a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a></li>
              <li><a href="#"><i className="fa fa-pinterest" aria-hidden="true" /></a></li>
            </ul>
          </div>
        </div>      
                
            
      </footer>
  )
}


export default Footer